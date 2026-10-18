import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: 'petal-burgundy' | 'petal-blush' | 'gold-particle' | 'gold-shimmer';
}

export const FloatingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      // Prevent canvas flicker on mobile address bar collapse/expand
      if (Math.abs(canvas.width - window.innerWidth) > 20 || Math.abs(canvas.height - window.innerHeight) > 100) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Create particles (optimized for smooth 60-120fps on mobile phones)
    const particleCount = window.innerWidth < 768 ? 16 : 40;
    const particles: Petal[] = [];

    const types: ('petal-burgundy' | 'petal-blush' | 'gold-particle' | 'gold-shimmer')[] = [
      'petal-burgundy',
      'petal-burgundy',
      'petal-blush',
      'gold-particle',
      'gold-particle',
      'gold-shimmer',
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.3,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha;
      context.fillStyle = color;

      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, size / 2);
      context.bezierCurveTo(size, size, size / 2, size * 1.2, 0, size);
      context.bezierCurveTo(-size / 2, size * 1.2, -size, size, -size, size / 2);
      context.bezierCurveTo(-size, -size / 4, -size / 2, -size / 2, 0, 0);
      context.fill();
      context.restore();
    };

    const drawGoldParticle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number,
      isShimmer: boolean
    ) => {
      context.save();
      context.globalAlpha = alpha;
      const gradient = context.createRadialGradient(x, y, 0, x, y, size * 1.5);
      gradient.addColorStop(0, '#FFF5DF');
      gradient.addColorStop(0.5, '#E8D6A5');
      gradient.addColorStop(1, 'rgba(201, 164, 92, 0)');

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, isShimmer ? size * 1.3 : size, 0, Math.PI * 2);
      context.fill();

      // Soft cross twinkle
      if (isShimmer && Math.random() > 0.4) {
        context.strokeStyle = 'rgba(255, 245, 223, 0.7)';
        context.lineWidth = 0.8;
        context.beginPath();
        context.moveTo(x - size * 2, y);
        context.lineTo(x + size * 2, y);
        context.moveTo(x, y - size * 2);
        context.lineTo(x, y + size * 2);
        context.stroke();
      }
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal-burgundy') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, '#8E1629', p.opacity * 0.75);
        } else if (p.type === 'petal-blush') {
          drawPetal(ctx, p.x, p.y, p.size * 0.9, p.rotation, '#D97D88', p.opacity * 0.65);
        } else if (p.type === 'gold-particle') {
          drawGoldParticle(ctx, p.x, p.y, p.size * 0.35, p.opacity * 0.85, false);
        } else {
          drawGoldParticle(ctx, p.x, p.y, p.size * 0.4, p.opacity, true);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};
