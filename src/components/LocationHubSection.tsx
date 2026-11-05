import React from 'react';
import { MapPin, Navigation, Home, HeartHandshake, Utensils } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { useLang } from '../context/LanguageContext';

export const LocationHubSection: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-[#C9A45C] uppercase font-semibold block mb-2">
          {t('॥ कार्यक्रम स्थल निर्देशिका ॥', '॥ Venues & Locations ॥')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t('विवाह स्थल निर्देशिका', 'Wedding Locations & Venues')}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <Navigation className="w-5 h-5 text-[#C9A45C]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="text-base sm:text-lg text-[#FFF5DF] font-serif max-w-2xl mx-auto">
          {t(
            'अतिथियों की सुगमता हेतु समस्त कार्यक्रमों के स्थल विवरण।',
            'Venue details for all wedding ceremonies.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

        {/* HOME */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep flex flex-col">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-8 text-center flex flex-col justify-between border border-[#C9A45C]/40">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#350610] border-2 border-[#C9A45C] mx-auto flex items-center justify-center mb-5 shadow">
                <Home className="w-7 h-7 text-[#C9A45C]" />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#350610] text-[#E8D6A5] text-xs sm:text-sm font-serif uppercase tracking-wider font-semibold mb-3 border border-[#C9A45C]/40">
                {t('गृह निवास (Home)', 'Home Residence')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF5DF] mb-3 leading-snug">
                {t('गणेश स्थापना, तेल, हल्दी, मेहंदी व निकासी', 'Ganesh Sthapana, Tel, Haldi, Mehndi & Nikasi')}
              </h3>
            </div>
            <div className="pt-5 border-t border-[#C9A45C]/30 flex items-center justify-center gap-2 text-base text-[#FAF3E0] font-serif font-semibold">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>{t(WEDDING_DATA.locations.HOME.address || 'वड़ोदरा, गुजरात', WEDDING_DATA.locations.HOME.addressEn || 'Vadodara, Gujarat')}</span>
            </div>
          </div>
        </div>

        {/* WEDDING */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#FAF3E0]/70 via-[#C9A45C] to-[#8C672B] shadow-gold-glow flex flex-col transform md:-translate-y-2">
          <div className="h-full bg-gradient-to-b from-[#650D1B] to-[#350610] rounded-[22px] p-6 sm:p-8 text-center flex flex-col justify-between border border-[#C9A45C]">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#350610] border-2 border-[#FAF3E0] mx-auto flex items-center justify-center mb-5 shadow">
                <HeartHandshake className="w-7 h-7 text-[#E8D6A5]" />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#350610] text-[#FAF3E0] text-xs sm:text-sm font-serif uppercase tracking-wider font-semibold mb-3 border border-[#C9A45C]">
                {t('शुभ विवाह एवं मंगल फेरे स्थल', 'Wedding & Mangal Phere Venue')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF3E0] mb-1 leading-snug">
                {t('होटल मुकुट रीजेंसी', 'Hotel Mukut Regency')}
              </h3>
              <p className="text-xs text-[#E8D6A5] font-serif mb-4">
                {t('A Unit of Janki Mahal Hotel Pvt. Ltd. (Woodburry Cafe)', 'A Unit of Janki Mahal Hotel Pvt. Ltd. (Woodburry Cafe)')}
              </p>

              {/* Date & Timings */}
              <div className="inline-block px-3 py-1.5 rounded-lg bg-[#1F0309]/80 border border-[#C9A45C]/40 text-xs sm:text-sm font-serif text-[#FAF3E0] mb-4">
                <p className="font-semibold">{t('शुभ विवाह: ३ दिसंबर २०२६ (गुरुवार)', 'Wedding: 3 December 2026 (Thursday)')}</p>
                <p className="text-[#E8D6A5] text-[11px] sm:text-xs">{t('पवित्र मंगल फेरे: ४ दिसंबर प्रातः ०५:०० बजे', 'Sacred Mangal Phere: 4 Dec at 05:00 AM')}</p>
              </div>
            </div>

            <div className="pt-5 border-t border-[#C9A45C]/30 flex items-center justify-center gap-2 text-base text-[#FAF3E0] font-serif font-semibold">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>{t(WEDDING_DATA.locations.WEDDING.address || 'गाजियाबाद, उत्तर प्रदेश', WEDDING_DATA.locations.WEDDING.addressEn || 'Ghaziabad, Uttar Pradesh')}</span>
            </div>
          </div>
        </div>

        {/* RECEPTION */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep flex flex-col">
          <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[22px] p-6 sm:p-8 text-center flex flex-col justify-between border border-[#C9A45C]/40">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#350610] border-2 border-[#C9A45C] mx-auto flex items-center justify-center mb-5 shadow">
                <Utensils className="w-7 h-7 text-[#C9A45C]" />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#350610] text-[#E8D6A5] text-xs sm:text-sm font-serif uppercase tracking-wider font-semibold mb-3 border border-[#C9A45C]/30">
                {t('रिसेप्शन स्थल', 'Reception Venue')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF5DF] mb-2 leading-snug">
                {t('होटल ग्रैंड मर्क्युरी, सूर्य पैलेस', 'Hotel Grand Mercure Surya Palace')}
              </h3>
              <p className="text-xs sm:text-sm text-[#E8D6A5] font-serif mb-4">
                {t('प्रीति भोज (शनिवार, ५ दिसंबर २०२६, शाम ०७:०० बजे)', 'Priti Bhoj (Sat, 5 Dec 2026, 07:00 PM)')}
              </p>
            </div>
            <div className="pt-5 border-t border-[#C9A45C]/30 flex items-center justify-center gap-2 text-base text-[#FAF3E0] font-serif font-semibold">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>{t(WEDDING_DATA.locations.RECEPTION.address || 'वड़ोदरा, गुजरात', WEDDING_DATA.locations.RECEPTION.addressEn || 'Vadodara, Gujarat')}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
