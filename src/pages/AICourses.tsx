import { REGULATIONS } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { Sparkles, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const accentClass: Record<string, string> = {
  cyan: "text-primary",
  amber: "text-[hsl(var(--ai-track))]",
  violet: "text-[hsl(var(--violet-accent))]",
  mint: "text-[hsl(var(--mint-accent))]",
};

export default function AICourses() {
  // Only show full regulations (skip legacy partial ones)
  const regs = REGULATIONS.filter(r => r.id === 'r25-c25' || r.id === 'r25-c26');

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[hsl(var(--ai-track))]">
          <Sparkles className="h-3.5 w-3.5" />
          AI / ML Track
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground mt-1">
          AI / ML Courses — Semester-wise
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
          All courses explicitly tagged as AI / Machine Learning across the latest
          regulations, grouped by semester.
        </p>
      </div>

      <div className="space-y-8">
        {regs.map(reg => {
          const accent = accentClass[reg.accent];
          const totalAI = reg.semesters.reduce(
            (a, s) => a + s.courses.filter(c => c.ai).length,
            0,
          );
          const totalAICredits = reg.semesters.reduce(
            (a, s) =>
              a + s.courses.filter(c => c.ai).reduce((b, c) => b + Number(c.C || 0), 0),
            0,
          );

          return (
            <section key={reg.id} className="glass-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
                <div>
                  <div className={cn("text-[10px] tracking-[0.2em] uppercase font-semibold", accent)}>
                    {reg.code}
                  </div>
                  <div className="font-serif text-base mt-0.5 text-foreground">{reg.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    AI / ML
                  </div>
                  <div className="font-serif text-lg text-[hsl(var(--ai-track))] tabular-nums">
                    {totalAI} courses · {totalAICredits} credits
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border/40">
                {reg.semesters.map(s => {
                  const aiCourses = s.courses.filter(c => c.ai);
                  if (aiCourses.length === 0) return null;
                  const semCredits = aiCourses.reduce((b, c) => b + Number(c.C || 0), 0);
                  return (
                    <div key={s.id} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <NavLink
                          to={`/r/${reg.id}/${s.id}`}
                          className="text-xs uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors font-semibold"
                        >
                          {s.label}
                        </NavLink>
                        <div className="text-[11px] text-muted-foreground tabular-nums">
                          {aiCourses.length} · {semCredits} credits
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {aiCourses.map((c, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Star className="h-3.5 w-3.5 mt-1 text-[hsl(var(--ai-track))] shrink-0 fill-current" />
                            <div className="flex-1 min-w-0">
                              <span className="text-foreground/90">{c.title}</span>
                              {c.highlight && (
                                <span className="ml-2 text-[10px] uppercase tracking-wider text-[hsl(var(--violet-accent))]">
                                  {c.highlight}
                                </span>
                              )}
                              {c.category && (
                                <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                                  · {c.category}
                                </span>
                              )}
                            </div>
                            <span className="text-[hsl(var(--ai-track))] font-semibold tabular-nums shrink-0">
                              {c.C}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
