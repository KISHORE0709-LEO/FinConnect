import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Store, Briefcase, ShoppingBag, Compass, Trophy, Wallet, Building, Plane, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const games = [
  {
    title: "Market Money Quest",
    icon: Store,
    description: "Shop in a virtual marketplace and select correct coins to pay for items",
    concept: "Money Recognition & Value",
    xp: 100,
    color: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    title: "Opportunity City",
    icon: Briefcase,
    description: "Run different mini-jobs and earn coins based on your performance",
    concept: "Earning & Effort",
    xp: 150,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Shop Smart Challenge",
    icon: ShoppingBag,
    description: "Make wise purchase decisions with limited coins",
    concept: "Spending Wisely",
    xp: 120,
    color: "from-green-500/20 to-green-500/5",
  },
  {
    title: "Adventure Budget Maze",
    icon: Compass,
    description: "Navigate a maze choosing items wisely to complete objectives",
    concept: "Needs vs Wants",
    xp: 130,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Treasure Chest Tracker",
    icon: Trophy,
    description: "Save coins to unlock rewards while tracking progress on a treasure map",
    concept: "Saving & Goal Setting",
    xp: 140,
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Budget Builder",
    icon: Wallet,
    description: "Allocate coins to spending, saving, and sharing categories",
    concept: "Budgeting & Allocation",
    xp: 160,
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Bank Clerk Adventure",
    icon: Building,
    description: "Manage a virtual bank with deposits, loans, and financial decisions",
    concept: "Banking & Loans",
    xp: 180,
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    title: "Travel Budget Challenge",
    icon: Plane,
    description: "Plan a virtual road trip and calculate all expenses within budget",
    concept: "Responsible Spending",
    xp: 150,
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    title: "Community Helper",
    icon: Heart,
    description: "Donate virtual coins to causes and see your positive impact",
    concept: "Sharing & Charity",
    xp: 110,
    color: "from-red-500/20 to-red-500/5",
  },
  {
    title: "Achievement Board",
    icon: Award,
    description: "Earn stars, XP, and badges for smart financial choices",
    concept: "Rewards & Motivation",
    xp: 200,
    color: "from-primary/20 to-primary/5",
  },
];

const StudentZone = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Header />
      
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-6 glow-border">
              <span className="text-4xl">🎓</span>
              <span className="text-sm text-muted-foreground">Grades 5-8 (Ages 11-14)</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
              Student Zone
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visual learning to manage expenses, savings, and budgeting with real-world simulations.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-primary/30 p-6 glow-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,250</div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </Card>
            <Card className="bg-card border-primary/30 p-6 glow-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">4/10</div>
              <div className="text-sm text-muted-foreground">Games Completed</div>
            </Card>
            <Card className="bg-card border-primary/30 p-6 glow-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">Level 5</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="bg-card border-primary/30 p-6 mb-12 glow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Level 5 Progress</h3>
                <p className="text-sm text-muted-foreground">350 XP until Level 6</p>
              </div>
              <span className="text-primary font-bold">1,250 / 1,600 XP</span>
            </div>
            <Progress value={78} className="h-3" />
          </Card>

          {/* Games Grid */}
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Games</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <span className="text-xs px-3 py-1 rounded-full bg-background/50 border border-primary/30 text-primary font-semibold">
                          +{game.xp} XP
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
                          Start
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beginner">
              <div className="text-center py-12 text-muted-foreground">
                Filter coming soon - showing all games
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="text-center py-12 text-muted-foreground">
                Filter coming soon - showing all games
              </div>
            </TabsContent>
          </Tabs>

          {/* Achievements */}
          <Card className="bg-card border-primary/30 p-8 glow-card">
            <h3 className="text-2xl font-bold mb-6 glow-text text-center">Recent Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {["💰", "📊", "🎯", "🏆", "⭐"].map((emoji, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl glow-border">
                    {emoji}
                  </div>
                  <span className="text-xs text-center font-semibold">Achievement {i + 1}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentZone;
