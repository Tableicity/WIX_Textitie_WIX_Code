import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListLeads,
  useOptOutLead,
  getListLeadsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { BellOff, MessageSquare, Users, Lock } from "lucide-react";

const STORAGE_KEY = "leads_token";

function TokenGate({ onToken }: { onToken: (t: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) { setError(true); return; }
    sessionStorage.setItem(STORAGE_KEY, trimmed);
    onToken(trimmed);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold font-display">Team access only</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Enter the leads access token to view captured demo requests.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Access token"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            className={`w-full rounded-lg border bg-card px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? "border-destructive" : "border-border"
            }`}
          />
          {error && (
            <p className="text-xs text-destructive">Token is required.</p>
          )}
          <Button type="submit" className="w-full">Unlock</Button>
        </form>
      </div>
    </div>
  );
}

function LeadsList({ token }: { token: string }) {
  const queryClient = useQueryClient();

  const { data: leads, isLoading, isError } = useListLeads({
    request: { headers: { Authorization: `Bearer ${token}` } },
  });

  const optOut = useOptOutLead({
    request: { headers: { Authorization: `Bearer ${token}` } },
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
      },
    },
  });

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <p className="text-destructive font-medium">Invalid token or server error.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold font-display">Captured Leads</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }}
          >
            Sign out
          </Button>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Demo requests submitted through the site, newest first.
        </p>

        {isLoading && <p className="text-muted-foreground">Loading leads…</p>}
        {leads && leads.length === 0 && (
          <div className="border border-border/50 rounded-2xl p-10 text-center text-muted-foreground">
            <MessageSquare className="w-6 h-6 mx-auto mb-3 opacity-50" />
            No leads captured yet.
          </div>
        )}

        {leads && leads.length > 0 && (
          <div className="border border-border/50 rounded-2xl overflow-hidden divide-y divide-border/50">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-4 p-4 bg-card/30"
              >
                <div>
                  <div className="font-mono font-medium">
                    {lead.phone}
                    {lead.optedOut && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-destructive bg-destructive/10 border border-destructive/20 px-2 py-0.5 rounded">
                        Opted out
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    via {lead.source} · {new Date(lead.createdAt).toLocaleString()}
                  </div>
                </div>
                {!lead.optedOut && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={optOut.isPending}
                    onClick={() => optOut.mutate({ id: lead.id })}
                  >
                    <BellOff className="w-3.5 h-3.5 mr-1.5" /> Opt out
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Leads() {
  const saved = sessionStorage.getItem(STORAGE_KEY) ?? "";
  const [token, setToken] = useState(saved);

  if (!token) return <TokenGate onToken={setToken} />;
  return <LeadsList token={token} />;
}
