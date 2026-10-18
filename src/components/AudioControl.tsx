import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Languages } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

interface AudioControlProps {
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({ className = '' }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true); // default ON
  const [showHint, setShowHint] = useState<boolean>(false);
  const { lang, toggleLang } = useLang();

  // Sync with soundManager state
  useEffect(() => {
    setIsEnabled(soundManager.getSoundState());
  }, []);

  const handleToggle = () => {
    const nextState = soundManager.toggleSound();
    setIsEnabled(nextState);
    if (nextState) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const handleLangToggle = () => {
    soundManager.playClick();
    toggleLang();
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${className}`}>
      {/* Toast Notification for Sound Activation */}
      {showHint && (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#350610]/95 border border-[#C9A45C] text-[#FFF5DF] text-xs px-3 py-2 rounded-full shadow-gold-glow backdrop-blur-md hidden sm:flex items-center gap-2"
        >
          <Music className="w-3.5 h-3.5 text-[#C9A45C] animate-pulse" />
          <span>मंगल शहनाई संगीत सक्रिय (Sound ON)</span>
        </div>
      )}

      {/* Row: Language Toggle + Sound Toggle */}
      <div className="flex items-center gap-2">

        {/* Language Toggle Button */}
        <button
          onClick={handleLangToggle}
          aria-label={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
          title={lang === 'hi' ? 'Switch to English' : 'Switch to Hindi'}
          className="group flex items-center gap-2 px-4 py-3 rounded-full border border-[#C9A45C]/70 bg-[#1F0309]/85 backdrop-blur-md text-[#E8D6A5]/90 hover:border-[#C9A45C] hover:text-[#FFF5DF] transition-all duration-300 shadow-lg cursor-pointer"
        >
          <Languages className="w-5 h-5 text-[#C9A45C] group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-bold tracking-wide text-[#E8D6A5]">
              {lang === 'hi' ? 'ENGLISH' : 'हिंदी'}
            </span>
            <span className="text-[9px] text-[#C9A45C]/80 font-serif">
              {lang === 'hi' ? 'Switch Language' : 'भाषा बदलें'}
            </span>
          </div>
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={handleToggle}
          aria-label={isEnabled ? 'Mute Music' : 'Play Indian Wedding Music'}
          title={isEnabled ? 'Mute Music (ध्वनि बंद करें)' : 'Play Music (ध्वनि चालू करें)'}
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full border transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer ${
            isEnabled
              ? 'bg-[#350610]/90 border-[#C9A45C] text-[#FFF5DF] shadow-gold-glow'
              : 'bg-[#1F0309]/80 border-[#C9A45C]/40 text-[#E8D6A5]/80 hover:border-[#C9A45C] hover:text-[#FFF5DF]'
          }`}
        >
          {isEnabled ? (
            <>
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-[#C9A45C]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8D6A5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A45C]"></span>
                </span>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-semibold text-[#E8D6A5] tracking-wide">MUSIC ON</span>
                <span className="text-[9px] text-[#C9A45C]/90 font-serif">शहनाई वादन</span>
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 text-[#C9A45C]/70 group-hover:text-[#C9A45C]" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-medium text-[#FFF5DF]/80 group-hover:text-[#FFF5DF] tracking-wide">MUSIC OFF</span>
                <span className="text-[9px] text-[#C9A45C]/70 font-serif">क्लिक कर सुनें</span>
              </div>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
