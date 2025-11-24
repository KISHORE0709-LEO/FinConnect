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
  const [targetValue, setTargetValue] = useState(15);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [answer, setAnswer] = useState('');

  // Generate random coins
  const generateCoins = useCallback(() => {
    const newCoins = [];
    const values = [1, 2, 5, 10, 20];
    for (let i = 0; i < 8; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * 700 + 50,
        y: Math.random() * 400 + 100,
        value: values[Math.floor(Math.random() * values.length)],
        collected: false
      });
    }
    setCoins(newCoins);
  }, []);

  // Initialize game
  useEffect(() => {
    generateCoins();
  }, [generateCoins]);

  // Handle keyboard movement
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showQuiz) return;
      
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        switch(e.key) {
          case 'ArrowUp':
            newY = Math.max(50, prev.y - 20);
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
        
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showQuiz]);

  // Check coin collision
  useEffect(() => {
    coins.forEach(coin => {
      if (!coin.collected && 
          Math.abs(player.x - coin.x) < 30 && 
          Math.abs(player.y - coin.y) < 30) {
        setCurrentCoin(coin);
        setShowQuiz(true);
      }
    });
  }, [player, coins]);

  const handleAnswer = () => {
    if (parseInt(answer) === currentCoin.value) {
      setScore(score + 10);
      setInventory([...inventory, currentCoin]);
      setCoins(coins.map(c => c.id === currentCoin.id ? {...c, collected: true} : c));
    } else {
      setLives(lives - 1);
    }
    setShowQuiz(false);
    setAnswer('');
    setCurrentCoin(null);
  };

  const checkWin = () => {
    const totalValue = inventory.reduce((sum, coin) => sum + coin.value, 0);
    return totalValue >= targetValue;
  };

  const resetGame = () => {
    setPlayer({ x: 100, y: 500 });
    setScore(0);
    setLives(3);
    setInventory([]);
    generateCoins();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-green-900 relative overflow-hidden">
      <Header />
      {/* Game Header */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex justify-between items-center">
          <Link to="/kid-zone">
            <Button variant="outline" className="bg-black/50 text-white border-green-500">
              <Home className="w-4 h-4 mr-2" />
              Back to Kid Zone
            </Button>
          </Link>
          
          <Card className="bg-black/70 border-green-500 p-4">
            <div className="flex gap-6 text-white">
              <span>Score: {score}</span>
              <span>Lives: {lives}</span>
              <span>Level: {level}</span>
              <span>Target: ₹{targetValue}</span>
            </div>
          </Card>
          
          <Button onClick={resetGame} variant="outline" className="bg-black/50 text-white border-green-500">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen pt-20">
        {/* Treasure Slot */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-600 border-4 border-yellow-400 rounded-lg p-4 text-center">
          <div className="text-white font-bold">Treasure Slot</div>
          <div className="text-yellow-200">Need: ₹{targetValue}</div>
          <div className="text-green-300">Have: ₹{inventory.reduce((sum, coin) => sum + coin.value, 0)}</div>
        </div>

        {/* Player */}
        <div 
          className="absolute w-8 h-8 bg-blue-500 rounded-full border-2 border-white transition-all duration-200"
          style={{ left: player.x, top: player.y }}
        >
          <div className="text-white text-xs text-center leading-6">👤</div>
        </div>

        {/* Coins */}
        {coins.map(coin => !coin.collected && (
          <div
            key={coin.id}
            className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-xs font-bold animate-pulse"
            style={{ left: coin.x, top: coin.y }}
          >
            ₹{coin.value}
          </div>
        ))}

        {/* Controls */}
        <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-4 text-white">
          <div className="text-sm mb-2">Controls:</div>
          <div className="grid grid-cols-3 gap-1 w-24">
            <div></div>
            <ArrowUp className="w-6 h-6 mx-auto" />
            <div></div>
            <ArrowLeft className="w-6 h-6" />
            <ArrowDown className="w-6 h-6 mx-auto" />
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Inventory */}
        <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg p-4 text-white">
          <div className="text-sm mb-2">Inventory:</div>
          <div className="flex gap-2">
            {inventory.map((coin, i) => (
              <div key={i} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                ₹{coin.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && currentCoin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-purple-900 border-green-500 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Coin Recognition!</h3>
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              ₹{currentCoin.value}
            </div>
            <p className="text-white mb-4">What is the value of this coin?</p>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-32 p-2 rounded text-center text-black mb-4"
              placeholder="Enter value"
              autoFocus
            />
            <div>
              <Button onClick={handleAnswer} className="bg-green-600 hover:bg-green-700">
                Submit Answer
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Win/Lose Messages */}
      {checkWin() && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-green-900 border-yellow-500 p-8 text-center">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">🏆 Level Complete!</h3>
            <p className="text-white mb-4">You collected ₹{inventory.reduce((sum, coin) => sum + coin.value, 0)}!</p>
            <Button onClick={resetGame} className="bg-yellow-600 hover:bg-yellow-700">
              Next Level
            </Button>
          </Card>
        </div>
      )}

      {lives <= 0 && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-red-900 border-red-500 p-8 text-center">
            <h3 className="text-3xl font-bold text-red-400 mb-4">💀 Game Over!</h3>
            <p className="text-white mb-4">Final Score: {score}</p>
            <Button onClick={resetGame} className="bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TreasureCoinHunt;