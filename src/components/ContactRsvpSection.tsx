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
        return `${namePart}. We are honored to attend the auspicious wedding of Amish & Riya on 3rd December 2026. Total family members attending: ${guestCount}. Thank you! 🙏`;
      } else {
        return `${namePart}. Sending our heartiest congratulations and blessings to Amish & Riya on their sacred union! Wishing them eternal happiness. 💐`;
      }
    } else {
      const namePart = nameStr ? `नमस्ते, मैं ${nameStr}` : 'नमस्ते,';
      if (attendingStatus === 'yes') {
        return `${namePart}। हम अमीश एवं रिया के शुभ विवाह (3 दिसंबर 2026) में सपरिवार सम्मिलित होकर वर-वधू को आशीर्वाद देंगे। हमारे साथ कुल ${guestCount} सदस्य होंगे। धन्यवाद! 🙏`;
      } else {
        return `${namePart}। हम अमीश और रिया के शुभ विवाह पर अपनी हार्दिक शुभकामनाएं और शुभाशीर्वाद प्रेषित करते हैं! ईश्वर नव-दंपति को सदा सुखी रखे। 💐`;
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
        <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
          {t("॥ संपर्क एवं उपस्थिति पुष्टि ॥", "॥ Contact & RSVP ॥")}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF3E0] via-[#E8D6A5] to-[#C9A45C] drop-shadow-md">
          {t("संपर्क सूत्र एवं RSVP", "Family Contacts & RSVP")}
        </h2>
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C9A45C]" />
          <HeartHandshake className="w-5 h-5 text-[#C9A45C]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>
        <p className="text-sm sm:text-base text-[#FFF5DF]/90 font-serif max-w-xl mx-auto">
          {t(
            "विवाह व्यवस्था एवं स्वागत सत्कार हेतु कृपया अपनी उपस्थिति की सूचना प्रदान करें।",
            "Please confirm your attendance so we may arrange hospitality with royal care."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* 1. Contact Numbers Card */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="bg-[#350610]/95 rounded-[22px] p-6 sm:p-8 border border-[#C9A45C]/30 text-left">
            <h3 className="text-xl font-serif font-bold text-[#FAF3E0] mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#C9A45C]" />
              <span>{t("परिवार संपर्क सूत्र", "Family Contact Persons")}</span>
            </h3>
            <p className="text-xs text-[#C9A45C]/80 font-serif mb-6">
              {t(
                "किसी भी सहायता अथवा जानकारी हेतु निःसंकोच संपर्क करें।",
                "Feel free to connect for any assistance, travel, or accommodations."
              )}
            </p>

            <div className="space-y-4">
              {WEDDING_DATA.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#650D1B]/60 border border-[#C9A45C]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#FFF5DF]">
                      {t(contact.name, contact.nameEn || contact.name)}
                    </h4>
                    <p className="text-xs text-[#E8D6A5] font-serif mb-1">
                      {t(contact.role, contact.roleEn || contact.role)}
                    </p>
                    <span className="text-sm font-semibold text-[#C9A45C] tracking-wider font-mono">
                      {contact.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Call Button */}
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="p-2.5 rounded-xl bg-[#350610] border border-[#C9A45C] text-[#FAF3E0] hover:bg-[#831425] transition-colors cursor-pointer"
                      title={t("फ़ोन कॉल करें", "Call on Phone")}
                    >
                      <Phone className="w-4 h-4 text-[#C9A45C]" />
                    </button>

                    {/* WhatsApp Button */}
                    <button
                      onClick={() => handleWhatsApp(contact.whatsappNumber)}
                      className="p-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/60 text-green-300 hover:bg-[#25D366]/30 transition-colors cursor-pointer"
                      title={t("व्हाट्सएप पर संदेश भेजें", "Send WhatsApp message")}
                    >
                      <MessageCircle className="w-4 h-4 text-green-400" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyPhone(contact.phone, idx)}
                      className="p-2.5 rounded-xl bg-[#350610] border border-[#C9A45C]/50 text-[#E8D6A5] hover:text-white transition-colors cursor-pointer"
                      title={t("नंबर कॉपी करें", "Copy Phone Number")}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[#1F0309]/80 border border-[#C9A45C]/30 text-xs text-[#C9A45C] font-serif text-center">
              {t("वड़ोदरा, गुजरात", "Vadodara, Gujarat")}
            </div>
          </div>
        </div>

        {/* 2. Interactive WhatsApp RSVP Form */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-[#C9A45C]/50 via-[#650D1B] to-[#C9A45C]/50 shadow-burgundy-deep">
          <div className="bg-[#350610]/95 rounded-[22px] p-6 sm:p-8 border border-[#C9A45C]/30 text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif font-bold text-[#FAF3E0] flex items-center gap-2">
                <Send className="w-5 h-5 text-[#C9A45C]" />
                <span>{t("RSVP - उपस्थिति पुष्टि", "RSVP - Confirm Attendance")}</span>
              </h3>
              <span className="text-[11px] font-serif text-[#C9A45C] bg-[#650D1B] px-2.5 py-0.5 rounded-full border border-[#C9A45C]/40">
                via WhatsApp
              </span>
            </div>
            <p className="text-xs text-[#C9A45C]/80 font-serif mb-5">
              {t(
                "संदेश भेजने से पूर्व आप नीचे उसका पूर्वावलोकन (Preview) देख सकते हैं।",
                "Review the preview below before sending your confirmation via WhatsApp."
              )}
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="rsvp-guest-name" className="block text-xs font-serif text-[#E8D6A5] mb-1">
                  {t("आपका शुभ नाम (Guest Name)", "Your Name")}
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t("अपना नाम दर्ज करें", "Enter your name")}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] text-sm font-serif focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-[#E8D6A5] mb-1">
                  {t("उपस्थिति विकल्प (Attending Status)", "Attendance Status")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendingStatus('yes')}
                    className={`py-2 px-3 rounded-xl border text-xs font-serif transition-colors cursor-pointer ${
                      attendingStatus === 'yes'
                        ? 'bg-[#650D1B] border-[#C9A45C] text-[#FAF3E0] font-bold'
                        : 'bg-[#1F0309] border-[#C9A45C]/30 text-[#FFF5DF]/70'
                    }`}
                  >
                    {t("सपरिवार उपस्थित रहेंगे", "Attending with Family")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendingStatus('blessings')}
                    className={`py-2 px-3 rounded-xl border text-xs font-serif transition-colors cursor-pointer ${
                      attendingStatus === 'blessings'
                        ? 'bg-[#650D1B] border-[#C9A45C] text-[#FAF3E0] font-bold'
                        : 'bg-[#1F0309] border-[#C9A45C]/30 text-[#FFF5DF]/70'
                    }`}
                  >
                    {t("शुभकामनाएं प्रेषित करेंगे", "Sending Blessings Only")}
                  </button>
                </div>
              </div>

              {attendingStatus === 'yes' && (
                <div>
                  <label htmlFor="rsvp-guest-count" className="block text-xs font-serif text-[#E8D6A5] mb-1">
                    {t("अतिथियों की संख्या (Number of Guests)", "Number of Guests")}
                  </label>
                  <select
                    id="rsvp-guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl bg-[#1F0309] border border-[#C9A45C]/40 text-[#FFF5DF] text-sm font-serif focus:outline-none focus:border-[#C9A45C]"
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
              <div className="p-3.5 rounded-xl bg-[#1F0309]/90 border border-[#C9A45C]/40 text-xs font-serif">
                <span className="text-[#C9A45C] font-semibold block mb-1">
                  {t("व्हाट्सएप संदेश पूर्वावलोकन:", "WhatsApp Message Preview:")}
                </span>
                <p className="text-[#FFF5DF]/90 italic leading-relaxed">
                  "{getRsvpMessage()}"
                </p>
                <span className="text-[10px] text-[#E8D6A5]/70 block mt-1.5">
                  {t("प्राप्तकर्ता:", "Recipient:")} {defaultContact.name} ({defaultContact.phone})
                </span>
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSendRsvp}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-serif font-bold text-sm shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("व्हाट्सएप पर RSVP भेजें", "Send RSVP via WhatsApp")}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
