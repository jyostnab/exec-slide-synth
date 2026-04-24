import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CurriculumLayout from "./components/CurriculumLayout";
import RegulationPage from "./pages/RegulationPage";
import Overview from "./pages/Overview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<CurriculumLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/r/:regId" element={<RegulationPage />} />
            <Route path="/r/:regId/:semId" element={<RegulationPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
