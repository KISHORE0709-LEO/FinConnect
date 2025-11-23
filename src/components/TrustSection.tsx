import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    text: "No bank login required",
  },
  {
    icon: Shield,
    text: "SMS-only analysis",
  },
  {
    icon: Lock,
    text: "Your data stays on your device",
  },
  {
    icon: Eye,
    text: "100% privacy protected",
  },
];

const TrustSection = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/80 border-primary/30 p-8 md:p-12 glow-card backdrop-blur-sm text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 glow-border">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">
            Your Trust. Our Priority.
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We take your privacy seriously. FinConnect uses bank-grade encryption 
            and never stores your sensitive information.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium text-left">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="border-primary/50 text-foreground hover:bg-primary/10"
          >
            How FinConnect keeps you safe
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default TrustSection;
