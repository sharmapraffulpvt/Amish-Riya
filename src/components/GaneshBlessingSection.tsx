import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';

export const GaneshBlessingSection: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="flex flex-col items-center justify-center">

        {/* Ganesha Medallion */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#C9A45C] via-[#FAF3E0] to-[#8C672B] shadow-gold-glow mb-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#350610] flex items-center justify-center border-2 border-[#C9A45C]/80">
            <img
              src="/ganesha-icon.svg"
              alt="Lord Ganesha"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_2px_12px_rgba(201,164,92,0.9)] animate-pulse-slow"
            />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif text-[#C9A45C] tracking-[0.2em] uppercase font-semibold">
          {WEDDING_DATA.mantras.ganeshaMukhya}
        </h2>

        {/* Shloka Box */}
        <div className="my-6 max-w-2xl px-6 py-5 rounded-2xl bg-[#650D1B]/50 border border-[#C9A45C]/50 backdrop-blur-sm shadow-inner">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FAF3E0] leading-relaxed tracking-wide whitespace-pre-line font-medium drop-shadow-md">
            {WEDDING_DATA.mantras.shloka}
          </p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#E8D6A5] font-serif italic max-w-lg mx-auto">
            {t(
              `"${WEDDING_DATA.mantras.shlokaMeaning}"`,
              '"O Ganesha of great stature, brilliant as a million suns — remove all obstacles from my path always."'
            )}
          </p>
        </div>

        {/* Animated Diya */}
        <div className="relative mt-2 flex flex-col items-center">
          <div className="w-4 h-7 bg-gradient-to-t from-[#FF6B00] via-[#FFD000] to-[#FFFFFF] rounded-[50%_50%_35%_35%/60%_60%_40%_40%] animate-diya origin-bottom -mb-1 shadow-[0_0_20px_#FFA500]" />
          <svg className="w-14 h-8 text-[#C9A45C]" viewBox="0 0 100 50" fill="currentColor">
            <ellipse cx="50" cy="15" rx="42" ry="10" fill="#E8D6A5" />
            <path d="M8 15 C8 38 30 45 50 45 C70 45 92 38 92 15 Z" fill="#C9A45C" />
            <rect x="42" y="44" width="16" height="5" rx="2" fill="#8C672B" />
          </svg>
        </div>
      </div>
    </section>
  );
};
