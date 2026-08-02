import { ReplitConnectors } from "@replit/connectors-sdk";

interface LeadNotifyPayload {
  id: number;
  phone: string;
  source: string;
  createdAt: Date | string;
}

/**
 * Send a Gmail notification when a new lead is captured.
 * Failures are swallowed so they never block the API response.
 */
export async function notifyNewLead(lead: LeadNotifyPayload): Promise<void> {
  try {
    const connectors = new ReplitConnectors();

    // Get the authenticated user's email address to use as both from and to.
    const profileRes = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/profile"
    );
    const profile = (await profileRes.json()) as { emailAddress?: string };
    const email = profile.emailAddress;
    if (!email) {
      console.error("[notify] Could not resolve Gmail address; skipping.");
      return;
    }

    const subject = `New demo request from ${lead.phone}`;
    const body = [
      `A new lead has been captured on Simplify Messaging.`,
      ``,
      `Phone:   ${lead.phone}`,
      `Source:  ${lead.source}`,
      `Time:    ${new Date(lead.createdAt).toUTCString()}`,
      `Lead ID: ${lead.id}`,
      ``,
      `Reply quickly — prospects convert best within the first few minutes!`,
    ].join("\n");

    // RFC 2822 raw message, base64url-encoded as Gmail requires.
    const raw = [
      `To: ${email}`,
      `From: ${email}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      body,
    ].join("\r\n");

    const encoded = Buffer.from(raw)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const sendRes = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: encoded }),
      }
    );

    if (!sendRes.ok) {
      const err = await sendRes.text();
      console.error("[notify] Gmail send failed:", sendRes.status, err);
    } else {
      console.info("[notify] Lead notification sent to", email);
    }
  } catch (err) {
    // Never let notification failures surface to callers.
    console.error("[notify] Unexpected error sending lead notification:", err);
  }
}
