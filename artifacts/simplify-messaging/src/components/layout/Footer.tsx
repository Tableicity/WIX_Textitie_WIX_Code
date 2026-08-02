import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";

export function Footer() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    createLead.mutate(
      { data: { phone, source: "footer" } },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          setPhone("");
        },
        onError: (err) => {
          setError(err?.data?.error ?? "Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Simplify<span className="text-primary">Messaging</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-8">
              The intelligent successor to legacy text tools. Stop wasting human labor on repetitive replies and deploy an LLM-powered Auto-Pilot that texts like an expert.
            </p>
          </div>

          <div className="bg-card/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-foreground font-semibold mb-2">Ready to see it in action?</h4>
            <p className="text-xs text-muted-foreground mb-4">Enter your phone number to text a live demo agent.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                type="tel" 
                placeholder="Mobile number..." 
                className="bg-background"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Button type="submit" disabled={createLead.isPending} className="shrink-0">
                {submitted ? <CheckCircle2 className="w-4 h-4" /> : <MessageSquare className="w-4 h-4 mr-2" />}
                {submitted ? "Sent" : createLead.isPending ? "..." : "Demo"}
              </Button>
            </form>
            {error && <p className="text-xs text-destructive mt-2">{error}</p>}
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Copyright 2026 SmartSquawk Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              Developer API Documentation
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
