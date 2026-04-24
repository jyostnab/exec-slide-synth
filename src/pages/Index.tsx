import { NavLink } from "react-router-dom";
import { REGULATIONS } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, GraduationCap, Star, Compass } from "lucide-react";
import vignanLogo from "@/assets/vignan-logo.png";

const accentText: Record<string, string> = {
  cyan: "text-primary",
  amber: "text-[hsl(var(--ai-track))]",
  violet: "text-[hsl(var(--violet-accent))]",
  mint: "text-[hsl(var(--mint-accent))]",
};
const accentBorder: Record<string, string> = {
  cyan: "hover:border-primary/60",
  amber: "hover:border-[hsl(var(--ai-track))]/60",
  violet: "hover:border-[hsl(var(--violet-accent))]/60",
  mint: "hover:border-[hsl(var(--mint-accent))]/60",
};
const accentDot: Record<string, string> = {
  cyan: "bg-primary",
  amber: "bg-[hsl(var(--ai-track))]",
  violet: "bg-[hsl(var(--violet-accent))]",
  mint: "bg-[hsl(var(--mint-accent))]",
};

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 sm:px-8 py-10">
      <div className="w-full max-w-5xl">
        {/* COVER CARD */}
        <section className="relative overflow-hidden rounded-2xl glass-card p-8 sm:p-12 text-center">
          {/* Soft glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[hsl(var(--violet-accent))]/10 blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Logo */}
            <img
              src={vignanLogo}
              alt="Vignan's Foundation for Science, Technology & Research"
              className="h-16 sm:h-20 w-auto object-contain mx-auto bg-white rounded-md px-3 py-1.5 shadow-md"
            />

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mt-7">
              <Sparkles className="h-3.5 w-3.5" />
              Board of Studies · 2026
            </div>

            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mt-3">
              B.Tech · CSE-AIML · Course Curriculum
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-5xl leading-tight text-foreground mt-4">
              Transforming AIML into an{" "}
              <span className="text-primary">Agentic AI</span>{" "}
              Engineering Program
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              A four-regulation evolution — from R22-C22 to R25-C26 — re-engineered around
              Generative AI, Multi-Agentic Systems, MLOps, and Responsible AI Governance.
            </p>

            {/* Presenter */}
            <div className="mt-7 inline-flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-5 py-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 grid place-items-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-serif text-base text-foreground leading-tight">
                  Dr. Jyostna Devi Bodapati
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Associate Professor · Advanced CSE Department
                </div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <NavLink
                to="/r/r25-c26"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Explore R25-C26 (Latest) <ArrowRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/overview"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
              >
                <Compass className="h-4 w-4" /> Transformation Overview
              </NavLink>
            </div>
          </div>
        </section>

        {/* REGULATION QUICK-NAV */}
        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground text-center mb-3">
            Or jump directly to a regulation
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...REGULATIONS].reverse().map((r) => {
              const aiCount = r.semesters.flatMap(s => s.courses).filter(c => c.ai).length;
              return (
                <NavLink
                  key={r.id}
                  to={`/r/${r.id}`}
                  className={cn("group glass-card p-4 transition-colors", accentBorder[r.accent])}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("h-2 w-2 rounded-full", accentDot[r.accent])} />
                    <span className={cn("text-[11px] uppercase tracking-widest font-semibold", accentText[r.accent])}>
                      {r.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{r.semesters.length} sem</span>
                    <span className="flex items-center gap-1 text-[hsl(var(--ai-track))]">
                      <Star className="h-3 w-3 fill-current" /> {aiCount}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-foreground/80 group-hover:text-primary transition-colors">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
