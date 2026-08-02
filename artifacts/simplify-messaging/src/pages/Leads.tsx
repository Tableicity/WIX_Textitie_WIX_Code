import { useQueryClient } from "@tanstack/react-query";
import {
  useListLeads,
  useOptOutLead,
  getListLeadsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { BellOff, MessageSquare, Users } from "lucide-react";

export default function Leads() {
  const { data: leads, isLoading, isError } = useListLeads();
  const queryClient = useQueryClient();
  const optOut = useOptOutLead({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
      },
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold font-display">Captured Leads</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Demo requests submitted through the site, newest first.
        </p>

        {isLoading && <p className="text-muted-foreground">Loading leads…</p>}
        {isError && (
          <p className="text-destructive">Failed to load leads. Is the API server running?</p>
        )}
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
