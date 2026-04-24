import { NavLink } from "react-router-dom";
import { ArrowRight, Sparkles, GraduationCap, Compass } from "lucide-react";
import vignanLogo from "@/assets/vignan-logo.png";

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

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-5xl leading-tight text-foreground mt-8">
              VFSTR <span className="text-primary">Agentic AI</span> Transformation
            </h1>

            <p className="text-sm sm:text-lg text-foreground/90 mt-4 max-w-2xl mx-auto leading-relaxed">
              B.Tech CSE — Artificial Intelligence and Machine Learning (AIML)
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ai-track))]/40 bg-[hsl(var(--ai-track))]/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[hsl(var(--ai-track))] font-semibold">
              <Sparkles className="h-3 w-3" /> Regulation R25-C25 · Agentic AI Curriculum
            </div>

            {/* Presenter */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-5 py-3">
              <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 grid place-items-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Presented by
                </div>
                <div className="font-serif text-base text-foreground leading-tight mt-0.5">
                  Dr. Jyostna Devi Bodapati
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Associate Professor · ACSE Department
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
      </div>
    </div>
  );
};

export default Index;
