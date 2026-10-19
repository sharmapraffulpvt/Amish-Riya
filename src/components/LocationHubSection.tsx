import React from 'react';
import { MapPin, Navigation, ExternalLink, Home, HeartHandshake, Utensils } from 'lucide-react';
import { WEDDING_DATA, getGoogleMapsUrl, WeddingLocation } from '../data/weddingData';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

export const LocationHubSection: React.FC = () => {
  const { t } = useLang();

  const handleMapClick = (location: WeddingLocation) => {
    soundManager.playClick();
    const url = getGoogleMapsUrl(location);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-[#C9A45C] uppercase font-semibold block mb-2">
          {t('॥ कार्यक्रम स्थल निर्देशिका ॥', '॥ Venues & Locations ॥')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t('विवाह स्थल व मार्गदर्शिका', 'Wedding Locations & Map Guide')}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <Navigation className="w-5 h-5 text-[#C9A45C]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="text-base sm:text-lg text-[#FFF5DF] font-serif max-w-2xl mx-auto">
          {t(
            'अतिथियों की सुगमता हेतु समस्त कार्यक्रमों के प्रमाणित पते एवं गूगल मैप्स लिंक।',
            'Verified addresses and Google Maps navigation for all wedding ceremonies.'
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
              <p className="text-sm sm:text-base text-[#FAF3E0] font-serif leading-relaxed mb-6 px-2">
                {WEDDING_DATA.locations.HOME.address}
              </p>
            </div>
            <div className="pt-4 border-t border-[#C9A45C]/30">
              <button
                onClick={() => handleMapClick(WEDDING_DATA.locations.HOME)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-serif font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('गूगल मैप्स पर देखें', 'Open in Google Maps')}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
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
              <p className="text-xs text-[#E8D6A5] font-serif mb-3">
                {t('A Unit of Janki Mahal Hotel Pvt. Ltd. (Woodburry Cafe)', 'A Unit of Janki Mahal Hotel Pvt. Ltd. (Woodburry Cafe)')}
              </p>

              {/* Date & Timings */}
              <div className="inline-block px-3 py-1.5 rounded-lg bg-[#1F0309]/80 border border-[#C9A45C]/40 text-xs sm:text-sm font-serif text-[#FAF3E0] mb-3">
                <p className="font-semibold">{t('शुभ विवाह: ३ दिसंबर २०२६ (गुरुवार)', 'Wedding: 3 December 2026 (Thursday)')}</p>
                <p className="text-[#E8D6A5] text-[11px] sm:text-xs">{t('पवित्र मंगल फेरे: ४ दिसंबर प्रातः ०५:०० बजे', 'Sacred Mangal Phere: 4 Dec at 05:00 AM')}</p>
              </div>

              {/* Address */}
              <p className="text-xs sm:text-sm text-[#FAF3E0] font-serif leading-relaxed mb-4 px-1">
                {WEDDING_DATA.locations.WEDDING.address}
              </p>

              {/* Metro & Connectivity Guidance */}
              <div className="p-3.5 rounded-xl bg-[#1F0309]/90 border border-[#C9A45C]/40 text-left mb-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#E8D6A5]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t('निकटतम मेट्रो स्टेशन (Nearest Metro):', 'Nearest Metro Stations:')}</span>
                </div>
                <div className="space-y-1 text-xs font-serif text-[#FFF5DF]/90 pl-3 border-l-2 border-[#C9A45C]/50">
                  <p className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{t('1. वैशाली, गाजियाबाद (ब्लू लाइन)', '1. Vaishali, Ghaziabad (Blue Line)')}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    <span>{t('2. मोहन नगर, गाजियाबाद (रेड लाइन)', '2. Mohan Nagar, Ghaziabad (Red Line)')}</span>
                  </p>
                </div>
                <div className="pt-1.5 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between gap-1 text-[11px] font-serif text-[#C9A45C]">
                  <span>{t('लैंडमार्क: वसुंधरा हाट के निकट', 'Landmark: Near Vasundhara Haat')}</span>
                  <span>{t('फोन: +91-120-4566998', 'Ph: +91-120-4566998')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C9A45C]/30 flex flex-col gap-2">
              <button
                onClick={() => handleMapClick(WEDDING_DATA.locations.WEDDING)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-serif font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('गूगल मैप्स पर देखें', 'Open in Google Maps')}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
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
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF5DF] mb-3 leading-snug">
                {t('प्रीति भोज (शनिवार, ५ दिसंबर २०२६, शाम ०७:०० बजे)', 'Priti Bhoj (Sat, 5 Dec 2026, 07:00 PM)')}
              </h3>
              <p className="text-sm sm:text-base text-[#FAF3E0] font-serif leading-relaxed mb-6 px-2">
                {WEDDING_DATA.locations.RECEPTION.address}
              </p>
            </div>
            <div className="pt-4 border-t border-[#C9A45C]/30">
              <button
                onClick={() => handleMapClick(WEDDING_DATA.locations.RECEPTION)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-serif font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('गूगल मैप्स पर देखें', 'Open in Google Maps')}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
