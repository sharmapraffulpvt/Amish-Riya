import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { WEDDING_DATA, WeddingEvent } from '../data/weddingData';
import { EventModal } from './EventModal';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

export const TimelineSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);
  const { t } = useLang();

  const handleSelectEvent = (event: WeddingEvent) => {
    soundManager.playClick();
    setSelectedEvent(event);
  };

  const getEventIcon = (iconType: WeddingEvent['iconType']) => {
    switch (iconType) {
      case 'ganesha': return '🕉️';
      case 'oil':     return '🪔';
      case 'turmeric':return '✨';
      case 'henna':   return '🌿';
      case 'horse':   return '🐎';
      case 'fire':    return '🔥';
      case 'feast':   return '🍽️';
      default:        return '🎉';
    }
  };

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
          {t('॥ मांगलिक कार्यक्रम ॥', '॥ Wedding Ceremonies ॥')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t('शुभ विवाह उत्सव रूपरेखा', 'Schedule of Auspicious Events')}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <Sparkles className="w-5 h-5 text-[#C9A45C]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="text-sm sm:text-base text-[#FFF5DF]/90 font-serif max-w-xl mx-auto">
          {t(
            'प्रत्येक मांगलिक अनुष्ठान की संपूर्ण जानकारी व स्थल हेतु कार्ड पर क्लिक करें।',
            'Click any event card for full details, rituals, and location map.'
          )}
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {WEDDING_DATA.events.map((event) => {
          const loc = WEDDING_DATA.locations[event.locationType];
          const isHighlight = event.id === 'mangal-phere' || event.id === 'priti-bhoj';

          return (
            <div
              key={event.id}
              onClick={() => handleSelectEvent(event)}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${event.title} / ${event.englishTitle}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectEvent(event); }
              }}
              className={`group relative p-1 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A45C] ${
                isHighlight
                  ? 'bg-gradient-to-r from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-gold-glow'
                  : 'bg-gradient-to-b from-[#C9A45C]/40 via-[#650D1B] to-[#C9A45C]/40'
              }`}
            >
              <div className="h-full bg-gradient-to-b from-[#650D1B]/95 to-[#350610]/95 rounded-[14px] p-5 sm:p-6 flex flex-col justify-between border border-[#C9A45C]/30 group-hover:border-[#C9A45C]/80 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#350610] border border-[#C9A45C]/40 text-xs font-serif text-[#E8D6A5]">
                      <span className="text-sm">{getEventIcon(event.iconType)}</span>
                      <span>{loc.nameEn}</span>
                    </span>
                    <span className="text-xs font-serif text-[#C9A45C] font-semibold">#{event.order}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF5DF] group-hover:text-[#FAF3E0] transition-colors">
                    {t(event.title, event.englishTitle)}
                  </h3>
                  <p className="text-xs font-serif text-[#C9A45C]/90 tracking-wider uppercase mb-4">
                    {event.englishTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C9A45C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#FFF5DF]">
                    <Calendar className="w-4 h-4 text-[#C9A45C] shrink-0" />
                    <span className="font-serif font-medium">{event.date}</span>
                    <span className="text-[#E8D6A5] text-xs">({event.weekday.split('(')[1]?.replace(')', '') || event.weekday})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E8D6A5]">
                    <Clock className="w-4 h-4 text-[#C9A45C] shrink-0" />
                    <span className="font-serif font-medium">{event.time}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#C9A45C]">
                  <span className="flex items-center gap-1 font-serif">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc.isConfirmed ? t('स्थान विवरण उपलब्ध', 'Venue available') : t('स्थान शीघ्र अपडेट होगा', 'Venue TBA')}</span>
                  </span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform font-serif font-semibold text-[#FFF5DF]">
                    <span>{t('विवरण देखें', 'View Details')}</span>
                    <ChevronRight className="w-4 h-4 text-[#C9A45C]" />
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
};
