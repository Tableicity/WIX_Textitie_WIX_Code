import { Reveal } from "@/components/ui/reveal";
import { ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MassCampaigns() {
  return (
    <section id="mass-campaigns" className="py-24 lg:py-32 border-b border-border/50 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mask-image-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Carrier-Grade Suppression & Instant Opt-Out Compliance Layer Built-In</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            From 1 to 1,000,000 Messages.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Zero Friction.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload massive contact segments and blast personalized campaigns. The engine automatically handles variables (Names, past context) and routes replies straight back into individual agent dashboards.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Button size="lg" className="h-14 px-8 text-base shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-xl group">
            Start a Campaign
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
