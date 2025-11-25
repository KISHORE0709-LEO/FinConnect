import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home } from 'lucide-react';
import Header from '@/components/Header';

const houseRooms = [
  { name: 'Bedroom', x: 0, y: 0, width: 340, height: 500 },
  { name: 'Hall', x: 340, y: 0, width: 340, height: 500 },
  { name: 'Garden', x: 680, y: 0, width: 320, height: 500 }
];

const choresList = [
  { id: 1, room: 'Bedroom', type: 'simple', chore: 'Make Bed', icon: '🛏️', spot: { x: 100, y: 100 }, reward: 2 },
  { id: 2, room: 'Bedroom', type: 'medium', chore: 'Pick Toys', icon: '🧸', spot: { x: 120, y: 250 }, reward: 3 },
  { id: 3, room: 'Hall', type: 'simple', chore: 'Wipe Table', icon: '🧽', spot: { x: 370, y: 120 }, reward: 2 },
  { id: 4, room: 'Hall', type: 'big', chore: 'Feed Pet', icon: '🐶', spot: { x: 420, y: 320 }, reward: 4 },
  { id: 5, room: 'Garden', type: 'medium', chore: 'Water Plants', icon: '🌱', spot: { x: 775, y: 200 }, reward: 3 }
];

const shopItems = [
  { item: 'Hat', price: 10, unlockKey: 'hat', sprite: '🧢' },
  { item: 'Shirt', price: 15, unlockKey: 'shirt', sprite: '👕' },
  { item: 'Room Decor', price: 20, unlockKey: 'decor', sprite: '🖼️' }
];

const ChoreAdventure = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [player, setPlayer] = useState({ x: 70, y: 450 });
  const [coinCount, setCoinCount] = useState(() => Number(localStorage.getItem('choreCoins') || 0));
  const [completedChores, setCompletedChores] = useState([]);
  const [earnedItems, setEarnedItems] = useState(() => JSON.parse(localStorage.getItem('choreItems') || '[]'));
  const [showShop, setShowShop] = useState(false);
  const [shopMessage, setShopMessage] = useState('');
  const [nearChore, setNearChore] = useState(null);
  const [showReward, setShowReward] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(() => Number(localStorage.getItem('choreLevel') || 1));

  // Movement with arrow keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showInstructions || showShop || showCelebration) return;
      
      const speed = 20;
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        switch(e.key) {
          case 'ArrowUp': newY = Math.max(50, prev.y - speed); break;
          case 'ArrowDown': newY = Math.min(550, prev.y + speed); break;
          case 'ArrowLeft': newX = Math.max(50, prev.x - speed); break;
          case 'ArrowRight': newX = Math.min(950, prev.x + speed); break;
          case ' ': 
            if (nearChore) handleChoreComplete(nearChore);
            return prev;
        }
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nearChore, showInstructions, showShop, showCelebration]);

  // Check for nearby chores
  useEffect(() => {
    const nearby = choresList.find(chore => {
      if (completedChores.includes(chore.id)) return false;
      const distance = Math.sqrt(
        Math.pow(player.x - chore.spot.x, 2) + Math.pow(player.y - chore.spot.y, 2)
      );
      return distance < 80;
    });
    setNearChore(nearby);
  }, [player, completedChores]);

  const handleChoreComplete = (chore) => {
    const newCoins = coinCount + chore.reward;
    setCoinCount(newCoins);
    setCompletedChores([...completedChores, chore.id]);
    setShowReward({ chore: chore.chore, coins: chore.reward });
    localStorage.setItem('choreCoins', newCoins.toString());
    
    setTimeout(() => setShowReward(null), 2000);
  };

  const handleBuy = (item) => {
    if (coinCount >= item.price) {
      const newCoins = coinCount - item.price;
      setCoinCount(newCoins);
      setEarnedItems([...earnedItems, item.unlockKey]);
      setShopMessage(`You bought ${item.item}! 🎉`);
      localStorage.setItem('choreCoins', newCoins.toString());
      localStorage.setItem('choreItems', JSON.stringify([...earnedItems, item.unlockKey]));
    } else {
      setShopMessage('Earn more coins by doing chores! 💪');
    }
    setTimeout(() => setShopMessage(''), 2000);
  };

  // Level completion
  useEffect(() => {
    if (completedChores.length === 5) {
      setShowCelebration(true);
      const bonusCoins = coinCount + 10;
      setCoinCount(bonusCoins);
      localStorage.setItem('choreCoins', bonusCoins.toString());
      
      // Update progress in localStorage
      const progress = JSON.parse(localStorage.getItem('kidZoneProgress') || '{}');
      progress.choreAdventure = Math.min((progress.choreAdventure || 0) + 20, 100);
      localStorage.setItem('kidZoneProgress', JSON.stringify(progress));
      
      const newLevel = currentLevel + 1;
      setCurrentLevel(newLevel);
      localStorage.setItem('choreLevel', newLevel.toString());
    }
  }, [completedChores, coinCount, currentLevel]);

  const resetLevel = () => {
    setCompletedChores([]);
    setShowCelebration(false);
  };

  const goToKidZone = () => {
    navigate('/kid-zone');
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="bg-card border-primary glow-card p-8 max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-primary mb-6 glow-text">🏠 Chore Adventure 🏠</h1>
          <div className="text-foreground text-lg space-y-4 mb-8">
            <p>🎯 <strong>Goal:</strong> Help around the house and earn coins!</p>
            <p>🎮 <strong>Controls:</strong> Use arrow keys to move around</p>
            <p>⚡ <strong>Action:</strong> Press SPACE when near a chore to complete it</p>
            <p>💰 <strong>Rewards:</strong> Earn 2-4 coins per chore completed</p>
            <p>🛍️ <strong>Shop:</strong> Buy cool items with your earned coins</p>
            <p>🏆 <strong>Level Up:</strong> Complete all 5 chores to advance!</p>
          </div>
          <Button 
            onClick={() => setShowInstructions(false)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-xl glow-border"
          >
            Start Adventure! 🚀
          </Button>
        </Card>
      </div>
    );
  }

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
              <span>💰 Coins: {coinCount}</span>
              <span>🏆 Level: {currentLevel}</span>
              <span>✅ Chores: {completedChores.length}/5</span>
            </div>
          </Card>
          
          <Button 
            onClick={() => setShowShop(true)}
            variant="outline" 
            className="bg-black/50 text-white border-green-500"
          >
            🛍️ Shop
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen pt-40 flex justify-center">
        <div className="relative w-[1000px] h-[600px] bg-card/30 border border-primary/30 rounded-lg mt-8">
          {/* House Rooms */}
          {houseRooms.map((room, index) => (
            <div
              key={room.name}
              className="absolute border-2 border-primary/50 bg-card/20 glow-border"
              style={{
                left: room.x,
                top: room.y,
                width: room.width,
                height: room.height
              }}
            >
              <div className="text-primary font-bold text-center p-2">{room.name}</div>
            </div>
          ))}

          {/* Chores */}
          {choresList.map(chore => {
            const isCompleted = completedChores.includes(chore.id);
            const isNear = nearChore?.id === chore.id;
            
            return (
              <div
                key={chore.id}
                className={`absolute w-16 h-16 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-2xl transition-all duration-300 glow-border ${
                  isCompleted ? 'opacity-30 bg-muted' : isNear ? 'animate-pulse scale-125 bg-primary/40' : ''
                }`}
                style={{
                  left: chore.spot.x - 32,
                  top: chore.spot.y - 32
                }}
              >
                {chore.icon}
                {isNear && !isCompleted && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-primary whitespace-nowrap bg-black/70 px-2 py-1 rounded">
                    Press SPACE
                  </div>
                )}
              </div>
            );
          })}

          {/* Player */}
          <div
            className="absolute w-12 h-12 bg-primary rounded-full border-4 border-primary-foreground transition-all duration-200 glow-border flex items-center justify-center"
            style={{
              left: player.x - 24,
              top: player.y - 24
            }}
          >
            <div className="text-primary-foreground text-lg">🧑</div>
          </div>
        </div>
      </div>

      {/* Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-6 text-center animate-bounce">
            <div className="text-2xl text-primary mb-2 glow-text">Great Job! 🎉</div>
            <div className="text-xl text-foreground">{showReward.chore} completed!</div>
            <div className="text-lg text-accent">+{showReward.coins} coins! 💰</div>
          </Card>
        </div>
      )}

      {/* Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center glow-text">🛍️ Chore Shop</h2>
            <div className="space-y-3">
              {shopItems.map(item => (
                <div key={item.unlockKey} className="flex items-center justify-between bg-card/20 border border-primary/30 p-3 rounded glow-border">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.sprite}</span>
                    <span className="text-foreground">{item.item}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{item.price} coins</span>
                    <Button
                      onClick={() => handleBuy(item)}
                      disabled={earnedItems.includes(item.unlockKey)}
                      className="bg-primary/20 text-foreground hover:bg-primary/40 border border-primary/30 px-3 py-1 text-sm"
                    >
                      {earnedItems.includes(item.unlockKey) ? 'Owned' : 'Buy'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {shopMessage && (
              <div className="text-center text-primary mt-3">{shopMessage}</div>
            )}
            <Button 
              onClick={() => setShowShop(false)}
              className="w-full mt-4 bg-muted text-muted-foreground hover:bg-muted/80"
            >
              Close Shop
            </Button>
          </Card>
        </div>
      )}

      {/* Level Completion */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-card border-primary glow-card p-8 text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-primary mb-4 glow-text">Level {currentLevel - 1} Complete!</h2>
            <div className="text-xl text-foreground mb-4">All chores finished!</div>
            <div className="text-lg text-accent mb-6">Bonus: +10 coins! 💰</div>
            <div className="space-y-3">
              <Button 
                onClick={resetLevel}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 glow-border"
              >
                Next Level 🚀
              </Button>
              <Button 
                onClick={goToKidZone}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3"
              >
                Back to Kid Zone 🏠
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChoreAdventure;