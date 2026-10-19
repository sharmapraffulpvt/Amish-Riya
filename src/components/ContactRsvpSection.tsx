import React, { useState } from 'react';
import { Phone, MessageCircle, Send, Check, HeartHandshake, Sparkles, Copy } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { soundManager } from '../utils/soundManager';
import { useLang } from '../context/LanguageContext';

export const ContactRsvpSection: React.FC = () => {
  const { t, lang } = useLang();
  const [guestName, setGuestName] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [attendingStatus, setAttendingStatus] = useState<'yes' | 'blessings'>('yes');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const defaultContact = WEDDING_DATA.contacts[0];

  const getRsvpMessage = () => {
    const isEn = lang === 'en';
    const nameStr = guestName.trim();

    if (isEn) {
      const namePart = nameStr ? `Namaste, I am ${nameStr}` : 'Namaste,';
      if (attendingStatus === 'yes') {
        return `${namePart}. We are honored to confirm our attendance for the Grand Wedding Reception (प्रीति भोज) of Amish & Riya on Saturday, 5th December 2026 at 07:00 PM (Hotel Grand Mercure Surya Palace, Vadodara). Total family members attending: ${guestCount}. Thank you! 🙏`;
      } else {
        return `${namePart}. Sending our heartiest congratulations and warmest blessings to Amish & Riya on their sacred wedding and reception! Wishing them lifelong happiness. 💐`;
      }
    } else {
      const namePart = nameStr ? `नमस्ते, मैं ${nameStr}` : 'नमस्ते,';
      if (attendingStatus === 'yes') {
        return `${namePart}। हम अमीश एवं रिया के शुभ विवाह प्रीति भोज (शनिवार, 5 दिसंबर 2026, शाम 07:00 बजे — होटल ग्रैंड मर्क्युरी, सूर्य पैलेस, वड़ोदरा) में सपरिवार सम्मिलित होकर नव-दंपति को आशीर्वाद देंगे। हमारे साथ कुल ${guestCount} सदस्य होंगे। धन्यवाद! 🙏`;
      } else {
        return `${namePart}। हम अमीश एवं रिया के शुभ विवाह एवं प्रीति भोज के पावन अवसर पर अपनी हार्दिक शुभकामनाएं और शुभाशीर्वाद प्रेषित करते हैं! ईश्वर नव-दंपति को सदा सुखी रखे। 💐`;
      }
    }
  };

  const handleSendRsvp = () => {
    soundManager.playClick();
    const encodedMessage = encodeURIComponent(getRsvpMessage());
    const whatsappUrl = `https://wa.me/${defaultContact.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = (phone: string) => {
    soundManager.playClick();
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (waNumber: string) => {
    soundManager.playClick();
    const msg = encodeURIComponent(
      lang === 'en'
        ? 'Namaste! Contacting regarding Amish & Riya wedding invitation.'
        : 'नमस्ते! अमीश एवं रिया के शुभ विवाह आमंत्रण के संबंध में संपर्क करना चाहते हैं।'
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPhone = (phone: string, idx: number) => {
    soundManager.playClick();
    navigator.clipboard.writeText(phone);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-[#C9A45C] uppercase font-semibold block mb-2">
          {t("॥ प्रीति भोज उपस्थिति पुष्टि (RSVP) ॥", "॥ Reception Attendance & RSVP ॥")}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t("प्रीति भोज RSVP एवं संपर्क", "Reception RSVP & Contact")}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <HeartHandshake className="w-5 h-5 text-[#C9A45C]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="text-base sm:text-lg text-[#FFF5DF] font-serif max-w-xl mx-auto">
          {t(
            "शनिवार, 5 दिसंबर 2026 (शाम 07:00 बजे) प्रीति भोज में स्वागत सत्कार हेतु कृपया अपनी उपस्थिति की सूचना प्रदान करें।",
            "Please confirm your attendance for the Grand Wedding Reception on Saturday, 5th December 2026 at 07:00 PM."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* 1. Contact Numbers Card */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="bg-[#350610]/95 rounded-[22px] p-6 sm:p-8 border border-[#C9A45C]/30 text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF3E0] mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#C9A45C]" />
              <span>{t("परिवार संपर्क सूत्र", "Family Contact Person")}</span>
            </h3>
            <p className="text-sm text-[#C9A45C] font-serif mb-6">
              {t(
                "किसी भी सहायता अथवा जानकारी हेतु निःसंकोच संपर्क करें।",
                "Feel free to connect for any assistance, travel, or accommodations."
              )}
            </p>

            <div className="space-y-4">
              {WEDDING_DATA.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#650D1B]/60 border border-[#C9A45C]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                >
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF5DF]">
                      {t(contact.name, contact.nameEn || contact.name)}
                    </h4>
                    <p className="text-sm sm:text-base text-[#E8D6A5] font-serif mb-1.5 font-semibold">
                      {t(contact.role, contact.roleEn || contact.role)}
                    </p>
                    <span className="text-lg sm:text-xl font-bold text-[#C9A45C] tracking-wider font-mono">
                      {contact.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Call Button */}
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="p-3 rounded-xl bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title={t("फ़ोन कॉल करें", "Call on Phone")}
                    >
                      <Phone className="w-5 h-5 text-[#C9A45C]" />
                    </button>

                    {/* WhatsApp Button */}
                    <button
                      onClick={() => handleWhatsApp(contact.whatsappNumber)}
                      className="p-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/60 text-green-300 hover:bg-[#25D366]/30 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title={t("व्हाट्सएप पर संदेश भेजें", "Send WhatsApp message")}
                    >
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyPhone(contact.phone, idx)}
                      className="p-3 rounded-xl bg-[#350610] border border-[#C9A45C]/50 text-[#E8D6A5] hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title={t("नंबर कॉपी करें", "Copy Phone Number")}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#1F0309]/80 border border-[#C9A45C]/30 text-sm font-serif font-semibold text-[#C9A45C] text-center">
              {t("वड़ोदरा, गुजरात", "Vadodara, Gujarat")}
            </div>
          </div>
        </div>

        {/* 2. Interactive WhatsApp RSVP Form */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="bg-[#350610]/95 rounded-[22px] p-6 sm:p-8 border border-[#C9A45C]/30 text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF3E0] flex items-center gap-2">
                <Send className="w-5 h-5 text-[#C9A45C]" />
                <span>{t("RSVP — प्रीति भोज (5 दिसंबर)", "RSVP — Reception (5th Dec)")}</span>
              </h3>
              <span className="text-xs font-serif font-semibold text-[#C9A45C] bg-[#650D1B] px-3 py-1 rounded-full border border-[#C9A45C]/40">
                via WhatsApp
              </span>
            </div>
            <p className="text-sm text-[#C9A45C] font-serif mb-6">
              {t(
                "शनिवार, 5 दिसंबर 2026 (शाम 07:00 बजे) प्रीति भोज उपस्थिति हेतु नीचे पूर्वावलोकन देखें:",
                "Confirm your attendance for the 5th December Reception (07:00 PM) below:"
              )}
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="rsvp-guest-name" className="block text-sm font-serif font-semibold text-[#E8D6A5] mb-1.5">
                  {t("आपका शुभ नाम (Guest Name)", "Your Name")}
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t("अपना नाम दर्ज करें", "Enter your name")}
                  className="w-full px-4 py-3 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] text-base font-serif focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div>
                <label className="block text-sm font-serif font-semibold text-[#E8D6A5] mb-1.5">
                  {t("उपस्थिति विकल्प (Attending Status)", "Attendance Status")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendingStatus('yes')}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-serif transition-colors cursor-pointer ${
                      attendingStatus === 'yes'
                        ? 'bg-[#650D1B] border-[#C9A45C] text-[#FAF3E0] font-bold shadow-sm'
                        : 'bg-[#1F0309] border-[#C9A45C]/30 text-[#FFF5DF]/70'
                    }`}
                  >
                    {t("सपरिवार उपस्थित रहेंगे", "Attending with Family")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendingStatus('blessings')}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-serif transition-colors cursor-pointer ${
                      attendingStatus === 'blessings'
                        ? 'bg-[#650D1B] border-[#C9A45C] text-[#FAF3E0] font-bold shadow-sm'
                        : 'bg-[#1F0309] border-[#C9A45C]/30 text-[#FFF5DF]/70'
                    }`}
                  >
                    {t("शुभकामनाएं प्रेषित करेंगे", "Sending Blessings Only")}
                  </button>
                </div>
              </div>

              {attendingStatus === 'yes' && (
                <div>
                  <label htmlFor="rsvp-guest-count" className="block text-sm font-serif font-semibold text-[#E8D6A5] mb-1.5">
                    {t("अतिथियों की संख्या (Number of Guests)", "Number of Guests")}
                  </label>
                  <select
                    id="rsvp-guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] text-base font-serif focus:outline-none focus:border-[#C9A45C]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-[#350610]">
                        {num} {t(num === 1 ? 'सदस्य' : 'सदस्य', num === 1 ? 'Guest' : 'Guests')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message Preview */}
              <div className="p-4 rounded-xl bg-[#1F0309]/90 border border-[#C9A45C]/40 text-sm font-serif">
                <span className="text-[#C9A45C] font-semibold block mb-1.5">
                  {t("व्हाट्सएप संदेश पूर्वावलोकन:", "WhatsApp Message Preview:")}
                </span>
                <p className="text-[#FFF5DF] italic leading-relaxed text-sm sm:text-base">
                  "{getRsvpMessage()}"
                </p>
                <span className="text-xs text-[#E8D6A5] block mt-2 font-medium">
                  {t("प्राप्तकर्ता:", "Recipient:")} {defaultContact.name} ({defaultContact.phone}) — {t(defaultContact.role, defaultContact.roleEn || defaultContact.role)}
                </span>
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSendRsvp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-serif font-bold text-base shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t("व्हाट्सएप पर RSVP भेजें", "Send RSVP via WhatsApp")}</span>
                <Sparkles className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
