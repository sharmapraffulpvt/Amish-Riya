import React from 'react';
import { MapPin, Navigation, ExternalLink, AlertCircle, Home, HeartHandshake, Utensils } from 'lucide-react';
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
        <div className="relative p-1 rounded-3xl bg-gradient-to-b from-[#FAF3E0]/70 via-[#C9A45C] to-[#8C672B] shadow-gold-glow flex flex-col">
          <div className="h-full bg-gradient-to-b from-[#650D1B] to-[#350610] rounded-[22px] p-6 sm:p-8 text-center flex flex-col justify-between border border-[#C9A45C]">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#350610] border-2 border-[#FAF3E0] mx-auto flex items-center justify-center mb-5 shadow">
                <HeartHandshake className="w-7 h-7 text-[#E8D6A5]" />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#350610] text-[#FAF3E0] text-xs sm:text-sm font-serif uppercase tracking-wider font-semibold mb-3 border border-[#C9A45C]">
                {t('विवाह स्थल', 'Wedding Venue')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF3E0] mb-3 leading-snug">
                {t('मंगल फेरे (शुक्रवार, ४ दिसंबर २०२६, सुबह ०५:०० बजे)', 'Mangal Phere (Fri, 4 Dec 2026, 05:00 AM)')}
              </h3>
              <div className="p-4 rounded-xl bg-[#1F0309]/90 border border-amber-400/40 text-amber-200 text-sm font-serif leading-relaxed mb-6 flex items-start gap-2.5 text-left">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{WEDDING_DATA.locations.WEDDING.unconfirmedMessage}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[#C9A45C]/30">
              <div className="w-full py-3 px-4 rounded-xl bg-[#350610]/80 border border-[#C9A45C]/30 text-sm text-[#E8D6A5] font-serif font-medium text-center">
                {t('विवाह स्थल की सूचना शीघ्र जारी की जाएगी', 'Wedding venue will be announced soon')}
              </div>
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
