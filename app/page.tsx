"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Variants, motion, AnimatePresence, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

// 優化：更大膽的線條裝飾組件
const LineDecorator = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="h-[1px] bg-gradient-to-r from-amber-500 to-transparent w-24" />
    <div className="w-2 h-2 rotate-45 border-2 border-amber-400 bg-stone-950 shadow-[0_0_10px_#f59e0b]" />
    <div className="h-[1px] bg-gradient-to-l from-amber-500/40 to-transparent w-12" />
  </div>
);

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.5 });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
    <main className="w-full min-h-screen bg-stone-950 text-stone-100 font-serif relative overflow-x-hidden selection:bg-amber-500/30">

      {/* 1. 增強版背景：明亮的線條網格與光暈 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[10%] w-px h-full bg-white/[0.05]" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-white/[0.05]" />
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-amber-900/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      {/* 2. 導覽列 */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
        <div className="flex justify-between items-center px-10 py-4 rounded-full 
                        bg-stone-900/60 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all hover:border-amber-500/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
            <span className="text-base tracking-[0.5em] font-bold text-white font-calligraphy">古箏手｜娃娃</span>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-xs tracking-[0.4em] text-stone-300 hover:text-amber-400 transition-all uppercase relative group">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hidden sm:block px-8 py-2 bg-amber-500 text-stone-950 font-bold rounded-full text-[11px] tracking-widest hover:bg-white transition-all shadow-xl">
              預約演出
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden flex flex-col gap-2">
              <motion.span animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} className="w-7 h-0.5 bg-white" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-7 h-0.5 bg-white" />
              <motion.span animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} className="w-7 h-0.5 bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 【影片背景與遮罩】 */}
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 scale-105">
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40" />
          <div className="absolute inset-0 bg-stone-950/30" />
        </div>

        {/* 【前景線條與內容】 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          {/* 大膽的幾何線條框架 */}
          <div className="absolute -inset-10 border-t border-r border-amber-600/30 rounded-tr-[5rem] pointer-events-none opacity-60" />
          <div className="absolute -inset-10 border-b border-l border-amber-600/30 rounded-bl-[5rem] pointer-events-none opacity-60" />

          {/* 藝術性細線標籤 */}
          <div className="inline-block relative mb-16">
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-px h-10 bg-amber-500/50" />
            <div className="px-6 py-2 border-2 border-amber-500/50 text-amber-300 text-[11px] tracking-[0.8em] rounded-full backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              THE ART OF GUZHENG
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-px h-10 bg-amber-500/50" />
          </div>

          {/* 【貫穿標題的垂直光線】 */}
          <div className="relative mb-14 py-6">
            {/* 貫穿標題的藝術裝飾線：加長並增加發光感 */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1.5px] h-32 bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]" />

            <h1 className="font-calligraphy text-6xl md:text-9xl text-white italic tracking-[0.1em] skew-x-[-12deg] relative z-10">
              {/* 「弦鳴」：增加一點透明度層次，讓視覺重心在墨韻 */}
              <span className="opacity-90 drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)]">
                弦鳴
              </span>

              {/* 「墨韻」：核心草寫風格，增加金色描邊與流動線條 */}
              <span className="text-amber-400 ml-6 relative inline-block group">
                墨韻

                {/* 底部裝飾：模擬書法收筆的「飛白」線條 */}
                <span className="absolute -bottom-4 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-amber-200 to-transparent shadow-[0_0_12px_#f59e0b]" />

                {/* 額外的動態線條：增加精緻度 */}
                <div className="absolute -right-10 top-1/2 w-16 h-[1px] bg-gradient-to-r from-amber-400/80 to-transparent rotate-[-45deg] opacity-70" />
                <div className="absolute -left-10 bottom-1/2 w-16 h-[1px] bg-gradient-to-l from-amber-400/80 to-transparent rotate-[-45deg] opacity-70" />
              </span>
            </h1>

            {/* 標題下方的副標線條 */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* 字體調整：更大、更清晰 */}
          <p className="text-stone-100 text-xl md:text-3xl tracking-[0.6em] font-light mb-20 opacity-95">
            指尖清風 · 弦音故事
          </p>

          {/* 按鈕設計：更強烈線條與明亮度 */}
          <div className="flex gap-16 justify-center items-center">
            <a href="#works" className="group text-sm tracking-[0.6em] text-white border-b-2 border-amber-500 pb-4 hover:text-amber-300 hover:border-amber-300 transition-all flex items-center gap-5">
              欣賞作品 <span className="text-3xl transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="group text-sm tracking-[0.6em] text-white border-b-2 border-white/20 pb-4 hover:border-amber-500 transition-all flex items-center gap-5">
              邀約洽談 <span className="text-3xl transition-transform group-hover:translate-y-1">↘</span>
            </a>
          </div>
        </motion.div>

        {/* 【更明顯的 SCROLL 提醒】 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 pointer-events-none"
        >
          <span className="text-amber-400 text-xs md:text-base tracking-[0.6em] font-medium opacity-90">SCROLL</span>

          <div className="w-8 h-12 md:w-10 md:h-16 border-2 border-amber-500/40 rounded-full flex justify-center p-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 4. 藝術理念 */}
      <motion.section id="artistry" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-52 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-6 border-2 border-amber-500/20 rounded-[3rem] translate-x-6 translate-y-6 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={`${sitePath}/guzheng-portrait.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="Portrait" />
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="font-calligraphy text-5xl md:text-6xl text-amber-50 italic tracking-widest">藝術理念</h2>
            <LineDecorator />
            <p className="text-stone-300 leading-[2.6] text-xl font-light">
              古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
              不僅是技術的傳承，更是心靈的修行，讓每一聲震動都成為與空間的對話。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. 演奏歷程 */}
      <section id="journey" className="py-52 px-6 bg-stone-900/20 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-16">
                <h2 className="font-calligraphy text-5xl text-amber-50 italic tracking-widest">演奏歷程</h2>
                <LineDecorator />
              </div>
              <div className="space-y-14 border-l-2 border-amber-500/20 pl-10 relative">
                {[
                  { year: "2014", event: "台北市立國樂團 TICC 國際會議廳演出" },
                  { year: "2019", event: "TESLA MODEL 3 新車發表會跨界演出" },
                  { year: "2024", event: "當代劇團《暴風雨》國家劇院巡演樂師" },
                  { year: "2025", event: "江蕙《無·有》小巨蛋演唱會古箏演奏" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative group">
                    <div className="absolute -left-[51px] top-1 w-5 h-5 rotate-45 border-2 border-amber-400 bg-stone-950 group-hover:bg-amber-400 transition-all shadow-[0_0_15px_#f59e0b]" />
                    <span className="text-amber-400 font-bold text-lg tracking-[0.2em]">{item.year}</span>
                    <p className="text-stone-200 text-xl mt-3 font-light group-hover:text-amber-200 leading-relaxed">
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 relative group">
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-amber-500/50 rounded-tr-[3rem]" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-amber-500/50 rounded-bl-[3rem]" />
              <div className="relative h-[650px] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-3xl">
                <img src={`${sitePath}/guzheng-banner.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Performance" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 欣賞作品 (NEW - YouTube 留白設計) */}
      <section id="works" className="py-52 px-6 relative overflow-hidden">
        {/* 背景琴弦裝飾線 */}
        <div className="absolute inset-0 flex flex-col justify-between py-64 pointer-events-none opacity-[0.05]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full h-px bg-white" />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="mb-24">
            <h2 className="font-calligraphy text-5xl md:text-6xl text-amber-50 italic tracking-[0.2em]">精選作品</h2>
            <div className="flex justify-center mt-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* 裝飾 L 線條 */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 group-hover:w-full group-hover:h-full transition-all duration-700" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 group-hover:w-full group-hover:h-full transition-all duration-700" />

                {/* 影片容器 - 16:9 比例 */}
                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-stone-900 border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-950/40">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/影片ID_${i}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                <div className="mt-8 text-left space-y-2">
                  <h3 className="text-amber-200 text-lg tracking-widest font-light">演奏曲目 0{i}</h3>
                  <div className="h-px w-12 bg-amber-800" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24">
            <p className="font-calligraphy text-stone-500 text-xl tracking-widest">聆聽更多，請訂閱頻道</p>
          </div>
        </div>
      </section>

      {/* 7. 聯絡邀約 */}
      <section id="contact" className="py-52 px-6">
        <div className="max-w-5xl mx-auto border-2 border-white/10 rounded-[4rem] p-16 md:p-24 bg-gradient-to-br from-stone-900/40 to-stone-950 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
          <div className="text-center mb-20 relative">
            <h2 className="font-calligraphy text-5xl text-amber-50 italic mb-6">聯絡邀約</h2>
            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </div>
          <form className="space-y-16 max-w-2xl mx-auto">
            <div className="relative group">
              <input type="text" placeholder="您的姓名" className="w-full bg-transparent border-b-2 border-white/10 py-5 outline-none focus:border-amber-400 transition-colors text-white text-xl peer" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 peer-focus:w-full" />
            </div>
            <div className="relative group">
              <input type="email" placeholder="電子郵件" className="w-full bg-transparent border-b-2 border-white/10 py-5 outline-none focus:border-amber-400 transition-colors text-white text-xl peer" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 peer-focus:w-full" />
            </div>
            <textarea rows={3} placeholder="需求說明" className="w-full bg-transparent border-b-2 border-white/10 py-5 outline-none focus:border-amber-400 transition-colors text-white text-xl resize-none" />
            <button className="w-full py-8 bg-white text-stone-950 font-bold text-xs tracking-[0.6em] hover:bg-amber-400 transition-all rounded-full">
              SEND MESSAGE / 傳送訊息
            </button>
          </form>
        </div>
      </section>

      <footer className="py-24 text-center border-t border-white/5">
        <h3 className="font-calligraphy text-3xl text-amber-500/60 mb-8">娃娃古箏工作室</h3>
        <p className="text-stone-500 text-xs tracking-[0.4em] uppercase">
          &copy; {new Date().getFullYear()} Yun Qian Co. | Aesthetic of Strings
        </p>
      </footer>

      {/* 手機選單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[120] bg-stone-950 flex flex-col items-center justify-center">
            <button onClick={() => setIsOpen(false)} className="absolute top-12 right-12 text-white">CLOSE</button>
            <div className="flex flex-col items-center gap-16 font-calligraphy text-5xl">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)}>{link.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}