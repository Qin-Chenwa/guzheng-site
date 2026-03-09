"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sitePath = "/guzheng-site";

export default function HomePage() {
  // 1. 建立影片的引用與偵測
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { amount: 0.5 }); // 當 Hero 顯示超過 50% 時

  // 2. 當回到 Hero 區域時，重新播放影片
  useEffect(() => {
    if (isHeroInView && videoRef.current) {
      videoRef.current.currentTime = 0; // 重頭開始
      videoRef.current.play();
    }
  }, [isHeroInView]);
  return (
    <main className="min-h-screen bg-stone-950 text-stone-200 font-serif relative overflow-hidden">

      {/* 主視覺區域 (Hero) */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden"
      >
        {/* 【影片背景層】 */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
          </video>

          {/* 漸層遮罩層 */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* 【內容層】 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-block px-6 py-2 border border-amber-500/30 text-amber-200 text-xs tracking-[0.6em] mb-8 rounded-full bg-black/40 backdrop-blur-md">
            GUZHENG ARTIST
          </div>
          <h1 className="text-6xl md:text-9xl font-extralight tracking-[0.2em] text-white leading-tight mb-8 drop-shadow-2xl">
            弦鳴<span className="font-semibold text-amber-300 italic">墨韻</span>
          </h1>
        </motion.div>

        {/* 【更明顯的 SCROLL 提醒】 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-amber-400 text-sm tracking-[0.4em] font-medium drop-shadow-md">SCROLL</span>

          {/* 動態滾動條容器 */}
          <div className="w-8 h-14 border-2 border-amber-500/50 rounded-full flex justify-center p-1 backdrop-blur-sm">
            {/* 滾動的小球動畫 */}
            <motion.div
              animate={{
                y: [0, 24, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-3 bg-amber-400 rounded-full"
            />
          </div>

          {/* 向下的光影延伸線 */}
          <motion.div
            animate={{ height: [40, 80, 40] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[2px] bg-gradient-to-b from-amber-400 to-transparent opacity-60"
          />
        </motion.div>
      </section>
      {/* 導覽列 - 增加毛玻璃效果與圓角 */}
      <nav className="sticky top-4 z-50 mx-auto max-w-4xl mt-4 px-8 py-4 flex justify-between items-center bg-stone-900/60 backdrop-blur-md rounded-full border border-amber-900/20 shadow-lg">
        <div className="text-xl tracking-[0.4em] font-bold text-amber-50">古箏手｜娃娃</div>
        <div className="hidden md:flex space-x-10 text-sm tracking-widest text-stone-300">
          <a href="#artistry" className="hover:text-amber-400 transition">藝術理念</a>
          <a href="#journey" className="hover:text-amber-400 transition">演奏歷程</a>
          <a href="#works" className="hover:text-amber-400 transition">音樂作品</a>
          <a href="#contact" className="hover:text-amber-400 transition">聯絡邀約</a>
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

          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.2em] text-white leading-tight mb-8">
            弦鳴<span className="font-semibold text-amber-200 italic">墨韻</span>
          </h1>

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

        {/* 【下捲提醒指標】 */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-amber-200/50 text-xs tracking-widest flex flex-col items-center gap-2"
        >
          <span>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* 1. 藝術理念區塊 - 橫幅圓角化 */}
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

      {/* 2. 演奏歷程區塊 - 左右不規則美感 */}
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