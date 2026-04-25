import { useParams, NavLink } from "react-router-dom";
import { findRegulation } from "@/data/curriculum";
import { SemesterTable } from "@/components/SemesterTable";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Star, MessageSquareQuote, Sparkles } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  // Courses that count toward AI/ML credits "by application" (projects, I²C, work-in-lieu)
  // even though they are not explicitly tagged as AI courses.
  const isAppliedAI = (c: { title?: string; category?: string; ai?: boolean }) => {
    if (c.ai) return false;
    const t = `${c.title || ''} ${c.category || ''}`.toLowerCase();
    return (
      t.includes('project') ||
      t.includes('internship') ||
      t.includes('capstone') ||
      t.includes('industry interface') ||
      t.includes('i²c') ||
      t.includes('i2c') ||
      t.includes('work-in-lieu') ||
      t.includes('work in lieu')
    );
  };

  const totalCourses = reg.semesters.reduce((a, s) => a + s.courses.length, 0);
  const explicitAI = reg.semesters.reduce((a, s) => a + s.courses.filter(c => c.ai).length, 0);
  const appliedAI = reg.semesters.reduce((a, s) => a + s.courses.filter(isAppliedAI).length, 0);
  const totalAI = explicitAI + appliedAI;
  const explicitAICredits = reg.semesters.reduce(
    (a, s) => a + s.courses.filter(c => c.ai).reduce((b, c) => b + Number(c.C || 0), 0),
    0,
  );
  const appliedAICredits = reg.semesters.reduce(
    (a, s) => a + s.courses.filter(isAppliedAI).reduce((b, c) => b + Number(c.C || 0), 0),
    0,
  );
  const totalAICredits = explicitAICredits + appliedAICredits;
  const totalCredits = reg.semesters.reduce((a, s) => a + Number(s.totalCredits || 0), 0);
  const aiPct = totalCredits ? Math.round((totalAICredits / Number(totalCredits)) * 100) : 0;
  const showStats = reg.id !== "r22-c22" && reg.id !== "r22-c24";
  const showSemesterJump = reg.id !== "r22-c22";

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
          {showStats && (() => {
            const aiCourses = reg.semesters.flatMap(s =>
              s.courses
                .filter(c => c.ai || isAppliedAI(c))
                .map(c => ({ ...c, sem: s.short, applied: !c.ai && isAppliedAI(c) }))
            );
            const hasApplied = appliedAICredits > 0;
            const stats = [
              {
                label: "Semesters",
                value: reg.semesters.some(s => s.id === 'pre')
                  ? `${reg.semesters.length - 1} + presem`
                  : reg.semesters.length,
              },
              { label: "Courses", value: totalCourses },
              { label: "AI / ML Courses", value: hasApplied ? `${totalAI}*` : totalAI, accent: true, hover: true },
              { label: "AI / ML Credits", value: hasApplied ? `${totalAICredits}*` : totalAICredits, accent: true, hover: true },
              { label: "AI / ML %", value: hasApplied ? `${aiPct}%*` : `${aiPct}%`, accent: true },
              { label: "Total Credits", value: totalCredits },
            ];
            return (
              <>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-2">
                {stats.map((s) => {
                  const card = (
                    <div
                      className={cn(
                        "glass-card px-4 py-3 h-full",
                        s.hover && "cursor-help hover:border-primary/50 transition-colors"
                      )}
                    >
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s.label}
                      </div>
                      <div
                        className={cn(
                          "font-serif text-2xl mt-1 tabular-nums",
                          s.accent ? "text-[hsl(var(--ai-track))]" : "text-foreground"
                        )}
                      >
                        {s.value}
                      </div>
                    </div>
                  );
                  if (!s.hover) return <div key={s.label}>{card}</div>;
                  return (
                    <HoverCard key={s.label} openDelay={80} closeDelay={80}>
                      <HoverCardTrigger asChild>{card}</HoverCardTrigger>
                      <HoverCardContent className="w-96 p-0 border-primary/30">
                        <div className="px-4 py-2 border-b border-border/60 flex items-center justify-between">
                          <div className="text-[11px] uppercase tracking-widest text-[hsl(var(--ai-track))] font-semibold">
                            AI / ML Courses
                          </div>
                          <div className="text-[11px] text-muted-foreground tabular-nums">
                            {aiCourses.length} courses · {totalAICredits} credits
                          </div>
                        </div>
                        <ul className="max-h-80 overflow-y-auto divide-y divide-border/40">
                          {aiCourses.map((c, i) => (
                            <li
                              key={`${c.title}-${i}`}
                              className="px-4 py-2 flex items-start gap-3 text-xs"
                            >
                              <span className="text-[10px] font-mono text-muted-foreground mt-0.5 w-10 shrink-0">
                                {c.sem}
                              </span>
                              <span className="flex-1 text-foreground/90 leading-snug">
                                {c.title}
                                {c.applied && (
                                  <span className="ml-1 text-[9px] uppercase tracking-widest text-muted-foreground">
                                    · applied
                                  </span>
                                )}
                              </span>
                              <span
                                className={cn(
                                  "font-semibold tabular-nums shrink-0",
                                  c.applied ? "text-muted-foreground" : "text-[hsl(var(--ai-track))]"
                                )}
                              >
                                {c.C}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {hasApplied && (
                          <div className="px-4 py-2 border-t border-border/60 text-[10px] text-muted-foreground leading-snug">
                            * Includes {appliedAI} project / I²C / work-in-lieu courses
                            ({appliedAICredits} credits) applied to AI/ML.
                          </div>
                        )}
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>
              {hasApplied && (
                <p className="text-[11px] text-muted-foreground mb-6 ml-1">
                  * AI/ML totals include {appliedAICredits} credits from project,
                  Industry-Interface (I²C), and work-in-lieu courses applied to AI/ML.
                </p>
              )}
              </>
            );
          })()}

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
                <b className="text-primary">Agentic AI University</b>, the CSE-AIML curriculum
                has been revised and the new curriculum will be floated as <b>C26</b>. The following members have approved the revised structure:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Prof. Arun Agarwal */}
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-serif text-sm text-foreground">Prof. Arun Agarwal</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        B.Tech &amp; PhD (IIT Delhi), SMIEEE, FIETE, FTAS<br />
                        Senior Professor (Retd.), School of Computer &amp; Information Sciences<br />
                        Ex Pro Vice-Chancellor-1, University of Hyderabad
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--mint-accent))] font-semibold border border-[hsl(var(--mint-accent))]/40 rounded px-2 py-0.5">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 mt-3 leading-relaxed">
                    "Good that many are already present. The modified curriculum already includes
                    ML, DL, CV, NLP, GenAI, RL, MLOps, Cloud, Responsible AI and Agentic AI."
                  </p>
                  <div className="text-[11px] text-muted-foreground mt-3 mb-1 uppercase tracking-widest font-semibold">
                    Suggestions — five things every graduate must do:
                  </div>
                  <ol className="text-xs text-foreground/85 leading-relaxed list-decimal list-inside space-y-0.5">
                    <li>Build models</li>
                    <li>Deploy systems</li>
                    <li>Work with data</li>
                    <li>Use modern AI tools</li>
                    <li>Solve real business / industry problems</li>
                  </ol>
                  <p className="text-[11px] text-primary italic mt-3">
                    Recommendation: I approve these changes.
                  </p>
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

          {showSemesterJump && (
            <>
              {/* Semester grid */}
              <div className="flex items-center gap-2 mb-3 mt-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Jump to Semester</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {reg.semesters.map((s) => {
                  const aiCount = s.courses.filter(c => c.ai || isAppliedAI(c)).length;
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
            </>
          )}

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
          <SemesterTable semester={semester} accent={accent} />
        </div>
      )}
    </div>
  );
}
