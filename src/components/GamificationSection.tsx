import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Trophy, Target, Zap, Award } from "lucide-react";
import { Progress } from "./ui/progress";

const badges = [
  { icon: "💰", name: "Saver" },
  { icon: "📈", name: "Investor" },
  { icon: "👑", name: "Budget King" },
  { icon: "🎯", name: "No Impulse Week" },
];

const challenges = [
  "Save ₹200 this week",
  "Reduce impulse buys",
  "Track snacks spend",
];

const GamificationSection = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 glow-text">
            Level Up Your Financial Skills
          </h2>
          <p className="text-muted-foreground text-lg">
            Track progress, complete challenges, and earn badges
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Financial Health Score */}
          <Card className="bg-card border-primary/30 p-8 glow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Financial Health Score</h3>
                <p className="text-sm text-muted-foreground">Keep improving!</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall Score</span>
                  <span className="text-sm font-semibold text-primary">72/100</span>
                </div>
                <Progress value={72} className="h-3" />
              </div>
              
              <div className="pt-4 border-t border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Weekly Challenges
                </h4>
                <ul className="space-y-2">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          
          {/* Badges */}
          <Card className="bg-card border-primary/30 p-8 glow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Badges Earned</h3>
                <p className="text-sm text-muted-foreground">Your achievements</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <span className="text-4xl">{badge.icon}</span>
                  <span className="text-sm font-semibold text-foreground">{badge.name}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
              <Award className="mr-2 h-4 w-4" />
              Earn More Badges
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
