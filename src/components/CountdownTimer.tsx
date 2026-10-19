import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, Utensils, HeartHandshake } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';
import { soundManager } from '../utils/soundManager';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const { t } = useLang();
  const [activeEvent, setActiveEvent] = useState<'reception' | 'wedding'>('wedding');

  const weddingTarget = new Date(WEDDING_DATA.weddingDate.targetIso).getTime();
  const receptionTarget = new Date(WEDDING_DATA.receptionDate.targetIso).getTime();

  const calculateTime = (target: number): TimeLeft => {
    const now = new Date().getTime();
    const difference = target - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [weddingTime, setWeddingTime] = useState<TimeLeft>(calculateTime(weddingTarget));
  const [receptionTime, setReceptionTime] = useState<TimeLeft>(calculateTime(receptionTarget));

  useEffect(() => {
    const timer = setInterval(() => {
      setWeddingTime(calculateTime(weddingTarget));
      setReceptionTime(calculateTime(receptionTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingTarget, receptionTarget]);

  const currentTimeLeft = activeEvent === 'wedding' ? weddingTime : receptionTime;
  const otherEvent = activeEvent === 'wedding' ? 'reception' : 'wedding';
  const otherTimeLeft = activeEvent === 'wedding' ? receptionTime : weddingTime;

  const timeBlocks = [
    { label: t('दिन', 'Days'), value: currentTimeLeft.days },
    { label: t('घंटे', 'Hours'), value: currentTimeLeft.hours },
    { label: t('मिनट', 'Minutes'), value: currentTimeLeft.minutes },
    { label: t('सेकंड', 'Seconds'), value: currentTimeLeft.seconds },
  ];

  const handleTabChange = (event: 'reception' | 'wedding') => {
    soundManager.playClick();
    setActiveEvent(event);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 my-14">
      <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#C9A45C]/40 via-[#FAF3E0]/70 to-[#C9A45C]/40 shadow-burgundy-deep">
        <div className="bg-[#350610]/95 backdrop-blur-md rounded-[22px] px-4 py-8 sm:px-12 sm:py-12 text-center border border-[#C9A45C]/40">

          {/* Section Header */}
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <Clock className="w-5 h-5 text-[#C9A45C]" />
            <span className="text-sm sm:text-base font-serif uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              {t('शुभ मंगल वेला काउंटडाउन', 'Auspicious Countdown Timers')}
            </span>
            <Calendar className="w-5 h-5 text-[#C9A45C]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#FFF5DF] font-bold mb-6">
            {activeEvent === 'wedding' ? (
              <>
                {t('शुभ विवाह मुहूर्त:', 'Auspicious Wedding Moment:')}{' '}
                <span className="text-[#FAF3E0]">
                  {t(WEDDING_DATA.weddingDate.hindi, WEDDING_DATA.weddingDate.english)}
                </span>
              </>
            ) : (
              <>
                {t('भव्य प्रीति भोज (रिसेप्शन):', 'Grand Reception Moment:')}{' '}
                <span className="text-[#FAF3E0]">
                  {t('शनिवार, 5 दिसंबर 2026 (शाम 07:00 बजे)', 'Saturday, 5 December 2026 (07:00 PM)')}
                </span>
              </>
            )}
          </h2>

          {/* Dual Timeout Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-md mx-auto mb-8 bg-[#1F0309] p-1.5 rounded-2xl border border-[#C9A45C]/40 shadow-inner">
            <button
              onClick={() => handleTabChange('wedding')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif transition-all duration-300 cursor-pointer min-h-[44px] ${
                activeEvent === 'wedding'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-bold shadow-md'
                  : 'text-[#FAF3E0]/70 hover:text-[#FAF3E0]'
              }`}
            >
              <HeartHandshake className="w-4 h-4 shrink-0" />
              <span>{t('विवाह मुहूर्त (3 Dec)', 'Wedding (3 Dec)')}</span>
            </button>

            <button
              onClick={() => handleTabChange('reception')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif transition-all duration-300 cursor-pointer min-h-[44px] ${
                activeEvent === 'reception'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-bold shadow-md'
                  : 'text-[#FAF3E0]/70 hover:text-[#FAF3E0]'
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>{t('प्रीति भोज (5 Dec 7PM)', 'Reception (5 Dec 7PM)')}</span>
            </button>
          </div>

          {/* Active Countdown Blocks */}
          {currentTimeLeft.isPast ? (
            <div className="py-6 sm:py-8 px-4 sm:px-6 bg-[#650D1B]/60 rounded-2xl border border-[#C9A45C] text-[#FFF5DF] flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8D6A5] animate-pulse" />
              <p className="text-xl sm:text-4xl font-serif text-[#FAF3E0] font-bold">
                {activeEvent === 'wedding'
                  ? t('मंगल विवाहोत्सव जारी है!', 'The Wedding Celebration Has Begun!')
                  : t('भव्य प्रीति भोज जारी है!', 'The Grand Reception Has Begun!')}
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
                  <span className="mt-1.5 sm:mt-2 text-[11px] xs:text-xs sm:text-base font-serif text-[#FFF5DF] font-semibold leading-tight">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Active Event Subtitle / Details */}
          <p className="mt-7 text-sm sm:text-base text-[#FAF3E0] font-serif font-medium tracking-wide">
            {activeEvent === 'wedding'
              ? t(
                  '३ दिसंबर २०२६ — ४ दिसंबर प्रातः ०५:०० बजे पवित्र मंगल फेरे',
                  '3 December 2026 — Sacred Mangal Phere at 5:00 AM on 4 December'
                )
              : t(
                  'शनिवार, ५ दिसंबर २०२६ — शाम ०७:०० बजे होटल ग्रैंड मर्क्युरी, सूर्य पैलेस, वड़ोदरा',
                  'Saturday, 5 December 2026 at 07:00 PM — Hotel Grand Mercure Surya Palace, Vadodara'
                )}
          </p>

          {/* Secondary Timeout Quick Banner: Links directly to the other event timeout */}
          <div className="mt-6 pt-5 border-t border-[#C9A45C]/30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1F0309]/60 p-3 sm:p-4 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5 text-left">
              {activeEvent === 'wedding' ? (
                <>
                  <Utensils className="w-5 h-5 text-[#C9A45C] shrink-0" />
                  <div>
                    <span className="text-xs text-[#C9A45C] font-serif font-semibold uppercase block">
                      {t('आगामी कार्यक्रम:', 'Upcoming Event:')}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#FFF5DF]">
                      {t('प्रीति भोज (रिसेप्शन): 5 दिसंबर, शाम 07:00 बजे', 'Reception: 5th Dec, 07:00 PM')}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <HeartHandshake className="w-5 h-5 text-[#C9A45C] shrink-0" />
                  <div>
                    <span className="text-xs text-[#C9A45C] font-serif font-semibold uppercase block">
                      {t('मुख्य विवाह कार्यक्रम:', 'Main Wedding Ceremony:')}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#FFF5DF]">
                      {t('शुभ विवाह मुहूर्त: 3-4 दिसंबर 2026', 'Wedding Ceremony: 3-4 Dec 2026')}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => handleTabChange(otherEvent)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#650D1B] border border-[#C9A45C]/50 text-xs font-serif text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer shrink-0 min-h-[36px]"
            >
              <span>
                {activeEvent === 'wedding'
                  ? t('रिसेप्शन काउंटडाउन देखें', 'View Reception Countdown')
                  : t('विवाह काउंटडाउन देखें', 'View Wedding Countdown')}
              </span>
              <span className="text-[#C9A45C] font-mono font-bold">
                ({otherTimeLeft.days}d {otherTimeLeft.hours}h)
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
