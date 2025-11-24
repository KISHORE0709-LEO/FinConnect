import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KidZone from "./pages/KidZone";
import StudentZone from "./pages/StudentZone";
import ProfessionalZone from "./pages/ProfessionalZone";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TreasureCoinHunt from "./pages/TreasureCoinHunt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kid-zone" element={<KidZone />} />
          <Route path="/student-zone" element={<StudentZone />} />
          <Route path="/professional-zone" element={<ProfessionalZone />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/treasure-coin-hunt" element={<TreasureCoinHunt />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
