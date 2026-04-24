import { useParams, NavLink } from "react-router-dom";
import { findRegulation } from "@/data/curriculum";
import { SemesterTable } from "@/components/SemesterTable";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Star, MessageSquareQuote, Sparkles } from "lucide-react";

const accentClass: Record<string, string> = {
  cyan: "text-primary",
  amber: "text-[hsl(var(--ai-track))]",
  violet: "text-[hsl(var(--violet-accent))]",
  mint: "text-[hsl(var(--mint-accent))]",
};

export default function RegulationPage() {
  const { regId, semId } = useParams();
  const reg = findRegulation(regId || "");
  if (!reg) return <div className="p-8 text-muted-foreground">Regulation not found.</div>;

  const accent = accentClass[reg.accent];
  const semester = semId ? reg.semesters.find(s => s.id === semId) : null;

  const totalCourses = reg.semesters.reduce((a, s) => a + s.courses.length, 0);
  const totalAI = reg.semesters.reduce((a, s) => a + s.courses.filter(c => c.ai).length, 0);
  const totalAICredits = reg.semesters.reduce(
    (a, s) => a + s.courses.filter(c => c.ai).reduce((b, c) => b + Number(c.C || 0), 0),
    0,
  );
  const totalCredits = reg.semesters.reduce((a, s) => a + Number(s.totalCredits || 0), 0);
  const aiPct = totalCredits ? Math.round((totalAICredits / Number(totalCredits)) * 100) : 0;

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className={cn("text-[11px] tracking-[0.2em] uppercase font-semibold", accent)}>
          {reg.code}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground mt-1">{reg.title}</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{reg.description}</p>
      </div>

      {!semester && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-6">
            {[
              {
                label: "Semesters",
                value: reg.semesters.some(s => s.id === 'pre')
                  ? `${reg.semesters.length - 1} + presem`
                  : reg.semesters.length,
              },
              { label: "Courses", value: totalCourses },
              { label: "AI / ML Courses", value: totalAI, accent: true },
              { label: "AI / ML Credits", value: totalAICredits, accent: true },
              { label: "AI / ML %", value: `${aiPct}%`, accent: true },
              { label: "Total Credits", value: totalCredits },
            ].map((s) => (
              <div key={s.label} className="glass-card px-4 py-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className={cn(
                  "font-serif text-2xl mt-1 tabular-nums",
                  s.accent ? "text-[hsl(var(--ai-track))]" : "text-foreground"
                )}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* BoS Comments — only on R25-C26 */}
          {reg.id === 'r25-c26' && (
            <div className="glass-card p-6 mb-6 border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareQuote className="h-4 w-4 text-primary" />
                <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  Board of Studies — Approvals & Comments
                </h3>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-5">
                As part of the university-wide transition into an{" "}
                <b className="text-primary">Agentic AI University</b>, the CSE-AIML Board of Studies
                meeting (07-02-2026) revised the R25 Course Structure to incorporate{" "}
                <i>Artificial Intelligence Adoption Levels (1, 2, 3, 4)</i> across all four years.
                Subjects and credits have been revised while keeping total credits per semester
                unchanged. The following members have approved the revised structure:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Prof. Arun Agarwal */}
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif text-sm text-foreground">Prof. Arun Agarwal</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        Senior Professor (Retd.), SCIS · Ex Pro Vice-Chancellor-1<br />
                        University of Hyderabad
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--mint-accent))] font-semibold border border-[hsl(var(--mint-accent))]/40 rounded px-2 py-0.5">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 mt-3 leading-relaxed">
                    "The modified curriculum already includes ML, DL, CV, NLP, GenAI, RL, MLOps,
                    Cloud, Responsible AI and Agentic AI. To maximise long-term employability,
                    graduates must be able to <b>build models, deploy systems, work with data, use
                    modern AI tools, and solve real business problems</b>."
                  </p>
                  <p className="text-[11px] text-primary italic mt-2">I approve these changes.</p>
                </div>

                {/* Prof. R.B.V. Subramanyam */}
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif text-sm text-foreground">Prof. R. Bala Venkata Subramanyam</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        M.Tech, Ph.D (IIT Kgp) · Professor, CSE<br />
                        NIT Warangal
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--mint-accent))] font-semibold border border-[hsl(var(--mint-accent))]/40 rounded px-2 py-0.5">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 mt-3 leading-relaxed">
                    "I hereby approve the modifications in the course structure."
                  </p>
                </div>

                {/* Dr. D S Guru */}
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif text-sm text-foreground">Dr. D. S. Guru</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        Senior Professor, DoS in Computer Science<br />
                        University of Mysore · Expert Committee Member, UGC-NET
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--mint-accent))] font-semibold border border-[hsl(var(--mint-accent))]/40 rounded px-2 py-0.5">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 mt-3 leading-relaxed">
                    "I have my approval."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Semester grid */}
          <div className="flex items-center gap-2 mb-3 mt-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Jump to Semester</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {reg.semesters.map((s) => {
              const aiCount = s.courses.filter(c => c.ai).length;
              return (
                <NavLink
                  key={s.id}
                  to={`/r/${reg.id}/${s.id}`}
                  className="glass-card group p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={cn("text-[10px] uppercase tracking-widest", accent)}>{s.short}</div>
                      <div className="font-serif text-base mt-1 text-foreground leading-tight">
                        {s.label.replace(/^.+ — /, '')}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="tabular-nums"><b className="text-foreground">{s.totalCredits}</b> credits</span>
                    <span className="tabular-nums">{s.courses.length} courses</span>
                    {aiCount > 0 && (
                      <span className="flex items-center gap-1 text-[hsl(var(--ai-track))]">
                        <Star className="h-3 w-3 fill-current" />
                        {aiCount}
                      </span>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* All semesters stacked */}
          <div className="space-y-6">
            {reg.semesters.map((s) => (
              <SemesterTable key={s.id} semester={s} accent={accent} />
            ))}
          </div>
        </>
      )}

      {semester && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <NavLink to={`/r/${reg.id}`} className="text-muted-foreground hover:text-primary">
              ← Back to {reg.code} overview
            </NavLink>
          </div>
          <SemesterTable semester={semester} accent={accent} />
        </div>
      )}
    </div>
  );
}
