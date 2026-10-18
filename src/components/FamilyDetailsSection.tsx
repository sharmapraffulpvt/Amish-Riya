import React from 'react';
import { Users, Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';

export const FamilyDetailsSection: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-16">
      
      {/* Sacred Invitation Message Box */}
      <div className="relative p-1 rounded-3xl bg-gradient-to-r from-[#C9A45C]/40 via-[#FAF3E0]/70 to-[#C9A45C]/40 shadow-burgundy-deep mb-16">
        <div className="bg-[#350610]/95 backdrop-blur-md rounded-[22px] px-6 py-8 sm:px-12 sm:py-12 text-center border border-[#C9A45C]/50">
          <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-[#C9A45C] uppercase font-semibold block mb-3">
            {t("॥ शुभ विवाह संदेश ॥", "॥ Sacred Wedding Message ॥")}
          </span>
          <p className="text-xl sm:text-2xl font-serif text-[#FAF3E0] leading-relaxed max-w-3xl mx-auto font-medium">
            "{t(
              WEDDING_DATA.mantras.invitationNote,
              "By the divine grace of Lord Ganesha and our revered ancestors, we cordially invite you and your family to grace the auspicious wedding ceremony of Amish and Riya with your presence and blessings."
            )}"
          </p>
          <div className="h-[1px] w-36 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto my-6" />
          <p className="text-base sm:text-lg font-serif text-[#E8D6A5] tracking-widest uppercase font-semibold">
            {t("— समस्त शर्मा एवं भारद्वाज परिवार", "— Sharma & Bhardwaj Families")}
          </p>
        </div>
      </div>

      {/* Two Columns: दर्शनाभिलाषी & ननिहाल पक्ष */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* 1. दर्शनाभिलाषी */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-10 text-center flex flex-col justify-between border border-[#C9A45C]/40">
            <div>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] text-sm sm:text-base font-serif font-semibold tracking-wider mb-8 shadow">
                <Users className="w-4 h-4 text-[#C9A45C]" />
                <span>{t("॥ दर्शनाभिलाषी ॥", "॥ With Best Compliments ॥")}</span>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                {WEDDING_DATA.family.darshanabhilashi.map((pair, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#350610]/85 border border-[#C9A45C]/35 text-base sm:text-lg font-serif text-[#FFF5DF] shadow-sm"
                  >
                    <span className="font-semibold text-[#FAF3E0]">{pair.name1}</span>
                    <span className="text-[#C9A45C] text-sm font-bold">—</span>
                    <span className="font-semibold text-[#FAF3E0]">{pair.name2}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#C9A45C]/25 text-center text-sm font-serif text-[#FAF3E0] font-medium">
              {t("सप्रेम स्नेह एवं शुभाशीर्वाद", "With love, affection & warm blessings")}
            </div>
          </div>
        </div>

        {/* 2. ननिहाल पक्ष (Nanihal Paksh) */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-10 text-center flex flex-col justify-between border border-[#C9A45C]/40">
            <div>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] text-sm sm:text-base font-serif font-semibold tracking-wider mb-8 shadow">
                <Heart className="w-4 h-4 text-[#C9A45C]" />
                <span>{t("॥ ननिहाल पक्ष ॥", "॥ Maternal Family (Nanihal) ॥")}</span>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                {/* पूज्य बुज़ुर्ग */}
                <div className="p-4 rounded-xl bg-[#350610]/85 border border-[#C9A45C]/35 shadow-sm text-center">
                  <span className="text-xs sm:text-sm font-serif text-[#C9A45C] uppercase tracking-wider font-semibold block mb-1">
                    {t("पूज्य वरिष्ठजन", "Revered Elders")}
                  </span>
                  {WEDDING_DATA.family.nanihalPaksh.elders.map((name, i) => (
                    <p key={i} className="text-lg sm:text-xl font-serif font-bold text-[#FFF5DF]">
                      {name}
                    </p>
                  ))}
                </div>

                {/* मामा जी */}
                <div className="p-4 rounded-xl bg-[#350610]/85 border border-[#C9A45C]/35 shadow-sm text-center">
                  <span className="text-xs sm:text-sm font-serif text-[#C9A45C] uppercase tracking-wider font-semibold block mb-1">
                    {t("मामा पक्ष", "Maternal Uncles (Mama Ji)")}
                  </span>
                  <p className="text-base sm:text-lg font-serif font-semibold text-[#FAF3E0]">
                    {WEDDING_DATA.family.nanihalPaksh.uncles.join(', ')}
                  </p>
                </div>

                {/* अनुज एवं भ्रातृवृन्द with strict കൃशांग पाठक */}
                <div className="p-4 rounded-xl bg-[#350610]/85 border border-[#C9A45C]/35 shadow-sm text-center">
                  <span className="text-xs sm:text-sm font-serif text-[#C9A45C] uppercase tracking-wider font-semibold block mb-1">
                    {t("स्नेही बंधु", "Dear Brothers & Family")}
                  </span>
                  <p className="text-base sm:text-lg font-serif font-semibold text-[#FAF3E0]">
                    {WEDDING_DATA.family.nanihalPaksh.cousins.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#C9A45C]/25 text-center text-sm font-serif text-[#FAF3E0] font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C9A45C]" />
              <span>{t("मंगल मिलन की पावन बेला", "Celebration of Holy Union")}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
