import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function CurriculumLayout() {
  const location = useLocation();
  const noSidebar = location.pathname === "/" || location.pathname === "/overview";

  // Home & Overview: minimal layout with no sidebar
  if (noSidebar) {
    return (
      <div className="min-h-screen flex flex-col w-full">
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
          </header>
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
