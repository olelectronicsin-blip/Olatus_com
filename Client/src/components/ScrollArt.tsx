import React, { useEffect, useRef } from 'react';

// Full-page, scroll-driven generative art animation.
// - Fixed canvas behind content
// - Layers: starfield + grid + particle network + ribbons + orbiters + cursor spotlight
// - Light on CPU: scales with DPR and throttles frames
const ScrollArt: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastProgressRef = useRef<number>(-1);
  const smoothProgressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  // Track last smoothed progress to compute stable, bounded velocity
  const lastSmoothRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let lastFrameTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();

    const getProgress = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      return scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    };

    // Orbiting glow particles - reduced for performance
    const orbiterCount = window.innerWidth < 768 ? 20 : 40;
    const orbiters = Array.from({ length: orbiterCount }, (_, i) => ({
      base: Math.random() * Math.PI * 2,
      r: 40 + Math.random() * 180 + i * 0.45,
      size: 1 + Math.random() * 2,
      hue: 180 + Math.random() * 120,
    }));

    // Starfield
    type Star = { x: number; y: number; r: number; t: number; s: number };
    let stars: Star[] = [];
    const buildStars = (w: number, h: number) => {
      const count = Math.round((w * h) / (1600 * 900) * 120) + 60; // scale by area
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        t: Math.random() * Math.PI * 2,
        s: Math.random() * 0.005 + 0.002,
      }));
    };
    buildStars(canvas.width, canvas.height);

    // Connection network nodes - reduced for performance
    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = [];
    const nodeCount = window.innerWidth < 768 ? 30 : 50;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Cursor spotlight
    let mx = canvas.width / 2;
    let my = canvas.height / 2;
    const onMove = (e: MouseEvent) => { mx = e.clientX * DPR; my = e.clientY * DPR; };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) { mx = e.touches[0].clientX * DPR; my = e.touches[0].clientY * DPR; } };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const draw = (currentTime: number) => {
      // Throttle animation to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = currentTime;

      const w = canvas.width;
      const h = canvas.height;
      const now = performance.now();
      const t = now / 1000;
      const target = getProgress();

      // time-based smoothing for scroll progress (dt-aware lerp)
      const dt = Math.max(0.001, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;
      const smooth = smoothProgressRef.current + (target - smoothProgressRef.current) * Math.min(1, dt * 4); // ~250ms to settle
      smoothProgressRef.current = smooth;
      // Derive velocity from smoothed progress (avoids spikes) and clamp it
      const velocityRaw = (smooth - lastSmoothRef.current) / dt; // progress units per second
      lastSmoothRef.current = smooth;
      const velocity = Math.max(-1.5, Math.min(1.5, velocityRaw));
      lastProgressRef.current = target;

      // clear
      ctx.clearRect(0, 0, w, h);

      // background gradient that shifts with scroll
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, `rgba(8,45,50,${0.15 + 0.1 * Math.sin(smooth * Math.PI)})`);
      bg.addColorStop(1, `rgba(0,10,20,0.6)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // starfield - removed expensive shadow blur for better performance
      for (const s of stars) {
        s.t += s.s;
        const a = 0.5 + 0.5 * Math.sin(s.t);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * DPR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${0.1 + a * 0.3})`;
        ctx.fill();
      }

      // subtle grid with gentle pan influenced by time + scroll
      ctx.save();
      ctx.strokeStyle = 'rgba(34,211,238,0.03)';
      ctx.lineWidth = 1 * DPR;
      const step = 40 * DPR;
      const ox = ((t * 12) + smooth * 120) % step;
      const oy = ((t * 8) + smooth * 90) % step;
      for (let x = -ox; x <= w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = -oy; y <= h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.restore();

      // orbiting particles with constant rotation speed; radius follows scroll progress
      const cx = w * (0.2 + 0.6 * smooth);
      const cy = h * (0.65 - 0.3 * smooth);
      ctx.save();
      for (const pt of orbiters) {
        const omega = 0.6; // rad/s constant angular speed
        const ang = pt.base + t * omega; // constant rotation independent of scroll/velocity
        const rad = pt.r * (0.6 + 0.8 * smooth);
        const x = cx + Math.cos(ang) * rad * DPR;
        const y = cy + Math.sin(ang * 1.3) * (rad * 0.5) * DPR;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 18 * DPR);
        grd.addColorStop(0, `hsla(${pt.hue}, 90%, 60%, .8)`);
        grd.addColorStop(1, `hsla(${pt.hue}, 90%, 60%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, pt.size * 2 * DPR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // connection network - subtle behind content (optimized nested loop)
      const connectionDist = 140 * DPR;
      const connectionDistSq = connectionDist * connectionDist;

      // Update positions first
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        // slight, clamped nudge from scroll velocity for fluid feel
        n.x += velocity * 2;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections (optimized - only check each pair once)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / connectionDist)})`;
            ctx.lineWidth = 0.6 * DPR;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,211,238,0.4)';
        ctx.fill();
      }

      // cursor spotlight (only on desktop for performance)
      if (window.innerWidth >= 768) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 260 * DPR);
        grad.addColorStop(0, 'rgba(14,165,233,0.08)');
        grad.addColorStop(1, 'rgba(14,165,233,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // horizon glow sweeping with scroll
      const sweepY = h * (0.85 - 0.6 * smooth);
      const sweep = ctx.createLinearGradient(0, sweepY - 40 * DPR, 0, sweepY + 40 * DPR);
      sweep.addColorStop(0, 'rgba(34,211,238,0)');
      sweep.addColorStop(0.5, 'rgba(34,211,238,0.1)');
      sweep.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = sweep;
      ctx.fillRect(0, sweepY - 60 * DPR, w, 120 * DPR);

      rafId = requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);

    const onResize = () => { resize(); buildStars(canvas.width, canvas.height); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
};

export default ScrollArt;
