"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Variants, motion, AnimatePresence, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

// 定義通用組件：設計感裝飾線條
const LineDecorator = () => (
  <div className="flex items-center gap-3 my-8 opacity-60">
    <div className="h-[0.5px] bg-amber-600/60 w-16" />
    <div className="w-1.5 h-1.5 rotate-45 border border-amber-600/40" />
    <div className="h-[0.5px] bg-amber-600/20 w-8" />
  </div>
);

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.5 });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  useEffect(() => {
    if (isHeroInView && videoRef.current) {
      videoRef.current.play();
    }
  }, [isHeroInView]);

  const navLinks = [
    { name: '藝術理念', id: 'artistry' },
    { name: '演奏歷程', id: 'journey' },
    { name: '精選作品', id: 'works' },
    { name: '聯絡邀約', id: 'contact' },
  ];

  return (
    <main className="w-full min-h-screen bg-stone-950 text-stone-200 font-serif relative overflow-x-hidden selection:bg-amber-900/30">

      {/* 1. 背景裝飾線條與光暈 - 增加空間深度 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-amber-900/5 blur-[120px] rounded-full" />
      </div>

      {/* 2. 導覽列 - 膠囊設計 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl">
        <div className="flex justify-between items-center px-8 py-3 rounded-full 
                        bg-stone-950/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            <span className="text-sm tracking-[0.4em] font-bold text-amber-50 font-calligraphy">古箏手｜娃娃</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-[10px] tracking-[0.3em] text-stone-400 hover:text-amber-200 transition-colors uppercase relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block px-6 py-1.5 bg-amber-600/10 border border-amber-600/30 rounded-full text-[10px] text-amber-200 tracking-widest hover:bg-amber-600/20 transition-all">
              預約
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5">
              <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-px bg-amber-200" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-px bg-amber-200" />
              <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-px bg-amber-200" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section - 書寫草寫美學 */}
      <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950" />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="relative z-10 text-center px-6">
          <div className="inline-block px-4 py-1 border border-amber-500/20 text-amber-500/80 text-[10px] tracking-[0.6em] mb-12 rounded-full backdrop-blur-sm">
            GUZHENG ARTISTRY
          </div>

          <div className="relative mb-8">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-8 bg-amber-500/30" />
            <h1 className="font-calligraphy text-6xl md:text-9xl text-white italic tracking-tighter skew-x-[-6deg] drop-shadow-2xl">
              弦鳴<span className="text-amber-400 ml-4 relative">墨韻
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
              </span>
            </h1>
          </div>

          <p className="text-stone-400 text-sm md:text-lg tracking-[0.3em] font-light mb-12">
            指尖清風 · 聽見弦音裡的故事
          </p>

          <div className="flex gap-8 justify-center items-center">
            <a href="#works" className="text-[10px] tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-amber-500 transition-all">欣賞作品</a>
            <a href="#contact" className="text-[10px] tracking-[0.4em] text-white border-b border-white/20 pb-2 hover:border-amber-500 transition-all">邀約洽談</a>
          </div>
        </motion.div>
      </section>

      {/* 4. 藝術理念 - 線條與框架 */}
      <motion.section id="artistry" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-40 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-amber-600/10 rounded-[2rem] translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden border border-white/5">
              <img src={`${sitePath}/guzheng-portrait.jpg`} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" alt="Portrait" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-calligraphy text-4xl text-amber-100 italic">藝術理念</h2>
            <LineDecorator />
            <p className="text-stone-400 leading-[2.4] text-lg font-light">
              古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
              不僅是技術的傳承，更是心靈的修行，讓每一聲震動都成為與空間的對話。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. 演奏歷程 - 樂譜感設計 */}
      <section id="journey" className="py-40 px-6 bg-stone-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-calligraphy text-4xl text-amber-100 italic">演奏歷程</h2>
            <div className="h-px w-20 bg-amber-900/50 mx-auto mt-6" />
          </div>
          <div className="space-y-12 border-l border-white/5 pl-8 md:pl-20 relative">
            {[
              { year: "2014", event: "台北市立國樂團 TICC 國際會議廳演出" },
              { year: "2019", event: "TESLA MODEL 3 新車發表會跨界演出" },
              { year: "2024", event: "當代劇團《暴風雨》國家劇院巡演樂師" },
              { year: "2025", event: "江蕙《無·有》小巨蛋演唱會古箏演奏" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative group">
                <div className="absolute -left-[37px] md:-left-[85px] top-2 w-3 h-3 rotate-45 border border-amber-500/50 bg-stone-950 group-hover:bg-amber-500 transition-colors" />
                <span className="text-amber-600/80 font-bold text-sm tracking-widest">{item.year}</span>
                <p className="text-stone-300 text-lg mt-2 font-light group-hover:text-amber-100 transition-colors">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 聯絡邀約 - 樂譜線條表單 */}
      <section id="contact" className="py-40 px-6">
        <div className="max-w-4xl mx-auto border border-white/5 rounded-[3rem] p-12 md:p-20 bg-stone-900/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-amber-500/20 rounded-tr-[3rem]" />

          <h2 className="font-calligraphy text-4xl text-amber-100 italic mb-12 text-center">聯絡邀約</h2>

          <form action="#" className="space-y-12">
            <div className="relative">
              <input type="text" placeholder="您的姓名" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-600 text-stone-200" />
              <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-500 peer-focus:w-full" />
            </div>
            <div className="relative">
              <input type="email" placeholder="電子郵件" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-600 text-stone-200" />
            </div>
            <div className="relative">
              <textarea rows={3} placeholder="需求說明" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-600 text-stone-200 resize-none" />
            </div>

            <button className="w-full py-6 border border-amber-600/30 text-amber-200 text-[10px] tracking-[0.5em] hover:bg-amber-600/10 transition-all rounded-full uppercase">
              發送訊息 / SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

      <footer className="py-20 text-center">
        <div className="h-px w-10 bg-amber-900/30 mx-auto mb-8" />
        <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} Yun Qian Co. / Designed for Artistry
        </p>
      </footer>

      {/* 手機選單抽屜 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-stone-950 flex items-center justify-center">
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-stone-400">CLOSE</button>
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)} className="font-calligraphy text-4xl text-stone-200 hover:text-amber-400 transition-colors">{link.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}