import React, { useState } from 'react';
import { FloatingPetalsCanvas } from './components/FloatingPetalsCanvas';
import { HeroGrandReveal } from './components/HeroGrandReveal';
import { Navbar } from './components/Navbar';
import { GaneshBlessingSection } from './components/GaneshBlessingSection';
import { GroomBrideSection } from './components/GroomBrideSection';
import { CountdownTimer } from './components/CountdownTimer';
import { TimelineSection } from './components/TimelineSection';
import { LocationHubSection } from './components/LocationHubSection';
import { FamilyDetailsSection } from './components/FamilyDetailsSection';
import { CongratulationsSection } from './components/CongratulationsSection';
import { ContactRsvpSection } from './components/ContactRsvpSection';
import { Footer } from './components/Footer';
import { AudioControl } from './components/AudioControl';
import { OriginalCardViewer } from './components/OriginalCardViewer';

export const App: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(false);
  const [isCardViewerOpen, setIsCardViewerOpen] = useState<boolean>(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Smoothly scroll to invitation content
    setTimeout(() => {
      const el = document.getElementById('invitation-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleReturnToHero = () => {
    setIsInvitationOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#350610] text-[#FFF5DF] font-body selection:bg-[#C9A45C] selection:text-[#350610] overflow-x-hidden">
      
      {/* 3D Floating Petals and Golden Particles Canvas (Always active for luxury atmosphere) */}
      <FloatingPetalsCanvas />

      {/* Floating Audio Control (Always available, sound OFF by default) */}
      <AudioControl />

      {/* Original Printed Card Viewer Lightbox */}
      <OriginalCardViewer
        isOpen={isCardViewerOpen}
        onClose={() => setIsCardViewerOpen(false)}
      />

      {/* Hero Grand Reveal Cover Screen */}
      {!isInvitationOpen ? (
        <HeroGrandReveal
          isOpen={isInvitationOpen}
          onOpenInvitation={handleOpenInvitation}
        />
      ) : (
        /* Full Interactive Vertical Wedding Experience */
        <div id="invitation-content" className="relative z-20 animate-fade-in">
          
          {/* Top Royal Navbar */}
          <Navbar
            onOpenCardViewer={() => setIsCardViewerOpen(true)}
            onReturnToHero={handleReturnToHero}
          />

          <main className="relative">
            {/* 1. Blessing & Couple Introduction */}
            <div id="invitation" className="relative pt-6">
              <GaneshBlessingSection />
              <GroomBrideSection />
              <CountdownTimer />
            </div>

            {/* 2. Seven Events Timeline */}
            <div id="events" className="relative">
              <TimelineSection />
            </div>

            {/* 3. Three Verified Locations Hub */}
            <div id="locations" className="relative">
              <LocationHubSection />
            </div>

            {/* 4. Family & Heritage (पाणिग्रहण संस्कार, दर्शनाभिलाषी, ननिहाल पक्ष with कृशांग पाठक) */}
            <div id="family" className="relative">
              <FamilyDetailsSection />
            </div>

            {/* 5. Interactive Love & Blessings Wall */}
            <div id="blessings" className="relative">
              <CongratulationsSection />
            </div>

            {/* 6. Contact and RSVP */}
            <div id="rsvp" className="relative">
              <ContactRsvpSection />
            </div>
          </main>

          {/* Luxury Royal Footer */}
          <Footer onOpenCardViewer={() => setIsCardViewerOpen(true)} />

        </div>
      )}

    </div>
  );
};

export default App;
