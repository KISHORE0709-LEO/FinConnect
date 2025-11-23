import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { Coins, Sparkles, ShoppingCart, Scale, PiggyBank, Target, Calculator, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const games = [
  {
    title: "Treasure Coin Hunt",
    icon: Coins,
    description: "Explore a virtual treasure chest and match coins to their correct values",
    concept: "Money Recognition",
    level: "Beginner",
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Chore Adventure",
    icon: Sparkles,
    description: "Complete virtual chores to earn coins and learn about work and reward",
    concept: "Earning",
    level: "Beginner",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Market Dash",
    icon: ShoppingCart,
    description: "Buy items from a virtual market and practice making correct payments",
    concept: "Spending",
    level: "Easy",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    title: "Priority Island",
    icon: Scale,
    description: "Choose necessary items first, then fun items to complete challenges",
    concept: "Needs vs Wants",
    level: "Medium",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Piggy Bank Quest",
    icon: PiggyBank,
    description: "Deposit coins into your piggy bank to unlock rewards and special items",
    concept: "Saving",
    level: "Easy",
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    title: "Treasure Goal Tree",
    icon: Target,
    description: "Set simple goals and track progress on a colorful tree chart",
    concept: "Goal Setting",
    level: "Medium",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Shopkeeper Challenge",
    icon: Calculator,
    description: "Calculate totals and change while buying multiple items",
    concept: "Counting & Math",
    level: "Medium",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Star Collector",
    icon: Star,
    description: "Earn stars, badges, and stickers for completing financial tasks",
    concept: "Rewards & Motivation",
    level: "All Levels",
    color: "from-primary/20 to-primary/5",
  },
];

const KidZone = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-6 glow-border">
              <span className="text-4xl">🧒</span>
              <span className="text-sm text-muted-foreground">Grades K-5 (Ages 5-11)</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
              Kid Zone
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn money through fun games! Master coins, saving, and smart spending.
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="bg-card border-primary/30 p-6 mb-12 glow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Your Learning Progress</h3>
              <span className="text-primary font-bold">2/8 Games Completed</span>
            </div>
            <Progress value={25} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">Keep playing to unlock more badges!</p>
          </Card>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {games.map((game, index) => (
              <Card
                key={index}
                className="group relative bg-card border-primary/30 hover:border-primary transition-all duration-300 overflow-hidden glow-card hover:scale-105 p-6 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center glow-border">
                      <game.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-background/50 border border-primary/30">
                      {game.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {game.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-semibold">
                      {game.concept}
                    </span>
                    <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
                      Play Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Achievement Showcase */}
          <Card className="bg-card border-primary/30 p-8 glow-card text-center">
            <h3 className="text-2xl font-bold mb-6 glow-text">Your Badges</h3>
            <div className="flex justify-center gap-8 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl glow-border">
                  🏆
                </div>
                <span className="text-sm font-semibold">First Win</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-50">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl">
                  🌟
                </div>
                <span className="text-sm">Locked</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-50">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl">
                  💎
                </div>
                <span className="text-sm">Locked</span>
              </div>
            </div>
            <p className="text-muted-foreground">Complete more games to unlock special badges!</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default KidZone;
