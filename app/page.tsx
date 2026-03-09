"use client"; // 使用動畫需要這行
import React from 'react';
import { motion } from 'framer-motion';

const sitePath = "/guzheng-site";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-200 font-serif relative overflow-hidden">

      {/* 背景裝飾光暈 - 增加流動感 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-stone-800/20 blur-[100px] rounded-full pointer-events-none" />

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

      {/* 主視覺區域 (Hero) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="inline-block px-4 py-1 border border-amber-700/50 text-amber-300 text-xs tracking-widest mb-6 rounded-full bg-amber-900/10">
            GUZHENG ARTIST
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-amber-50 leading-tight mb-8">
            弦鳴<span className="font-semibold text-amber-200 italic">墨韻</span><br />
            <span className="text-4xl md:text-5xl opacity-80">指尖清風</span>
          </h1>
          <p className="text-stone-400 max-w-md leading-relaxed mb-10 text-lg italic">
            「融合傳統底蘊，聽見每一根琴弦訴說的故事。」
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#works" className="px-10 py-3 bg-amber-800 hover:bg-amber-700 text-amber-50 transition rounded-full shadow-lg shadow-amber-900/20 tracking-widest">
              欣賞作品
            </a>
            <a href="#contact" className="px-10 py-3 border border-stone-700 hover:border-amber-500 transition rounded-full tracking-widest text-stone-300">
              邀約洽談
            </a>
          </div>
        </motion.div>

        {/* 右側：主視覺照片區 - 增加平滑的圓角 */}
        <div className="md:col-span-7 flex justify-center items-center relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-2xl aspect-[4/3] rounded-[2rem] overflow-hidden border border-stone-800 shadow-2xl transition-all duration-700 group-hover:shadow-amber-900/20"
          >
            <img
              src={`${sitePath}/hero-guzheng.jpg`}
              alt="主視覺"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent opacity-60" />
          </motion.div>
        </div>
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
                { year: "2020", event: "舉辦個人首場古箏音樂會《琴鳴》" },
                { year: "2022", event: "獲選為年度傑出演奏家，跨界參與現代舞劇配樂" },
                { year: "2024", event: "受邀至國際藝術節演出，推廣新民樂美學" }
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
                  { icon: "💬", label: "Line ID", value: "0933215606" }
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