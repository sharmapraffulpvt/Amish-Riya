import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface OriginalCardViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalCardViewer: React.FC<OriginalCardViewerProps> = ({ isOpen, onClose }) => {
  const { t } = useLang();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const pages = [
    {
      title: t(
        'प्रथम पृष्ठ — शादी का निमंत्रण (Page 1)',
        'Page 1 — Main Wedding Invitation'
      ),
      src: '/images/page-1.png',
    },
    {
      title: t(
        'द्वितीय पृष्ठ — मांगलिक कार्यक्रम (Page 2)',
        'Page 2 — Auspicious Schedule of Events'
      ),
      src: '/images/page-2.png',
    },
    {
      title: t(
        'तृतीय पृष्ठ — पाणिग्रहण संस्कार एवं परिवार (Page 3)',
        'Page 3 — Wedding Ceremony & Family Lineage'
      ),
      src: '/images/page-3.png',
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center bg-[#350610] border-2 border-[#C9A45C] rounded-3xl p-4 sm:p-6 shadow-2xl text-[#FFF5DF] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#C9A45C]/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A45C]" />
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#FAF3E0]">
              {pages[currentPage].title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-[#650D1B] border border-[#C9A45C]/50 text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Image Display */}
        <div className="relative flex-1 w-full my-3 flex items-center justify-center overflow-auto min-h-0">
          <img
            src={pages[currentPage].src}
            alt={pages[currentPage].title}
            className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg border border-[#C9A45C]/40"
          />
        </div>

        {/* Bottom Pagination & Nav */}
        <div className="w-full flex items-center justify-between pt-2 border-t border-[#C9A45C]/30 text-xs sm:text-sm font-serif">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/40 hover:bg-[#831425] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#C9A45C]" />
            <span>{t("पिछला पृष्ठ", "Previous")}</span>
          </button>

          <span className="text-[#C9A45C] font-semibold">
            {t("पृष्ठ", "Page")} {currentPage + 1} / {pages.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#650D1B] border border-[#C9A45C]/40 hover:bg-[#831425] transition-colors cursor-pointer"
          >
            <span>{t("अगला पृष्ठ", "Next")}</span>
            <ChevronRight className="w-4 h-4 text-[#C9A45C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
