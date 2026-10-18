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
        <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-[#C9A45C] uppercase font-semibold block mb-2">
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
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FFF5DF] font-serif leading-relaxed px-4 font-normal">
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
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-10 text-center flex flex-col items-center justify-between border border-[#C9A45C]/50 gold-box-glow">
            <div className="w-full flex flex-col items-center">
              
              {/* Badge */}
              <div className="inline-block px-6 py-2 rounded-full bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] text-sm sm:text-base font-serif uppercase tracking-[0.2em] font-semibold mb-6 shadow-md">
                {t('॥ वर (Groom) ॥', '॥ Groom ॥')}
              </div>

              {/* Groom Photo in Ornate Golden Medallion */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 rounded-full p-2 bg-gradient-to-tr from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-gold-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#350610] border-2 border-[#FAF3E0]/80 shadow-inner">
                  <img
                    src="/images/amish-groom.png"
                    alt={t(WEDDING_DATA.groom.name, WEDDING_DATA.groom.englishName)}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#350610] border border-[#C9A45C] shadow-lg text-xs sm:text-sm text-[#FAF3E0] font-serif uppercase font-semibold tracking-wider">
                  {t('दूल्हा', 'Groom')}
                </div>
              </div>

              {/* Names */}
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFF5DF] tracking-wide mt-2">
                {t(WEDDING_DATA.groom.name, WEDDING_DATA.groom.englishName)}
              </h3>
              <p className="text-base sm:text-lg font-serif text-[#C9A45C] tracking-widest uppercase font-semibold mt-1 mb-5">
                {WEDDING_DATA.groom.englishName}
              </p>

              {/* Parents Box with enhanced font size & clean alignment */}
              <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-[#350610]/90 border border-[#C9A45C]/40 text-[#E8D6A5] font-serif shadow-inner">
                <p className="font-semibold text-sm sm:text-base text-[#C9A45C] uppercase tracking-wider mb-1.5">
                  {t('माता-पिता:', 'Parents:')}
                </p>
                <p className="text-base sm:text-lg font-medium text-[#FAF3E0] leading-relaxed">
                  {t(WEDDING_DATA.groom.parents, 'Sh. Anil Sharma & Smt. Vandana Sharma')}
                </p>
              </div>
            </div>

            {/* Sacred Shloka Quote */}
            <div className="mt-8 pt-5 border-t border-[#C9A45C]/30 w-full text-center">
              <span className="text-sm sm:text-base text-[#FAF3E0]/95 font-serif italic leading-relaxed block px-2">
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
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-10 text-center flex flex-col items-center justify-between border border-[#C9A45C]/50 gold-box-glow">
            <div className="w-full flex flex-col items-center">
              
              {/* Badge */}
              <div className="inline-block px-6 py-2 rounded-full bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] text-sm sm:text-base font-serif uppercase tracking-[0.2em] font-semibold mb-6 shadow-md">
                {t('॥ वधू (Bride) ॥', '॥ Bride ॥')}
              </div>

              {/* Bride Photo in Ornate Golden Medallion */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 rounded-full p-2 bg-gradient-to-tr from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-gold-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#350610] border-2 border-[#FAF3E0]/80 shadow-inner">
                  <img
                    src="/images/riya-bride.png"
                    alt={t(WEDDING_DATA.bride.name, WEDDING_DATA.bride.englishName)}
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#350610] border border-[#C9A45C] shadow-lg text-xs sm:text-sm text-[#FAF3E0] font-serif uppercase font-semibold tracking-wider">
                  {t('दुल्हन', 'Bride')}
                </div>
              </div>

              {/* Names */}
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFF5DF] tracking-wide mt-2">
                {t(WEDDING_DATA.bride.name, WEDDING_DATA.bride.englishName)}
              </h3>
              <p className="text-base sm:text-lg font-serif text-[#C9A45C] tracking-widest uppercase font-semibold mt-1 mb-5">
                {WEDDING_DATA.bride.englishName}
              </p>

              {/* Parents Box with enhanced font size & clean alignment */}
              <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-[#350610]/90 border border-[#C9A45C]/40 text-[#E8D6A5] font-serif shadow-inner">
                <p className="font-semibold text-sm sm:text-base text-[#C9A45C] uppercase tracking-wider mb-1.5">
                  {t('माता-पिता:', 'Parents:')}
                </p>
                <p className="text-base sm:text-lg font-medium text-[#FAF3E0] leading-relaxed">
                  {t(WEDDING_DATA.bride.parents, 'Sh. Mithlesh Bhardwaj & Smt. Rekha Bhardwaj')}
                </p>
              </div>
            </div>

            {/* Sacred Shloka Quote */}
            <div className="mt-8 pt-5 border-t border-[#C9A45C]/30 w-full text-center">
              <span className="text-sm sm:text-base text-[#FAF3E0]/95 font-serif italic leading-relaxed block px-2">
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
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#350610] border border-[#C9A45C] shadow-gold-glow">
          <Sparkles className="w-5 h-5 text-[#E8D6A5]" />
          <span className="text-base sm:text-lg font-serif text-[#FAF3E0] font-semibold tracking-wide">
            {t('सुश्री रिया भारद्वाज के साथ विवाहोत्सव', 'Wedding Celebration with Ms. Riya Bhardwaj')}
          </span>
          <Sparkles className="w-5 h-5 text-[#E8D6A5]" />
        </div>
      </div>

    </section>
  );
};
