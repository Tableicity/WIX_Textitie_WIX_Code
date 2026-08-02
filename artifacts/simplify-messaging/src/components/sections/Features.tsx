import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { Bot, Zap, Settings2 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Auto-Pilot Engine",
      description: "Fully autonomous 1-to-1 customer texting. The LLM handles inquiries, schedules bookings, and answers complex product questions 24/7 without human intervention."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Co-Pilot Interface",
      description: "Human-in-the-loop assistance. The system reads incoming texts and instantly drafts context-aware, hyper-accurate replies. Agents click once to edit, approve, and send."
    },
    {
      icon: <Settings2 className="w-6 h-6" />,
      title: "Advanced Automations",
      description: "Build logic-based trigger workflows. Send automated customer reminders, follow-ups, and behavioral sequence messages based on text tags."
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 border-b border-border/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">The Autonomous Text Infrastructure</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground">
              Enterprise messaging re-engineered with specialized LLM execution layers.
            </p>
          </Reveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-8 hover:bg-card hover:border-primary/30 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                <div className="absolute -inset-px bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                
                <div className="w-14 h-14 bg-primary/10 text-primary border border-primary/20 flex items-center justify-center rounded-xl mb-8 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground/90 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
