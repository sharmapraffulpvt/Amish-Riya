import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const { t } = useLang();
  const targetDate = new Date(WEDDING_DATA.weddingDate.targetIso).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: t('दिन', 'Days'), value: timeLeft.days },
    { label: t('घंटे', 'Hours'), value: timeLeft.hours },
    { label: t('मिनट', 'Minutes'), value: timeLeft.minutes },
    { label: t('सेकंड', 'Seconds'), value: timeLeft.seconds },
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-4 my-14">
      <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#C9A45C]/40 via-[#FAF3E0]/70 to-[#C9A45C]/40 shadow-burgundy-deep">
        <div className="bg-[#350610]/95 backdrop-blur-md rounded-[22px] px-6 py-10 sm:px-12 sm:py-12 text-center border border-[#C9A45C]/40">

          <div className="flex items-center justify-center gap-2.5 mb-4">
            <Clock className="w-5 h-5 text-[#C9A45C]" />
            <span className="text-base sm:text-lg font-serif uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              {t('मंगल वेला की प्रतीक्षा', 'Countdown to the Auspicious Union')}
            </span>
            <Calendar className="w-5 h-5 text-[#C9A45C]" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-[#FFF5DF] font-bold mb-8">
            {t('शुभ विवाह मुहूर्त:', 'Auspicious Wedding Moment:')}{' '}
            <span className="text-[#FAF3E0]">{t(WEDDING_DATA.weddingDate.hindi, WEDDING_DATA.weddingDate.english)}</span>
          </h3>

          {timeLeft.isPast ? (
            <div className="py-6 sm:py-8 px-4 sm:px-6 bg-[#650D1B]/60 rounded-2xl border border-[#C9A45C] text-[#FFF5DF] flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8D6A5] animate-pulse" />
              <p className="text-xl sm:text-4xl font-serif text-[#FAF3E0] font-bold">
                {t('मंगल विवाहोत्सव जारी है!', 'The Celebration Has Begun!')}
              </p>
              <p className="text-sm sm:text-lg text-[#C9A45C] font-serif font-medium">
                {t('अमीश एवं रिया के शुभ विवाह की मंगल बेला', 'Celebrating the divine union of Amish & Riya')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-6 max-w-2xl mx-auto">
              {timeBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="relative p-2.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#650D1B]/80 to-[#350610]/90 border border-[#C9A45C]/50 shadow-gold-glow flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1"
                >
                  <span className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FAF3E0] to-[#C9A45C] tabular-nums leading-none">
                    {String(block.value).padStart(2, '0')}
                  </span>
                  <span className="mt-1.5 sm:mt-2 text-[11px] xs:text-xs sm:text-base font-serif text-[#FFF5DF] font-semibold leading-tight">{block.label}</span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-sm sm:text-base text-[#FAF3E0] font-serif font-medium tracking-wide">
            {t(
              '३ दिसंबर २०२६ — ४ दिसंबर प्रातः ०५:०० बजे पवित्र मंगल फेरे',
              '3 December 2026 — Sacred Mangal Phere at 5:00 AM on 4 December'
            )}
          </p>

        </div>
      </div>
    </div>
  );
};
