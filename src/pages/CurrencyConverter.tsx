import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { CurrencyConverter as CurrencyWidget } from "@/components/CurrencyConverter";
import { CountryCurrencyConverter } from "@/components/financial/CountryCurrencyConverter";

const CurrencyConverter = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Header />
      
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
              💱 Currency Converter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time currency conversion with live exchange rates
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <CurrencyWidget />
              
              <Card className="bg-card/80 border-primary/30 p-6 glow-card">
                <h3 className="text-xl font-bold mb-4 glow-text">Market Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">USD/INR Trend</span>
                    <span className="text-primary font-mono">↗ +0.12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">EUR/INR Trend</span>
                    <span className="text-red-400 font-mono">↘ -0.08%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">GBP/INR Trend</span>
                    <span className="text-primary font-mono">↗ +0.25%</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <CountryCurrencyConverter />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CurrencyConverter;