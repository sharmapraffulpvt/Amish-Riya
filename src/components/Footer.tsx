import React from 'react';
import { Heart, Sparkles, BookOpen, Download } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface FooterProps {
  onOpenCardViewer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCardViewer }) => {
  const { t } = useLang();

  const handleOpenOriginals = () => {
    soundManager.playClick();
    onOpenCardViewer();
  };

  return (
    <footer className="relative mt-20 pt-16 pb-24 border-t-2 border-[#C9A45C]/40 bg-gradient-to-b from-[#350610] to-[#1F0309] text-center px-4 overflow-hidden">
      
      {/* Decorative Arch line */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        
        {/* Sacred Ganesha icon */}
        <div className="w-16 h-16 rounded-full bg-[#350610] border border-[#C9A45C] p-2 mb-4 flex items-center justify-center shadow-gold-glow">
          <img src="/ganesha-icon.svg" alt="Lord Ganesha" className="w-10 h-10 object-contain" />
        </div>

        <p className="text-sm sm:text-base font-serif uppercase tracking-[0.25em] font-semibold text-[#C9A45C] mb-2">
          {WEDDING_DATA.mantras.ganeshaMukhya}
        </p>

        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C]">
          {t("अमीश एवं रिया", "Amish & Riya")}
        </h3>
        <p className="text-sm font-serif font-semibold text-[#C9A45C] uppercase tracking-widest mt-1 mb-6">
          Amish & Riya • {WEDDING_DATA.weddingDate.english}
        </p>

        {/* View Original Cards & PDF Download Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={handleOpenOriginals}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#650D1B] border border-[#C9A45C] text-[#FAF3E0] text-sm font-serif font-semibold hover:bg-[#831425] transition-all duration-300 shadow-gold-glow cursor-pointer hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-[#C9A45C]" />
            <span>{t("मूल आमंत्रण पत्रिका दर्शन", "View Original Wedding Cards")}</span>
            <Sparkles className="w-4 h-4 text-[#E8D6A5]" />
          </button>

          <a
            href="/Amish_Riya_Wedding_Invitation.pdf"
            download="Amish_Riya_Wedding_Invitation.pdf"
            onClick={() => soundManager.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F0309] border border-[#C9A45C]/70 text-[#FAF3E0] text-sm font-serif font-semibold hover:bg-[#650D1B] transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <Download className="w-4 h-4 text-[#C9A45C]" />
            <span>{t("PDF डाउनलोड करें", "Download PDF Invitation")}</span>
          </a>
        </div>

        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mb-6" />

        <p className="text-base sm:text-lg font-serif text-[#FAF3E0] font-medium leading-relaxed max-w-xl mb-3">
          "{t(
            "मांगलिक बेला पर आपकी स्नेहिल उपस्थिति ही वर-वधू हेतु सर्वोत्तम उपहार है।",
            "Your auspicious presence and blessings are the most precious gift to the couple."
          )}"
        </p>
        <p className="text-sm font-serif font-medium text-[#E8D6A5]">
          {t("सस्नेह निमंत्रित — समस्त शर्मा एवं भारद्वाज परिवार", "Cordially invited by — Sharma & Bhardwaj Families")}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#E8D6A5]/80 font-serif">
          <span>Crafted with devotion & royal elegance</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>3 December 2026</span>
        </div>

      </div>

    </footer>
  );
};
