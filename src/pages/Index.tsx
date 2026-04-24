import { NavLink } from "react-router-dom";
import { REGULATIONS } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Sparkles, Brain, Cpu, Network, Rocket,
  GraduationCap, Star, Layers, Target, Zap, BookOpenCheck,
} from "lucide-react";

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
  // Aggregate stats from all regulations
  const allCourses = REGULATIONS.flatMap(r => r.semesters.flatMap(s => s.courses));
  const totalAI = allCourses.filter(c => c.ai).length;
  const totalCourses = allCourses.length;
  const aiPct = Math.round((totalAI / totalCourses) * 100);

  const pillars = [
    { icon: Brain, title: "AI-First Curriculum", body: "From Pre-Semester onward, every learner builds with Generative AI, Agentic Tools, and Prompt Engineering." },
    { icon: Network, title: "Agentic Systems", body: "Multi-Agentic Systems & LLM Engineering elevate students from model users to autonomous-system architects." },
    { icon: Cpu, title: "Industry-Grade Stack", body: "MLOps, Cloud for AI, Big Data, and Full-Stack Development form a production-ready engineering spine." },
    { icon: Target, title: "Ethics & Governance", body: "Professional Ethics, AI Governance & Risk Assessment embedded as mandatory IV-Year coursework." },
  ];

  const ladder = [
    { level: "01", title: "Foundations", years: "I Year", body: "Mathematics, Python for AI, Prompt Engineering, AI Tools literacy." },
    { level: "02", title: "AI-Driven Data Science", years: "II Year", body: "Statistical ML, Optimization, Search Methods, Linear Algebra for ML." },
    { level: "03", title: "AI Systems Engineering", years: "III Year", body: "Deep Learning, MLOps, Computer Vision, Generative & Agentic Systems." },
    { level: "04", title: "Research & Capstone", years: "IV Year", body: "Reinforcement Learning, Multi-Agentic Systems, Governance, Capstone Project." },
  ];

  return (
    <div className="px-4 sm:px-8 py-8 max-w-[1400px] mx-auto">
      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl glass-card p-8 sm:p-12 mb-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[hsl(var(--violet-accent))]/10 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Board of Studies · 2026 · Executive Brief
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            B.Tech · CSE-AIML · Course Curriculum
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight text-foreground max-w-4xl mt-2">
            Transforming the AIML Curriculum into an{" "}
            <span className="text-primary">Agentic AI</span>{" "}
            Engineering Program
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-5 max-w-3xl leading-relaxed">
            A four-regulation evolution — from <b className="text-foreground">R22-C22</b> to{" "}
            <b className="text-foreground">R25-C26</b> — that re-engineers every semester around
            Generative AI, Multi-Agentic Systems, MLOps, and Responsible AI Governance.
          </p>

          {/* Presenter card */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 grid place-items-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-serif text-base text-foreground leading-tight">
                Dr. Jyostna Devi Bodapati
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Associate Professor · Advanced CSE Department
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-7">
            <NavLink
              to="/r/r25-c26"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Explore R25-C26 (Latest) <ArrowRight className="h-4 w-4" />
            </NavLink>
            <NavLink
              to="/r/r22-c22"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              See where we started (R22-C22)
            </NavLink>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { label: "Regulations", value: REGULATIONS.length, icon: Layers },
              { label: "Total Courses", value: totalCourses, icon: BookOpenCheck },
              { label: "AI / ML Courses", value: totalAI, icon: Star, hot: true },
              { label: "AI Coverage", value: `${aiPct}%`, icon: Zap, hot: true },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <s.icon className="h-3 w-3" /> {s.label}
                </div>
                <div className={cn(
                  "font-serif text-2xl mt-1 tabular-nums",
                  s.hot ? "text-[hsl(var(--ai-track))]" : "text-foreground"
                )}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVOLUTION TIMELINE ─────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-4 w-4 text-primary" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            The Transformation Journey
          </h2>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 max-w-3xl">
          Four regulations. One trajectory toward Agentic AI.
        </h3>

        <div className="relative">
          {/* Timeline spine */}
          <div className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-primary/40 via-[hsl(var(--ai-track))]/40 via-[hsl(var(--violet-accent))]/40 to-[hsl(var(--mint-accent))]/40" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {REGULATIONS.map((r, idx) => {
              const aiCount = r.semesters.flatMap(s => s.courses).filter(c => c.ai).length;
              return (
                <NavLink
                  key={r.id}
                  to={`/r/${r.id}`}
                  className={cn(
                    "group glass-card p-5 transition-colors",
                    accentBorder[r.accent],
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("h-3 w-3 rounded-full ring-4 ring-background", accentDot[r.accent])} />
                    <span className={cn("text-[11px] uppercase tracking-widest font-semibold", accentText[r.accent])}>
                      Stage {idx + 1}
                    </span>
                  </div>
                  <div className={cn("font-serif text-xl text-foreground", accentText[r.accent])}>{r.code}</div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                    {r.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{r.semesters.length} sem · {r.semesters.flatMap(s => s.courses).length} courses</span>
                    <span className="flex items-center gap-1 text-[hsl(var(--ai-track))]">
                      <Star className="h-3 w-3 fill-current" /> {aiCount} AI
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-foreground/80 group-hover:text-primary transition-colors">
                    View regulation <ArrowRight className="h-3 w-3" />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PILLARS ────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-[hsl(var(--ai-track))]" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Four Pillars of AI Adoption
          </h2>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 max-w-3xl">
          What changed — and why it matters.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="glass-card p-5 group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] tracking-widest text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <div className="font-serif text-lg text-foreground">{p.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPETENCY LADDER ──────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[hsl(var(--violet-accent))]" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            AI Systems Engineer Competency Ladder
          </h2>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 max-w-3xl">
          A 4-year arc from prompt-literate to research-ready.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ladder.map((l, i) => (
            <div key={l.level} className="relative glass-card p-5 overflow-hidden">
              <div className="absolute -right-4 -top-4 font-serif text-7xl text-primary/10 select-none">
                {l.level}
              </div>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                  {l.years}
                </div>
                <div className="font-serif text-lg text-foreground mt-1">{l.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{l.body}</p>
              </div>
              {i < ladder.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─────────────────────────────────── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 border-border/40">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Before — R22-C22</div>
            <h4 className="font-serif text-xl text-foreground mt-2">Classical CS + ML add-ons</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "Knowledge Representation, Text Mining, Big Data Analytics",
                "AI as IV-Year specialization, layered onto a CS base",
                "Generative AI introduced via late electives only",
                "Capstone weighted toward classical software internships",
              ].map(t => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/60 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6 border-primary/30">
            <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">After — R25-C26</div>
            <h4 className="font-serif text-xl text-foreground mt-2">Agentic-AI native engineering</h4>
            <ul className="mt-4 space-y-2 text-sm text-foreground/90">
              {[
                "AI Tools & Prompt Engineering from Pre-Semester (Day 1)",
                "Statistical ML, Optimization, Search Methods in II Year core",
                "MLOps, Generative & Agentic Systems, Cloud for AI in III Year",
                "Multi-Agentic Systems, RL, AI Governance & Risk in IV Year",
                "12-credit Capstone built on production-grade AI systems",
              ].map(t => (
                <li key={t} className="flex gap-2">
                  <Star className="h-3 w-3 mt-1.5 text-[hsl(var(--ai-track))] fill-current shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="glass-card p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-[hsl(var(--violet-accent))]/5 pointer-events-none" />
        <div className="relative">
          <h3 className="font-serif text-2xl sm:text-3xl text-foreground">
            Explore the curriculum semester-by-semester.
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
            Every regulation, every semester, every credit — including the AI-track courses driving the transformation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {REGULATIONS.map(r => (
              <NavLink
                key={r.id}
                to={`/r/${r.id}`}
                className={cn(
                  "px-4 py-2 rounded-lg border border-border text-sm transition-colors",
                  accentBorder[r.accent],
                  "hover:bg-secondary"
                )}
              >
                <span className={cn("font-semibold", accentText[r.accent])}>{r.code}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
