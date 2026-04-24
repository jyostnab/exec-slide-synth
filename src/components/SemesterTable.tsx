import { Course, Semester } from "@/data/curriculum";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const cell = (v: unknown) => (v === undefined || v === '' ? '–' : String(v));

export function SemesterTable({ semester, accent }: { semester: Semester; accent: string }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border/60">
        <div className="min-w-0">
          <div className={cn("text-[10px] tracking-widest uppercase font-semibold", accent)}>
            {semester.label}
          </div>
          {semester.notes && (
            <div className="text-xs text-muted-foreground mt-0.5">{semester.notes}</div>
          )}
        </div>
        <div className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold border", accent, "border-current/30")}>
          {semester.totalCredits} Credits
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 sm:px-5 py-2 font-medium w-10">#</th>
              <th className="px-2 py-2 font-medium">Course</th>
              <th className="px-2 py-2 font-medium hidden md:table-cell">Category</th>
              <th className="px-2 py-2 font-medium text-center">L</th>
              <th className="px-2 py-2 font-medium text-center">T</th>
              <th className="px-2 py-2 font-medium text-center">P</th>
              <th className="px-2 py-2 font-medium text-center hidden lg:table-cell">SL</th>
              <th className="px-3 sm:px-5 py-2 font-medium text-center">C</th>
            </tr>
          </thead>
          <tbody>
            {semester.courses.map((c: Course, i) => (
              <tr
                key={i}
                className={cn(
                  "border-t border-border/40 transition-colors hover:bg-secondary/40",
                  c.ai && "bg-[hsl(var(--ai-track)/0.04)]"
                )}
              >
                <td className="px-4 sm:px-5 py-3 text-muted-foreground tabular-nums">{i + 1}</td>
                <td className="px-2 py-3">
                  <div className="flex items-start gap-2">
                    {c.ai && (
                      <Star className="h-3.5 w-3.5 mt-0.5 text-[hsl(var(--ai-track))] shrink-0 fill-current" />
                    )}
                    <div className="min-w-0">
                      <div className={cn("font-medium leading-snug", c.ai && "text-[hsl(var(--ai-track))]")}>
                        {c.title}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                        {c.code && (
                          <span className="text-[10px] tracking-wider uppercase text-muted-foreground/80">
                            {c.code}
                          </span>
                        )}
                        {c.highlight && (
                          <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--violet-accent))]">
                            {c.highlight}
                          </span>
                        )}
                        <span className="md:hidden text-[10px] text-muted-foreground">{c.category}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-xs text-muted-foreground hidden md:table-cell">{c.category}</td>
                <td className="px-2 py-3 text-center text-muted-foreground tabular-nums">{cell(c.L)}</td>
                <td className="px-2 py-3 text-center text-muted-foreground tabular-nums">{cell(c.T)}</td>
                <td className="px-2 py-3 text-center text-muted-foreground tabular-nums">{cell(c.P)}</td>
                <td className="px-2 py-3 text-center text-muted-foreground tabular-nums hidden lg:table-cell">{cell(c.SL)}</td>
                <td className={cn(
                  "px-3 sm:px-5 py-3 text-center font-semibold tabular-nums",
                  c.ai ? "text-[hsl(var(--ai-track))]" : "text-foreground"
                )}>
                  {c.C}
                </td>
              </tr>
            ))}
            <tr className="border-t border-border bg-secondary/40">
              <td colSpan={7} className="px-4 sm:px-5 py-3 text-right text-xs uppercase tracking-widest text-muted-foreground">
                Total Credits
              </td>
              <td className={cn("px-3 sm:px-5 py-3 text-center font-bold tabular-nums", accent)}>
                {semester.totalCredits}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
