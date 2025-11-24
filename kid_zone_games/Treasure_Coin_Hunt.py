"""
🏴☠️ TREASURE COIN HUNT 🏴☠️

What is Treasure Coin Hunt?
Treasure Coin Hunt is a fun game where you explore a treasure room, collect coins and money notes, and place them in the correct treasure slot to win prizes!

⭐ Your Mission:
- Move around the treasure maze
- Find coins and notes
- Look at their value (₹1, ₹2, ₹5, ₹10, ₹20, etc.)
- Put the correct money into the treasure slot that asks for it

🎮 How to Play:
Action          Control
Move Up         ↑ Arrow
Move Down       ↓ Arrow
Move Left       ← Arrow
Move Right      → Arrow
Pick Coin/Note  Walk into it
Place Coin/Note Stand near treasure slot
Restart Level   R key
Quit Game       Esc key

📜 Game Rules:
- Collect only the coins/notes that match the treasure value
- Wrong value → Lose 1 life
- Correct value → Score increases
- Complete before time runs out to unlock next level
- Cannot walk through walls
- You win the level when the treasure slot gets the exact total amount
- Lose all lives → Restart level

🧠 Level Difficulty:
Level 1: Identify single coins and notes
Level 2: Add 2 or more coins/notes to match value
Level 3: Fake coins + distractions introduced + Timer
Level 4+: Bigger puzzles and bonus rewards

🏆 Rewards & Prizes:
✨ Stars ✨ Trophies ✨ Badges ✨ New character costumes ✨ New treasure rooms

🎉 Helpful Tips:
- Look carefully at numbers on coins and notes
- Add values together if you need a bigger total
- If you get stuck, wait → hints will appear
- Try your best — every attempt teaches you something!
"""

import pygame
import random
import math
import time
from collections import defaultdict

pygame.init()
pygame.mixer.init()  # optional sound channel

# --------- CONSTANTS & COLORS ----------
WIDTH, HEIGHT = 960, 640
FPS = 60

# Retro / treasure room palette
BG = (18, 18, 30)
CARD = (30, 30, 50)
ACCENT = (78, 255, 188)
SUB = (120, 120, 150)
GOLD = (238, 201, 75)
BAD = (235, 64, 52)
WHITE = (245, 245, 245)

FONT = pygame.font.SysFont("freesans", 20)
BIGFONT = pygame.font.SysFont("freesans", 36)
TITLEFONT = pygame.font.SysFont("freesans", 48)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Treasure Coin Hunt")

clock = pygame.time.Clock()

# --------- GAME SETTINGS ----------
START_LIVES = 3

# Indian-like coin/note denominations (for recognition)
LEVEL_DENOMS = {
    1: [1, 2, 5, 10],  # simple coins / notes (kids)
    2: [5, 10, 20, 50, 100],  # combined sums
    3: [1, 2, 5, 10, 20, 50, 100, 200, 500],  # exotic + distractors + fake coins
    4: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],  # bigger puzzles
}

# Rewards - unlocked cosmetics and achievements
UNLOCKS = {
    "chests_unlocked": 0,
    "costumes": ["Default"],
    "badges": [],
    "trophies": [],
    "stars": 0,
}

# Badge system
BADGE_REQUIREMENTS = {
    "Perfect Streak": "no_mistakes_level",
    "Fast Thinker": "quick_answers", 
    "Gold Treasure Trophy": "three_levels_row",
    "Coin Master": "collect_50_coins",
    "Speed Runner": "complete_under_30s",
}

# --------- UTILITIES ----------
def draw_text(surf, text, pos, font=FONT, color=WHITE, center=False):
    txt = font.render(str(text), True, color)
    rect = txt.get_rect()
    if center:
        rect.center = pos
    else:
        rect.topleft = pos
    surf.blit(txt, rect)
    return rect

def clamp(n, a, b):
    return max(a, min(b, n))

# Simple beep sounds (if desired)
def beep(freq=440, duration_ms=80):
    # create a simple sound using pygame.sndarray (if available)
    try:
        import numpy as np
        samplerate = 44100
        t = np.linspace(0, duration_ms/1000, int(samplerate * duration_ms/1000), False)
        wave = 4096 * np.sin(2 * np.pi * freq * t)
        sound = pygame.sndarray.make_sound(wave.astype(np.int16))
        sound.play()
    except Exception:
        pass  # numpy might not be installed - just skip sound

# --------- GAME OBJECTS ----------
class Wall(pygame.sprite.Sprite):
    def __init__(self, x, y, w, h):
        super().__init__()
        self.rect = pygame.Rect(x, y, w, h)

    def draw(self, surf):
        pygame.draw.rect(surf, (40, 40, 70), self.rect)
        pygame.draw.rect(surf, (60, 60, 90), self.rect, 2)

class Player(pygame.sprite.Sprite):
    def __init__(self, x, y, size=32):
        super().__init__()
        self.size = size
        self.rect = pygame.Rect(x, y, size, size)
        self.speed = 3
        self.color = (120, 200, 255)
        self.inventory = []  # coins typed correctly and held (list of Coin)
        self.coins_collected = 0
        self.moves = 0

    def move(self, dx, dy, walls):
        if dx == 0 and dy == 0:
            return
        new_rect = self.rect.move(dx, dy)
        # collision detection with walls
        for w in walls:
            if w.rect.colliderect(new_rect):
                # Try axis separation to allow sliding
                if dx != 0:
                    new_rect.x = self.rect.x  # stop horizontal
                if dy != 0:
                    new_rect.y = self.rect.y  # stop vertical
                break
        self.rect = new_rect
        self.moves += 1

    def draw(self, surf):
        # friendly cartoon square
        pygame.draw.rect(surf, self.color, self.rect, border_radius=6)
        # face (eyes, smile)
        eye_r = 3
        ex = self.rect.x + self.size*0.3
        ey = self.rect.y + self.size*0.35
        pygame.draw.circle(surf, (30, 30, 40), (int(ex), int(ey)), eye_r)
        pygame.draw.circle(surf, (30, 30, 40), (int(self.rect.x + self.size*0.7), int(ey)), eye_r)
        pygame.draw.arc(surf, (30, 30, 40), (self.rect.x + self.size*0.25, self.rect.y + self.size*0.45, self.size*0.5, self.size*0.4), math.pi/8, math.pi-math.pi/8, 2)

class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y, value, kind="coin"):
        super().__init__()
        self.value = value
        self.kind = kind  # coin or note or fake
        self.radius = 18 if kind=="coin" else 26
        self.rect = pygame.Rect(x-self.radius, y-self.radius, self.radius*2, self.radius*2)
        # Random small wobble for style
        self.angle = random.uniform(0, 2*math.pi)
        self.collected = False
        self.fake = False

    def draw(self, surf):
        # coin style
        if self.kind == "coin":
            pygame.draw.circle(surf, GOLD if not self.fake else SUB, self.rect.center, self.radius)
            pygame.draw.circle(surf, (255, 255, 255, 30), self.rect.center, int(self.radius*0.85), 2)
            draw_text(surf, f"₹{self.value}", (self.rect.centerx-12, self.rect.centery-11), font=FONT if self.radius<22 else BIGFONT, color=(20,20,30))
        else:
            # note
            r = self.rect
            pygame.draw.rect(surf, (80,150,100) if not self.fake else (120,120,120), r, border_radius=6)
            pygame.draw.rect(surf, (40,40,60), r, 2, border_radius=6)
            draw_text(surf, f"₹{self.value}", (r.centerx-18, r.centery-12), font=FONT, color=WHITE)

# Slot where coins should be placed to hit target
class Slot:
    def __init__(self, x, y, w, h, target_value):
        self.rect = pygame.Rect(x, y, w, h)
        self.target = target_value
        self.current = 0
        self.coins_in_slot = []  # coin objects placed in slot

    def accept_coin(self, coin):
        # place coin into slot (no collision physics)
        self.coins_in_slot.append(coin)
        self.current += coin.value

    def draw(self, surf):
        pygame.draw.rect(surf, (20, 20, 40), self.rect, border_radius=6)
        pygame.draw.rect(surf, (50, 60, 100), self.rect, 2, border_radius=6)
        draw_text(surf, f"Place coins totalling ₹{self.target}", (self.rect.x+8, self.rect.y+6), font=FONT, color=ACCENT)
        draw_text(surf, f"Current: ₹{self.current}", (self.rect.x+8, self.rect.y+30), font=FONT, color=WHITE)
        # draw coin icons inside
        cx = self.rect.centerx
        cy = self.rect.centery + 20
        for i, c in enumerate(self.coins_in_slot):
            pygame.draw.circle(surf, GOLD, (self.rect.x+20 + i*26, cy), 10)
            draw_text(surf, str(c.value), (self.rect.x+12 + i*26, cy-8), font=FONT, color=(10,10,10))

# --------- LEVEL GENERATION ----------
def generate_walls_for_board():
    walls = []
    # outer walls
    thickness = 20
    walls.append(Wall(0, 0, WIDTH, thickness))
    walls.append(Wall(0, 0, thickness, HEIGHT))
    walls.append(Wall(0, HEIGHT-thickness, WIDTH, thickness))
    walls.append(Wall(WIDTH-thickness, 0, thickness, HEIGHT))
    # some maze rectangles
    for i in range(5):
        x = random.randint(120, WIDTH-200)
        y = random.randint(80, HEIGHT-220)
        w = random.randint(80, 220)
        h = random.randint(40, 160)
        walls.append(Wall(x, y, w, h))
    return walls

def generate_coins_for_level(level, walls, slot_count=2):
    coins = []
    denoms = LEVEL_DENOMS.get(level, LEVEL_DENOMS[4])
    # more coins for higher levels
    count = 8 + level*2
    for _ in range(count):
        tries = 0
        while True:
            tries += 1
            x = random.randint(60, WIDTH-60)
            y = random.randint(100, HEIGHT-120)
            coin_kind = "coin" if random.random() < 0.6 else "note"
            value = random.choice(denoms)
            c = Coin(x, y, value, kind=coin_kind)
            
            # Fake coins for level 3+
            if level >= 3 and random.random() < 0.2:
                c.fake = True
                # Misleading value - looks like one thing but worth another
                fake_values = [v for v in denoms if v != value]
                c.value = random.choice(fake_values) if fake_values else value
                
            # ensure not inside walls and not too close to other coins
            if any(w.rect.colliderect(c.rect.inflate(12,12)) for w in walls):
                continue
            if any(c.rect.colliderect(other.rect.inflate(20,20)) for other in coins):
                continue
            coins.append(c)
            break
            if tries > 200:
                break
                
    # Generate treasure slots with increasing difficulty
    slots = []
    slot_width = min(280, (WIDTH - 80) // slot_count)
    for i in range(slot_count):
        tx = 40 + i * (slot_width + 20)
        ty = 20
        
        # Progressive difficulty in target values
        if level == 1:
            target = random.choice([5, 10, 15])
        elif level == 2:
            target = random.choice([15, 25, 35, 50])
        elif level == 3:
            target = random.choice([30, 50, 75, 100])
        else:
            target = random.choice([50, 100, 150, 200, 250])
            
        slots.append(Slot(tx, ty, slot_width, 80, target))
    return coins, slots

# --------- UI / Overlay components ----------
class Button:
    def __init__(self, rect, text, color=ACCENT):
        self.rect = pygame.Rect(rect)
        self.text = text
        self.color = color

    def draw(self, surf):
        pygame.draw.rect(surf, CARD, self.rect, border_radius=6)
        pygame.draw.rect(surf, self.color, self.rect, 2, border_radius=6)
        draw_text(surf, self.text, (self.rect.centerx- (len(self.text)*5), self.rect.centery-8), font=FONT, color=WHITE, center=True)

    def is_hover(self, pos):
        return self.rect.collidepoint(pos)

# InputBox for typing coin recognition / quizzes
class InputBox:
    def __init__(self, rect, placeholder="Type here"):
        self.rect = pygame.Rect(rect)
        self.text = ""
        self.active = False
        self.placeholder = placeholder
        self.cursor_shown = True
        self.cursor_timer = 0

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.rect.collidepoint(event.pos):
                self.active = True
            else:
                self.active = False
        if event.type == pygame.KEYDOWN and self.active:
            if event.key == pygame.K_RETURN:
                return "SUBMIT"
            elif event.key == pygame.K_BACKSPACE:
                self.text = self.text[:-1]
            else:
                if len(self.text) < 8:
                    self.text += event.unicode
        return None

    def draw(self, surf):
        pygame.draw.rect(surf, CARD, self.rect, border_radius=6)
        pygame.draw.rect(surf, ACCENT if self.active else SUB, self.rect, 2, border_radius=6)
        txt = self.text if self.text else self.placeholder
        color = WHITE if self.text else (150,150,150)
        draw_text(surf, txt, (self.rect.x+8, self.rect.y+8), font=FONT, color=color)

    def submit(self):
        txt = self.text
        self.text = ""
        self.active = False
        return txt

# --------- GAME STATE ----------
class GameState:
    def __init__(self):
        self.level = 1
        self.score = 0
        self.lives = START_LIVES
        self.player = Player(80, HEIGHT-120)
        self.walls = generate_walls_for_board()
        self.coins, self.slots = generate_coins_for_level(self.level, self.walls, slot_count=2)
        self.holding = None  # coin being dragged
        self.popup = None  # current quiz popup
        self.inputbox = None
        self.drag_mode = False
        self.drag_origin_coin = None
        self.message = ""
        self.level_start_time = time.time()
        self.level_time_taken = 0
        self.streak = 0
        self.mistakes_this_level = 0
        self.quick_answers = 0
        self.total_coins_collected = 0
        self.levels_completed_in_row = 0
        self.badges = []
        self.trophies = []
        self.stars = 0
        self.unlocks = UNLOCKS
        self.summary = None  # store end-level summary
        self.time_limit = None if self.level < 3 else 60  # level 3+ has time limit
        self.show_instructions = True  # show instructions at start

    def reset_level(self):
        self.player = Player(80, HEIGHT-120)
        self.walls = generate_walls_for_board()
        slot_count = min(2 + (self.level-1), 4)  # max 4 slots
        self.coins, self.slots = generate_coins_for_level(self.level, self.walls, slot_count=slot_count)
        self.holding = None
        self.popup = None
        self.inputbox = None
        self.drag_mode = False
        self.drag_origin_coin = None
        self.level_start_time = time.time()
        self.mistakes_this_level = 0
        self.time_limit = None if self.level < 3 else max(45, 90 - self.level*10)  # decreasing time limit

    def pick_coin(self, coin):
        """Called when player collides with a coin."""
        if coin.collected:
            return
        coin.collected = True  # reserve it
        self.drag_origin_coin = coin
        # create popup with two choices: TYPE or DRAG
        self.popup = {
            "coin": coin,
            "choice": None,  # "type" or "drag"
            "timestamp": time.time(),
            "message": "Recognize the value of this coin/note",
        }
        # create input box but not active until chosen
        self.inputbox = InputBox((WIDTH//2 - 140, HEIGHT//2 - 12, 280, 36), placeholder="Type value (e.g., 10)")

    def commit_type_answer(self, coin, answer):
        """Check typed answer for coin recognition."""
        answer_time = time.time() - self.popup.get("timestamp", time.time())
        
        try:
            val = int(answer.strip())
        except:
            val = None
        if val is None:
            self.message = "Please enter a number!"
            beep(300, 80)
            return False
            
        if val == coin.value and not coin.fake:
            # correct recognition
            self.player.inventory.append(coin)
            self.score += 10
            self.player.coins_collected += 1
            self.total_coins_collected += 1
            self.streak += 1
            
            # Check for quick answer (under 3 seconds)
            if answer_time < 3.0:
                self.quick_answers += 1
                self.score += 5  # bonus for speed
                
            self.message = f"Great! You recognized ₹{coin.value}"
            if answer_time < 2.0:
                self.message += " - Lightning fast! ⚡"
                
            beep(650, 80)
            self.popup = None
            self.inputbox = None
            self.check_badges()
            return True
        else:
            # wrong
            self.lives -= 1
            self.streak = 0
            self.mistakes_this_level += 1
            if coin.fake:
                self.message = f"That was a fake coin worth ₹{coin.value}! Lost 1 life."
            else:
                self.message = f"Oops! That was ₹{coin.value}, not ₹{val}" if val is not None else "Wrong!"
            beep(220, 120)
            self.popup = None
            self.inputbox = None
            return False

    def start_drag_mode(self, coin):
        # Activate dragging; mouse controls coin until released
        self.popup = None
        self.inputbox = None
        self.drag_mode = True
        self.holding = coin

    def end_drag_mode(self, pos):
        """Called when mouse released while dragging a coin."""
        if not self.holding:
            self.drag_mode = False
            return
        # check if dropped onto a slot
        dropped_into_slot = False
        for s in self.slots:
            if s.rect.collidepoint(pos):
                # accept coin and check sums
                s.accept_coin(self.holding)
                # if the slot is exactly matched now:
                if s.current == s.target:
                    # correct full match, award points and unlocks
                    self.score += 30
                    self.player.coins_collected += len(s.coins_in_slot)
                    self.message = f"Perfect! Slot reached ₹{s.target}"
                    beep(800, 90)
                    # Clear coins from board that are in slot (they are already removed)
                    for c in s.coins_in_slot:
                        if c in self.coins:
                            self.coins.remove(c)
                    # check if remaining slots all done
                else:
                    # partial or wrong (if exceed)
                    if s.current > s.target:
                        self.lives -= 1
                        self.message = f"Too much! Slot exceeded ₹{s.target}"
                        beep(250, 80)
                    else:
                        # partial accepted; no immediate penalty
                        self.message = f"Placed ₹{self.holding.value} into slot (current ₹{s.current})"
                        beep(550, 70)
                dropped_into_slot = True
                break
        if not dropped_into_slot:
            # dropped in empty space -> if fake, penalty; else simply add to inventory
            if self.holding.fake:
                self.lives -= 1
                self.message = "That was a fake coin! Lost 1 life."
                beep(240, 120)
            else:
                self.player.inventory.append(self.holding)
                self.message = f"Picked up ₹{self.holding.value} into inventory."
                beep(600, 70)
            # remove from global coins list if present
            if self.holding in self.coins:
                self.coins.remove(self.holding)
        self.holding = None
        self.drag_mode = False

    def check_level_complete(self):
        # A level is complete if all slots are exactly matched OR no coins left and slots matched
        done = all(s.current == s.target for s in self.slots)
        if done:
            self.level_time_taken = int(time.time() - self.level_start_time)
            return True
        # optionally also if coins empty and all slots matched
        if not self.coins and all(s.current >= s.target for s in self.slots):
            self.level_time_taken = int(time.time() - self.level_start_time)
            return True
        # time limit fail
        if self.time_limit:
            if time.time() - self.level_start_time > self.time_limit:
                # end with timeout
                return True
        return False

    def check_badges(self):
        """Check and award badges based on performance"""
        new_badges = []
        
        # Perfect Streak Badge - no mistakes this level
        if self.mistakes_this_level == 0 and "Perfect Streak" not in self.badges:
            new_badges.append("Perfect Streak")
            self.stars += 1
            
        # Fast Thinker Badge - 5+ quick answers
        if self.quick_answers >= 5 and "Fast Thinker" not in self.badges:
            new_badges.append("Fast Thinker")
            self.stars += 1
            
        # Coin Master Badge - collected 50+ coins total
        if self.total_coins_collected >= 50 and "Coin Master" not in self.badges:
            new_badges.append("Coin Master")
            self.stars += 2
            
        # Add new badges
        for badge in new_badges:
            if badge not in self.badges:
                self.badges.append(badge)
                self.message += f" 🏆 {badge} Badge Earned!"
                
    def check_trophies(self):
        """Check and award trophies"""
        # Gold Treasure Trophy - 3 levels in a row
        if self.levels_completed_in_row >= 3 and "Gold Treasure Trophy" not in self.trophies:
            self.trophies.append("Gold Treasure Trophy")
            self.stars += 3
            self.message += " 🏆 Gold Treasure Trophy Earned!"
            
    def level_summary(self):
        # compute comprehensive summary
        coins_recognized = len(self.player.inventory) + self.player.coins_collected
        level_time = int(time.time() - self.level_start_time)
        
        # Speed Runner Badge - complete under 30s
        if level_time < 30 and "Speed Runner" not in self.badges:
            self.badges.append("Speed Runner")
            self.stars += 1
            
        return {
            "level": self.level,
            "score": self.score,
            "coins_recognized": coins_recognized,
            "mistakes": self.mistakes_this_level,
            "time": level_time,
            "earned_badges": self.badges.copy(),
            "earned_trophies": self.trophies.copy(),
            "stars": self.stars,
            "streak": self.streak
        }

# --------- MAIN GAME LOOP & DRAW ----------
def show_instructions(screen):
    """Show game instructions at the start"""
    screen.fill(BG)
    
    # Title
    draw_text(screen, "🏴☠️ TREASURE COIN HUNT 🏴☠️", (WIDTH//2, 50), font=TITLEFONT, color=GOLD, center=True)
    
    # Instructions
    instructions = [
        "⭐ Your Mission:",
        "• Move around the treasure maze",
        "• Find coins and notes (₹1, ₹2, ₹5, ₹10, ₹20, etc.)", 
        "• Put correct money into treasure slots",
        "",
        "🎮 Controls:",
        "• Arrow Keys: Move Up/Down/Left/Right",
        "• Walk into coins to pick them up",
        "• R: Restart Level  |  Esc: Quit Game",
        "",
        "📜 Rules:",
        "• Match coin values to slot requirements",
        "• Wrong value = Lose 1 life",
        "• Complete before time runs out!",
        "• Win when all slots have exact amounts",
        "",
        "🏆 Earn: ✨Stars ✨Badges ✨Trophies ✨Costumes",
        "",
        "Press SPACE to start your treasure hunt!"
    ]
    
    y = 120
    for line in instructions:
        if line.startswith(("⭐", "🎮", "📜", "🏆")):
            draw_text(screen, line, (WIDTH//2, y), font=BIGFONT, color=ACCENT, center=True)
        elif line == "":
            y += 10
            continue
        else:
            draw_text(screen, line, (WIDTH//2, y), font=FONT, color=WHITE, center=True)
        y += 25
    
    pygame.display.flip()
    
    # Wait for space key
    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    waiting = False
                elif event.key == pygame.K_ESCAPE:
                    return False
    return True

def main():
    state = GameState()
    
    # Show instructions first
    if not show_instructions(screen):
        return
    
    state.show_instructions = False
    running = True
    mouse_down = False

    while running:
        dt = clock.tick(FPS) / 1000.0
        screen.fill(BG)

        # ------- input handling -------
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                if event.key == pygame.K_r:
                    # restart level
                    state.reset_level()
                    state.lives = START_LIVES
                    state.score = 0
                    state.badges = []
                # handle enter for inputbox
                if state.inputbox:
                    res = state.inputbox.handle_event(event)
                    if res == "SUBMIT":
                        if state.popup and state.popup["choice"] == "type":
                            ans = state.inputbox.submit()
                            state.commit_type_answer(state.popup["coin"], ans)
                else:
                    # movement handled below
                    pass
            if event.type == pygame.MOUSEBUTTONDOWN:
                mouse_down = True
                mx,my = pygame.mouse.get_pos()
                # If in drag mode and holding coin, click should grab coin
                if state.drag_mode and state.holding:
                    # manual drag handled by mouse position
                    pass
                # If there is a popup and clicking buttons
                if state.popup:
                    # type button
                    tb = pygame.Rect(WIDTH//2-160, HEIGHT//2+12, 140, 36)
                    db = pygame.Rect(WIDTH//2+20, HEIGHT//2+12, 140, 36)
                    if tb.collidepoint((mx,my)):
                        state.popup["choice"] = "type"
                        state.inputbox.active = True
                    elif db.collidepoint((mx,my)):
                        state.popup["choice"] = "drag"
                        state.start_drag_mode(state.popup["coin"])
                # If clicking on inventory coins to place into slot
                # Inventory coins drawn at bottom-left
                inv_x = 12
                inv_y = HEIGHT-90
                if not state.popup and not state.drag_mode:
                    for i, coin in enumerate(state.player.inventory):
                        coin_rect = pygame.Rect(inv_x + i*48, inv_y, 40, 40)
                        if coin_rect.collidepoint((mx,my)):
                            # pick up from inventory for drag-placing
                            state.holding = coin
                            if coin in state.player.inventory:
                                state.player.inventory.remove(coin)
                            state.drag_mode = True
                            break
            if event.type == pygame.MOUSEBUTTONUP:
                mouse_down = False
                if state.drag_mode and state.holding:
                    state.end_drag_mode(pygame.mouse.get_pos())
            if event.type == pygame.MOUSEMOTION:
                pass
            # inputbox also needs mouse events
            if state.inputbox:
                state.inputbox.handle_event(event)

        # ------- player movement -------
        keys = pygame.key.get_pressed()
        dx = dy = 0
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            dx = -state.player.speed
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            dx = state.player.speed
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            dy = -state.player.speed
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            dy = state.player.speed
        state.player.move(dx, dy, state.walls)

        # ------- collisions with coins -------
        if not state.popup and not state.drag_mode:
            for coin in state.coins[:]:
                if coin.rect.colliderect(state.player.rect) and not coin.collected:
                    state.pick_coin(coin)
                    break

        # ------- draw walls -------
        for w in state.walls:
            w.draw(screen)

        # ------- draw slots -------
        for s in state.slots:
            s.draw(screen)

        # ------- draw coins (remaining on board) -------
        for coin in state.coins:
            coin.draw(screen)

        # ------- draw player -------
        state.player.draw(screen)

        # ------- draw inventory at bottom-left -------
        inv_x = 12
        inv_y = HEIGHT-90
        pygame.draw.rect(screen, (32, 32, 48), (inv_x-8, inv_y-12, 300, 80), border_radius=8)
        draw_text(screen, "Inventory", (inv_x, inv_y-10), font=FONT, color=ACCENT)
        for i, coin in enumerate(state.player.inventory):
            cx = inv_x + i*48
            cy = inv_y + 28
            pygame.draw.circle(screen, GOLD if not coin.fake else SUB, (cx+20, cy), 18)
            draw_text(screen, f"₹{coin.value}", (cx+6, cy-8), font=FONT, color=(10,10,10))

        # ------- draw HUD (score/lives/time) -------
        hud_x = WIDTH-240
        hud_y = 12
        pygame.draw.rect(screen, CARD, (hud_x, hud_y, 220, 120), border_radius=8)
        draw_text(screen, f"Score: {state.score}", (hud_x+12, hud_y+8), font=FONT, color=ACCENT)
        draw_text(screen, f"Lives: {state.lives}", (hud_x+12, hud_y+28), font=FONT, color=WHITE)
        draw_text(screen, f"Level: {state.level}", (hud_x+12, hud_y+48), font=FONT, color=WHITE)
        draw_text(screen, f"Stars: {state.stars}", (hud_x+12, hud_y+68), font=FONT, color=GOLD)
        
        # Timer for levels 3+
        if state.time_limit:
            elapsed = int(time.time() - state.level_start_time)
            remaining = max(0, state.time_limit - elapsed)
            color = BAD if remaining < 10 else WHITE
            draw_text(screen, f"Time: {remaining}s", (hud_x+12, hud_y+88), font=FONT, color=color)

        # ------- popup quiz UI -------
        if state.popup:
            # draw a centered popup
            pygame.draw.rect(screen, (24,24,36), (WIDTH//2-220, HEIGHT//2-80, 440, 160), border_radius=10)
            pygame.draw.rect(screen, (70,70,90), (WIDTH//2-220, HEIGHT//2-80, 440, 160), 2, border_radius=10)
            draw_text(screen, state.popup["message"], (WIDTH//2-200, HEIGHT//2-64), font=BIGFONT, color=ACCENT)
            # show coin in popup
            c = state.popup["coin"]
            # coin center
            pygame.draw.circle(screen, GOLD if not c.fake else SUB, (WIDTH//2, HEIGHT//2-4), c.radius+6)
            draw_text(screen, f"₹{c.value}", (WIDTH//2-24, HEIGHT//2-18), font=FONT, color=(10,10,10))
            # two choice buttons
            tb = pygame.Rect(WIDTH//2-160, HEIGHT//2+12, 140, 36)
            db = pygame.Rect(WIDTH//2+20, HEIGHT//2+12, 140, 36)
            pygame.draw.rect(screen, CARD, tb, border_radius=6)
            pygame.draw.rect(screen, CARD, db, border_radius=6)
            pygame.draw.rect(screen, ACCENT, tb, 2, border_radius=6)
            pygame.draw.rect(screen, ACCENT, db, 2, border_radius=6)
            draw_text(screen, "Type value", (tb.centerx-36, tb.centery-8), font=FONT, color=WHITE, center=True)
            draw_text(screen, "Drag to slot", (db.centerx-44, db.centery-8), font=FONT, color=WHITE, center=True)
            # if the popup choice is type, draw input
            if state.popup.get("choice") == "type" and state.inputbox:
                state.inputbox.draw(screen)
                draw_text(screen, "(Press Enter to submit)", (WIDTH//2-100, HEIGHT//2+62), font=FONT, color=SUB)

        # ------- during drag mode: draw holding coin under mouse -------
        if state.drag_mode and state.holding:
            mx,my = pygame.mouse.get_pos()
            r = state.holding.rect
            r.center = (mx, my)
            # draw coin under cursor
            if state.holding.kind == "coin":
                pygame.draw.circle(screen, GOLD if not state.holding.fake else SUB, (mx,my), state.holding.radius)
                draw_text(screen, f"₹{state.holding.value}", (mx-18, my-10), font=FONT, color=(10,10,10))
            else:
                rr = pygame.Rect(mx-state.holding.radius, my-state.holding.radius, state.holding.radius*2, state.holding.radius*2)
                pygame.draw.rect(screen, (80,150,100) if not state.holding.fake else (120,120,120), rr, border_radius=6)
                draw_text(screen, f"₹{state.holding.value}", (rr.x+8, rr.y+6), font=FONT, color=WHITE)

        # ------- messages & hints -------
        if state.message:
            draw_text(screen, state.message, (WIDTH//2-200, HEIGHT-36), font=FONT, color=SUB)

        # ------- check level complete or fail -------
        if state.check_level_complete():
            # if time_limit and time exceeded then fail; else success
            completed = all(s.current == s.target for s in state.slots)
            level_time = int(time.time() - state.level_start_time)
            
            if completed:
                state.score += 50
                state.levels_completed_in_row += 1
                UNLOCKS["chests_unlocked"] += 1
                
                # Time bonus
                if state.time_limit and level_time < state.time_limit // 2:
                    state.score += 25
                    state.message = f"Level Complete! Time Bonus: +25 points!"
                else:
                    state.message = f"Level Complete! Well done!"
                
                # Check for badges and trophies
                state.check_badges()
                state.check_trophies()
                
                # Show level summary
                draw_level_complete(screen, state)
                pygame.display.flip()
                pygame.time.delay(2000)
                
                state.level += 1
                if state.level > 5:
                    # Show victory screen
                    draw_victory(screen, state)
                    pygame.display.flip()
                    pygame.time.delay(3000)
                    state = GameState()
                    if not show_instructions(screen):
                        running = False
                    continue
                    
                state.reset_level()
            else:
                # failure (time out or didn't match)
                state.levels_completed_in_row = 0
                state.message = "Time's up! Try again!"
                state.lives -= 1
                
                if state.lives <= 0:
                    # game over: reset everything
                    draw_game_over(screen, state)
                    pygame.display.flip()
                    pygame.time.delay(2000)
                    state = GameState()
                    if not show_instructions(screen):
                        running = False
                    continue
                else:
                    # restart same level
                    state.reset_level()

        # ------- draw bottom-left UI hints & achievements -------
        draw_text(screen, "Recent Badges: " + ", ".join(state.badges[-2:]) if state.badges else "Badges: None yet", (12, HEIGHT-140), font=FONT, color=SUB)
        draw_text(screen, f"Trophies: {len(state.trophies)} | Chests: {UNLOCKS['chests_unlocked']}", (12, HEIGHT-160), font=FONT, color=SUB)
        if state.streak > 0:
            draw_text(screen, f"Streak: {state.streak} correct! 🔥", (12, HEIGHT-120), font=FONT, color=ACCENT)

        pygame.display.flip()

    pygame.quit()

def draw_level_complete(surf, state):
    pygame.draw.rect(surf, CARD, (WIDTH//2-200, HEIGHT//2-100, 400, 200), border_radius=12)
    pygame.draw.rect(surf, GOLD, (WIDTH//2-200, HEIGHT//2-100, 400, 200), 3, border_radius=12)
    draw_text(surf, "Level Complete! 🏆", (WIDTH//2, HEIGHT//2-70), font=BIGFONT, color=GOLD, center=True)
    draw_text(surf, f"Score: {state.score}", (WIDTH//2, HEIGHT//2-30), font=FONT, color=WHITE, center=True)
    draw_text(surf, f"Stars Earned: {state.stars}", (WIDTH//2, HEIGHT//2-10), font=FONT, color=GOLD, center=True)
    if state.badges:
        draw_text(surf, f"Latest Badge: {state.badges[-1]}", (WIDTH//2, HEIGHT//2+10), font=FONT, color=ACCENT, center=True)
    draw_text(surf, "Moving to next level...", (WIDTH//2, HEIGHT//2+50), font=FONT, color=SUB, center=True)

def draw_victory(surf, state):
    pygame.draw.rect(surf, CARD, (WIDTH//2-250, HEIGHT//2-150, 500, 300), border_radius=12)
    pygame.draw.rect(surf, GOLD, (WIDTH//2-250, HEIGHT//2-150, 500, 300), 4, border_radius=12)
    draw_text(surf, "🎉 TREASURE MASTER! 🎉", (WIDTH//2, HEIGHT//2-110), font=TITLEFONT, color=GOLD, center=True)
    draw_text(surf, "You completed all levels!", (WIDTH//2, HEIGHT//2-60), font=BIGFONT, color=WHITE, center=True)
    draw_text(surf, f"Final Score: {state.score}", (WIDTH//2, HEIGHT//2-20), font=FONT, color=WHITE, center=True)
    draw_text(surf, f"Total Stars: {state.stars}", (WIDTH//2, HEIGHT//2), font=FONT, color=GOLD, center=True)
    draw_text(surf, f"Badges Earned: {len(state.badges)}", (WIDTH//2, HEIGHT//2+20), font=FONT, color=ACCENT, center=True)
    draw_text(surf, f"Trophies Won: {len(state.trophies)}", (WIDTH//2, HEIGHT//2+40), font=FONT, color=ACCENT, center=True)
    draw_text(surf, "Starting new adventure...", (WIDTH//2, HEIGHT//2+80), font=FONT, color=SUB, center=True)

def draw_game_over(surf, state):
    pygame.draw.rect(surf, CARD, (WIDTH//2-260, HEIGHT//2-140, 520, 280), border_radius=12)
    pygame.draw.rect(surf, BAD, (WIDTH//2-260, HEIGHT//2-140, 520, 280), 3, border_radius=12)
    draw_text(surf, "Game Over 💀", (WIDTH//2, HEIGHT//2-110), font=TITLEFONT, color=BAD, center=True)
    draw_text(surf, f"Final Score: {state.score}", (WIDTH//2, HEIGHT//2-40), font=BIGFONT, color=WHITE, center=True)
    draw_text(surf, f"Level Reached: {state.level}", (WIDTH//2, HEIGHT//2-10), font=FONT, color=SUB, center=True)
    draw_text(surf, f"Stars Collected: {state.stars}", (WIDTH//2, HEIGHT//2+10), font=FONT, color=GOLD, center=True)
    if state.badges:
        draw_text(surf, f"Badges: {', '.join(state.badges[:3])}", (WIDTH//2, HEIGHT//2+30), font=FONT, color=ACCENT, center=True)
    draw_text(surf, "Starting new game...", (WIDTH//2, HEIGHT//2+70), font=FONT, color=SUB, center=True)

if __name__ == "__main__":
    main()
