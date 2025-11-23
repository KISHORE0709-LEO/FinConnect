import { Button } from "./ui/button";
import { Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative z-10 pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-8 glow-border">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Financial Literacy Made Fun</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
          Learn Money. Live Smart.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Personalised financial learning for <span className="text-primary font-semibold">Kids</span>, 
          <span className="text-primary font-semibold"> Students</span> & 
          <span className="text-primary font-semibold"> Professionals</span> — in the way THEY understand.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border text-lg px-8 py-6 font-semibold"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Start Learning
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 py-6 font-semibold"
          >
            Track My Finances
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
