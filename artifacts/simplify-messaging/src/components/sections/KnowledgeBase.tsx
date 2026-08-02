import { Reveal } from "@/components/ui/reveal";
import { Link, FileText, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function KnowledgeBase() {
  return (
    <section id="knowledge-base" className="py-24 lg:py-32 border-b border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                The "Professor + Human" Brain
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bland engines give you a blank slate. SmartSquawk builds a custom brand asset in under 5 minutes. Scrape websites and ingest product data natively.
              </p>
            </Reveal>
            
            <Reveal delay={0.2} className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-foreground/90">Zero custom database development required</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-foreground/90">Continuous real-time asset syncing</span>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <Reveal delay={0.3} direction="left">
              <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Knowledge Ingestion</h3>
                    <p className="text-xs text-muted-foreground mt-1">Train your AI instantly.</p>
                  </div>
                  <div className="text-[10px] font-mono bg-secondary px-3 py-1.5 rounded-full text-muted-foreground border border-border">
                    SYSTEM STATUS: READY
                  </div>
                </div>

                {/* Upload Slots */}
                <div className="space-y-4">
                  {/* Slot 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-background hover:border-primary/30 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <Link className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Add Website URL</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Scrapes and vectorizes your site layout instantly. Auto-updates weekly.</p>
                    </div>
                  </motion.div>

                  {/* Slot 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-background hover:border-primary/30 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Upload Document/PDF</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Ingests complex pricing matrix tables and catalog sheets. High precision.</p>
                    </div>
                  </motion.div>

                  {/* Slot 3 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                    <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary">Professor Layer Alignment</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Applies hard compliance guardrails so the LLM never hallucinates.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
