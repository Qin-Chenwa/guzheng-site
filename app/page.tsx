"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Variants, motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion';

const sitePath = "/guzheng-site";

// ─── 設計系統 ────────────────────────────────────────────────────────────────
const calligraphy = "font-calligraphy italic tracking-tighter leading-none";

const LineDecorator = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="h-px w-16 bg-gradient-to-r from-amber-400/80 to-transparent" />
    <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
    <div className="h-px w-8 bg-amber-500/30" />
  </div>
);

// ─── 資料 ────────────────────────────────────────────────────────────────────
const navLinks = [
  { name: '藝術理念', id: 'artistry' },
  { name: '演奏歷程', id: 'journey' },
  { name: '精選作品', id: 'works' },
  { name: '聯絡邀約', id: 'contact' },
];

const stats = [
  { value: 12, suffix: '+', label: '年演奏資歷' },
  { value: 80, suffix: '+', label: '場次演出經驗' },
  { value: 6, suffix: '', label: '國際合作品牌' },
  { value: 3, suffix: '', label: '音樂競賽獎項' },
];

const journeyItems = [
  { year: "2014", event: "台北市立國樂團 TICC 國際會議廳演出" },
  { year: "2019", event: "TESLA MODEL 3 新車發表會跨界演出" },
  { year: "2024", event: "當代劇團《暴風雨》國家劇院巡演樂師" },
  { year: "2025", event: "江蕙《無·有》小巨蛋演唱會古箏演奏" },
];

// 替換為真實 YouTube 影片 ID
const works = [
  { id: "YOUTUBE_ID_1", title: "演奏曲目 01", subtitle: "高山流水" },
  { id: "YOUTUBE_ID_2", title: "演奏曲目 02", subtitle: "漁舟唱晚" },
];

const testimonials = [
  {
    quote: "娃娃的演奏讓整場晚宴充滿東方詩意，賓客至今仍在詢問她是誰。",
    name: "陳 總監",
    role: "品牌活動策劃",
  },
  {
    quote: "將古箏融入當代劇場，她的音樂語言既傳統又前衛，令人震撼。",
    name: "林 導演",
    role: "當代劇場製作人",
  },
  {
    quote: "我的孩子從排斥學琴到每天主動練習，娃娃老師的教學方式真的不一樣。",
    name: "王 媽媽",
    role: "學生家長",
  },
];

// 替換為真實 IG 帳號與圖片
const instagramHandle = "你的IG帳號";
const instagramPosts = [
  { id: 1, image: `${sitePath}/ig-1.jpg`, alt: "演出現場 1" },
  { id: 2, image: `${sitePath}/ig-2.jpg`, alt: "演出現場 2" },
  { id: 3, image: `${sitePath}/ig-3.jpg`, alt: "演出現場 3" },
  { id: 4, image: `${sitePath}/ig-4.jpg`, alt: "練習側拍" },
  { id: 5, image: `${sitePath}/ig-5.jpg`, alt: "幕後花絮" },
  { id: 6, image: `${sitePath}/ig-6.jpg`, alt: "合作演出" },
];

// ─── 動畫設定 ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── 子元件 ───────────────────────────────────────────────────────────────────

// 數字計數動畫
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// 磁力按鈕
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  }, []);

  const handleMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
      style={{ cursor: 'none' }}>
      {children}
    </motion.div>
  );

  if (href) return <a href={href}>{inner}</a>;
  return inner;
}

// 文字遮罩 Reveal
function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : { y: '110%' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
        {text}
      </motion.div>
    </div>
  );
}

// 圖片 3D 視差
function ParallaxImage({ src, alt, height = "h-[520px]" }: { src: string; alt: string; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="relative group" style={{ perspective: '1000px' }}>
      <div className="absolute -inset-4 border border-amber-500/15 rounded-[2.5rem]
                      translate-x-5 translate-y-5
                      transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
      <motion.div
        animate={{ rotateY: tilt.x, rotateX: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`relative ${height} rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-950/60`}
        style={{ transformStyle: 'preserve-3d' }}>
        <img src={src} alt={alt}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0
                     scale-100 group-hover:scale-105 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
      </motion.div>
    </div>
  );
}

// 自訂游標
function CustomCursor({ darkMode }: { darkMode: boolean }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const trailRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,[data-hover]')) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,[data-hover]')) setHovering(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      trailRef.current = {
        x: trailRef.current.x + (posRef.current.x - trailRef.current.x) * 0.12,
        y: trailRef.current.y + (posRef.current.y - trailRef.current.y) * 0.12,
      };
      setTrail({ ...trailRef.current });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const color = darkMode ? '#fbbf24' : '#92400e';

  return (
    <>
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999,
        width: hovering ? 20 : 10, height: hovering ? 20 : 10,
        background: color,
        transform: `translate(-50%, -50%) rotate(45deg)`,
        transition: 'width .15s, height .15s',
        pointerEvents: 'none',
        boxShadow: `0 0 ${hovering ? 14 : 6}px ${color}`,
      }} />
      <div style={{
        position: 'fixed', left: trail.x, top: trail.y, zIndex: 9998,
        width: 30, height: 30,
        border: `1px solid ${color}`,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />
    </>
  );
}

// ─── 主元件 ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { amount: 0.4 });

  // 捲動進度條
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Intro：2 秒後淡出，2.8 秒後卸載
  useEffect(() => {
    const t1 = setTimeout(() => setIntroVisible(false), 2000);
    const t2 = setTimeout(() => setIntroDone(true), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Hero 影片控制
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHeroVisible) videoRef.current.play().catch(() => { });
    else videoRef.current.pause();
  }, [isHeroVisible]);

  // 選單鎖捲動
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Testimonial 輪播
  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIndex(i => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const isDark = darkMode;
  const bg = isDark ? 'bg-stone-950 text-stone-100' : 'bg-amber-50 text-stone-900';
  const navBg = isDark
    ? 'bg-stone-900/70 border-white/[0.12] hover:border-amber-500/30'
    : 'bg-white/85 border-stone-200 hover:border-amber-400/40';
  const altSection = isDark ? 'bg-stone-900/25' : 'bg-amber-100/25';

  return (
    <>
      <CustomCursor darkMode={isDark} />

      {/* ── Intro 動畫 ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={introVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950"
            aria-hidden="true">
            <div className="text-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-28 bg-amber-400 mx-auto mb-8 origin-left"
              />
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className={`${calligraphy} text-5xl text-white`}>
                娃娃古箏
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="text-[10px] tracking-[0.7em] text-amber-400/60 font-serif uppercase mt-5">
                The Art of Guzheng
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-28 bg-amber-400/40 mx-auto mt-8 origin-right"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={`w-full min-h-screen font-serif relative overflow-x-hidden
                    selection:bg-amber-500/30 transition-colors duration-500 ${bg}`}
        style={{ cursor: 'none' }}>

        {/* 捲動進度條 */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-px bg-amber-400 origin-left z-[150]
                     shadow-[0_0_8px_#fbbf24]"
        />

        {/* ── 全域背景 ─────────────────────────────────────────────────────── */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-0 left-[8%] w-px h-full bg-current opacity-[0.025]" />
          <div className="absolute top-0 right-[8%] w-px h-full bg-current opacity-[0.025]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 119px, currentColor 120px)' }}
          />
          {isDark && (
            <>
              <div className="absolute -top-20 -left-20 w-[55%] h-[55%] bg-amber-700/[0.07] blur-[180px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-amber-900/[0.05] blur-[140px] rounded-full" />
            </>
          )}
        </div>

        {/* ── 導覽列 ───────────────────────────────────────────────────────── */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl">
          <div className={`flex justify-between items-center px-8 py-3.5 rounded-full
                          backdrop-blur-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.15)]
                          transition-all duration-300 ${navBg}`}>
            <a href="#" className="flex items-center gap-2.5 group" aria-label="回到頂部">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]
                              group-hover:scale-125 transition-transform" />
              <span className={`${calligraphy} text-lg tracking-widest`}>娃娃古箏</span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`}
                  className="text-[11px] tracking-[0.4em] opacity-55 hover:opacity-100
                             hover:text-amber-400 transition-all duration-200 uppercase font-serif relative group">
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-amber-400/70
                                   transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* 主題切換 */}
              <button
                onClick={() => setDarkMode(!isDark)}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full
                           border border-current opacity-30 hover:opacity-60
                           transition-opacity text-sm"
                aria-label="切換明暗主題"
                style={{ cursor: 'none' }}>
                {isDark ? '☀' : '☾'}
              </button>

              <MagneticButton
                href="#contact"
                className="hidden sm:block px-6 py-2 rounded-full text-[10px] tracking-[0.4em]
                           font-bold font-serif bg-amber-500 text-stone-950
                           hover:bg-amber-400 transition-colors duration-200
                           shadow-[0_0_16px_rgba(245,158,11,0.35)]">
                預約演出
              </MagneticButton>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-1"
                aria-label="開啟選單"
                aria-expanded={menuOpen}
                style={{ cursor: 'none' }}>
                <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-px bg-current block" />
                <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="w-6 h-px bg-current block" />
                <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-px bg-current block" />
              </button>
            </div>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              loop muted playsInline
              preload="none"
              poster={`${sitePath}/hero-poster.jpg`}
              className="w-full h-full object-cover opacity-55 scale-[1.06]">
              <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/55" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: introDone ? 0 : 2.2, duration: 1 }}>

              <div className="inline-flex items-center gap-3 mb-14">
                <div className="h-px w-12 bg-amber-500/50" />
                <span className="text-[10px] tracking-[0.9em] text-amber-300/80 font-serif uppercase">
                  The Art of Guzheng
                </span>
                <div className="h-px w-12 bg-amber-500/50" />
              </div>

              <div className="relative mb-10">
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-px h-10
                                bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
                <h1 className={`${calligraphy} text-7xl md:text-9xl text-white`}>
                  <RevealText text="弦鳴" delay={introDone ? 0.1 : 2.4} />
                  <span className="text-amber-300 ml-4 relative inline-block">
                    <RevealText text="墨韻" delay={introDone ? 0.25 : 2.55} />
                    <span className="absolute -bottom-2 left-0 w-full h-[2px]
                                     bg-gradient-to-r from-amber-400 via-amber-200/80 to-transparent
                                     shadow-[0_0_8px_#f59e0b]" />
                  </span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: introDone ? 0.4 : 2.7, duration: 0.8 }}
                className="text-stone-300 text-base md:text-xl tracking-[0.6em] font-light mb-16 font-serif">
                指尖清風 · 弦音故事
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: introDone ? 0.55 : 2.85, duration: 0.8 }}
                className="flex gap-10 justify-center items-center font-serif">
                <a href="#works"
                  className="group flex items-center gap-3 text-[11px] tracking-[0.5em] text-stone-200
                             border-b border-amber-500/40 pb-2
                             hover:text-amber-400 hover:border-amber-400 transition-all duration-300">
                  欣賞作品
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a href="#contact"
                  className="group flex items-center gap-3 text-[11px] tracking-[0.5em] text-stone-400
                             border-b border-white/15 pb-2
                             hover:text-stone-200 hover:border-white/40 transition-all duration-300">
                  邀約洽談
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5">↘</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* 捲動提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: introDone ? 1 : 3.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.5em] text-stone-500 font-serif uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-stone-500 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* ── 數字統計 ─────────────────────────────────────────────────────── */}
        <section className={`py-20 px-6 ${altSection}`}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center group">
                <div className={`${calligraphy} text-4xl md:text-5xl text-amber-400 mb-2`}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="h-px w-8 bg-amber-500/30 mx-auto mb-3
                                transition-all duration-300 group-hover:w-14 group-hover:bg-amber-400/60" />
                <p className="text-sm tracking-[0.2em] opacity-50 font-serif">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 藝術理念 ─────────────────────────────────────────────────────── */}
        <motion.section
          id="artistry"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-40 px-6 max-w-7xl mx-auto relative">
          <div className="absolute top-20 right-0 w-48 h-48 border-t border-r border-amber-500/[0.07] rounded-tr-[4rem] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <ParallaxImage src={`${sitePath}/guzheng-portrait.jpg`} alt="古箏演奏者肖像" />
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">Philosophy</p>
                <h2 className={`${calligraphy} text-5xl md:text-6xl ${isDark ? 'text-amber-50' : 'text-stone-800'}`}>
                  藝術理念
                </h2>
              </div>
              <LineDecorator />
              <p className="leading-[2.4] text-lg font-light font-serif opacity-75">
                古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
                不僅是技術的傳承，更是心靈的修行，<br />
                讓每一聲震動都成為與空間的對話。
              </p>
              <p className="leading-[2.2] text-base font-light font-serif opacity-45">
                十餘年的演奏歷程，跨越古典與當代的邊界，
                在每個音符之間尋找屬於當下的詮釋。
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── 演奏歷程 ─────────────────────────────────────────────────────── */}
        <section id="journey" className={`py-40 px-6 relative ${altSection}`}>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="order-2 md:order-1">
                <div className="mb-14">
                  <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">Journey</p>
                  <h2 className={`${calligraphy} text-5xl ${isDark ? 'text-amber-50' : 'text-stone-800'}`}>演奏歷程</h2>
                  <LineDecorator />
                </div>
                <div className="relative pl-10 border-l border-amber-500/20 space-y-12">
                  {journeyItems.map((item, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="relative group">
                      <div className="absolute -left-[41px] top-1 w-4 h-4 rotate-45
                                      border border-amber-400/60 bg-stone-950
                                      group-hover:bg-amber-400 group-hover:border-amber-400
                                      transition-all duration-300
                                      group-hover:shadow-[0_0_12px_#fbbf24]" />
                      <span className="block text-amber-400 text-sm tracking-[0.25em] font-bold font-serif mb-2">
                        {item.year}
                      </span>
                      <p className="text-lg font-light font-serif leading-relaxed opacity-75
                                    group-hover:opacity-100 transition-opacity duration-300">
                        {item.event}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="order-1 md:order-2 relative group">
                <div className="absolute -top-5 -right-5 w-24 h-24
                                border-t-2 border-r-2 border-amber-500/40 rounded-tr-3xl
                                transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                <div className="absolute -bottom-5 -left-5 w-24 h-24
                                border-b-2 border-l-2 border-amber-500/40 rounded-bl-3xl
                                transition-all duration-500 group-hover:translate-y-1 group-hover:-translate-x-1" />
                <ParallaxImage src={`${sitePath}/guzheng-banner.jpg`} alt="演奏現場" height="h-[580px]" />
                <div className={`${calligraphy} absolute -bottom-12 right-0 text-amber-500/40 text-2xl tracking-widest`}>
                  Artistry in Motion
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 精選作品 ─────────────────────────────────────────────────────── */}
        <section id="works" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-24">
              <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">Selected Works</p>
              <h2 className={`${calligraphy} text-5xl md:text-6xl tracking-wider ${isDark ? 'text-amber-50' : 'text-stone-800'}`}>
                精選作品
              </h2>
              <div className="flex justify-center mt-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
              {works.map((work, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-amber-500/30
                                  transition-all duration-500 group-hover:w-16 group-hover:h-16" />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-amber-500/30
                                  transition-all duration-500 group-hover:w-16 group-hover:h-16" />

                  <div className="relative aspect-video rounded-2xl overflow-hidden
                                  border border-white/[0.08] bg-stone-900
                                  shadow-xl shadow-stone-950/60
                                  transition-transform duration-500 group-hover:-translate-y-1.5">
                    {work.id.startsWith('YOUTUBE') ? (
                      <div className="w-full h-full flex items-center justify-center bg-stone-900/80">
                        <div className="text-center space-y-3">
                          <div className="w-14 h-14 rounded-full border border-amber-500/40
                                          flex items-center justify-center mx-auto">
                            <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px]
                                            border-transparent border-l-amber-400 ml-1" />
                          </div>
                          <p className="text-stone-500 text-sm font-serif tracking-widest">影片待上傳</p>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${work.id}?rel=0&modestbranding=1&color=white`}
                        title={work.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="mt-6 text-center font-serif space-y-1">
                    <p className="text-xs tracking-[0.4em] text-amber-400/60 uppercase">{work.title}</p>
                    <h3 className={`${calligraphy} text-2xl opacity-75`}>{work.subtitle}</h3>
                    <div className="h-px w-8 bg-amber-900/50 mx-auto mt-3
                                    transition-all duration-300 group-hover:w-14" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <a href={`https://www.youtube.com/@${instagramHandle}`}
                target="_blank" rel="noopener noreferrer"
                className={`${calligraphy} text-xl tracking-widest opacity-40 hover:opacity-80
                            hover:text-amber-400 transition-all duration-300 group inline-flex items-center gap-3`}>
                聆聽更多，請訂閱頻道
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 學員評價 ─────────────────────────────────────────────────────── */}
        <section className={`py-32 px-6 overflow-hidden ${altSection}`}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-16">Testimonials</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8">
                <div className="text-5xl text-amber-400/20 font-serif leading-none select-none">"</div>
                <p className="text-xl md:text-2xl font-light font-serif leading-[2] opacity-80">
                  {testimonials[testimonialIndex].quote}
                </p>
                <div>
                  <p className="text-amber-400 text-sm tracking-[0.3em] font-serif">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-xs tracking-[0.2em] opacity-40 font-serif mt-1">
                    {testimonials[testimonialIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 輪播點 */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  style={{ cursor: 'none' }}
                  className={`w-1.5 h-1.5 rotate-45 transition-all duration-300
                              ${i === testimonialIndex
                      ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-125'
                      : 'bg-current opacity-20 hover:opacity-50'}`}
                  aria-label={`切換到第 ${i + 1} 則評價`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Instagram 動態牆 ─────────────────────────────────────────────── */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14">
              <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">Follow Along</p>
              <a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank" rel="noopener noreferrer"
                className={`${calligraphy} text-3xl md:text-4xl tracking-widest opacity-70
                            hover:opacity-100 hover:text-amber-400 transition-all duration-300`}>
                @{instagramHandle}
              </a>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {instagramPosts.map((post) => (
                <motion.a
                  key={post.id}
                  variants={fadeIn}
                  href={`https://www.instagram.com/${instagramHandle}`}
                  target="_blank" rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden rounded-lg group block">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover
                               grayscale-[30%] group-hover:grayscale-0
                               scale-100 group-hover:scale-110
                               transition-all duration-700" />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/15
                                  transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 聯絡邀約 ─────────────────────────────────────────────────────── */}
        <section id="contact" className="py-40 px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`relative rounded-[3rem] p-12 md:p-20 overflow-hidden
                            border shadow-2xl
                            ${isDark
                ? 'bg-gradient-to-br from-stone-900/50 to-stone-950 border-white/[0.08] shadow-stone-950/60'
                : 'bg-white border-stone-200 shadow-stone-300/40'}`}>
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/[0.07] blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-700/[0.05] blur-[80px] rounded-full pointer-events-none" />

              <div className="text-center mb-16 relative">
                <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">Contact</p>
                <h2 className={`${calligraphy} text-5xl md:text-6xl tracking-wider ${isDark ? 'text-amber-50' : 'text-stone-800'}`}>
                  聯絡邀約
                </h2>
                <div className="flex justify-center mt-6">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
                </div>
              </div>

              <form
                action="#"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-12 max-w-xl mx-auto font-serif relative z-10">
                {[
                  { id: 'name', type: 'text', label: '姓名', placeholder: '您的姓名' },
                  { id: 'email', type: 'email', label: '電子郵件', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <label htmlFor={field.id}
                      className="block text-[10px] tracking-[0.4em] text-amber-400/60 uppercase mb-3">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b border-current py-4 outline-none
                                 text-lg placeholder:opacity-20 opacity-75
                                 focus:border-amber-400 focus:opacity-100
                                 transition-all duration-300 peer" />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-400
                                    transition-all duration-500 peer-focus:w-full shadow-[0_0_8px_#f59e0b]" />
                  </div>
                ))}

                <div className="relative">
                  <label htmlFor="message"
                    className="block text-[10px] tracking-[0.4em] text-amber-400/60 uppercase mb-3">
                    需求說明
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="演出日期、地點、活動類型…"
                    className="w-full bg-transparent border-b border-current py-4 outline-none
                               text-lg placeholder:opacity-20 opacity-75
                               focus:border-amber-400 focus:opacity-100
                               transition-all duration-300 resize-none peer" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-400
                                  transition-all duration-500 peer-focus:w-full shadow-[0_0_8px_#f59e0b]" />
                </div>

                <MagneticButton
                  className="w-full py-6 rounded-full font-bold text-[11px] tracking-[0.5em] font-serif
                             bg-amber-500 text-stone-950 text-center
                             hover:bg-amber-400 active:scale-[0.98]
                             transition-all duration-200
                             shadow-[0_0_24px_rgba(245,158,11,0.3)]
                             hover:shadow-[0_0_36px_rgba(245,158,11,0.45)]">
                  SEND MESSAGE / 傳送訊息
                </MagneticButton>
              </form>
            </div>
          </div>
        </section>

        {/* ── 頁尾 ─────────────────────────────────────────────────────────── */}
        <footer className={`py-20 text-center border-t ${isDark ? 'border-white/[0.05]' : 'border-stone-200'}`}>
          <h3 className={`${calligraphy} text-3xl text-amber-500/60 mb-6`}>娃娃古箏工作室</h3>
          <div className="flex justify-center mb-6">
            <div className="h-px w-16 bg-amber-900/40" />
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase font-serif opacity-30">
            &copy; {new Date().getFullYear()} Yun Qian Co. · Aesthetic of Strings
          </p>
        </footer>

        {/* ── 手機全螢幕選單 ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              className="fixed inset-0 z-[120] bg-stone-950/98 backdrop-blur-3xl
                         flex flex-col items-center justify-center p-12"
              role="dialog"
              aria-modal="true"
              aria-label="導覽選單">
              <button
                onClick={() => setMenuOpen(false)}
                style={{ cursor: 'none' }}
                className="absolute top-10 right-10 text-[10px] tracking-[0.4em]
                           text-stone-400 hover:text-white transition-colors font-serif uppercase"
                aria-label="關閉選單">
                Close ✕
              </button>
              <nav className="flex flex-col items-center gap-12">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={`${calligraphy} text-5xl text-stone-200 hover:text-amber-400 transition-colors duration-300`}>
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <div className="h-px w-12 bg-amber-500/50" />
                <p className="text-stone-600 text-[9px] tracking-[0.4em] font-serif uppercase">娃娃古箏工作室</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
