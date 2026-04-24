import { NavLink, useLocation } from "react-router-dom";
import { GraduationCap, Sparkles, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { REGULATIONS } from "@/data/curriculum";
import { cn } from "@/lib/utils";

const accentDot: Record<string, string> = {
  cyan: "bg-primary",
  amber: "bg-[hsl(var(--ai-track))]",
  violet: "bg-[hsl(var(--violet-accent))]",
  mint: "bg-[hsl(var(--mint-accent))]",
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const path = location.pathname;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border/70">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="h-8 w-8 rounded-md bg-primary/15 border border-primary/30 grid place-items-center">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-serif text-sm leading-tight text-foreground">VFSTR · CSE-AIML</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Curriculum Viewer
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {REGULATIONS.map((reg) => {
          const isActiveReg = path.startsWith(`/r/${reg.id}`);
          return (
            <SidebarGroup key={reg.id}>
              <SidebarGroupLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/80">
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-2", accentDot[reg.accent])} />
                {reg.code}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={path === `/r/${reg.id}`}>
                      <NavLink to={`/r/${reg.id}`} end>
                        <Sparkles className="h-4 w-4" />
                        {!collapsed && <span className="truncate">Overview</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {!collapsed && isActiveReg && (
                    <SidebarMenuSub>
                      {reg.semesters.map((sem) => (
                        <SidebarMenuSubItem key={sem.id}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={path === `/r/${reg.id}/${sem.id}`}
                          >
                            <NavLink to={`/r/${reg.id}/${sem.id}`}>
                              <ChevronRight className="h-3 w-3 opacity-60" />
                              <span className="truncate">{sem.label.replace(/^.+ — /, '')}</span>
                              <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                                {sem.totalCredits}
                              </span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
