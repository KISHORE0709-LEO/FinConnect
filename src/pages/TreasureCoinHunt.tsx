import { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const TreasureCoinHunt = () => {
  const [player, setPlayer] = useState({ x: 100, y: 500 });
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [targetItem, setTargetItem] = useState({ name: 'Cupcake', price: 12, emoji: '🧁' });
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [challengeType, setChallengeType] = useState('');
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [walls, setWalls] = useState([]);
  const [badges, setBadges] = useState([]);
  const [stars, setStars] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [showRewards, setShowRewards] = useState(false);
  const [newBadges, setNewBadges] = useState([]);

  // Generate walls
  const generateWalls = useCallback(() => {
    const newWalls = [
      { x: 200, y: 150, width: 100, height: 20 },
      { x: 400, y: 250, width: 20, height: 100 },
      { x: 600, y: 200, width: 80, height: 20 },
      { x: 300, y: 400, width: 150, height: 20 }
    ];
    setWalls(newWalls);
  }, []);

  // Generate random coins and notes
  const generateCoins = useCallback(() => {
    const newCoins = [];
    const coinValues = [1, 2, 5, 10];
    const noteValues = [10, 20, 50, 100, 200, 500];
    
    for (let i = 0; i < 10; i++) {
      let x, y, validPosition = false;
      let attempts = 0;
      
      while (!validPosition && attempts < 50) {
        x = Math.random() * 550 + 75;
        y = Math.random() * 350 + 150;
        
        // Check wall collision and shopping goal area
        const inWall = walls.some(wall => 
          x > wall.x - 40 && x < wall.x + wall.width + 40 &&
          y > wall.y - 40 && y < wall.y + wall.height + 40
        );
        
        // Avoid shopping goal area (top-right corner)
        const inGoalArea = x > 750 && y < 120;
        
        validPosition = !inWall && !inGoalArea;
        attempts++;
      }
      
      // Randomly choose coin or note
      const isCoin = Math.random() < 0.6; // 60% coins, 40% notes
      const value = isCoin 
        ? coinValues[Math.floor(Math.random() * coinValues.length)]
        : noteValues[Math.floor(Math.random() * noteValues.length)];
      
      newCoins.push({
        id: i,
        x: x || Math.random() * 550 + 75,
        y: y || Math.random() * 350 + 150,
        value: value,
        type: isCoin ? 'coin' : 'note',
        collected: false
      });
    }
    setCoins(newCoins);
  }, [walls]);

  // Initialize game
  useEffect(() => {
    generateWalls();
  }, [generateWalls]);
  
  useEffect(() => {
    if (walls.length > 0) {
      generateCoins();
    }
  }, [walls, generateCoins]);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setLives(lives - 1);
      setTimeLeft(60);
    }
  }, [timeLeft, lives]);

  // Handle keyboard movement with wall collision
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showQuiz) return;
      
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        switch(e.key) {
          case 'ArrowUp':
            newY = Math.max(120, prev.y - 20);
            break;
          case 'ArrowDown':
            newY = Math.min(550, prev.y + 20);
            break;
          case 'ArrowLeft':
            newX = Math.max(50, prev.x - 20);
            break;
          case 'ArrowRight':
            newX = Math.min(750, prev.x + 20);
            break;
        }
        
        // Check wall collision
        const playerSize = 32;
        const collision = walls.some(wall => 
          newX < wall.x + wall.width &&
          newX + playerSize > wall.x &&
          newY < wall.y + wall.height &&
          newY + playerSize > wall.y
        );
        
        if (collision) {
          return prev; // Don't move if collision
        }
        
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showQuiz, walls]);

  // Check coin collision
  useEffect(() => {
    coins.forEach(coin => {
      if (!coin.collected && 
          Math.abs(player.x - coin.x) < 40 && 
          Math.abs(player.y - coin.y) < 40) {
        setCurrentCoin(coin);
        generateChallenge(coin);
        setShowQuiz(true);
      }
    });
  }, [player, coins]);

  // Generate buying challenge
  const generateChallenge = (coin) => {
    setChallengeType('buying');
    
    const items = [
      { name: 'Candy', price: 1, emoji: '🍬' },
      { name: 'Cookie', price: 2, emoji: '🍪' },
      { name: 'Banana', price: 3, emoji: '🍌' },
      { name: 'Candy', price: 5, emoji: '🍭' },
      { name: 'Apple', price: 8, emoji: '🍎' },
      { name: 'Juice', price: 10, emoji: '🧃' },
      { name: 'Ice Cream', price: 15, emoji: '🍦' },
      { name: 'Chocolate', price: 20, emoji: '🍫' },
      { name: 'Cake', price: 50, emoji: '🍰' },
      { name: 'Pizza', price: 100, emoji: '🍕' }
    ];
    
    const affordableItems = items.filter(item => item.price <= coin.value);
    const expensiveItems = items.filter(item => item.price > coin.value);
    
    if (affordableItems.length === 0) {
      // If no affordable items, show cheapest items
      const cheapItems = items.filter(item => item.price <= 5);
      setOptions(cheapItems.slice(0, 3));
    } else {
      const correctItem = affordableItems[Math.floor(Math.random() * affordableItems.length)];
      const wrongItems = expensiveItems.slice(0, 2);
      
      // Ensure we have 3 unique options
      const allOptions = [correctItem, ...wrongItems].filter((item, index, arr) => 
        arr.findIndex(i => i.name === item.name && i.price === item.price) === index
      );
      
      while (allOptions.length < 3 && expensiveItems.length > allOptions.length - 1) {
        const additionalWrong = expensiveItems[allOptions.length - 1];
        if (!allOptions.find(opt => opt.name === additionalWrong.name && opt.price === additionalWrong.price)) {
          allOptions.push(additionalWrong);
        }
      }
      
      setOptions(allOptions.slice(0, 3).sort(() => Math.random() - 0.5));
    }
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption.price <= currentCoin.value;
    
    if (isCorrect) {
      setScore(score + 10);
      setInventory([...inventory, currentCoin]);
      setCoins(coins.map(c => c.id === currentCoin.id ? {...c, collected: true} : c));
      checkBadges();
    } else {
      setLives(lives - 1);
    }
    
    setShowQuiz(false);
    setCurrentCoin(null);
  };

  const checkBadges = () => {
    const earnedBadges = [];
    
    // Perfect Streak Badge
    if (lives === 3 && !badges.includes('Perfect Streak')) {
      earnedBadges.push('Perfect Streak');
      setStars(stars + 1);
    }
    
    // Fast Thinker Badge
    if (timeLeft > 45 && !badges.includes('Fast Thinker')) {
      earnedBadges.push('Fast Thinker');
      setStars(stars + 1);
    }
    
    // Smart Saver Badge
    const totalValue = inventory.reduce((sum, coin) => sum + coin.value, 0) + currentCoin.value;
    if (totalValue === targetItem.price && !badges.includes('Smart Saver')) {
      earnedBadges.push('Smart Saver');
      setStars(stars + 2);
    }
    
    if (earnedBadges.length > 0) {
      setBadges([...badges, ...earnedBadges]);
      setNewBadges(earnedBadges);
      setShowRewards(true);
    }
  };

  const checkWin = () => {
    const totalValue = inventory.reduce((sum, coin) => sum + coin.value, 0);
    return totalValue >= targetItem.price;
  };

  const resetGame = () => {
    setPlayer({ x: 100, y: 500 });
    setScore(0);
    setLives(3);
    setInventory([]);
    setTimeLeft(60);
    const items = [
      { name: 'Cupcake', price: 12, emoji: '🧁' },
      { name: 'Toy Car', price: 25, emoji: '🚗' },
      { name: 'Book', price: 18, emoji: '📚' },
      { name: 'Ball', price: 15, emoji: '⚽' }
    ];
    setTargetItem(items[Math.floor(Math.random() * items.length)]);
    generateWalls();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      {/* Game Header */}
      <div className="absolute top-24 left-4 right-4 z-20 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline" className="bg-black/50 text-white border-green-500">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/kid-zone">
              <Button variant="outline" className="bg-black/50 text-white border-green-500">
                Kid Zone
              </Button>
            </Link>
          </div>
          
          <Card className="bg-black/70 border-green-500 p-4">
            <div className="flex gap-6 text-white">
              <span>Score: {score}</span>
              <span>Lives: {lives}</span>
              <span>Level: {level}</span>
              <span>Buy: {targetItem.emoji} {targetItem.name}</span>
              <span>Time: {timeLeft}s</span>
            </div>
          </Card>
          
          <Button onClick={resetGame} variant="outline" className="bg-black/50 text-white border-green-500">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen pt-40 flex justify-center">
        <div className="relative w-[1000px] h-[600px] bg-card/30 border border-primary/30 rounded-lg mt-8">
          {/* Shopping Goal */}
          <div className="absolute top-4 right-4 bg-primary/20 border-2 border-primary rounded-lg p-4 text-center glow-border">
            <div className="text-primary font-bold text-lg">Shopping Goal</div>
            <div className="text-3xl mb-1">{targetItem.emoji}</div>
            <div className="text-foreground text-base">{targetItem.name} - ₹{targetItem.price}</div>
            <div className="text-primary text-base">You have: ₹{inventory.reduce((sum, coin) => sum + coin.value, 0)}</div>
          </div>

          {/* Player */}
          <div 
            className="absolute w-12 h-12 bg-primary rounded-full border-4 border-primary-foreground transition-all duration-200 glow-border"
            style={{ left: player.x, top: player.y }}
          >
            <div className="text-primary-foreground text-lg text-center leading-8">👤</div>
          </div>

          {/* Walls */}
          {walls.map((wall, i) => (
            <div
              key={i}
              className="absolute bg-muted border-2 border-primary/50"
              style={{ 
                left: wall.x, 
                top: wall.y, 
                width: wall.width, 
                height: wall.height 
              }}
            />
          ))}

          {/* Coins and Notes */}
          {coins.map(coin => !coin.collected && (
            <div
              key={coin.id}
              className={`absolute border-2 flex items-center justify-center text-lg font-bold animate-pulse glow-border ${
                coin.type === 'coin' 
                  ? 'w-16 h-16 bg-yellow-400 rounded-full border-yellow-600 text-yellow-900' 
                  : 'w-20 h-12 bg-green-400 rounded border-green-600 text-green-900'
              }`}
              style={{ left: coin.x, top: coin.y }}
            >
              ₹{coin.value}
            </div>
          ))}

        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-4 bg-card border border-primary/30 rounded-lg p-4 glow-card">
          <div className="text-sm mb-2 text-foreground">Controls:</div>
          <div className="grid grid-cols-3 gap-1 w-24">
            <div></div>
            <ArrowUp className="w-6 h-6 mx-auto text-primary" />
            <div></div>
            <ArrowLeft className="w-6 h-6 text-primary" />
            <ArrowDown className="w-6 h-6 mx-auto text-primary" />
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Inventory & Rewards */}
        <div className="absolute bottom-4 right-4 bg-card border border-primary/30 rounded-lg p-4 glow-card">
          <div className="text-sm mb-2 text-foreground">Inventory:</div>
          <div className="flex gap-2 flex-wrap max-w-40 mb-3">
            {inventory.map((coin, i) => (
              <div key={i} className={`flex items-center justify-center text-sm font-bold glow-border ${
                coin.type === 'coin' 
                  ? 'w-10 h-10 bg-yellow-400 rounded-full text-yellow-900' 
                  : 'w-12 h-8 bg-green-400 rounded text-green-900'
              }`}>
                ₹{coin.value}
              </div>
            ))}
          </div>
          
          <div className="border-t border-primary/30 pt-2">
            <div className="text-xs text-primary">⭐ Stars: {stars}</div>
            <div className="text-xs text-accent">🏅 Badges: {badges.length}</div>
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      {showQuiz && currentCoin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-8 text-center max-w-md">
            <h3 className="text-2xl font-bold text-foreground mb-4 glow-text">
              What can you buy with this coin?
            </h3>
            
            <div className={`flex items-center justify-center text-2xl font-bold mx-auto mb-4 glow-border ${
              currentCoin?.type === 'coin' 
                ? 'w-24 h-24 bg-yellow-400 rounded-full text-yellow-900' 
                : 'w-28 h-20 bg-green-400 rounded text-green-900'
            }`}>
              ₹{currentCoin?.value}
            </div>
            
            <div className="grid gap-3 mb-4">
              {options.map((option, i) => (
                <Button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="bg-primary/20 text-foreground hover:bg-primary/40 border border-primary/30 p-4 text-lg"
                >
                  {option.emoji} {option.name} — ₹{option.price}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Win/Lose Messages */}
      {checkWin() && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-4 glow-text">🏆 Level Complete!</h3>
            <p className="text-foreground mb-4">You bought the {targetItem.emoji} {targetItem.name}!</p>
            
            <div className="mb-6">
              <p className="text-primary text-lg mb-2">⭐ Stars Earned: {stars}</p>
              {badges.length > 0 && (
                <div className="mb-4">
                  <p className="text-accent mb-2">🏅 Your Badges:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {badges.map((badge, i) => (
                      <span key={i} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <Button onClick={() => {
                const currentCompleted = parseInt(localStorage.getItem('kidZoneCompleted') || '0');
                localStorage.setItem('kidZoneCompleted', Math.max(currentCompleted, 1).toString());
                window.location.href = '/kid-zone';
              }} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Back to Kid Zone
              </Button>
              <Button onClick={resetGame} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border">
                Play Again
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Rewards Modal */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4 glow-text">🎉 New Rewards!</h3>
            {newBadges.map((badge, i) => (
              <div key={i} className="mb-4">
                <div className="text-4xl mb-2">🏅</div>
                <p className="text-accent font-bold">{badge} Badge Earned!</p>
              </div>
            ))}
            <Button onClick={() => setShowRewards(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue Playing
            </Button>
          </Card>
        </div>
      )}

      {(lives <= 0 || timeLeft <= 0) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-destructive glow-card p-8 text-center">
            <h3 className="text-3xl font-bold text-destructive mb-4">💀 Game Over!</h3>
            <p className="text-foreground mb-4">Final Score: {score}</p>
            <p className="text-foreground mb-4">{timeLeft <= 0 ? 'Time ran out!' : 'No lives left!'}</p>
            <Button onClick={resetGame} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Try Again
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TreasureCoinHunt;