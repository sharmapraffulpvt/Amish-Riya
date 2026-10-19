import React from 'react';
import { X, Calendar, Clock, MapPin, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { WeddingEvent, WEDDING_DATA, getGoogleMapsUrl } from '../data/weddingData';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface EventModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const { t } = useLang();
  if (!event) return null;

  const location = WEDDING_DATA.locations[event.locationType];
  const mapsUrl = getGoogleMapsUrl(location);

  const handleClose = () => { soundManager.playClick(); onClose(); };

  const handleOpenMap = () => {
    soundManager.playClick();
    if (mapsUrl) window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCalendar = () => {
    soundManager.playClick();
    const startTime = event.isoDate.replace(/[-:]/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${event.englishTitle} - Amish & Riya Wedding`,
      `DESCRIPTION:${event.description}\nRituals: ${event.rituals.join(', ')}`,
      `LOCATION:${location.address || 'Vadodara, Gujarat'}`,
      `DTSTART:${startTime}`,
      `DTEND:${startTime}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-amish-riya.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-w-lg w-full max-h-[92dvh] flex flex-col p-1 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FAF3E0] via-[#C9A45C] to-[#8C672B] shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#350610] rounded-[20px] sm:rounded-[22px] p-5 sm:p-8 text-[#FFF5DF] border border-[#C9A45C]/50 relative overflow-y-auto max-h-[90dvh]">

          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-[#650D1B] border border-[#C9A45C]/60 text-[#E8D6A5] hover:text-white hover:bg-[#831425] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#650D1B] border border-[#C9A45C]/50 text-xs font-serif text-[#E8D6A5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{t('मांगलिक कार्यक्रम', 'Wedding Event')} #{event.order}</span>
          </div>

          {/* Title */}
          <h3 id="modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF3E0]">
            {t(event.title, event.englishTitle)}
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#C9A45C] tracking-widest uppercase mb-6">
            {event.englishTitle}
          </p>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#650D1B]/60 border border-[#C9A45C]/30">
              <Calendar className="w-5 h-5 text-[#C9A45C] shrink-0" />
              <div>
                <p className="text-[11px] text-[#C9A45C] font-serif uppercase">{t('तिथि व वार', 'Date & Day')}</p>
                <p className="text-sm font-serif font-semibold text-[#FFF5DF]">{event.date}</p>
                <p className="text-xs text-[#E8D6A5]">{event.weekday}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#650D1B]/60 border border-[#C9A45C]/30">
              <Clock className="w-5 h-5 text-[#C9A45C] shrink-0" />
              <div>
                <p className="text-[11px] text-[#C9A45C] font-serif uppercase">{t('समय', 'Time')}</p>
                <p className="text-sm font-serif font-semibold text-[#FFF5DF]">{event.time}</p>
                <p className="text-xs text-[#E8D6A5]">{t('शुभ वेला', 'Auspicious Moment')}</p>
              </div>
            </div>
          </div>

          {/* Description & Rituals */}
          <div className="mb-6">
            <p className="text-sm font-serif text-[#FFF5DF]/90 leading-relaxed mb-3">{event.description}</p>
            <div className="flex flex-wrap gap-2">
              {event.rituals.map((r, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[#650D1B]/80 border border-[#C9A45C]/40 text-xs font-serif text-[#E8D6A5]">
                  ✓ {r}
                </span>
              ))}
            </div>
          </div>

          {/* Venue */}
          <div className="p-4 rounded-xl bg-[#1F0309]/90 border border-[#C9A45C]/50 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-serif uppercase tracking-wider text-[#C9A45C] font-semibold">{location.name}</p>
                {location.subName && (
                  <p className="text-[11px] text-[#E8D6A5] font-serif mt-0.5">{location.subName}</p>
                )}
                {location.isConfirmed && location.address ? (
                  <>
                    <p className="text-xs sm:text-sm text-[#FFF5DF] mt-1 leading-relaxed">{location.address}</p>
                    {location.metroInfo && (
                      <p className="text-xs text-[#E8D6A5] mt-1.5 font-serif border-t border-[#C9A45C]/20 pt-1.5">
                        🚇 {t(location.metroInfo, location.metroInfoEn || location.metroInfo)}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 mt-1.5 text-amber-300 text-xs sm:text-sm bg-[#350610] p-2.5 rounded-lg border border-amber-500/40">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{location.unconfirmedMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {location.isConfirmed && mapsUrl ? (
              <button
                onClick={handleOpenMap}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A45C] to-[#E8D6A5] text-[#350610] font-serif font-bold text-sm tracking-wide shadow-gold-glow hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('गूगल मैप्स पर देखें', 'Open in Google Maps')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex-1 text-center py-3 px-4 rounded-xl bg-[#650D1B]/60 border border-[#C9A45C]/30 text-xs font-serif text-[#E8D6A5]">
                {t('स्थान विवरण शीघ्र साझा किया जाएगा', 'Venue details will be shared soon')}
              </div>
            )}
            <button
              onClick={handleAddToCalendar}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#650D1B] border border-[#C9A45C]/70 text-[#FFF5DF] font-serif text-sm hover:bg-[#831425] transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C9A45C]" />
              <span>{t('कैलेंडर में जोड़ें', 'Save to Calendar')}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
