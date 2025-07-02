import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Brick {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  destroyed: boolean;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function EasterEggGame() {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [ball, setBall] = useState<Ball>({ x: 400, y: 400, vx: 5, vy: -5, radius: 8 });
  const [paddle, setPaddle] = useState<Paddle>({ x: 350, y: 550, width: 100, height: 15 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const keysRef = useRef<string[]>([]);
  const nextParticleId = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());

  // Konami Code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const checkKonamiCode = useCallback(() => {
    const lastTenKeys = keysRef.current.slice(-10);
    return lastTenKeys.length === 10 && lastTenKeys.every((key, index) => key === konamiCode[index]);
  }, []);

  const createBricks = useCallback(() => {
    const newBricks: Brick[] = [];
    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
    const rows = 6;
    const cols = 10;
    const brickWidth = 75;
    const brickHeight = 25;
    const startX = 50;
    const startY = 80;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newBricks.push({
          id: row * cols + col,
          x: startX + col * (brickWidth + 5),
          y: startY + row * (brickHeight + 5),
          width: brickWidth,
          height: brickHeight,
          color: colors[row],
          destroyed: false
        });
      }
    }
    return newBricks;
  }, []);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: nextParticleId.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && gameStarted && !gameOver && !gameWon) {
        keysPressed.current.add(e.code);
      } else if (!isActive) {
        // Konami code detection
        keysRef.current.push(e.code);
        if (keysRef.current.length > 10) {
          keysRef.current.shift();
        }
        
        if (checkKonamiCode()) {
          setIsActive(true);
          keysRef.current = [];
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    const handleActivateEasterEgg = () => {
      setIsActive(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('activateEasterEgg', handleActivateEasterEgg);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('activateEasterEgg', handleActivateEasterEgg);
    };
  }, [isActive, gameStarted, gameOver, gameWon, checkKonamiCode]);

  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver || gameWon) return;

    // Move paddle based on keys pressed
    setPaddle(prev => {
      let newX = prev.x;
      const speed = 8;
      
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('KeyA')) {
        newX = Math.max(0, prev.x - speed);
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('KeyD')) {
        newX = Math.min(800 - prev.width, prev.x + speed);
      }
      
      return { ...prev, x: newX };
    });

    // Move ball
    setBall(prevBall => {
      let newX = prevBall.x + prevBall.vx;
      let newY = prevBall.y + prevBall.vy;
      let newVx = prevBall.vx;
      let newVy = prevBall.vy;

      // Wall collisions
      if (newX <= prevBall.radius || newX >= 800 - prevBall.radius) {
        newVx = -newVx;
        newX = prevBall.x;
      }
      if (newY <= prevBall.radius) {
        newVy = -newVy;
        newY = prevBall.y;
      }

      // Game over condition
      if (newY >= 600) {
        setGameOver(true);
        return prevBall;
      }

      // Paddle collision
      if (newY + prevBall.radius >= paddle.y && 
          newY - prevBall.radius <= paddle.y + paddle.height &&
          newX >= paddle.x && 
          newX <= paddle.x + paddle.width) {
        newVy = -Math.abs(newVy);
        
        // Add angle based on where it hits the paddle
        const hitPos = (newX - paddle.x) / paddle.width - 0.5;
        newVx += hitPos * 3;
        
        // Keep speed reasonable
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed > 8) {
          newVx = (newVx / speed) * 8;
          newVy = (newVy / speed) * 8;
        }
      }

      return { ...prevBall, x: newX, y: newY, vx: newVx, vy: newVy };
    });

    // Check brick collisions
    setBricks(prevBricks => {
      const newBricks = [...prevBricks];
      let hitBrick = false;

      for (let i = 0; i < newBricks.length; i++) {
        const brick = newBricks[i];
        if (brick.destroyed) continue;

        if (ball.x + ball.radius >= brick.x &&
            ball.x - ball.radius <= brick.x + brick.width &&
            ball.y + ball.radius >= brick.y &&
            ball.y - ball.radius <= brick.y + brick.height) {
          
          newBricks[i] = { ...brick, destroyed: true };
          createParticles(brick.x + brick.width / 2, brick.y + brick.height / 2, brick.color);
          setScore(prev => prev + 10);
          
          // Reverse ball direction
          setBall(prevBall => ({
            ...prevBall,
            vy: -prevBall.vy
          }));
          
          hitBrick = true;
          break;
        }
      }

      // Check win condition
      const remainingBricks = newBricks.filter(brick => !brick.destroyed);
      if (remainingBricks.length === 0) {
        setGameWon(true);
      }

      return newBricks;
    });

    // Update particles
    setParticles(prev => prev
      .map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.vx * 0.98,
        vy: particle.vy * 0.98,
        life: particle.life - 0.02
      }))
      .filter(particle => particle.life > 0)
    );

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameOver, gameWon, ball, paddle, createParticles]);

  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameOver, gameWon, gameLoop]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setBricks(createBricks());
    setBall({ x: 400, y: 400, vx: 5, vy: -5, radius: 8 });
    setPaddle({ x: 350, y: 550, width: 100, height: 15 });
    setParticles([]);
  };

  const closeGame = () => {
    setIsActive(false);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-slate-900 border-2 border-purple-500 rounded-2xl p-6 max-w-4xl w-full mx-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gradient-purple-pink">🧱 Brick Breaker</h2>
                <div className="text-lg text-white">Score: {score}</div>
              </div>
              <button
                onClick={closeGame}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {!gameStarted ? (
              <div className="text-center py-12">
                <h3 className="text-3xl font-bold mb-4 text-white">Break the Blocks! 🧱</h3>
                <p className="text-slate-300 mb-6">
                  Classic brick breaker game! Use your paddle to bounce the ball and destroy all the colored blocks.
                </p>
                <div className="text-sm text-slate-400 mb-6">
                  <p>Use A/D or Left/Right arrow keys to move the paddle</p>
                  <p>Don't let the ball fall off the bottom!</p>
                </div>
                <button
                  onClick={startGame}
                  className="bg-gradient-purple-pink px-8 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div
                ref={gameRef}
                className="relative bg-slate-800 rounded-xl overflow-hidden"
                style={{ width: '800px', height: '600px', margin: '0 auto' }}
              >
                {/* Bricks */}
                {bricks.filter(brick => !brick.destroyed).map(brick => (
                  <div
                    key={brick.id}
                    className="absolute rounded-md shadow-lg"
                    style={{ 
                      left: brick.x, 
                      top: brick.y,
                      width: brick.width,
                      height: brick.height,
                      backgroundColor: brick.color,
                      boxShadow: `0 0 10px ${brick.color}50`
                    }}
                  />
                ))}

                {/* Ball */}
                <div
                  className="absolute rounded-full bg-white shadow-lg shadow-white/50"
                  style={{ 
                    left: ball.x - ball.radius, 
                    top: ball.y - ball.radius,
                    width: ball.radius * 2,
                    height: ball.radius * 2
                  }}
                />

                {/* Paddle */}
                <div
                  className="absolute bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg shadow-lg shadow-purple-500/50"
                  style={{ 
                    left: paddle.x, 
                    top: paddle.y,
                    width: paddle.width,
                    height: paddle.height
                  }}
                />

                {/* Particles */}
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ 
                      left: particle.x, 
                      top: particle.y,
                      backgroundColor: particle.color,
                      opacity: particle.life
                    }}
                  />
                ))}

                {/* Game Over/Win Overlay */}
                {(gameOver || gameWon) && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold mb-4 text-white">
                        {gameWon ? '🎉 You Won!' : '💥 Game Over'}
                      </h3>
                      <p className="text-xl text-slate-300 mb-6">Final Score: {score}</p>
                      <button
                        onClick={startGame}
                        className="bg-gradient-purple-pink px-8 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        Play Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Instructions overlay */}
                <div className="absolute top-4 left-4 text-white text-sm bg-black/50 rounded-lg p-2">
                  <p>A/D or ← → : Move Paddle</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}