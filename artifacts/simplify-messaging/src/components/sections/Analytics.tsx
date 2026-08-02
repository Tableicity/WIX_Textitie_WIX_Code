import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { LineChart, Line, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const driftData = [
  { time: "00:00", value: 65 },
  { time: "04:00", value: 72 },
  { time: "08:00", value: 85 },
  { time: "12:00", value: 94 },
  { time: "16:00", value: 98 },
  { time: "20:00", value: 92 },
  { time: "24:00", value: 96 },
];

export function Analytics() {
  return (
    <section id="analytics" className="py-24 lg:py-32 border-b border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Operational Intelligence</h2>
          </Reveal>
        </div>

        <StaggerContainer className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Stat Box 1 */}
          <StaggerItem>
            <div className="bg-card border border-border/80 rounded-3xl p-8 flex flex-col justify-between h-[220px] relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-[30px] group-hover:bg-primary/10 transition-colors" />
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">AI Auto-Resolution Rate</p>
                <p className="text-xs text-muted-foreground">Threads closed completely autonomously.</p>
              </div>
              <div className="text-5xl font-extrabold text-foreground tracking-tighter">
                84.2<span className="text-primary">%</span>
              </div>
            </div>
          </StaggerItem>

          {/* Stat Box 2 */}
          <StaggerItem>
            <div className="bg-card border border-border/80 rounded-3xl p-8 flex flex-col justify-between h-[220px] relative overflow-hidden group hover:border-blue-500/40 transition-colors">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full blur-[30px] group-hover:bg-blue-500/10 transition-colors" />
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Response Latency</p>
                <p className="text-xs text-muted-foreground">Avg time from customer text to smart response.</p>
              </div>
              <div className="text-5xl font-extrabold text-foreground tracking-tighter">
                <span className="text-blue-400 font-medium text-4xl mr-1">&lt;</span>1.2<span className="text-blue-400 text-2xl ml-2 font-medium">Sec</span>
              </div>
            </div>
          </StaggerItem>

          {/* Stat Box 3 (Chart) */}
          <StaggerItem className="lg:col-span-1">
            <div className="bg-card border border-border/80 rounded-3xl p-8 flex flex-col justify-between h-[220px] relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
              <div className="relative z-10 mb-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Sentiment Drift</p>
                <p className="text-xs text-muted-foreground">Real-time customer satisfaction metrics.</p>
              </div>
              <div className="h-[100px] w-full relative z-10 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={driftData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#0b0f19" }} 
                      activeDot={{ r: 6, fill: "#10b981" }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#131a26', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#10b981' }}
                      cursor={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
}
