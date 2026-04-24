import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function CurriculumLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center gap-2 border-b border-border/60 px-3 sticky top-0 z-20 bg-background/70 backdrop-blur">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="h-4 w-px bg-border mx-1" />
            <h1 className="font-serif text-sm text-foreground">
              AIML Curriculum — R22 to R25
            </h1>
            <div className="ml-auto text-[11px] text-muted-foreground tracking-wider uppercase">
              Board of Studies · 2026
            </div>
          </header>
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
