import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        grad.addColorStop(0, 'rgba(14,165,233,0.08)');
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
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles (removed expensive shadow blur)
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.4)';
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

  // Service Image Slider Component - Ultra-Polished Premium Design with 3D Transitions
  const ServiceImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const serviceImages = [
      {
        src: '/assets/services/pcb-manufacturing.png',
        alt: 'PCB Manufacturing',
        title: 'PCB Manufacturing',
        subtitle: '24-Hour Prototyping',
        description: 'Industry-leading fast turnaround with precision quality.',
        gradient: 'from-cyan-600/80 via-blue-600/60 to-purple-600/40',
        accentColor: 'cyan',
        link: '/pcb-manufacturing'
      },
      {
        src: '/assets/services/3d-printing.png',
        alt: '3D Printing Services',
        title: '3D Printing',
        subtitle: 'Same-Day Delivery',
        description: 'Rapid prototyping excellence with industrial materials.',
        gradient: 'from-emerald-600/80 via-teal-600/60 to-cyan-600/40',
        accentColor: 'emerald',
        link: '/online-3d-printing'
      },
      {
        src: '/assets/services/product-development.png',
        alt: 'Product Development',
        title: 'Product Development',
        subtitle: 'Concept to Market',
        description: 'Full-cycle innovation support from sketch to shelf.',
        gradient: 'from-orange-600/80 via-red-600/60 to-pink-600/40',
        accentColor: 'orange',
        link: '/product-development'
      },
      {
        src: '/assets/services/robotics-lab.png',
        alt: 'Technology Lab Setup',
        title: 'Tech Lab Setup',
        subtitle: '5000+ Students Trained',
        description: 'Empowering future innovators with state-of-the-art labs.',
        gradient: 'from-violet-600/80 via-purple-600/60 to-fuchsia-600/40',
        accentColor: 'violet',
        link: '/technology-lab'
      },
      {
        src: '/assets/services/web-development.png',
        alt: 'IT Services & Development',
        title: 'IT Services',
        subtitle: '100% Client Satisfaction',
        description: 'End-to-end digital transformation and software solutions.',
        gradient: 'from-blue-600/80 via-indigo-600/60 to-violet-600/40',
        accentColor: 'blue',
        link: '/web-development'
      },
      {
        src: '/assets/services/embedded-systems.png',
        alt: 'Embedded Systems',
        title: 'Embedded Systems',
        subtitle: '10,000+ Devices Powered',
        description: 'Advanced IoT solutions and hardware engineering expertise.',
        gradient: 'from-pink-600/80 via-fuchsia-600/60 to-purple-600/40',
        accentColor: 'pink',
        link: '/embedded-software'
      }
    ];

    // Auto-advance
    useEffect(() => {
      if (isHovered) return;
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % serviceImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [isHovered, serviceImages.length]);

    const goToSlide = (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    };

    const goToPrevious = () => {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + serviceImages.length) % serviceImages.length);
    };

    const goToNext = () => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % serviceImages.length);
    };

    const variants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? 45 : -45,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction < 0 ? 45 : -45,
      }),
    };

    return (
      <div
        className="relative w-full h-[540px] perspective-2000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Abstract Glow Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-purple-500/10 rounded-full blur-[80px]" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative w-full h-full z-10 flex flex-col items-center justify-start pt-8">
          <AnimatePresence initial={false} custom={direction}>
            <Link to={serviceImages[currentIndex].link || '#'} className="absolute inset-0 z-10 w-full h-[400px] sm:h-[450px]">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  rotateY: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute w-full max-w-lg h-[400px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#001a24] group cursor-pointer"
              >
                {/* Image Layer */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.img
                    src={serviceImages[currentIndex].src}
                    alt={serviceImages[currentIndex].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 5 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${serviceImages[currentIndex].gradient} mix-blend-overlay opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00080c] via-transparent to-transparent opacity-90" />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3">
                      <span className={`w-2 h-2 rounded-full bg-${serviceImages[currentIndex].accentColor}-400 animate-pulse`} />
                      <span className="text-xs font-semibold tracking-wider text-white uppercase">{serviceImages[currentIndex].subtitle}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{serviceImages[currentIndex].title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-[90%]">{serviceImages[currentIndex].description}</p>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-sm group"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {serviceImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-sm group"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 pt-10 sm:pt-0 sm:pb-0">
      {/* Background handled by site-wide ScrollArt only */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm animate-fade-up" style={{ animationDelay: '100ms' }}>
              <Cpu className="text-cyan-400" size={20} />
              <span className="text-cyan-400 text-sm font-medium">Core Electronics & Tech Innovation</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight animate-fade-up" style={{ animationDelay: '250ms' }}>
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
                onClick={openContactModal}
                className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 animate-glow"
              >
                Get Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                View Our Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-8 border-t border-white/5 mt-8 sm:border-none sm:mt-0">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text animate-pulse">7+</div>
                <div className="text-gray-400 text-xs sm:text-sm mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text animate-pulse">500+</div>
                <div className="text-gray-400 text-xs sm:text-sm mt-1">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text animate-pulse">100+</div>
                <div className="text-gray-400 text-xs sm:text-sm mt-1">Happy Clients</div>
              </div>
            </div>

          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full flex items-center justify-end pr-8">
              <ServiceImageSlider />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
