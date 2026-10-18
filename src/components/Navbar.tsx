import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface NavbarProps {
  onOpenCardViewer: () => void;
  onReturnToHero: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCardViewer, onReturnToHero }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t } = useLang();

  const navLinks = [
    { label: t('आमंत्रण', 'Invitation'), href: '#invitation' },
    { label: t('मांगलिक कार्यक्रम', 'Events'), href: '#events' },
    { label: t('स्थल निर्देशिका', 'Venues'), href: '#locations' },
    { label: t('परिवारजन', 'Family'), href: '#family' },
    { label: t('शुभाशीर्वाद', 'Blessings'), href: '#blessings' },
    { label: t('RSVP संपर्क', 'RSVP & Contact'), href: '#rsvp' },
  ];

  const handleLinkClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenOriginals = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    onOpenCardViewer();
  };

  const handleCoverClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    onReturnToHero();
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#350610]/95 backdrop-blur-md border-b border-[#C9A45C]/40 shadow-burgundy-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <div
          onClick={handleCoverClick}
          className="flex items-center gap-2.5 cursor-pointer group"
          title={t('मुखपृष्ठ पर लौटें', 'Return to Cover')}
        >
          <img
            src="/ganesha-icon.svg"
            alt="Ganesha"
            className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif text-base sm:text-lg font-bold text-[#FAF3E0] tracking-wide leading-tight group-hover:text-[#E8D6A5] transition-colors">
              {lang === 'hi' ? 'अमीश एवं रिया' : 'Amish & Riya'}
            </span>
            <span className="text-[10px] text-[#C9A45C] font-serif uppercase tracking-widest leading-none">
              3 Dec 2026
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs lg:text-sm font-serif text-[#FFF5DF]/90 hover:text-[#E8D6A5] transition-colors tracking-wide cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={handleOpenOriginals}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#650D1B] border border-[#C9A45C]/60 text-xs font-serif text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{t('मूल पत्रिका', 'Original Card')}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleOpenOriginals}
            className="p-1.5 rounded-full bg-[#650D1B] border border-[#C9A45C]/50 text-[#FAF3E0]"
            title={t('मूल पत्रिका', 'Original Card')}
          >
            <BookOpen className="w-4 h-4 text-[#C9A45C]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#650D1B] border border-[#C9A45C]/60 text-[#FAF3E0] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F0309] border-b border-[#C9A45C]/40 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-serif text-[#FFF5DF] hover:bg-[#650D1B] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            </button>
          ))}
          <button
            onClick={handleCoverClick}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-serif text-[#C9A45C] hover:bg-[#650D1B] transition-colors"
          >
            {t('मुखपृष्ठ आवरण देखें', 'Return to Cover')}
          </button>
        </div>
      )}
    </nav>
  );
};
