"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const sitePath = "/guzheng-site";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

export default function HomePage() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "藝術理念", id: "artistry" },
    { name: "演奏歷程", id: "journey" },
    { name: "精選作品", id: "works" },
    { name: "聯絡邀約", id: "contact" }
  ];

  return (
    <main className="bg-stone-950 text-stone-200 min-h-screen font-serif relative overflow-hidden">

      {/* 水墨光暈 */}
      <div className="absolute inset-0 pointer-events-none
      bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_60%)]"/>

      {/* decorative blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-stone-800/20 blur-[120px] rounded-full" />


      {/* NAVBAR */}

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50">

        <div className="flex justify-between items-center
        px-6 py-3
        rounded-full
        backdrop-blur-xl
        bg-stone-950/50
        border border-amber-500/20
        shadow-[0_10px_60px_rgba(251,191,36,0.15)]">

          <div className="flex items-center gap-3">

            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />

            <span className="text-lg tracking-[0.4em] text-amber-100">
              古箏樂手｜娃娃
            </span>

          </div>

          <div className="hidden md:flex space-x-10">

            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-xs tracking-[0.3em] text-stone-300
                hover:text-amber-400 transition relative group uppercase"
              >

                {link.name}

                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />

              </a>
            ))}

          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-amber-200 text-xl"
          >
            ☰
          </button>

        </div>

      </nav>


      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >

            <div className="flex flex-col gap-10">

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl tracking-[0.5em] text-amber-50 hover:text-amber-400"
                >
                  {link.name}
                </motion.a>
              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* HERO */}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${sitePath}/hero-video.mp4`} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/40 to-stone-950" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative text-center px-6"
        >

          <div className="mb-10 inline-block px-6 py-2 border border-amber-500/30
          text-xs tracking-[0.5em] text-amber-200 rounded-full">

            GUZHENG ARTIST

          </div>

          <h1 className="text-4xl md:text-6xl text-white mb-8 tracking-[0.3em]">

            弦鳴
            <span className="text-amber-300 italic ml-4">
              墨韻
            </span>

          </h1>

          <p className="text-stone-300 max-w-xl mx-auto text-lg leading-loose">

            指尖清風，聽見每一根琴弦訴說的故事

          </p>

        </motion.div>

      </section>


      {/* 分隔線 */}

      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent my-32" />


      {/* ARTISTRY */}

      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        id="artistry"
        className="px-6 pb-32 max-w-6xl mx-auto text-center"
      >

        <h2 className="text-4xl tracking-[0.4em] text-amber-100 mb-16">
          藝術理念
        </h2>

        <p className="text-lg text-stone-300 max-w-3xl mx-auto leading-[2.2]">

          古箏之美，在於指尖與琴弦共鳴的瞬間。
          不僅是技術的傳承，更是心靈的修行，
          讓每一聲震動都成為與空間的對話。

        </p>

      </motion.section>


      {/* WORKS */}

      <section id="works" className="px-6 pb-32">

        <h2 className="text-center text-4xl tracking-[0.4em] text-amber-100 mb-20">

          精選作品

        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {[1, 2].map(i => (
            <div
              key={i}
              className="aspect-video rounded-[2rem]
              overflow-hidden
              border border-stone-800
              hover:-translate-y-2
              hover:border-amber-900/40
              transition-all
              hover:shadow-2xl hover:shadow-amber-900/30"
            >

              <div className="w-full h-full flex items-center justify-center bg-stone-900">

                YouTube 影片

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* CONTACT */}

      <section id="contact" className="px-6 pb-32">

        <div className="max-w-5xl mx-auto
        bg-stone-900/40
        backdrop-blur-xl
        rounded-[3rem]
        p-16
        border border-amber-900/20">

          <h2 className="text-center text-4xl text-amber-100 tracking-[0.4em] mb-12">

            聯絡邀約

          </h2>

          <div className="text-center text-stone-300 space-y-4">

            <p>公司名稱：云謙有限公司</p>

            <p>
              電話：
              <a href="tel:0933215606" className="text-amber-300 hover:text-amber-400">
                0933-215-606
              </a>
            </p>

            <p>
              Instagram：
              <a href="https://instagram.com/wa6018" className="text-amber-300">
                @wa6018
              </a>
            </p>

            <p>Line ID：wa6018</p>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="py-16 text-center opacity-40">

        <p className="text-xs tracking-widest text-stone-500">

          © {new Date().getFullYear()} 云謙有限公司

        </p>

      </footer>

    </main>
  );
}