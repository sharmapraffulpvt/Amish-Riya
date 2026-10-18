import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';

export const GroomBrideSection: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
          {t('॥ पाणिग्रहण संस्कार ॥', '॥ Sacred Union ॥')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t('सादर आमंत्रण', 'Cordial Invitation')}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <Heart className="w-5 h-5 text-[#C9A45C] fill-[#C9A45C]/30" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#FFF5DF]/95 font-serif leading-relaxed px-4">
          {t(
            `${WEDDING_DATA.groom.parents} अपने सुपुत्र ${WEDDING_DATA.groom.name} के शुभ विवाह में आपकी गरिमामयी उपस्थिति हेतु सादर आमंत्रित करते हैं।`,
            `${WEDDING_DATA.groom.parents} joyfully invite you to the auspicious wedding of their beloved son, ${WEDDING_DATA.groom.englishName}.`
          )}
        </p>
      </div>

      {/* Couple Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

        {/* Groom Card */}
        <div className="relative group p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/60 via-[#8C672B]/30 to-[#C9A45C]/60 shadow-burgundy-deep transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-8 text-center flex flex-col items-center justify-between border border-[#C9A45C]/50 gold-box-glow">
            <div className="w-full">
              <div className="inline-block px-5 py-1.5 rounded-full bg-[#350610] border border-[#C9A45C] text-[#E8D6A5] text-xs font-serif uppercase tracking-[0.2em] mb-4 shadow">
                {t('॥ वर (Groom) ॥', '॥ Groom ॥')}
              </div>

              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 rounded-full p-1.5 bg-gradient-to-tr from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-gold-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#350610] border-2 border-[#FAF3E0]/70 flex items-center justify-center">
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-3 bg-gradient-to-b from-[#650D1B] to-[#1F0309]">
                    <span className="text-4xl sm:text-5xl mb-1">👑</span>
                    <span className="text-xs font-serif text-[#FAF3E0]">{t('दूल्हा', 'Groom')}</span>
                    <span className="text-[10px] text-[#C9A45C] uppercase">Royal Groom</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF5DF] tracking-wide">
                {t(WEDDING_DATA.groom.name, WEDDING_DATA.groom.englishName)}
              </h3>
              <p className="text-sm font-serif text-[#C9A45C] tracking-widest uppercase mt-0.5 mb-3">
                {WEDDING_DATA.groom.englishName}
              </p>

              <div className="p-3.5 rounded-xl bg-[#350610]/80 border border-[#C9A45C]/30 text-xs sm:text-sm text-[#E8D6A5] font-serif leading-relaxed">
                <p className="font-semibold text-[#FFF5DF] mb-1">{t('माता-पिता:', 'Parents:')}</p>
                <p>{t(WEDDING_DATA.groom.parents, 'Sh. Anil Sharma & Smt. Vandana Sharma')}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#C9A45C]/30 w-full text-center">
              <span className="text-xs text-[#C9A45C]/90 font-serif italic">
                {t(
                  '"हृदयेन हृदयं ते दधामि — मैं अपने हृदय को तुम्हारे हृदय से जोड़ता हूँ"',
                  '"I join my heart to yours — through all lifetimes ahead."'
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bride Card */}
        <div className="relative group p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/60 via-[#8C672B]/30 to-[#C9A45C]/60 shadow-burgundy-deep transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-8 text-center flex flex-col items-center justify-between border border-[#C9A45C]/50 gold-box-glow">
            <div className="w-full">
              <div className="inline-block px-5 py-1.5 rounded-full bg-[#350610] border border-[#C9A45C] text-[#E8D6A5] text-xs font-serif uppercase tracking-[0.2em] mb-4 shadow">
                {t('॥ वधू (Bride) ॥', '॥ Bride ॥')}
              </div>

              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 rounded-full p-1.5 bg-gradient-to-tr from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-gold-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#350610] border-2 border-[#FAF3E0]/70 flex items-center justify-center">
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-3 bg-gradient-to-b from-[#650D1B] to-[#1F0309]">
                    <span className="text-4xl sm:text-5xl mb-1">✨</span>
                    <span className="text-xs font-serif text-[#FAF3E0]">{t('दुल्हन', 'Bride')}</span>
                    <span className="text-[10px] text-[#C9A45C] uppercase">Royal Bride</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF5DF] tracking-wide">
                {t(WEDDING_DATA.bride.name, WEDDING_DATA.bride.englishName)}
              </h3>
              <p className="text-sm font-serif text-[#C9A45C] tracking-widest uppercase mt-0.5 mb-3">
                {WEDDING_DATA.bride.englishName}
              </p>

              <div className="p-3.5 rounded-xl bg-[#350610]/80 border border-[#C9A45C]/30 text-xs sm:text-sm text-[#E8D6A5] font-serif leading-relaxed">
                <p className="font-semibold text-[#FFF5DF] mb-1">{t('माता-पिता:', 'Parents:')}</p>
                <p>{t(WEDDING_DATA.bride.parents, 'Sh. Mithlesh Bhardwaj & Smt. Rekha Bhardwaj')}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#C9A45C]/30 w-full text-center">
              <span className="text-xs text-[#C9A45C]/90 font-serif italic">
                {t(
                  '"सप्तपदी भव सा मामनुव्रता भव — सात पग चलकर संगिनी बनो"',
                  '"Walk with me through seven sacred steps — be my companion forever."'
                )}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Union Seal */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#350610] border border-[#C9A45C] shadow-gold-glow">
          <Sparkles className="w-4 h-4 text-[#E8D6A5]" />
          <span className="text-sm sm:text-base font-serif text-[#FAF3E0] font-medium">
            {t('सुश्री रिया भारद्वाज के साथ विवाहोत्सव', 'Wedding Celebration with Ms. Riya Bhardwaj')}
          </span>
          <Sparkles className="w-4 h-4 text-[#E8D6A5]" />
        </div>
      </div>

    </section>
  );
};
