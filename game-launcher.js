const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/launch-game', async (req, res) => {
  try {
    const { game } = req.body;
    
    if (game === 'treasure_coin_hunt') {
      console.log('Installing pygame...');
      
      // Install pygame first
      const pipInstall = spawn('pip', ['install', 'pygame'], { 
        stdio: 'pipe',
        shell: true 
      });
      
      pipInstall.on('close', (code) => {
        if (code === 0) {
          console.log('Pygame installed successfully, launching game...');
          
          // Launch the game
          const gamePath = path.join(__dirname, 'kid_zone_games', 'Treasure_Coin_Hunt.py');
          const python = spawn('python', [gamePath], { 
            detached: true,
            stdio: 'ignore',
            shell: true 
          });
          
          python.unref();
          res.json({ success: true, message: 'Game launched successfully!' });
        } else {
          res.status(500).json({ success: false, message: 'Failed to install pygame' });
        }
      });
      
      pipInstall.on('error', (error) => {
        console.error('Error installing pygame:', error);
        res.status(500).json({ success: false, message: 'Error installing pygame' });
      });
    } else {
      res.status(400).json({ success: false, message: 'Unknown game' });
    }
  } catch (error) {
    console.error('Error launching game:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Game launcher server running on port ${PORT}`);
  console.log('Ready to launch games!');
});