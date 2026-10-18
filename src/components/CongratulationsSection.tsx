import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, Trash2, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface BlessingMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export const CongratulationsSection: React.FC = () => {
  const { t } = useLang();
  const [congratsCount, setCongratsCount] = useState<number>(108); // traditional auspicious starting count
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);
  const [senderName, setSenderName] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [blessingsList, setBlessingsList] = useState<BlessingMessage[]>([
    {
      id: '1',
      sender: 'पाठक परिवार (Pathak Family)',
      message: 'अमीश और रिया को शुभ विवाह की अनंत मंगलकामनाएं! सदा सुखी रहें। (Heartiest wedding blessings to Amish & Riya!)',
      timestamp: 'हाल ही में (Recently)',
    },
    {
      id: '2',
      sender: 'शर्मा बंधु (Sharma Relatives)',
      message: 'श्री गणेश जी का आशीर्वाद आप दोनों पर सदैव बना रहे। ढेर सारा प्यार! (May Lord Ganesha always bless both of you.)',
      timestamp: 'हाल ही में (Recently)',
    },
  ]);

  const triggerCelebrationParticles = () => {
    // Canvas confetti with gold, burgundy, and rose petal colors
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C9A45C', '#E8D6A5', '#FAF3E0', '#8E1629', '#650D1B'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C9A45C', '#FAF3E0', '#E8D6A5'],
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8E1629', '#E8D6A5', '#C9A45C'],
      });
    }, 150);
  };

  const handleMainCongrats = () => {
    soundManager.playCelebration();
    triggerCelebrationParticles();
    setCongratsCount((prev) => prev + 1);
    setCelebrationToast(
      t(
        'आपकी ओर से वर-वधू को मंगल शुभकामना प्रेषित हुई! Heartfelt congratulations sent! ❤️',
        'Heartfelt congratulations sent to Amish & Riya! ❤️'
      )
    );
    setTimeout(() => setCelebrationToast(null), 4000);
  };

  const handleQuickBlessing = (blessingText: string) => {
    soundManager.playCelebration();
    triggerCelebrationParticles();
    setCongratsCount((prev) => prev + 1);

    const newBlessing: BlessingMessage = {
      id: Date.now().toString(),
      sender: t('स्नेही अतिथि', 'Beloved Guest'),
      message: blessingText,
      timestamp: t('अभी-अभी', 'Just now'),
    };
    setBlessingsList((prev) => [newBlessing, ...prev]);

    setCelebrationToast(
      t(
        `आशीर्वाद: "${blessingText}" जोड़ा गया!`,
        `Blessing: "${blessingText}" added!`
      )
    );
    setTimeout(() => setCelebrationToast(null), 3500);
  };

  const handleSubmitCustomBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    soundManager.playCelebration();
    triggerCelebrationParticles();
    setCongratsCount((prev) => prev + 1);

    const newBlessing: BlessingMessage = {
      id: Date.now().toString(),
      sender: senderName.trim() || t('शुभचिंतक अतिथि', 'Well-wishing Guest'),
      message: customMessage.trim(),
      timestamp: t('अभी-अभी', 'Just now'),
    };

    setBlessingsList((prev) => [newBlessing, ...prev]);
    setSenderName('');
    setCustomMessage('');
    setCelebrationToast(
      t(
        'आपका स्नेहपूर्ण संदेश आमंत्रण पत्रिका में जोड़ दिया गया है!',
        'Your warm blessing has been recorded in the guestbook!'
      )
    );
    setTimeout(() => setCelebrationToast(null), 4000);
  };

  const quickBlessings = [
    { hi: '॥ शुभ विवाह ॥', en: 'Happy Wedding!' },
    { hi: 'ढेर सारा आशीर्वाद', en: 'Countless Blessings' },
    { hi: 'Wishing you a lifetime of happiness ❤️', en: 'Wishing you a lifetime of happiness ❤️' },
    { hi: 'May Lord Ganesha bless your union 🙏', en: 'May Lord Ganesha bless your union 🙏' },
  ];

  return (
    <section className="relative max-w-4xl mx-auto px-4 py-16 text-center">
      
      {/* Header */}
      <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
        {t("॥ शुभकामना एवं शुभाशीर्वाद ॥", "॥ Blessings & Wishes ॥")}
      </span>
      <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
        {t("वर-वधू को स्नेह एवं शुभाशीर्वाद", "Send Your Love & Blessings")}
      </h2>
      <p className="mt-2 text-sm sm:text-base text-[#FFF5DF]/90 font-serif">
        {t(
          "वर-वधू अमीश एवं रिया को अपना स्नेह, प्रेम व मंगल आशीर्वाद समर्पित करें।",
          "Shower your heartfelt blessings and warm wishes upon Amish and Riya."
        )}
      </p>

      {/* Main Congratulations Button */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <button
          onClick={handleMainCongrats}
          className="relative group overflow-hidden px-8 sm:px-14 py-5 rounded-full bg-gradient-to-r from-[#C9A45C] via-[#FAF3E0] to-[#C9A45C] text-[#350610] font-serif font-bold text-lg sm:text-xl tracking-wider shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg active:scale-95 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Heart className="w-6 h-6 text-[#650D1B] fill-[#650D1B] animate-pulse" />
            <span>{t("बधाई हो अमीश एवं रिया ❤️", "Congratulations Amish & Riya ❤️")}</span>
            <Sparkles className="w-5 h-5 text-[#8C672B]" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
        </button>

        {/* Live Session Counter */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1F0309]/90 border border-[#C9A45C]/50 text-xs sm:text-sm font-serif text-[#E8D6A5] shadow-inner mt-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>{t("इस सत्र में प्राप्त कुल आशीर्वाद:", "Blessings received this session:")}</span>
          <strong className="text-[#FAF3E0] text-base">{congratsCount}</strong>
        </div>
      </div>

      {/* Toast Banner */}
      {celebrationToast && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 mx-auto max-w-md p-4 rounded-2xl bg-[#650D1B] border-2 border-[#C9A45C] text-[#FFF5DF] shadow-gold-glow flex items-center justify-center gap-2 text-sm font-serif animate-bounce"
        >
          <CheckCircle2 className="w-5 h-5 text-[#E8D6A5] shrink-0" />
          <span>{celebrationToast}</span>
        </div>
      )}

      {/* Quick Blessing Buttons */}
      <div className="mt-10">
        <p className="text-xs font-serif uppercase tracking-wider text-[#C9A45C] mb-4">
          {t("त्वरित आशीर्वाद चुनें (One-Click Blessings)", "One-Click Quick Blessings")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {quickBlessings.map((b, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickBlessing(t(b.hi, b.en))}
              className="px-4 py-2.5 rounded-full bg-[#650D1B]/70 border border-[#C9A45C]/50 text-xs sm:text-sm font-serif text-[#FFF5DF] hover:bg-[#831425] hover:border-[#C9A45C] transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
            >
              {t(b.hi, b.en)}
            </button>
          ))}
        </div>
      </div>

      {/* Write a Blessing Form */}
      <div className="mt-12 max-w-xl mx-auto p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/40 via-[#650D1B] to-[#C9A45C]/40 shadow-burgundy-deep">
        <form
          onSubmit={handleSubmitCustomBlessing}
          className="bg-[#350610]/95 rounded-[22px] p-6 sm:p-8 border border-[#C9A45C]/30 text-left"
        >
          <h3 className="text-lg font-serif font-bold text-[#FAF3E0] mb-1 flex items-center gap-2">
            <Send className="w-4 h-4 text-[#C9A45C]" />
            <span>{t("अपना व्यक्तिगत संदेश लिखें (Guestbook)", "Write a Personal Blessing (Guestbook)")}</span>
          </h3>
          <p className="text-xs text-[#C9A45C]/80 font-serif mb-4">
            {t(
              "(यह संदेश आपके वर्तमान ब्राउज़र सत्र की आमंत्रण डायरी में प्रदर्शित होगा)",
              "(This blessing will appear in your live session guestbook wall)"
            )}
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="sender-name-input" className="block text-xs font-serif text-[#E8D6A5] mb-1">
                {t("आपका नाम (Your Name)", "Your Name")}
              </label>
              <input
                id="sender-name-input"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t("उदा. राहुल शर्मा / प्रिया वर्मा", "e.g. Rahul Sharma / Priya Verma")}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] placeholder-[#C9A45C]/40 text-sm font-serif focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label htmlFor="custom-blessing-input" className="block text-xs font-serif text-[#E8D6A5] mb-1">
                {t("शुभकामना संदेश (Blessing Message) *", "Blessing Message *")}
              </label>
              <textarea
                id="custom-blessing-input"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                required
                placeholder={t("वर-वधू हेतु अपने मंगल विचार यहाँ लिखें...", "Write your warm wishes for the couple...")}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] placeholder-[#C9A45C]/40 text-sm font-serif focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setSenderName('');
                  setCustomMessage('');
                }}
                className="flex items-center gap-1.5 text-xs text-[#C9A45C]/70 hover:text-[#C9A45C] font-serif cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t("साफ करें", "Clear")}</span>
              </button>

              <button
                type="submit"
                disabled={!customMessage.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-serif font-bold text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer hover:opacity-90 shadow"
              >
                <span>{t("आशीर्वाद भेजें", "Send Blessing")}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Blessings Wall */}
      <div className="mt-8 max-w-xl mx-auto space-y-3 text-left">
        <p className="text-xs font-serif uppercase tracking-wider text-[#C9A45C] text-center mb-2">
          {t("सत्र आशीर्वाद डायरी (Session Blessings Wall)", "Live Session Blessings Wall")}
        </p>
        {blessingsList.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-[#650D1B]/50 border border-[#C9A45C]/30 text-xs sm:text-sm font-serif"
          >
            <div className="flex items-center justify-between text-[#C9A45C] mb-1">
              <span className="font-semibold text-[#FAF3E0]">{item.sender}</span>
              <span className="text-[10px] text-[#E8D6A5]">{item.timestamp}</span>
            </div>
            <p className="text-[#FFF5DF]/90 leading-relaxed">{item.message}</p>
          </div>
        ))}
      </div>

    </section>
  );
};
