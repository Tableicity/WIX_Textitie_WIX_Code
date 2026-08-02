import { type Request, type Response, type NextFunction } from "express";

/**
 * Guards the admin-only leads endpoints (list + opt-out) behind a bearer token.
 * The token is read from the LEADS_TOKEN environment variable.
 * Clients must send: Authorization: Bearer <token>
 */
export function requireLeadsToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = process.env["LEADS_TOKEN"];
  if (!token) {
    res.status(503).json({ error: "Leads token not configured on server" });
    return;
  }

  const header = req.headers["authorization"] ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : header;

  if (!provided || provided !== token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
