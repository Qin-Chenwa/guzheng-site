"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Variants, motion, AnimatePresence, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

// 定義通用組件：更大膽的線條裝飾，增加明亮度
const LineDecorator = () => (
  <div className="flex items-center gap-4 my-8 relative">
    {/* 金屬質感漸層線 */}
    <div className="h-[1px] bg-gradient-to-r from-amber-400 via-amber-200 to-transparent w-28 shadow-[0_0_8px_#f59e0b]" />
    {/* 發光的鑽石節點 */}
    <div className="w-2.5 h-2.5 rotate-45 border-2 border-amber-300 bg-stone-950 shadow-[0_0_12px_#fbbf24]" />
    <div className="h-[1px] bg-gradient-to-l from-amber-500/50 to-transparent w-16" />
  </div>
);

// 定義狂草字體的專用樣式類別 (關鍵！)
const wildCalligraphy = "font-calligraphy italic tracking-tighter skew-x-[-8deg] leading-none drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)]";

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

      {/* 1. 背景裝飾線條與光暈 - 增強明亮度與線條結構 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 明亮的縱向架構線 */}
        <div className="absolute top-0 left-[10%] w-px h-full bg-white/[0.04]" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-white/[0.04]" />

        {/* 動態金色光流 - 增加亮度 */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-amber-900/10 blur-[130px] rounded-full" />

        {/* 背景極細網格 - 增加現代線條感 */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      {/* 2.導覽列 */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
        <div className="flex justify-between items-center px-10 py-4 rounded-full 
                        bg-stone-900/60 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all hover:border-amber-500/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
            <span className={`${wildCalligraphy} text-xl tracking-widest text-white`}>娃娃古箏</span>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-xs tracking-[0.4em] text-stone-300 hover:text-amber-400 transition-all uppercase relative group font-serif">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hidden sm:block px-8 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-full text-[11px] tracking-widest hover:bg-white hover:text-stone-950 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] font-serif">
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

      {/* 3. Hero Section - 草寫標題與線條交織 */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 scale-105">
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-center px-6">
          <div className="inline-block px-6 py-1.5 border-2 border-amber-500/40 text-amber-300 text-[11px] tracking-[0.8em] mb-16 rounded-full bg-stone-950/50 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] font-serif">
            THE ART OF GUZHENG
          </div>

          {/* 貫穿標題的垂直線條 */}
          <div className="relative mb-12 py-8 group">
            {/* 貫穿標題的藝術裝飾線：加長並增加發光感 */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]" />

            <h1 className={`${wildCalligraphy} text-6xl md:text-8xl text-white relative z-10`}>
              {/* 「弦鳴」：草寫風格強化 */}
              <span className="opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                弦鳴
              </span>

              {/* 「墨韻」：核心草寫風格，增加金色描邊與流動線條 */}
              <span className="text-amber-300 ml-6 relative inline-block group">
                墨韻
                {/* 底部收筆「飛白」線條 */}
                <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-amber-200 to-transparent shadow-[0_0_12px_#f59e0b] group-hover:w-[110%] transition-all duration-700" />
                {/* 提筆「鋒芒」線條 */}
                <div className="absolute -right-10 top-1/ peer-w-16 h-[1px] bg-gradient-to-r from-amber-400/80 to-transparent rotate-[-45deg] opacity-70 transition-transform group-hover:scale-110" />
              </span>
            </h1>

            {/* 標題下方的副標線條 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <p className="text-stone-200 text-lg md:text-2xl tracking-[0.5em] font-light mb-16 opacity-95 font-serif">
            指尖清風 · 弦音故事
          </p>

          <div className="flex gap-12 justify-center items-center font-serif">
            <a href="#works" className="group text-xs tracking-[0.5em] text-white border-b-2 border-amber-500/50 pb-3 hover:text-amber-400 transition-all flex items-center gap-4">
              欣賞作品 <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="group text-xs tracking-[0.5em] text-white border-b-2 border-white/20 pb-3 hover:border-amber-500 transition-all flex items-center gap-4">
              邀約洽談 <span className="text-xl transition-transform group-hover:translate-y-1">↘</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* 4. 藝術理念 - 強化框架線條 */}
      <motion.section id="artistry" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-52 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-amber-600/[0.08] rounded-tr-[5rem] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative group">
            {/* 大膽的裝飾邊框 */}
            <div className="absolute -inset-6 border-2 border-amber-500/20 rounded-[3rem] translate-x-6 translate-y-6 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-3xl">
              <img src={`${sitePath}/guzheng-portrait.jpg`} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Portrait" />
            </div>
          </div>
          <div className="space-y-10">
            <h2 className={`${wildCalligraphy} text-5xl md:text-6xl text-amber-50 Tracking-wider`}>藝術理念</h2>
            <LineDecorator />
            <p className="text-stone-300 leading-[2.6] text-xl font-light font-serif">
              古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
              不僅是技術的傳承，更是心靈的修行，讓每一聲震動都成為與空間的對話。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. 演奏歷程 - 左右圖文對照設計 */}
      <section id="journey" className="py-52 px-6 bg-stone-900/30 relative">
        {/* 背景琴弦裝飾線 */}
        <div className="absolute inset-0 flex flex-col justify-between py-64 pointer-events-none opacity-[0.04]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-full h-px bg-white" />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* 左側：文字歷程 */}
            <div className="order-2 md:order-1 space-y-16">
              <div className="mb-12">
                <h2 className={`${wildCalligraphy} text-5xl text-amber-50`}>演奏歷程</h2>
                <LineDecorator />
              </div>
              <div className="space-y-14 border-l-2 border-amber-500/20 pl-10 relative">
                {[
                  { year: "2014", event: "台北市立國樂團 TICC 國際會議廳演出" },
                  { year: "2019", event: "TESLA MODEL 3 新車發表會跨界演出" },
                  { year: "2024", event: "當代劇團《暴風雨》國家劇院巡演樂師" },
                  { year: "2025", event: "江蕙《無·有》小巨蛋演唱會古箏演奏" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative group font-serif">
                    {/* 節點裝飾線條 - 強化發光 */}
                    <div className="absolute -left-[51px] top-1.5 w-5 h-5 rotate-45 border-2 border-amber-400 bg-stone-950 group-hover:bg-amber-400 transition-all shadow-[0_0_15px_#f59e0b]" />
                    <span className="text-amber-400 font-bold text-lg tracking-[0.2em]">{item.year}</span>
                    <p className="text-stone-200 text-xl mt-3 font-light group-hover:text-amber-100 transition-colors leading-relaxed">
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 右側：歷程圖片 */}
            <div className="order-1 md:order-2 relative group">
              {/* 大膽的金屬質感邊框 */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-amber-500/50 rounded-tr-[3rem] transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-amber-500/50 rounded-bl-[3rem] transition-transform group-hover:-translate-x-2 group-hover:translate-y-2" />

              <div className="relative h-[650px] rounded-[3rem] overflow-hidden shadow-3xl border-2 border-white/10">
                <img src={`${sitePath}/guzheng-banner.jpg`} className="w-full h-full object-cover transition-all duration-1000 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105" alt="Performance" />
                <div className="absolute inset-0 bg-stone-950/20" />
              </div>
              {/* 裝飾草寫文字 */}
              <div className={`${wildCalligraphy} absolute -bottom-16 right-0 text-amber-500/60 text-3xl italic tracking-widest`}>
                Artistry in Motion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 欣賞作品 - 琴弦留白與 YouTube 容器 */}
      <section id="works" className="py-52 px-6 relative overflow-hidden bg-stone-950">
        {/* 背景琴弦裝飾細線 - 樂譜感 */}
        <div className="absolute inset-0 flex flex-col justify-between py-64 pointer-events-none opacity-[0.03]">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-full h-px bg-white" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-28">
            <h2 className={`${wildCalligraphy} text-5xl md:text-6xl text-amber-50 tracking-wider`}>精選作品</h2>
            <div className="flex justify-center mt-8">
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_10px_#f59e0b]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
            {/* 貫穿中間的裝飾垂直線 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-white/[0.03] hidden md:block" />

            {[1, 2].map((i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative">
                {/* 裝飾線條 L 形框架 */}
                <div className="absolute -top-5 -left-5 w-16 h-16 border-t border-l border-amber-600/30 group-hover:w-20 group-hover:h-20 transition-all duration-500" />
                <div className="absolute -bottom-5 -right-5 w-16 h-16 border-b border-r border-amber-600/30 group-hover:w-20 group-hover:h-20 transition-all duration-500" />

                {/* YouTube 容器 */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-stone-900 border border-white/10 shadow-3xl shadow-amber-950/20 group-hover:shadow-amber-900/30 transition-all duration-500 group-hover:-translate-y-2">
                  <div className="w-full h-full flex items-center justify-center bg-stone-950/50">
                    {/* YouTube 嵌入位置：替換 src 為真實網址 */}
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/影片ID"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                {/* 曲目資訊 - 宋體 */}
                <div className="mt-8 text-center space-y-2 font-serif">
                  <h3 className="text-amber-100 text-lg md:text-xl tracking-widest font-light">演奏曲目 0{i}</h3>
                  <div className="h-px w-12 bg-amber-900/60 mx-auto group-hover:w-16 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <a href="你的頻道網址" target="_blank" className="font-calligraphy text-stone-500 text-2xl tracking-widest italic hover:text-amber-400 transition">
              聆聽更多，請訂閱頻道
            </a>
          </div>
        </div>
      </section>

      {/* 7. 聯絡邀約 - 明亮玻璃擬態 */}
      <section id="contact" className="py-52 px-6">
        <div className="max-w-5xl mx-auto border-2 border-white/10 rounded-[4rem] p-16 md:p-24 bg-gradient-to-br from-stone-900/40 to-stone-950 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full" />

          <div className="text-center mb-20 relative">
            <h2 className={`${wildCalligraphy} text-5xl md:text-6xl text-amber-50tracking-wider`}>聯絡邀約</h2>
            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto shadow-[0_0_10px_#f59e0b]" />
          </div>

          <form action="#" className="space-y-16 max-w-2xl mx-auto font-serif relative z-10">
            {[{ type: 'text', placeholder: '您的姓名' }, { type: 'email', placeholder: '電子郵件' }].map((field, idx) => (
              <div key={idx} className="relative group">
                <input type={field.type} placeholder={field.placeholder} className="w-full bg-transparent border-b-2 border-white/10 py-5 outline-none focus:border-amber-400 transition-colors placeholder:text-stone-600 text-xl text-white peer" />
                {/* 聚焦時的動態線條 */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#f59e0b]" />
              </div>
            ))}
            <div className="relative group">
              <textarea rows={3} placeholder="需求說明" className="w-full bg-transparent border-b-2 border-white/10 py-5 outline-none focus:border-amber-400 transition-colors placeholder:text-stone-600 text-xl text-white peer resize-none" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#f59e0b]" />
            </div>

            <button className="w-full py-8 bg-white text-stone-950 font-bold text-xs tracking-[0.6em] hover:bg-amber-400 transition-all rounded-full shadow-xl active:scale-95 shadow-amber-950/20">
              SEND MESSAGE / 傳送訊息
            </button>
          </form>
        </div>
      </section>

      <footer className="py-24 text-center border-t border-white/5 bg-stone-950">
        <h3 className={`${wildCalligraphy} text-4xl text-amber-500/70 mb-8`}>娃娃古箏工作室</h3>
        <p className="text-stone-500 text-xs tracking-[0.4em] uppercase font-serif">
          &copy; {new Date().getFullYear()} Yun Qian Co. | Aesthetic of Strings
        </p>
      </footer>

      {/* 手機選單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-0 z-[120] bg-stone-950/95 backdrop-blur-3xl flex items-center justify-center p-12">
            <button onClick={() => setIsOpen(false)} className="absolute top-12 right-12 text-white text-sm tracking-widest font-bold">CLOSE</button>
            <div className="flex flex-col items-center gap-16">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)} className={`${wildCalligraphy} text-6xl text-stone-100 hover:text-amber-400 transition-colors`}>{link.name}</a>
              ))}
              <div className="h-px w-20 bg-amber-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}