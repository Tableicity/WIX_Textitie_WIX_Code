import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CheckCircle2, FileText, MessageSquare, RotateCcw, Send, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Scripted walkthrough scenes. Each scene has a caption + chat events revealed on a timeline.
const SCENES = [
  {
    id: 1,
    label: "Step 1 — Customer texts in",
    caption: "A lead texts your business number. SmartSquawk picks it up instantly.",
    icon: MessageSquare,
    duration: 4200,
  },
  {
    id: 2,
    label: "Step 2 — AI reads your knowledge base",
    caption: "Auto-Pilot scans your uploaded docs, pricing sheets, and past conversations.",
    icon: FileText,
    duration: 4200,
  },
  {
    id: 3,
    label: "Step 3 — Brand-perfect reply, in seconds",
    caption: "The AI replies in your voice — or drafts it for a human in Co-Pilot mode.",
    icon: Zap,
    duration: 5200,
  },
  {
    id: 4,
    label: "Step 4 — Lead converted",
    caption: "Follow-ups, scheduling, and hand-offs happen automatically. No lead left behind.",
    icon: CheckCircle2,
    duration: 4600,
  },
];

const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0);

function TypingDots() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 0.2, 0.4].map((d) => (
        <motion.div
          key={d}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: d }}
          className="w-1.5 h-1.5 bg-primary/60 rounded-full"
        />
      ))}
    </div>
  );
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [done, setDone] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (open) {
      setSceneIdx(0);
      setDone(false);
      setRunKey((k) => k + 1);
    }
  }, [open]);

  // Advance scenes
  useEffect(() => {
    if (!open || done) return;
    const t = setTimeout(() => {
      if (sceneIdx < SCENES.length - 1) {
        setSceneIdx((i) => i + 1);
      } else {
        setDone(true);
      }
    }, SCENES[sceneIdx].duration);
    return () => clearTimeout(t);
  }, [open, sceneIdx, runKey, done]);

  const scene = SCENES[sceneIdx];
  const Icon = scene.icon;

  const replay = () => {
    setSceneIdx(0);
    setDone(false);
    setRunKey((k) => k + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border/50 bg-background">
        <div className="relative">
          {/* Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="p-6 pb-4 relative z-10">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="w-4 h-4 text-primary" />
              SmartSquawk in 20 seconds
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Watch how an AI Auto-Pilot handles a real lead, end to end.
            </DialogDescription>
          </div>

          {/* Progress bar */}
          <div className="mx-6 h-1 bg-secondary rounded-full overflow-hidden relative z-10">
            <motion.div
              key={runKey}
              className="h-full bg-gradient-to-r from-primary to-blue-400"
              initial={{ width: "0%" }}
              animate={{ width: done ? "100%" : "100%" }}
              transition={done ? { duration: 0 } : { duration: TOTAL / 1000, ease: "linear" }}
            />
          </div>

          {/* Stage */}
          <div className="p-6 relative z-10">
            <div className="bg-card border border-border/50 rounded-2xl p-5 min-h-[300px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-blue-500" />

              {/* Scene label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${runKey}-${done ? "done" : scene.id}-label`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-md px-2.5 py-1 w-fit mb-5"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {done ? "Demo complete" : scene.label}
                </motion.div>
              </AnimatePresence>

              {/* Scene content */}
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key={`${runKey}-done`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-foreground font-semibold text-lg">That's the whole workflow.</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      From first text to converted lead — zero human effort on Auto-Pilot,
                      or lightning-fast drafts on Co-Pilot.
                    </p>
                    <Button variant="outline" size="sm" onClick={replay} className="gap-2">
                      <RotateCcw className="w-4 h-4" /> Replay demo
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${runKey}-${scene.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-sm"
                  >
                    {/* Customer message — visible in all scenes */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sceneIdx === 0 ? 0.6 : 0 }}
                      className="bg-secondary/50 border border-border/30 rounded-2xl rounded-tl-sm p-3.5 max-w-[85%] text-foreground/80 leading-relaxed"
                    >
                      Hi! Do you have any openings this Saturday? And what's your cancellation policy?
                    </motion.div>

                    {sceneIdx === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3 text-xs text-muted-foreground italic pl-2"
                      >
                        <TypingDots />
                        <span>Auto-Pilot reading: Booking-Calendar.pdf · Policies.docx · 1,200 past chats…</span>
                      </motion.div>
                    )}

                    {sceneIdx >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: sceneIdx === 2 ? 0.5 : 0, type: "spring" }}
                        className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-3.5 max-w-[85%] ml-auto shadow-[0_4px_20px_rgba(6,182,212,0.15)] leading-relaxed text-foreground"
                      >
                        We do! Saturday has openings at <span className="text-primary font-semibold">10 AM and 2:30 PM</span>.
                        Cancellations are free up to 24 hours before. Want me to lock in a slot for you?
                      </motion.div>
                    )}

                    {sceneIdx === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-2 text-xs text-muted-foreground justify-end pr-1"
                      >
                        <Bot className="w-3.5 h-3.5 text-primary" />
                        Sent by Auto-Pilot · 2.1s response time
                      </motion.div>
                    )}

                    {sceneIdx >= 3 && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-secondary/50 border border-border/30 rounded-2xl rounded-tl-sm p-3.5 max-w-[85%] text-foreground/80"
                        >
                          Yes — 10 AM works! 🎉
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2, type: "spring" }}
                          className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 w-fit mx-auto"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Booking confirmed · Lead converted · Reminder scheduled
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`${runKey}-${done ? "done" : scene.id}-cap`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground text-center mt-4 min-h-[20px]"
              >
                {done ? "Ready to put your texts on Auto-Pilot?" : scene.caption}
              </motion.p>
            </AnimatePresence>

            {/* Scene dots */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {SCENES.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    done || i <= sceneIdx ? "w-6 bg-primary" : "w-1.5 bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
