import React, { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Download, ExternalLink, FileText } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface OriginalCardViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalCardViewer: React.FC<OriginalCardViewerProps> = ({ isOpen, onClose }) => {
  const { t } = useLang();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'pages' | 'pdf'>('pages');

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const pdfUrl = '/Amish_Riya_Wedding_Invitation.pdf';

  const pages = [
    {
      title: t(
        'प्रथम पृष्ठ — मंगल निमंत्रण (Page 1)',
        'Page 1 — Auspicious Cover Invitation'
      ),
      src: '/images/page-1.png',
    },
    {
      title: t(
        'द्वितीय पृष्ठ — शादी का निमंत्रण एवं स्थान (Page 2)',
        'Page 2 — Wedding Invitation & Venue'
      ),
      src: '/images/page-2.png',
    },
    {
      title: t(
        'तृतीय पृष्ठ — मांगलिक कार्यक्रम (Page 3)',
        'Page 3 — Schedule of Auspicious Events'
      ),
      src: '/images/page-3.png',
    },
    {
      title: t(
        'चतुर्थ पृष्ठ — पाणिग्रहण संस्कार एवं परिवार (Page 4)',
        'Page 4 — Sacred Ceremony & Family Lineage'
      ),
      src: '/images/page-4.png',
    },
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    soundManager.playClick();
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45; // px

    if (diff > minSwipeDistance) {
      // Swiped left -> next page
      handleNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev page
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-3xl w-full max-h-[94dvh] flex flex-col items-center bg-[#350610] border-2 border-[#C9A45C] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl text-[#FFF5DF] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="w-full flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pb-2.5 border-b border-[#C9A45C]/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A45C] shrink-0" />
            <div>
              <h3 className="text-xs sm:text-base font-serif font-bold text-[#FAF3E0] leading-tight">
                {viewMode === 'pages' ? pages[currentPage].title : t('पूर्ण मूल पत्रिका (PDF)', 'Complete Original Invitation (PDF)')}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#C9A45C] font-mono leading-none mt-0.5">
                Amish_Riya_Wedding_Invitation.pdf
              </p>
            </div>
          </div>

          {/* Action buttons (View mode toggle, Download, Open external, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-end xs:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#1F0309] rounded-lg p-0.5 border border-[#C9A45C]/40 text-xs font-serif">
              <button
                onClick={() => { soundManager.playClick(); setViewMode('pages'); }}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'pages'
                    ? 'bg-[#650D1B] text-[#FAF3E0] font-semibold'
                    : 'text-[#FFF5DF]/70 hover:text-[#FAF3E0]'
                }`}
              >
                {t('पृष्ठ', 'Pages')}
              </button>
              <button
                onClick={() => { soundManager.playClick(); setViewMode('pdf'); }}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#650D1B] text-[#FAF3E0] font-semibold'
                    : 'text-[#FFF5DF]/70 hover:text-[#FAF3E0]'
                }`}
              >
                <FileText className="w-3 h-3 text-[#C9A45C]" />
                <span>PDF</span>
              </button>
            </div>

            {/* Direct Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="p-1.5 sm:p-2 rounded-lg bg-[#650D1B] border border-[#C9A45C]/50 text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              title={t('नई टैब में PDF खोलें', 'Open PDF in New Tab')}
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A45C]" />
            </a>

            {/* Direct Download PDF */}
            <a
              href={pdfUrl}
              download="Amish_Riya_Wedding_Invitation.pdf"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/60 text-xs font-serif text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer shadow-sm min-h-[36px]"
              title={t('PDF डाउनलोड करें', 'Download PDF')}
            >
              <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span className="hidden sm:inline">{t('डाउनलोड', 'Download')}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 rounded-full bg-[#650D1B] border border-[#C9A45C]/50 text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Card Display Area (With Mobile Swipe Support) */}
        <div
          className="relative flex-1 w-full my-2 flex items-center justify-center overflow-hidden min-h-0 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {viewMode === 'pages' ? (
            <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
              <img
                src={pages[currentPage].src}
                alt={pages[currentPage].title}
                className="max-h-[60dvh] xs:max-h-[65dvh] sm:max-h-[72dvh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-[#C9A45C]/50 transition-all duration-300"
                draggable={false}
              />
              <span className="mt-1 text-[10px] text-[#C9A45C]/80 font-serif sm:hidden">
                {t('← स्वाइप कर पृष्ठ बदलें →', '← Swipe left/right to turn page →')}
              </span>
            </div>
          ) : (
            <div className="w-full h-[60dvh] xs:h-[65dvh] sm:h-[72dvh] rounded-xl overflow-hidden border border-[#C9A45C]/40 bg-[#1F0309] flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                title="Amish & Riya Wedding Invitation PDF"
                className="w-full flex-1 border-0"
              />
              <div className="p-2 text-center text-xs text-[#C9A45C] bg-[#1F0309] border-t border-[#C9A45C]/30 flex items-center justify-center gap-2">
                <span>{t('PDF सीधे देखने या डाउनलोड करने हेतु:', 'To view full PDF or download:')}</span>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#FAF3E0] font-semibold"
                >
                  {t('यहाँ क्लिक करें (Click Here)', 'Open PDF in New Window')}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation for Pages Mode */}
        {viewMode === 'pages' ? (
          <div className="w-full flex items-center justify-between pt-2 border-t border-[#C9A45C]/30 text-xs sm:text-sm font-serif">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/40 hover:bg-[#831425] transition-colors cursor-pointer min-h-[36px]"
            >
              <ChevronLeft className="w-4 h-4 text-[#C9A45C]" />
              <span className="hidden xs:inline">{t('पिछला', 'Prev')}</span>
            </button>

            {/* Quick Page Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { soundManager.playClick(); setCurrentPage(idx); }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentPage === idx
                      ? 'w-6 bg-[#C9A45C]'
                      : 'w-2.5 bg-[#FAF3E0]/30 hover:bg-[#FAF3E0]/60'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
              <span className="ml-1.5 text-[#C9A45C] font-semibold text-xs sm:text-sm">
                {currentPage + 1}/{pages.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/40 hover:bg-[#831425] transition-colors cursor-pointer min-h-[36px]"
            >
              <span className="hidden xs:inline">{t('अगला', 'Next')}</span>
              <ChevronRight className="w-4 h-4 text-[#C9A45C]" />
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between pt-2 border-t border-[#C9A45C]/30 text-xs sm:text-sm font-serif">
            <span className="text-[#C9A45C] text-xs">
              {t('आधिकारिक आमंत्रण पत्रिका (PDF)', 'Official Wedding Invitation (PDF)')}
            </span>
            <a
              href={pdfUrl}
              download="Amish_Riya_Wedding_Invitation.pdf"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/50 text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{t('PDF डाउनलोड', 'Download PDF')}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
