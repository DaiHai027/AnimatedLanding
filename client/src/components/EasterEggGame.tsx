import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  health: number;
  color: string;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
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
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 300 });
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const keysRef = useRef<string[]>([]);
  const nextBulletId = useRef(0);
  const nextEnemyId = useRef(0);
  const nextParticleId = useRef(0);

  // Konami Code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, KeyB, KeyA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const checkKonamiCode = useCallback(() => {
    const lastTenKeys = keysRef.current.slice(-10);
    return lastTenKeys.length === 10 && lastTenKeys.every((key, index) => key === konamiCode[index]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && gameStarted) {
        // Game controls when active
        const speed = 8;
        
        switch (e.code) {
          case 'ArrowLeft':
          case 'KeyA':
            setPlayerPos(prev => ({ ...prev, x: Math.max(25, prev.x - speed) }));
            break;
          case 'ArrowRight':
          case 'KeyD':
            setPlayerPos(prev => ({ ...prev, x: Math.min(775, prev.x + speed) }));
            break;
          case 'ArrowUp':
          case 'KeyW':
            setPlayerPos(prev => ({ ...prev, y: Math.max(25, prev.y - speed) }));
            break;
          case 'ArrowDown':
          case 'KeyS':
            setPlayerPos(prev => ({ ...prev, y: Math.min(575, prev.y + speed) }));
            break;
          case 'Space':
            e.preventDefault();
            // Shoot bullet
            setPlayerPos(currentPos => {
              setBullets(prev => [...prev, {
                id: nextBulletId.current++,
                x: currentPos.x,
                y: currentPos.y - 15,
                vx: 0,
                vy: -10
              }]);
              return currentPos;
            });
            break;
        }
      } else {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, gameStarted, checkKonamiCode]);

  const spawnEnemy = useCallback(() => {
    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#f59e0b'];
    const newEnemy: Enemy = {
      id: nextEnemyId.current++,
      x: Math.random() * 750 + 25,
      y: -25,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      health: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setEnemies(prev => [...prev, newEnemy]);
  }, []);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: nextParticleId.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const gameLoop = useCallback(() => {
    if (!gameStarted) return;

    // Update bullets
    setBullets(prev => prev
      .map(bullet => ({ ...bullet, x: bullet.x + bullet.vx, y: bullet.y + bullet.vy }))
      .filter(bullet => bullet.y > -10)
    );

    // Update enemies
    setEnemies(prev => prev
      .map(enemy => ({ ...enemy, x: enemy.x + enemy.vx, y: enemy.y + enemy.vy }))
      .filter(enemy => enemy.y < 610 && enemy.health > 0)
    );

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

    // Check collisions
    setBullets(prevBullets => {
      const remainingBullets = [...prevBullets];
      
      setEnemies(prevEnemies => {
        const remainingEnemies = [...prevEnemies];
        
        prevBullets.forEach(bullet => {
          prevEnemies.forEach(enemy => {
            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 25) {
              // Hit!
              const bulletIndex = remainingBullets.findIndex(b => b.id === bullet.id);
              const enemyIndex = remainingEnemies.findIndex(e => e.id === enemy.id);
              
              if (bulletIndex >= 0) remainingBullets.splice(bulletIndex, 1);
              if (enemyIndex >= 0) {
                createParticles(enemy.x, enemy.y, enemy.color);
                remainingEnemies.splice(enemyIndex, 1);
                setScore(prev => prev + 10);
              }
            }
          });
        });
        
        return remainingEnemies;
      });
      
      return remainingBullets;
    });

    // Spawn enemies randomly
    if (Math.random() < 0.02) {
      spawnEnemy();
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, spawnEnemy, createParticles]);

  useEffect(() => {
    if (gameStarted) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameLoop]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setEnemies([]);
    setBullets([]);
    setParticles([]);
    setPlayerPos({ x: 400, y: 300 });
  };

  const closeGame = () => {
    setIsActive(false);
    setGameStarted(false);
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
                <h2 className="text-2xl font-bold text-gradient-purple-pink">🎮 SocialSphere Defender</h2>
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
                <h3 className="text-3xl font-bold mb-4 text-white">Easter Egg Discovered! 🥚</h3>
                <p className="text-slate-300 mb-6">
                  You found the secret mini-game! Defend SocialSphere from invading shapes!
                </p>
                <div className="text-sm text-slate-400 mb-6">
                  <p>Use WASD or Arrow Keys to move</p>
                  <p>Press SPACE to shoot</p>
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
                {/* Player */}
                <div
                  className="absolute w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-100"
                  style={{ 
                    left: playerPos.x - 12, 
                    top: playerPos.y - 12,
                    transform: 'translate(0, 0)'
                  }}
                />

                {/* Bullets */}
                {bullets.map(bullet => (
                  <div
                    key={bullet.id}
                    className="absolute w-2 h-6 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
                    style={{ left: bullet.x - 1, top: bullet.y - 3 }}
                  />
                ))}

                {/* Enemies */}
                {enemies.map(enemy => (
                  <div
                    key={enemy.id}
                    className="absolute w-6 h-6 rounded-full shadow-lg"
                    style={{ 
                      left: enemy.x - 12, 
                      top: enemy.y - 12,
                      backgroundColor: enemy.color,
                      boxShadow: `0 0 20px ${enemy.color}50`
                    }}
                  />
                ))}

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

                {/* Instructions overlay */}
                <div className="absolute top-4 left-4 text-white text-sm bg-black/50 rounded-lg p-2">
                  <p>WASD/Arrows: Move | Space: Shoot</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}