import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  decay: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
}

class TrailPointClass implements TrailPoint {
  x: number;
  y: number;
  life: number;
  decay: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = 1.0;
    this.decay = 0.02;
  }

  update(): boolean {
    this.life -= this.decay;
    return this.life > 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.life <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.strokeStyle = `hsl(${270 + (1 - this.life) * 60}, 70%, 60%)`;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.strokeStyle;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

class ParticleClass implements Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.life = Math.random();
    this.decay = 0.001;
    this.size = Math.random() * 2 + 1;
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    
    // Wrap around screen
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    
    if (this.life <= 0) {
      this.life = 1.0;
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.life * 0.3;
    ctx.fillStyle = `hsl(${250 + Math.sin(Date.now() * 0.001) * 60}, 50%, 60%)`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = ctx.fillStyle;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function MouseTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const trailsRef = useRef<TrailPointClass[]>([]);
  const particlesRef = useRef<ParticleClass[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const maxParticles = 50;
    particlesRef.current = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesRef.current.push(new ParticleClass(canvas.width, canvas.height));
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles with new dimensions
      particlesRef.current = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesRef.current.push(new ParticleClass(canvas.width, canvas.height));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      
      const distance = Math.sqrt(
        (mouseRef.current.x - mouseRef.current.lastX) ** 2 + 
        (mouseRef.current.y - mouseRef.current.lastY) ** 2
      );
      
      if (distance > 5) {
        trailsRef.current.push(new TrailPointClass(mouseRef.current.x, mouseRef.current.y));
        
        // Limit trail length
        const maxTrails = 20;
        if (trailsRef.current.length > maxTrails) {
          trailsRef.current.shift();
        }
        
        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      handleMouseMove({
        clientX: touch.clientX + rect.left,
        clientY: touch.clientY + rect.top
      } as MouseEvent);
    };

    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      // Update and draw trails
      for (let i = trailsRef.current.length - 1; i >= 0; i--) {
        if (!trailsRef.current[i].update()) {
          trailsRef.current.splice(i, 1);
        } else {
          trailsRef.current[i].draw(ctx);
        }
      }
      
      // Draw connections between nearby trail points
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < trailsRef.current.length; i++) {
        for (let j = i + 1; j < trailsRef.current.length; j++) {
          const distance = Math.sqrt(
            (trailsRef.current[i].x - trailsRef.current[j].x) ** 2 + 
            (trailsRef.current[i].y - trailsRef.current[j].y) ** 2
          );
          if (distance < 50) {
            ctx.globalAlpha = (1 - distance / 50) * trailsRef.current[i].life * trailsRef.current[j].life * 0.3;
            ctx.beginPath();
            ctx.moveTo(trailsRef.current[i].x, trailsRef.current[i].y);
            ctx.lineTo(trailsRef.current[j].x, trailsRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
