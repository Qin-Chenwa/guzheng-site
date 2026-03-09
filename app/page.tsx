import React from 'react';

export default function HomePage() {
  return (
    // 全站背景改為深石板色 (bg-stone-950)，文字改為淡米色 (text-stone-200)
    <main className="min-h-screen bg-stone-950 text-stone-200 font-serif relative overflow-hidden">
      
      {/* 導覽列 - 透明背景，帶有細微的金色邊框 */}
      <nav className="relative z-10 p-6 flex justify-between items-center border-b border-amber-900/30">
        <div className="text-xl tracking-[0.4em] font-bold text-amber-50">古箏手｜娃娃</div>
        <div className="hidden md:flex space-x-10 text-sm tracking-widest text-stone-300">
          <a href="#about" className="hover:text-amber-400 transition">關於我</a>
          <a href="#works" className="hover:text-amber-400 transition">音樂作品</a>
          <a href="#contact" className="hover:text-amber-400 transition">聯絡邀約</a>
        </div>
      </nav>

      {/* 主視覺區域 (Hero Section) - 左右排版 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* 左側：文字描述區 */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-block px-4 py-1 border border-amber-700/50 text-amber-300 text-xs tracking-widest mb-6 rounded-full">
            GUZHENG ARTIST
          </div>
          <h1 className="text-5xl md:text-6xl font-extralight tracking-tight text-amber-50 leading-tight mb-6">
            弦鳴<span className="font-semibold text-amber-200">墨韻</span><br />
            指尖清風
          </h1>
          <p className="text-stone-400 max-w-md leading-relaxed mb-12 text-base">
            融合傳統民樂的深厚底蘊與現代美學的簡潔靈動。<br />
            在這裡，聽見每一根琴弦訴說的故事。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#works" className="px-10 py-3 bg-amber-800 text-amber-50 hover:bg-amber-700 transition tracking-widest text-sm text-center rounded-sm">
              欣賞最新作品
            </a>
            <a href="#contact" className="px-10 py-3 border border-stone-700 text-stone-300 hover:border-amber-500 hover:text-amber-200 transition tracking-widest text-sm text-center rounded-sm">
              邀約洽談
            </a>
          </div>
        </div>

        {/* 右側：主視覺照片區 (重點調整特效) */}
        <div className="md:col-span-7 flex justify-center items-center relative group">
          
          {/* 【特效 1】裝飾性底層光暈 - 滑鼠移入時會變亮 (group-hover:opacity-40) */}
          <div className="absolute -inset-4 bg-amber-900/10 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
          
          {/* 照片容器 - 加上優雅的木質調邊框與深色陰影 */}
          <div className="relative z-10 w-full max-w-2xl aspect-[4/3] rounded-sm overflow-hidden border-2 border-stone-800 shadow-2xl shadow-black/80 transition-all duration-700 group-hover:border-amber-900/50 group-hover:shadow-amber-950/50">
            
            {/* 【特效 2】圖片本身的縮放特效 (group-hover:scale-105) */}
            {/* 【圖片位置】請將照片放入 public/hero-guzheng.jpg，然後把 src 改為 "/hero-guzheng.jpg" */}
            <img 
              src="/hero-guzheng.jpg" 
              alt="古箏演奏家主視覺" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* 【特效 3】柔和的金色濾鏡遮罩 - 滑鼠移入時淡淡浮現 (group-hover:opacity-10) */}
            <div className="absolute inset-0 bg-amber-300 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"></div>

          </div>
        </div>
      </section>

      {/* 作品預留區 - 稍微淺一點的深色做區隔 */}
      <section id="works" className="relative z-10 py-24 bg-stone-900 px-6 border-t border-amber-900/20">
        <h2 className="text-center text-3xl tracking-[0.3em] mb-16 text-amber-100 font-light">精選作品</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-video bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-600 shadow-xl rounded-sm">
            [ YouTube 影片嵌入位置 ]
          </div>
          <div className="aspect-video bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-600 shadow-xl rounded-sm">
            [ YouTube 影片嵌入位置 ]
          </div>
        </div>
      </section>
      {/* 聯絡邀約區塊 (Contact Section) */}
      <section id="contact" className="relative z-10 py-24 bg-stone-950 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* 左側：公司資訊 */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl tracking-[0.3em] mb-8 text-amber-100 font-light text-center md:text-left">聯絡邀約</h2>
              <p className="text-stone-400 leading-relaxed mb-10 text-center md:text-left">
                無論是商業演出、婚禮雅集、或是古箏教學諮詢，<br />
                歡迎透過以下方式與我聯繫。
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 justify-center md:justify-start">
                  <span className="w-10 h-10 rounded-full border border-amber-900/50 flex items-center justify-center text-amber-500">
                    🏢
                  </span>
                  <div>
                    <p className="text-xs text-stone-500 tracking-widest uppercase">公司名稱</p>
                    <p className="text-stone-200 text-lg">云謙有限公司</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 justify-center md:justify-start">
                  <span className="w-10 h-10 rounded-full border border-amber-900/50 flex items-center justify-center text-amber-500">
                    📞
                  </span>
                  <div>
                    <p className="text-xs text-stone-500 tracking-widest uppercase">聯絡電話</p>
                    <a href="tel:0933215606" className="text-stone-200 text-lg hover:text-amber-400 transition">
                      0933-215-606
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側：聯絡表單 */}
            <div className="bg-stone-900/50 p-8 rounded-sm border border-stone-800 shadow-2xl">
              {/* 注意：action 之後可以填入 Formspree 的 URL */}
              <form action="https://formspree.io/f/你的ID" method="POST" className="space-y-5">
                <div>
                  <label className="block text-xs tracking-widest text-stone-500 mb-2 uppercase">您的姓名</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-stone-950 border border-stone-800 p-3 text-stone-200 focus:outline-none focus:border-amber-700 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-stone-500 mb-2 uppercase">電子郵件</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-stone-950 border border-stone-800 p-3 text-stone-200 focus:outline-none focus:border-amber-700 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-stone-500 mb-2 uppercase">需求說明</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-stone-950 border border-stone-800 p-3 text-stone-200 focus:outline-none focus:border-amber-700 transition"
                    placeholder="請簡述您的邀約內容..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-amber-800 text-amber-50 hover:bg-amber-700 transition tracking-[0.2em] text-sm mt-4"
                >
                  發送訊息
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 border-t border-amber-900/20 text-center">
        <p className="text-stone-600 text-xs tracking-widest">
          &copy; {new Date().getFullYear()} 云謙有限公司. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}