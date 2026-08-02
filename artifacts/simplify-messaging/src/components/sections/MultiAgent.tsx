import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { GitMerge, Users2, LockKeyhole } from "lucide-react";

export function MultiAgent() {
  const cards = [
    {
      icon: <GitMerge className="w-6 h-6" />,
      title: "Multi-Department Routing",
      description: "Segment incoming texts into Sales, Support, or Billing automatically based on customer intent. No manual triage required.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: <LockKeyhole className="w-6 h-6" />,
      title: "Granular Agent Roles",
      description: "Assign custom permission tiers for Managers, Supervisors, and Frontline Reps. Control who sees what.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Claim & Release Mechanics",
      description: "Prevent duplicate work. Human agents can instantly 'Claim' an active thread, pause the Auto-Pilot, resolve the issue, and 'Release' it back.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <section id="multi-agent-inbox" className="py-24 lg:py-32 border-b border-border/50 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Scale Across Departments.<br/>Retain Control.</h2>
          </Reveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-card border border-border rounded-3xl p-8 h-full flex flex-col hover:border-border/80 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 relative overflow-hidden group">
                {/* Subtle top glow */}
                <div className={`absolute top-0 inset-x-0 h-[2px] w-full bg-gradient-to-r from-transparent via-${card.color.replace('text-', '')} to-transparent opacity-0 group-hover:opacity-50 transition-opacity`} />
                
                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} ${card.border} border flex items-center justify-center mb-8`}>
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground/90">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
