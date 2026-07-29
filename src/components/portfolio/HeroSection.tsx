import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";
import SocialLinks from "./SocialLinks";
import CVButton from "@/components/ui/CVButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useEffect, useMemo, useRef, useState } from "react";

const roles = ["Développeur Web", "Étudiant en Génie Info", "Passionné par l'innovation"] as const;

function useTypewriter(words: readonly string[]) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index] ?? "";
    const doneTyping = subIndex >= current.length;
    const doneDeleting = subIndex <= 0;

    const speed = deleting ? 26 : 34;
    const pause = deleting ? 400 : 900;

    const t = window.setTimeout(() => {
      if (!deleting && doneTyping) {
        setDeleting(true);
        return;
      }
      if (deleting && doneDeleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, !deleting && doneTyping ? pause : speed);

    return () => window.clearTimeout(t);
  }, [words, index, subIndex, deleting]);

  const text = (words[index] ?? "").slice(0, subIndex);
  return text;
}

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string };

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["rgba(59,130,246,0.55)", "rgba(14,165,233,0.45)", "rgba(248,250,252,0.35)"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const { width, height } = canvas.getBoundingClientRect();
      particles.current = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 2.2,
        a: 0.12 + Math.random() * 0.22,
        c: colors[Math.floor(Math.random() * colors.length)]!,
      }));
    };

    const tick = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        ctx.beginPath();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

const HeroSection = () => {
  const { data: profile } = useProfile();

  const name = profile?.name || portfolioData.hero.headline;
  const title = profile?.title || portfolioData.hero.tagline;
  const subtitle = profile?.subtitle || portfolioData.hero.description;
  const photoUrl = profile?.hero_image;
  const typed = useTypewriter(roles);
  const stats = useMemo(
    () => [
      { label: "Projets", value: "10+" },
      { label: "Stages", value: "3" },
      { label: "Certifications", value: "5" },
    ],
    []
  );

  // Mouse tracking effect
  useEffect(() => {
    const section = document.querySelector('.hero-section') as HTMLElement
    const light   = document.getElementById('mouseLight') as HTMLElement
    if (!section || !light) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%'
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%'
      section.style.setProperty('--mx', x)
      section.style.setProperty('--my', y)
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Scan line effect */}
      <div className="hero-scan-line" />

      {/* Light qui suit la souris */}
      <div className="hero-mouse-light" id="mouseLight" />

      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--hero-foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orbs lumineux */}
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[140px] animate-[float-orb_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[140px] animate-[float-orb_7s_ease-in-out_infinite]" />

        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <ScrollReveal direction="fade" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                   data-cursor="card">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 badge-dot" />
                </span>
                <span className="label-tag text-hero-foreground/90">✦ Disponible pour stage</span>
              </div>
            </ScrollReveal>

            {/* Profile photo with Definitive External Aura */}
            <div className="relative flex items-center justify-center mx-auto mb-12">
              {/* Glow */}
              <div className="absolute w-72 h-72 bg-primary/20 blur-[60px] rounded-full" />

              {/* Gradient ring (rotating) */}
              <div
                className="absolute w-[204px] h-[204px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-primary), var(--color-accent))",
                  filter: "drop-shadow(0 0 22px rgba(59,130,246,0.35))",
                  animation: "spin-slow 10s linear infinite",
                }}
                aria-hidden="true"
              />

              {/* Static Profile Photo */}
              <div
                className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-white/10 shadow-2xl z-10 bg-black"
              >
                <img
                  src={photoUrl || "/OUSSAMA.jpg"}
                  alt={name}
                  className="w-full h-full object-cover object-[center_25%]"
                  loading="eager"
                  width={192}
                  height={192}
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </div>

            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
                {title}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-hero-foreground mb-4 leading-tight">
                <span className="gradient-text hero-name">{name}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-hero-foreground/90 text-lg sm:text-xl mb-3">
                <span className="text-hero-muted">Je suis </span>
                <span className="font-medium">{typed}</span>
                <span className="text-hero-muted typewriter-cursor">|</span>
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-hero-muted text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CVButton />
                <a
                  href={`mailto:${profile?.email || portfolioData.email}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-hero-foreground font-medium hover:bg-white/10 transition-all duration-300"
                  data-cursor="link"
                  data-magnetic
                >
                  <Mail size={18} />
                  Me contacter
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-hero-foreground font-medium hover:bg-white/10 transition-all duration-300"
                  data-cursor="link"
                  data-magnetic
                  aria-label="Demander à l'assistant IA"
                >
                  <img
                    src="/Assistant.png"
                    alt="Assistant Logo"
                    className="w-7 h-7 rounded-full object-contain border border-primary/50"
                    loading="lazy"
                    width={28}
                    height={28}
                  />
                  Demander à mon Assistant
                </button>
              </div>
            </ScrollReveal>

            <SocialLinks profile={profile} />

            <ScrollReveal direction="up" delay={0.6}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <div key={s.label} className={`glass-card px-6 py-4 stat-card stagger-${i + 1}`} data-cursor="card">
                    <p className="label-tag text-hero-muted">{s.label}</p>
                    <p className="text-2xl font-extrabold text-hero-foreground mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="scroll-indicator">
              <ChevronDown className="text-hero-muted" size={24} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
