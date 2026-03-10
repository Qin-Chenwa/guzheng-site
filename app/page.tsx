"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Variants, motion, AnimatePresence, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false); // 控制手機選單開關
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.5 });
  // 定義一個通用動畫設定，讓捲動浮現效果統一
  // 定義時加上 :Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  useEffect(() => {
    if (isHeroInView && videoRef.current) {
      videoRef.current.currentTime = 0;
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
    <main className="w-full min-h-screen bg-stone-950 text-stone-200 font-serif relative overflow-hidden">
      {/* --- 導覽列容器 --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl">
        <div className="flex justify-between items-center px-6 py-3 rounded-full 
                        bg-stone-950/40 backdrop-blur-xl 
                        border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            <span className="text-lg tracking-[0.4em] font-bold text-amber-50">古箏樂手 | 娃娃</span>
          </div>

          {/* 桌機版選單 (md 以上顯示) */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-xs tracking-[0.3em] text-stone-300 hover:text-amber-400 transition-colors uppercase group relative">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 右側按鈕與漢堡按鈕 (手機版) */}
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block px-5 py-2 bg-amber-600/20 border border-amber-600/50 rounded-full text-xs text-amber-100 tracking-widest hover:bg-amber-600/40 transition-all">
              預約演出
            </a>

            {/* 漢堡按鈕 (md 以下顯示) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-amber-200 rounded-full"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-amber-200 rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-amber-200 rounded-full"
              />
            </button>
          </div>
        </div>
      </nav>
      {/* --- 手機版全螢幕選單 --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-stone-950/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl tracking-[0.5em] text-amber-50 hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 px-10 py-3 bg-amber-800 text-white rounded-full tracking-widest"
              >
                立即預約
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景裝飾光暈 - 增加流動感 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-stone-800/20 blur-[100px] rounded-full pointer-events-none" />

      {/* 導覽列 - 增加毛玻璃效果與圓角 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="flex justify-between items-center px-6 py-3 rounded-full 
                  bg-stone-950/40 backdrop-blur-xl 
                  border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                  transition-all duration-500 hover:border-amber-500/40">

          {/* Logo 區：加入微光特效 */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            <span className="text-lg tracking-[0.4em] font-bold text-amber-50">古箏樂手｜娃娃</span>
          </div>

          {/* 中間導覽選單 (桌機) */}
          <div className="hidden md:flex items-center space-x-10">
            {['artistry', 'journey', 'works', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-xs tracking-[0.3em] text-stone-300 hover:text-amber-400 transition-colors duration-300 relative group uppercase"
              >
                {item === 'artistry' ? '藝術理念' : item === 'journey' ? '演奏歷程' : item === 'works' ? '精選作品' : '聯絡邀約'}
                {/* 下底線動畫 */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 右側：快速預約按鈕 (手機桌機皆見) */}
          <a
            href="#contact"
            className="px-5 py-2 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-600/50 
                 rounded-full text-xs text-amber-100 tracking-widest transition-all duration-300 
                 shadow-[0_0_15px_rgba(180,83,9,0.2)]"
          >
            預約演出
          </a>
        </div>
      </nav>

      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">

        {/* 【影片背景層】 */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
            您的瀏覽器不支援影片播放。
          </video>

          {/* 【漸層遮罩】 - 讓影片稍微變暗，確保文字清晰，並與背景色融合 */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950"></div>
          <div className="absolute inset-0 bg-black/30"></div> {/* 額外加深層 */}
        </div>

        {/* 【文字內容層】 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-block px-6 py-2 border border-amber-500/30 text-amber-200 text-xs tracking-[0.5em] mb-8 rounded-full bg-black/20 backdrop-blur-sm">
            GUZHENG ARTIST
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-9xl tracking-[0.1em] text-white leading-none mb-10 
               drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              弦鳴
              <span className="text-amber-300 italic ml-4 font-bold 
                   drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                墨韻
              </span>
            </h1>
          </motion.div>

          <p className="text-stone-300 max-w-2xl mx-auto leading-loose text-lg md:text-xl font-light tracking-widest mb-12">
            指尖清風，聽見每一根琴弦訴說的故事
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#works" className="px-12 py-4 bg-amber-800 hover:bg-amber-700 text-white transition-all rounded-full shadow-2xl shadow-amber-900/40 tracking-[0.3em] text-sm group">
              欣賞作品
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="px-12 py-4 border border-white/20 hover:border-amber-500/50 hover:bg-white/5 text-white transition-all rounded-full tracking-[0.3em] text-sm backdrop-blur-sm">
              邀約洽談
            </a>
          </div>
        </motion.div>

        {/* 【更明顯的 SCROLL 提醒】 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-amber-400 text-[10px] md:text-sm tracking-[0.4em] font-medium opacity-80">SCROLL</span>

          <div className="w-6 h-10 md:w-8 md:h-14 border border-amber-500/30 rounded-full flex justify-center p-1 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 1. 藝術理念區塊 - 橫幅圓角化 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-32 bg-stone-900/30"
      >
        <section id="artistry" className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl tracking-[0.4em] text-amber-100 mb-4">藝術理念</h2>
            <div className="w-24 h-px bg-amber-800 mx-auto" />
          </motion.div>
          <div className="w-full h-[450px] mb-12 rounded-[3rem] overflow-hidden border border-stone-800 shadow-2xl relative group">
            <img src={`${sitePath}/guzheng-portrait.jpg`} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" alt="藝術理念" />
            <div className="absolute inset-0 bg-stone-950/20" />
          </div>
          <p className="text-stone-300 leading-[2.2] text-xl text-center max-w-3xl mx-auto font-light">
            古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
            不僅是技術的傳承，更是心靈的修行，讓每一聲震動都成為與空間的對話。
          </p>
        </section>
      </motion.section>

      {/* 2. 演奏歷程區塊 - 左右不規則美感 */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-32 bg-stone-900/30"
      >
        <section id="journey" className="py-32 px-6 bg-stone-900/30 rounded-[4rem] mx-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2 h-[600px] rounded-[3rem] overflow-hidden rotate-[-2deg] hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img src={`${sitePath}/guzheng-banner.jpg`} className="w-full h-full object-cover" alt="演奏歷程" />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-4xl tracking-[0.4em] text-amber-100">演奏歷程</h2>
              <div className="space-y-6">
                {[
                  { year: "2014", event: "隨台北市立國樂團於TICC國際會議廳演出【都會女聲】" },
                  { year: "2019", event: "特斯拉-MODEL3 新車發表，古箏xDJ跨界演出開幕秀" },
                  { year: "2024", event: "受邀當代劇團《暴風雨》北中南國家劇院巡演，古箏、古琴樂師" },
                  { year: "2025", event: "邀江蕙2025《無·有》小巨蛋演唱會，古箏樂手" }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 items-start group">
                    <span className="text-amber-600 font-bold mt-1 text-lg">{item.year}</span>
                    <p className="text-stone-300 text-lg group-hover:text-amber-200 transition-colors">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.section>
      {/* 精選作品 - 影片卡片圓角化 */}
      <section id="works" className="py-32 px-6">
        <h2 className="text-center text-4xl tracking-[0.4em] mb-20 text-amber-100">精選作品</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-stone-900 rounded-[2rem] border border-stone-800 flex items-center justify-center text-stone-500 shadow-2xl hover:border-amber-900/50 transition-colors overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-stone-950/50">
                [ YouTube 影片嵌入位置 ]
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 聯絡邀約 - 調整為更溫潤的卡片設計 */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-stone-900/40 backdrop-blur-md rounded-[4rem] p-12 md:p-20 border border-amber-900/10 shadow-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl tracking-[0.4em] mb-8 text-amber-100 text-center md:text-left">聯絡邀約</h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-12 text-center md:text-left">
                期待與您一同創造美好的音樂瞬間。<br />
                無論是商業演出、教學諮詢，歡迎聯繫。
              </p>

              <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: "🏢", label: "公司名稱", value: "云謙有限公司" },
                  { icon: "📞", label: "聯絡電話", value: "0933-215-606", href: "tel:0933215606" },
                  { icon: "📸", label: "Instagram", value: "@wa6018", href: "https://www.instagram.com/wa6018/" },
                  { icon: "💬", label: "Line ID", value: "wa6018" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-6">
                    <span className="w-12 h-12 rounded-2xl bg-stone-950 border border-amber-900/30 flex items-center justify-center text-xl shadow-inner">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-stone-500 tracking-[0.2em] uppercase">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" className="text-stone-200 text-lg hover:text-amber-400 transition">{item.value}</a>
                      ) : (
                        <p className="text-stone-200 text-lg">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-950/50 p-10 rounded-[2.5rem] border border-stone-800 shadow-inner">
              <form action="https://formspree.io/f/你的ID" method="POST" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-stone-500 uppercase ml-2">您的姓名</label>
                  <input type="text" name="name" required className="w-full bg-stone-900/50 rounded-2xl border border-stone-800 p-4 text-stone-200 focus:border-amber-700 transition outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-stone-500 uppercase ml-2">電子郵件</label>
                  <input type="email" name="email" required className="w-full bg-stone-900/50 rounded-2xl border border-stone-800 p-4 text-stone-200 focus:border-amber-700 transition outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-stone-500 uppercase ml-2">需求說明</label>
                  <textarea name="message" rows={4} required className="w-full bg-stone-900/50 rounded-2xl border border-stone-800 p-4 text-stone-200 focus:border-amber-700 transition outline-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-amber-800 hover:bg-amber-700 text-amber-50 rounded-full transition tracking-[0.3em] text-sm shadow-lg shadow-amber-900/30">
                  發送訊息
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center opacity-40">
        <p className="text-stone-500 text-xs tracking-widest">
          &copy; {new Date().getFullYear()} 云謙有限公司. <br className="md:hidden" /> All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}