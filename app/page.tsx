"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Variants, motion, AnimatePresence, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

// ─── 設計系統 ────────────────────────────────────────────────────────────────
// 草書標題：統一在此定義，全站唯一使用入口
const calligraphy = "font-calligraphy italic tracking-tighter leading-none";

// 裝飾線：全站統一款式
const LineDecorator = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="h-px w-16 bg-gradient-to-r from-amber-400/80 to-transparent" />
    <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
    <div className="h-px w-8 bg-amber-500/30" />
  </div>
);

// 導覽連結
const navLinks = [
  { name: '藝術理念', id: 'artistry' },
  { name: '演奏歷程', id: 'journey' },
  { name: '精選作品', id: 'works' },
  { name: '聯絡邀約', id: 'contact' },
];

// 演奏歷程資料
const journeyItems = [
  { year: "2014", event: "台北市立國樂團 TICC 國際會議廳演出" },
  { year: "2019", event: "TESLA MODEL 3 新車發表會跨界演出" },
  { year: "2024", event: "當代劇團《暴風雨》國家劇院巡演樂師" },
  { year: "2025", event: "江蕙《無·有》小巨蛋演唱會古箏演奏" },
];

// 精選作品資料：替換為真實影片 ID
const works = [
  { id: "YOUTUBE_ID_1", title: "演奏曲目 01" },
  { id: "YOUTUBE_ID_2", title: "演奏曲目 02" },
];

// ─── 動畫設定 ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── 主元件 ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { amount: 0.4 });

  // Hero 影片：進入視窗才播放，離開暫停
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHeroVisible) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [isHeroVisible]);

  // 開啟選單時鎖定捲動
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <main className="w-full min-h-screen bg-stone-950 text-stone-100 font-serif relative overflow-x-hidden selection:bg-amber-500/30">

      {/* ── 全域背景 ─────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* 架構縱線 */}
        <div className="absolute top-0 left-[8%] w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 right-[8%] w-px h-full bg-white/[0.03]" />
        {/* 琴弦水平線（CSS 取代 map 渲染） */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 119px, rgba(255,255,255,1) 120px)' }} />
        {/* 金色光暈 */}
        <div className="absolute -top-20 -left-20 w-[55%] h-[55%] bg-amber-700/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-amber-900/6 blur-[140px] rounded-full" />
      </div>

      {/* ── 導覽列 ───────────────────────────────────────────────────────────── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl">
        <div className="flex justify-between items-center px-8 py-3.5 rounded-full
                        bg-stone-900/70 backdrop-blur-2xl
                        border border-white/[0.12] hover:border-amber-500/30
                        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                        transition-colors duration-300">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="回到頂部">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] group-hover:scale-125 transition-transform" />
            <span className={`${calligraphy} text-lg text-white tracking-widest`}>娃娃古箏</span>
          </a>

          {/* 桌面連結 */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}
                className="text-[11px] tracking-[0.4em] text-stone-400 hover:text-amber-400 transition-colors duration-200 uppercase font-serif relative group">
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-amber-400/70 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 預約按鈕 + 漢堡 */}
          <div className="flex items-center gap-5">
            <a href="#contact"
              className="hidden sm:block px-6 py-2 rounded-full text-[10px] tracking-[0.4em] font-bold font-serif
                         bg-amber-500 text-stone-950
                         hover:bg-amber-400 transition-colors duration-200
                         shadow-[0_0_16px_rgba(245,158,11,0.35)]">
              預約演出
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="開啟選單"
              aria-expanded={menuOpen}>
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-white block" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-6 h-px bg-white block" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-white block" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 影片背景 */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            loop muted playsInline
            preload="none"
            poster={`${sitePath}/hero-poster.jpg`}
            className="w-full h-full object-cover opacity-60 scale-[1.03]">
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
          </video>
          {/* 漸層遮罩：底部深、頂部淺 */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/50" />
        </div>

        {/* Hero 文字 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          {/* 標籤列 */}
          <div className="inline-flex items-center gap-3 mb-14">
            <div className="h-px w-12 bg-amber-500/50" />
            <span className="text-[10px] tracking-[0.9em] text-amber-300/80 font-serif uppercase">
              The Art of Guzheng
            </span>
            <div className="h-px w-12 bg-amber-500/50" />
          </div>

          {/* 主標題 */}
          <div className="relative mb-10">
            {/* 上方裝飾線 */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-px h-10
                            bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />

            <h1 className={`${calligraphy} text-7xl md:text-9xl text-white`}>
              弦鳴
              <span className="text-amber-300 ml-4 relative inline-block">
                墨韻
                {/* 收筆線 */}
                <span className="absolute -bottom-2 left-0 w-full h-[2px]
                                 bg-gradient-to-r from-amber-400 via-amber-200/80 to-transparent
                                 shadow-[0_0_8px_#f59e0b]" />
              </span>
            </h1>
          </div>

          {/* 副標 */}
          <p className="text-stone-300 text-base md:text-xl tracking-[0.6em] font-light mb-16 font-serif">
            指尖清風 · 弦音故事
          </p>

          {/* CTA 連結 */}
          <div className="flex gap-10 justify-center items-center font-serif">
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
          </div>
        </motion.div>

        {/* 下方捲動提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.5em] text-stone-500 font-serif uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-500 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── 藝術理念 ─────────────────────────────────────────────────────────── */}
      <motion.section
        id="artistry"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-40 px-6 max-w-7xl mx-auto relative">

        {/* 角落裝飾 */}
        <div className="absolute top-20 right-0 w-48 h-48 border-t border-r border-amber-500/[0.07] rounded-tr-[4rem] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* 圖片 */}
          <div className="relative group">
            {/* 偏移裝飾框 */}
            <div className="absolute -inset-4 border border-amber-500/15 rounded-[2.5rem]
                            translate-x-5 translate-y-5
                            transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative h-[520px] rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-950/60">
              <img
                src={`${sitePath}/guzheng-portrait.jpg`}
                className="w-full h-full object-cover
                           grayscale-[20%] group-hover:grayscale-0
                           scale-100 group-hover:scale-105
                           transition-all duration-1000"
                alt="古箏演奏者肖像" />
              {/* 底部漸層 */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
            </div>
          </div>

          {/* 文字 */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">
                Philosophy
              </p>
              <h2 className={`${calligraphy} text-5xl md:text-6xl text-amber-50`}>藝術理念</h2>
            </div>
            <LineDecorator />
            <p className="text-stone-300 leading-[2.4] text-lg font-light font-serif">
              古箏之美，在於指尖與琴弦共鳴的瞬間。<br />
              不僅是技術的傳承，更是心靈的修行，<br />
              讓每一聲震動都成為與空間的對話。
            </p>
            <p className="text-stone-500 leading-[2.2] text-base font-light font-serif">
              十餘年的演奏歷程，跨越古典與當代的邊界，
              在每個音符之間尋找屬於當下的詮釋。
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── 演奏歷程 ─────────────────────────────────────────────────────────── */}
      <section id="journey" className="py-40 px-6 relative">
        {/* 區塊背景 */}
        <div className="absolute inset-0 bg-stone-900/20" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">

            {/* 左：時間軸 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="order-2 md:order-1 space-y-0">
              <div className="mb-14">
                <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">
                  Journey
                </p>
                <h2 className={`${calligraphy} text-5xl text-amber-50`}>演奏歷程</h2>
                <LineDecorator />
              </div>

              {/* 時間軸列表 */}
              <div className="relative pl-10 border-l border-amber-500/20 space-y-12">
                {journeyItems.map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="relative group">
                    {/* 節點菱形 */}
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rotate-45
                                    border border-amber-400/60 bg-stone-950
                                    group-hover:bg-amber-400 group-hover:border-amber-400
                                    transition-all duration-300
                                    shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_12px_#fbbf24]" />
                    <span className="block text-amber-400 text-sm tracking-[0.25em] font-bold font-serif mb-2">
                      {item.year}
                    </span>
                    <p className="text-stone-200 text-lg font-light font-serif leading-relaxed
                                  group-hover:text-amber-100 transition-colors duration-300">
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 右：圖片 */}
            <div className="order-1 md:order-2 relative group">
              {/* 角落線框裝飾 */}
              <div className="absolute -top-5 -right-5 w-24 h-24
                              border-t-2 border-r-2 border-amber-500/40 rounded-tr-3xl
                              transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              <div className="absolute -bottom-5 -left-5 w-24 h-24
                              border-b-2 border-l-2 border-amber-500/40 rounded-bl-3xl
                              transition-all duration-500 group-hover:translate-y-1 group-hover:-translate-x-1" />

              <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden
                              border border-white/[0.08] shadow-2xl shadow-stone-950/60">
                <img
                  src={`${sitePath}/guzheng-banner.jpg`}
                  className="w-full h-full object-cover
                             grayscale-[20%] group-hover:grayscale-0
                             scale-100 group-hover:scale-105
                             transition-all duration-1000"
                  alt="演奏現場" />
                <div className="absolute inset-0 bg-stone-950/15" />
              </div>

              {/* 草書裝飾 */}
              <div className={`${calligraphy} absolute -bottom-12 right-0
                               text-amber-500/40 text-2xl tracking-widest`}>
                Artistry in Motion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 精選作品 ─────────────────────────────────────────────────────────── */}
      <section id="works" className="py-40 px-6 relative bg-stone-950">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* 標題 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-24">
            <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">
              Selected Works
            </p>
            <h2 className={`${calligraphy} text-5xl md:text-6xl text-amber-50 tracking-wider`}>精選作品</h2>
            <div className="flex justify-center mt-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
            </div>
          </motion.div>

          {/* 影片格線 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
            {works.map((work, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative">
                {/* L 形角框 */}
                <div className="absolute -top-4 -left-4 w-12 h-12
                                border-t border-l border-amber-500/30
                                transition-all duration-500 group-hover:w-16 group-hover:h-16" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12
                                border-b border-r border-amber-500/30
                                transition-all duration-500 group-hover:w-16 group-hover:h-16" />

                {/* YouTube iframe */}
                <div className="relative aspect-video rounded-2xl overflow-hidden
                                border border-white/[0.08] bg-stone-900
                                shadow-xl shadow-stone-950/60
                                transition-transform duration-500 group-hover:-translate-y-1">
                  {work.id.startsWith('YOUTUBE') ? (
                    // 佔位（開發時顯示）
                    <div className="w-full h-full flex items-center justify-center bg-stone-900">
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
                      src={`https://www.youtube.com/embed/${work.id}?rel=0`}
                      title={work.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>

                {/* 曲目名稱 */}
                <div className="mt-6 text-center font-serif space-y-2">
                  <h3 className="text-amber-100/80 text-base tracking-[0.3em] font-light">{work.title}</h3>
                  <div className="h-px w-8 bg-amber-900/50 mx-auto
                                  transition-all duration-300 group-hover:w-12" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* 頻道連結 */}
          <div className="mt-24 text-center">
            <a href="https://www.youtube.com/@你的頻道" target="_blank" rel="noopener noreferrer"
              className={`${calligraphy} text-stone-500 text-xl tracking-widest
                          hover:text-amber-400 transition-colors duration-300 group inline-flex items-center gap-3`}>
              聆聽更多，請訂閱頻道
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 聯絡邀約 ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          {/* 玻璃卡片 */}
          <div className="relative rounded-[3rem] p-12 md:p-20
                          bg-gradient-to-br from-stone-900/50 to-stone-950
                          border border-white/[0.08] backdrop-blur-2xl
                          shadow-2xl shadow-stone-950/60 overflow-hidden">
            {/* 內部光暈裝飾 */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-700/6 blur-[80px] rounded-full pointer-events-none" />

            {/* 標題 */}
            <div className="text-center mb-16 relative">
              <p className="text-[10px] tracking-[0.6em] text-amber-400/70 font-serif uppercase mb-4">
                Contact
              </p>
              <h2 className={`${calligraphy} text-5xl md:text-6xl text-amber-50 tracking-wider`}>聯絡邀約</h2>
              <div className="flex justify-center mt-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
              </div>
            </div>

            {/* 表單 */}
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-12 max-w-xl mx-auto font-serif relative z-10">

              {/* 姓名 */}
              <div className="relative group">
                <label htmlFor="name" className="block text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-3">
                  姓名
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="您的姓名"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none
                             text-lg text-white placeholder:text-stone-700
                             focus:border-amber-400 transition-colors duration-300
                             peer" />
                {/* 聚焦動態線 */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-400
                                transition-all duration-500 peer-focus:w-full
                                shadow-[0_0_8px_#f59e0b]" />
              </div>

              {/* Email */}
              <div className="relative group">
                <label htmlFor="email" className="block text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-3">
                  電子郵件
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none
                             text-lg text-white placeholder:text-stone-700
                             focus:border-amber-400 transition-colors duration-300
                             peer" />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-400
                                transition-all duration-500 peer-focus:w-full
                                shadow-[0_0_8px_#f59e0b]" />
              </div>

              {/* 需求說明 */}
              <div className="relative group">
                <label htmlFor="message" className="block text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-3">
                  需求說明
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="演出日期、地點、活動類型…"
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none
                             text-lg text-white placeholder:text-stone-700
                             focus:border-amber-400 transition-colors duration-300
                             resize-none peer" />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-400
                                transition-all duration-500 peer-focus:w-full
                                shadow-[0_0_8px_#f59e0b]" />
              </div>

              {/* 送出按鈕 */}
              <button
                type="submit"
                className="w-full py-6 rounded-full font-bold text-[11px] tracking-[0.5em] font-serif
                           bg-amber-500 text-stone-950
                           hover:bg-amber-400 active:scale-[0.98]
                           transition-all duration-200
                           shadow-[0_0_24px_rgba(245,158,11,0.3)]
                           hover:shadow-[0_0_32px_rgba(245,158,11,0.45)]">
                SEND MESSAGE / 傳送訊息
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── 頁尾 ─────────────────────────────────────────────────────────────── */}
      <footer className="py-20 text-center border-t border-white/[0.05] bg-stone-950">
        <h3 className={`${calligraphy} text-3xl text-amber-500/60 mb-6`}>娃娃古箏工作室</h3>
        <div className="flex justify-center mb-6">
          <div className="h-px w-16 bg-amber-900/40" />
        </div>
        <p className="text-stone-600 text-[10px] tracking-[0.4em] uppercase font-serif">
          &copy; {new Date().getFullYear()} Yun Qian Co. · Aesthetic of Strings
        </p>
      </footer>

      {/* ── 手機全螢幕選單 ───────────────────────────────────────────────────── */}
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

            {/* 關閉按鈕 */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-10 text-[10px] tracking-[0.4em]
                         text-stone-400 hover:text-white transition-colors font-serif uppercase"
              aria-label="關閉選單">
              Close ✕
            </button>

            {/* 選單連結 */}
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

            {/* 底部裝飾 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <div className="h-px w-12 bg-amber-500/50" />
              <p className="text-stone-600 text-[9px] tracking-[0.4em] font-serif uppercase">
                娃娃古箏工作室
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
