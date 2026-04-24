import { NavLink, useLocation } from "react-router-dom";
import { GraduationCap, Sparkles, ChevronRight, Home, Compass } from "lucide-react";
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
          <div className="h-9 w-9 rounded-md bg-primary/15 border border-primary/30 grid place-items-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-serif text-base leading-tight text-foreground">VFSTR · CSE-AIML</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Curriculum Viewer
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path === "/"} className="text-sm">
                  <NavLink to="/" end>
                    <Home className="h-4 w-4" />
                    {!collapsed && <span>Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path === "/overview"} className="text-sm">
                  <NavLink to="/overview">
                    <Compass className="h-4 w-4" />
                    {!collapsed && <span>Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {[...REGULATIONS].reverse().map((reg) => {
          const isActiveReg = path.startsWith(`/r/${reg.id}`);
          return (
            <SidebarGroup key={reg.id}>
              <SidebarGroupLabel className="text-xs tracking-widest uppercase text-foreground/80 font-semibold h-8">
                <span className={cn("inline-block h-2 w-2 rounded-full mr-2", accentDot[reg.accent])} />
                {reg.code}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={path === `/r/${reg.id}`} className="text-sm">
                      <NavLink to={`/r/${reg.id}`} end>
                        <Sparkles className="h-4 w-4" />
                        {!collapsed && <span className="truncate">Overview</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {!collapsed && isActiveReg && (
                    <SidebarMenuSub>
                      {reg.semesters.map((sem) => {
                        // Convert "I Year — I Semester" → "I Yr - I Sem"
                        const shortLabel = sem.label
                          .replace(/\s*Year\s*/i, ' Yr ')
                          .replace(/\s*Semester\s*/i, ' Sem')
                          .replace(/—/g, '-')
                          .replace(/\s+/g, ' ')
                          .trim();
                        return (
                          <SidebarMenuSubItem key={sem.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={path === `/r/${reg.id}/${sem.id}`}
                              className="text-sm h-8"
                            >
                              <NavLink to={`/r/${reg.id}/${sem.id}`}>
                                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                                <span className="truncate">{shortLabel}</span>
                                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                                  {sem.totalCredits}
                                </span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
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
