import React from 'react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface HeroGrandRevealProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export const HeroGrandReveal: React.FC<HeroGrandRevealProps> = ({
  onOpenInvitation,
}) => {
  const { t } = useLang();

  const handleOpen = () => {
    soundManager.tryAutoStart();
    soundManager.playInvitationOpen();
    onOpenInvitation();
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-12">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-vignette from-[#650D1B]/60 via-[#350610] to-[#1a0207] pointer-events-none" />

      {/* Main Luxury Mughal Arch Card */}
      <div className="relative max-w-2xl w-full mx-auto my-auto p-1 sm:p-2.5 rounded-t-[100px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-burgundy-deep gold-box-glow">
        <div className="relative bg-[#350610] rounded-t-[96px] sm:rounded-t-[196px] rounded-b-[18px] sm:rounded-b-[22px] px-4 py-7 sm:px-12 sm:py-14 text-center overflow-hidden border border-[#C9A45C]/60 luxury-shimmer-sweep">

          {/* Corner Filigrees */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-[#C9A45C] opacity-70 pointer-events-none" />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-[#C9A45C] opacity-70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-[#C9A45C] opacity-70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-[#C9A45C] opacity-70 pointer-events-none" />

          {/* Glowing Ganesha Medallion */}
          <div className="relative mx-auto mb-3 sm:mb-6 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#C9A45C]/20 blur-xl animate-pulse-slow" />
            <div className="relative w-full h-full p-1.5 sm:p-2 rounded-full border-2 border-[#C9A45C] bg-gradient-to-b from-[#650D1B] to-[#350610] shadow-gold-glow flex items-center justify-center">
              <img
                src="/ganesha-icon.svg"
                alt="Lord Ganesha Emblem"
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-[0_2px_10px_rgba(201,164,92,0.8)]"
              />
            </div>
          </div>

          {/* Sacred Mantra */}
          <div className="mb-2 sm:mb-4">
            <p className="text-[#E8D6A5] font-serif text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.25em]">
              {WEDDING_DATA.mantras.ganeshaMukhya}
            </p>
            <div className="flex items-center justify-center gap-2.5 my-1.5 sm:my-2 text-[#C9A45C]">
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A45C]" />
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8D6A5]" />
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A45C]" />
            </div>
            <h2 className="text-base sm:text-2xl font-serif text-[#FAF3E0] tracking-wider">
              {t('शादी का निमंत्रण', 'Wedding Invitation')}
            </h2>
          </div>

          {/* Couple Names */}
          <div className="my-4 sm:my-8">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight">
              {t('अमीश', 'Amish')}{' '}
              <span className="text-xl xs:text-2xl sm:text-4xl text-[#C9A45C] font-normal italic mx-1 sm:mx-2 font-serif">
                {t('एवं', '&')}
              </span>
              {t('रिया', 'Riya')}
            </h1>
            <p className="mt-1 text-[11px] sm:text-sm uppercase tracking-[0.25em] text-[#C9A45C]/90 font-serif">
              Amish & Riya
            </p>
          </div>

          {/* Wedding Date */}
          <div className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-[#C9A45C]/60 bg-[#650D1B]/70 backdrop-blur-md mb-5 sm:mb-8 shadow-inner max-w-full">
            <p className="text-sm sm:text-xl font-serif text-[#FFF5DF] tracking-wide">
              {t(WEDDING_DATA.weddingDate.hindi, WEDDING_DATA.weddingDate.english)}
            </p>
            <p className="text-[10px] sm:text-xs text-[#E8D6A5] tracking-widest font-serif uppercase">
              {WEDDING_DATA.weddingDate.english}
            </p>
          </div>

          {/* Open Invitation Button */}
          <div className="mt-1 sm:mt-2 flex flex-col items-center justify-center gap-2.5 w-full">
            <button
              onClick={handleOpen}
              className="relative group overflow-hidden w-full max-w-xs sm:max-w-none sm:w-auto px-6 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C9A45C] via-[#FAF3E0] to-[#C9A45C] text-[#350610] font-serif font-bold text-base sm:text-lg tracking-wider shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3">
                <Heart className="w-5 h-5 text-[#650D1B] fill-[#650D1B] transition-transform duration-300 group-hover:scale-125 shrink-0" />
                <span>{t('शादी का निमंत्रण खोलें', 'Open Wedding Invitation')}</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </button>
            <p className="text-[11px] sm:text-xs text-[#C9A45C]/80 font-serif flex items-center gap-1.5 mt-1 animate-bounce">
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{t('विवाहोत्सव के दर्शन हेतु क्लिक करें', 'Click to view the celebration')}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
