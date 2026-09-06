export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16">
          <div className="max-w-xl">
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
