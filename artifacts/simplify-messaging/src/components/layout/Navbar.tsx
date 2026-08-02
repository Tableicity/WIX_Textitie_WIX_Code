import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Simplify<span className="text-primary">Messaging</span>
          </span>
          <span className="ml-2 text-[10px] font-mono uppercase bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full hidden sm:inline-block">
            v2.0
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {["Features", "Knowledge Base", "Multi-Agent Inbox", "Mass Campaigns", "Analytics"].map((item) => {
            const id = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <button
                key={item}
                onClick={() => scrollTo(id)}
                className="hover:text-foreground transition-colors"
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center">
          <Button onClick={() => scrollTo("hero")} className="shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
