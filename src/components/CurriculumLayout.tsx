import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import vignanLogo from "@/assets/vignan-logo.png";

export default function CurriculumLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Home: minimal layout with no sidebar
  if (isHome) {
    return (
      <div className="min-h-screen flex flex-col w-full">
        <header className="h-14 flex items-center gap-3 border-b border-border/60 px-3 sticky top-0 z-20 bg-background/80 backdrop-blur">
          <img
            src={vignanLogo}
            alt="Vignan's Foundation for Science, Technology & Research"
            className="h-9 w-auto object-contain bg-white/95 rounded px-2 py-0.5"
          />
          <div className="hidden sm:block h-5 w-px bg-border mx-1" />
          <h1 className="hidden sm:block font-serif text-sm text-foreground">
            B.Tech CSE-AIML — Curriculum
          </h1>
        </header>
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    );
  }

  // All other routes: sidebar layout
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border/60 px-3 sticky top-0 z-20 bg-background/80 backdrop-blur">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="h-5 w-px bg-border mx-1" />
            <img
              src={vignanLogo}
              alt="Vignan's Foundation for Science, Technology & Research"
              className="h-9 w-auto object-contain bg-white/95 rounded px-2 py-0.5"
            />
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <h1 className="hidden sm:block font-serif text-sm text-foreground">
              B.Tech CSE-AIML — Curriculum
            </h1>
          </header>
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
