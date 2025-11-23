import { Card } from "./ui/card";
import { Baby, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const zones = [
  {
    icon: Baby,
    title: "Kid Zone",
    description: "Learn money through fun games",
    color: "from-primary/20 to-primary/5",
    emoji: "🧒",
    path: "/kid-zone",
  },
  {
    icon: GraduationCap,
    title: "Student Zone",
    description: "Visual learning to manage expenses & savings",
    color: "from-primary/20 to-primary/5",
    emoji: "🎓",
    path: "/student-zone",
  },
  {
    icon: Briefcase,
    title: "Professional Zone",
    description: "Master finances through insights & simulations",
    color: "from-primary/20 to-primary/5",
    emoji: "👔",
    path: "/professional-zone",
  },
];

const ZoneCards = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 glow-text">
          Choose Your Learning Path
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Select the zone that matches your journey
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {zones.map((zone, index) => (
            <Link key={index} to={zone.path}>
              <Card
                className="relative group cursor-pointer bg-card border-primary/30 hover:border-primary transition-all duration-300 overflow-hidden glow-card hover:scale-105 p-8"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
                    {zone.emoji}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-3 text-foreground">
                    {zone.title}
                  </h3>
                  
                  <p className="text-center text-muted-foreground mb-6">
                    {zone.description}
                  </p>
                  
                  <div className="flex justify-center items-center text-primary group-hover:translate-x-2 transition-transform">
                    <span className="font-semibold mr-2">Enter Zone</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZoneCards;
