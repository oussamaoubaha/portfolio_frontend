'use client';
import { useEffect, useRef } from 'react';

export default function HexagonParticlesBackground() {
  const canvasRef = useRef(null);
  const hexGridRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 250 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const hexGrid = hexGridRef.current;
    if (!canvas || !hexGrid) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      createHexagonGrid();
    };

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      mouseRef.current.radius = 170;
    };

    const handleMouseStop = () => {
      mouseRef.current.radius = 0;
    };

    let mouseStopTimer;
    const onMouseMove = (event) => {
      handleMouseMove(event);
      clearTimeout(mouseStopTimer);
      mouseStopTimer = setTimeout(handleMouseStop, 10);
    };

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4; // More subtle particles
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Enhanced mouse interaction
        const mouse = mouseRef.current;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius;
            const pushDistance = force * 20; // Doubled push force
            
            // Enhanced repulsion effect
            const pushX = (dx / distance) * pushDistance;
            const pushY = (dy / distance) * pushDistance;
            
            this.x -= pushX;
            this.y -= pushY;
            
            // Keep particles within bounds
            this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
            this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const numberOfParticles = Math.floor((canvas.height * canvas.width) / 15000);
      const actualParticles = Math.floor(numberOfParticles * 0.15); // Reduced particle count
      
      for (let i = 0; i < actualParticles; i++) {
        const size = Math.random() * 2 + 0.5; // Smaller particles
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = (Math.random() * 1) - 0.5; // Slower movement
        const directionY = (Math.random() * 1) - 0.5;
        const color = '#1e40af'; // Darker blue for professional look
        particlesRef.current.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          const maxDistance = Math.min(canvas.width, canvas.height) / 10; // Reduced connection distance
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(30, 64, 175, ${opacity * 0.2})`; // Subtler connections
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Create hexagon grid
    const createHexagonGrid = () => {
      hexGrid.innerHTML = '';
      const rowsNumber = Math.ceil(canvas.height / 80);
      const columnsNumber = Math.ceil(canvas.width / 100) + 1;

      for (let i = 0; i < rowsNumber; i++) {
        const row = document.createElement('div');
        row.className = 'hex-row';
        if (i % 2 === 0) {
          row.style.marginLeft = '2px';
        }
        
        for (let j = 0; j < columnsNumber; j++) {
          const hexagon = document.createElement('div');
          hexagon.className = 'hexagon';
          row.appendChild(hexagon);
        }
        
        hexGrid.appendChild(row);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse glow effect
      const mouse = mouseRef.current;
      if (mouse.x !== null && mouse.y !== null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
        gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.1)');
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Update and draw particles
      particlesRef.current.forEach(particle => particle.update());
      connectParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx="true">{`
        .hexagon-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .hexagon-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .hex-row {
          display: inline-flex;
          margin-top: -32px;
          margin-left: -50px;
        }

        .hexagon {
          position: relative;
          width: 100px;
          height: 110px;
          margin: 4px 2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          pointer-events: auto;
          cursor: pointer;
        }

        .hexagon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #020b18;
          opacity: 0.7; // More transparent
          transition: all 0.3s ease;
        }

        .hexagon::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          bottom: 4px;
          left: 4px;
          background: #0a0f1c; // Darker inner color
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .hexagon:hover::before {
          background: #1e40af; // Professional blue
          opacity: 0.15; // Very subtle hover
          transition: all 0s;
        }

        .hexagon:hover::after {
          background: #0a0f1c;
        }

        .particles-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hexagon {
            width: 60px;
            height: 66px;
          }
          
          .hex-row {
            margin-top: -20px;
            margin-left: -30px;
          }
        }
      `}</style>
      
      <div className="hexagon-container">
        <div ref={hexGridRef} className="hexagon-grid" />
      </div>
      
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{
          background: 'transparent',
        }}
      />
    </>
  );
}
