import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactModal } from '../contexts/ContactModalContext';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openContactModal } = useContactModal();

  useEffect(() => {
  const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  // Reduced node count for better performance
  const nodeCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    let lastFrameTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle animation to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cursor spotlight gradient (only on desktop)
      if (window.innerWidth >= 768) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        grad.addColorStop(0, 'rgba(14,165,233,0.14)');
        grad.addColorStop(1, 'rgba(14,165,233,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections first (optimized - only check nearby nodes)
      const connectionDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distanceSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt

          if (distanceSq < connectionDistance * connectionDistance) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.18 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles (removed expensive shadow blur)
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,.9)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // Simple network visualization component (no WebGL required)
  const NetworkVisualization = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 520, height: 520 });

    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        setDimensions({ width: isMobile ? 320 : 520, height: isMobile ? 320 : 520 });
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cities = [
      'Tokyo', 'San Francisco', 'London', 'Berlin', 'Bangalore', 'Sydney',
      'Singapore', 'Dubai', 'New York', 'Toronto', 'Seoul', 'Paris', 'India'
    ];

    // Reduce connections on mobile for better performance
    const connectionCount = window.innerWidth < 768 ? 10 : 15;
    const connections = Array.from({ length: connectionCount }, (_, i) => {
      const startCity = cities[Math.floor(Math.random() * cities.length)];
      const endCity = cities[Math.floor(Math.random() * cities.length)];
      const startX = Math.random() * dimensions.width;
      const startY = Math.random() * dimensions.height;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = startY + (Math.random() - 0.5) * 200;
      const color = ['#00ffff', '#33ccff', '#0099ff'][Math.floor(Math.random() * 3)];
      
      return {
        startX,
        startY,
        endX,
        endY,
        color,
        label: `${startCity} → ${endCity}`,
        delay: i * 0.1,
        duration: 3 + Math.random() * 2,
      };
    });

    const points = connections.flatMap(conn => [
      { x: conn.startX, y: conn.startY, color: '#00eaff', label: conn.label.split(' → ')[0] },
      { x: conn.endX, y: conn.endY, color: '#00c0ff', label: conn.label.split(' → ')[1] }
    ]).slice(0, window.innerWidth < 768 ? 8 : 12);

    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-full h-full"
        style={{ 
          width: dimensions.width, 
          height: dimensions.height,
          willChange: 'transform, opacity' // GPU acceleration hint
        }}
      >
        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border-2"
            style={{
              borderColor: `rgba(${100 + i * 50}, ${200 + i * 30}, 255, ${0.3 - i * 0.1})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${60 + i * 30}%`,
              height: `${60 + i * 30}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {connections.map((conn, i) => (
            <motion.line
              key={`line-${i}`}
              x1={conn.startX}
              y1={conn.startY}
              x2={conn.endX}
              y2={conn.endY}
              stroke={conn.color}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{
                duration: conn.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: conn.delay,
              }}
            />
          ))}
        </svg>

        {/* Animated points */}
        {points.map((point, i) => (
          <motion.div
            key={`point-${i}`}
            className="absolute rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: 8,
              height: 8,
              backgroundColor: point.color,
              boxShadow: `0 0 12px ${point.color}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-0 pt-10 sm:pt-0">
  {/* Background handled by site-wide ScrollArt only */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm animate-fade-up" style={{ animationDelay: '100ms' }}>
              <Cpu className="text-cyan-400" size={20} />
              <span className="text-cyan-400 text-sm font-medium">Core Electronics & Tech Innovation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-up" style={{ animationDelay: '250ms' }}>
              <span className="text-white">Empowering the</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
                Future of Core Electronics
              </span>
              <br />
              <span className="text-white">and Smart Technology</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '400ms' }}>
              We integrate innovation, design, and embedded intelligence to build a smarter world.
              Leading India into the mainframe silicon trade route.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '550ms' }}>
              <button 
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 animate-glow"
              >
                Explore Our Services
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={openContactModal}
                className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Connect With Us
              </button>
            </div>

            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">7+</div>
                <div className="text-gray-400 text-sm mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">500+</div>
                <div className="text-gray-400 text-sm mt-1">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">100+</div>
                <div className="text-gray-400 text-sm mt-1">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <NetworkVisualization />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
