import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Sparkles, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { DemoModal } from "@/components/sections/DemoModal";
import { useCreateLead } from "@workspace/api-client-react";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    createLead.mutate(
      { data: { phone, source: "hero" } },
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
    <section id="hero" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative border-b border-border/50">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-xs font-medium text-primary backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Omni-Channel Update Live</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Textline doesn't think.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                SmartSquawk does.
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The first business text inbox trained entirely on your brand. Stop wasting human labor on repetitive replies. Deploy an LLM-powered Auto-Pilot that texts like an expert, or run on Co-Pilot to draft lightning-fast, brand-safe answers for your human team.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="relative flex-1">
                <Input 
                  type="tel" 
                  placeholder="Enter your phone number..." 
                  className="h-12 pl-4 pr-4 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" size="lg" disabled={createLead.isPending} className="h-12 px-8 text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] whitespace-nowrap">
                {submitted ? (
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Connecting...</span>
                ) : createLead.isPending ? (
                  "Sending..."
                ) : (
                  "Import Your Leads"
                )}
              </Button>
            </form>
            {error && (
              <p className="text-xs text-destructive mt-3 text-center lg:text-left">{error}</p>
            )}
            <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center lg:justify-start gap-1">
              <MessageSquare className="w-3 h-3" /> Enter your phone number to text a live demo agent.
            </p>
          </Reveal>
          
          <Reveal delay={0.4} className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium">
            <button onClick={() => setDemoOpen(true)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </Reveal>
        </div>

        <div className="lg:col-span-5 relative">
          <Reveal delay={0.3} direction="left">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-blue-500" />
              
              <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full h-full bg-green-500/20 rounded-full animate-ping" />
                    <div className="h-2.5 w-2.5 bg-green-500 rounded-full relative z-10" />
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-foreground/90">Session: #09214</div>
                </div>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20 uppercase tracking-wider">
                  Auto-Pilot Mode
                </span>
              </div>
              
              <div className="space-y-6 text-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="bg-secondary/50 border border-border/30 rounded-2xl rounded-tl-sm p-4 max-w-[85%] text-foreground/80 leading-relaxed"
                >
                  Hey there, I read your catalog online. Do you offer bulk discount options for the Enterprise Widget line?
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.5 }}
                  className="flex items-center gap-3 text-xs text-muted-foreground italic pl-2"
                >
                  <div className="flex gap-1">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  </div>
                  <span>SmartSquawk Auto-Pilot processing document context...</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 3.5, type: "spring" }}
                  className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto text-primary-foreground shadow-[0_4px_20px_rgba(6,182,212,0.15)] leading-relaxed"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  Yes, we do! Based on our catalog sheets, orders over 500 units receive a <span className="text-primary font-semibold">15% discount</span>. Would you like me to send over our wholesale pricing structure grid via text?
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
          </Reveal>
        </div>
      </div>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
}
