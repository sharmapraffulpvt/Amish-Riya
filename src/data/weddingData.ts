export interface WeddingLocation {
  id: 'HOME' | 'WEDDING' | 'RECEPTION';
  name: string;
  nameEn: string;
  address: string | null;
  mapQuery: string | null;
  isConfirmed: boolean;
  unconfirmedMessage?: string;
}

export interface WeddingEvent {
  id: string;
  order: number;
  title: string;
  englishTitle: string;
  date: string;
  weekday: string;
  time: string;
  isoDate: string; // for calendar export
  locationType: 'HOME' | 'WEDDING' | 'RECEPTION';
  iconType: 'ganesha' | 'oil' | 'turmeric' | 'henna' | 'horse' | 'fire' | 'feast';
  description: string;
  rituals: string[];
}

export interface WeddingConfig {
  groom: {
    name: string;
    englishName: string;
    parents: string;
    parentsDetails: string;
    grandfather?: string;
  };
  bride: {
    name: string;
    englishName: string;
    parents: string;
    parentsDetails: string;
  };
  weddingDate: {
    hindi: string;
    english: string;
    day: string;
    targetIso: string; // "2026-12-03T19:00:00+05:30"
  };
  mantras: {
    ganeshaMukhya: string;
    shloka: string;
    shlokaMeaning: string;
    invitationNote: string;
  };
  locations: Record<'HOME' | 'WEDDING' | 'RECEPTION', WeddingLocation>;
  events: WeddingEvent[];
  family: {
    darshanabhilashi: { name1: string; name2: string }[];
    nanihalPaksh: {
      elders: string[];
      uncles: string[];
      cousins: string[];
    };
  };
  contacts: {
    name: string;
    nameEn?: string;
    phone: string;
    whatsappNumber: string;
    role: string;
    roleEn?: string;
  }[];
}

export const WEDDING_DATA: WeddingConfig = {
  groom: {
    name: "श्री अमीश शर्मा",
    englishName: "Amish Sharma",
    parents: "श्री अनिल शर्मा एवं श्रीमती वंदना शर्मा",
    parentsDetails: "सुपुत्र श्री अनिल शर्मा एवं श्रीमती वंदना शर्मा"
  },
  bride: {
    name: "सुश्री रिया भारद्वाज",
    englishName: "Riya Bhardwaj",
    parents: "श्री मिथिलेश कुमार एवं श्रीमती रेखा कुमारी",
    parentsDetails: "सुपुत्री श्री मिथिलेश कुमार एवं श्रीमती रेखा कुमारी"
  },
  weddingDate: {
    hindi: "गुरुवार, 3 दिसंबर 2026",
    english: "Thursday, 3 December 2026",
    day: "गुरुवार",
    targetIso: "2026-12-03T19:00:00+05:30"
  },
  mantras: {
    ganeshaMukhya: "॥ श्री गणेशाय नमः ॥",
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    shlokaMeaning: "हे विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी गणेश जी, मेरे सभी कार्यों को सदा बाधा रहित पूर्ण करें।",
    invitationNote: "परमपिता परमेश्वर एवं कुलदेवी की असीम अनुकंपा से हमारे प्रिय पुत्र-पुत्री का शुभ विवाह सम्पन्न होने जा रहा है। इस पावन बेला पर आप सपरिवार पधारकर वर-वधू को अपना स्नेह, वात्सल्य एवं शुभाशीर्वाद प्रदान कर हमें अनुगृहीत करें।"
  },
  locations: {
    HOME: {
      id: 'HOME',
      name: 'गृह निवास (Home Residence)',
      nameEn: 'Home Residence',
      address: 'B-203 Sunrise Heights Apartments, Opposite Lakme Salon, Sunpharma Road, Atladara, Vadodara - 390012',
      mapQuery: 'B-203 Sunrise Heights Apartments Opposite Lakme Salon Sunpharma Road Atladara Vadodara 390012',
      isConfirmed: true
    },
    WEDDING: {
      id: 'WEDDING',
      name: 'मंगल फेरे विवाह स्थल (Wedding Venue)',
      nameEn: 'Wedding Ceremony Venue',
      // Explicitly null until venue confirmed as instructed
      address: null,
      mapQuery: null,
      isConfirmed: false,
      unconfirmedMessage: 'Wedding venue details will be updated soon / विवाह स्थल का विवरण शीघ्र ही साझा किया जाएगा।'
    },
    RECEPTION: {
      id: 'RECEPTION',
      name: 'प्रीति भोज (रिसेप्शन) स्थल',
      nameEn: 'Reception Venue',
      address: 'होटल ग्रैंड मर्क्युरी, सुर्या पैलेस होटल, जेतलपुर रोड, पारसी अगियारी के सामने, सयाजीगंज, वड़ोदरा',
      mapQuery: 'Grand Mercure Vadodara Surya Palace, Jetalpur Road, Sayajiganj, Vadodara',
      isConfirmed: true
    }
  },
  events: [
    {
      id: 'ganesh-sthapana',
      order: 1,
      title: 'गणेश स्थापना',
      englishTitle: 'Ganesh Sthapana',
      date: '30 November 2026',
      weekday: 'सोमवार (Monday)',
      time: 'सुबह 08:00 बजे',
      isoDate: '2026-11-30T08:00:00',
      locationType: 'HOME',
      iconType: 'ganesha',
      description: 'विवाह महोत्सव का शुभारंभ विघ्नहर्ता भगवान श्री गणेश जी की स्थापना एवं मंगल पूजन के साथ किया जाएगा।',
      rituals: ['गणेश पूजन', 'संकल्प', 'कलश स्थापना', 'प्रसाद वितरण']
    },
    {
      id: 'tel-samaroh',
      order: 2,
      title: 'तेल समारोह',
      englishTitle: 'Tel Samaroh',
      date: '1 December 2026',
      weekday: 'मंगलवार (Tuesday)',
      time: 'सुबह 09:00 बजे',
      isoDate: '2026-12-01T09:00:00',
      locationType: 'HOME',
      iconType: 'oil',
      description: 'पारंपरिक तेल एवं उबटन की शुभ रस्म जो वर को सौंदर्य एवं सकारात्मक ऊर्जा प्रदान करती है।',
      rituals: ['तेल लेपन', 'मांगल्य गीत', 'पारंपरिक आशीर्वाद']
    },
    {
      id: 'haldi',
      order: 3,
      title: 'हल्दी',
      englishTitle: 'Haldi Ceremony',
      date: '1 December 2026',
      weekday: 'मंगलवार (Tuesday)',
      time: 'सुबह 10:00 बजे',
      isoDate: '2026-12-01T10:00:00',
      locationType: 'HOME',
      iconType: 'turmeric',
      description: 'हल्दी, चंदन और गुलाब जल के साथ उत्सव और उल्लास से परिपूर्ण सतरंगी हल्दी रस्म।',
      rituals: ['हल्दी उबटन', 'पुष्प वर्षा', 'ढोल-नगाड़े', 'संगीतमय माहौल']
    },
    {
      id: 'mehndi',
      order: 4,
      title: 'मेहंदी',
      englishTitle: 'Mehndi Ceremony',
      date: '1 December 2026',
      weekday: 'मंगलवार (Tuesday)',
      time: 'दोपहर 02:00 बजे',
      isoDate: '2026-12-01T14:00:00',
      locationType: 'HOME',
      iconType: 'henna',
      description: 'प्रेम और सौहार्द के रंगों में सजी सुहानी मेहंदी दोपहर, सुमधुर लोकगीतों के संग।',
      rituals: ['मेहंदी आलेखन', 'लोक नृत्य', 'संगीत', 'पारंपरिक दावत']
    },
    {
      id: 'nikasi',
      order: 5,
      title: 'निकासी (बारात प्रस्थान)',
      englishTitle: 'Nikasi (Baraat Departure)',
      date: '2 December 2026',
      weekday: 'बुधवार (Wednesday)',
      time: 'रात 08:00 बजे',
      isoDate: '2026-12-02T20:00:00',
      locationType: 'HOME',
      iconType: 'horse',
      description: 'सजी हुई घोड़ी और मंगल बाजों के साथ दूल्हे राजा का धूमधाम से बारात प्रस्थान।',
      rituals: ['सेहरा बंदी', 'आरती', 'घोड़ी चढ़ाई', 'बारात का उत्साह']
    },
    {
      id: 'mangal-phere',
      order: 6,
      title: 'मंगल फेरे',
      englishTitle: 'Mangal Phere (Wedding Vows)',
      date: '3 December 2026',
      weekday: 'गुरुवार (Thursday)',
      time: 'शाम 07:00 बजे',
      isoDate: '2026-12-03T19:00:00',
      locationType: 'WEDDING',
      iconType: 'fire',
      description: 'पवित्र अग्नि के समक्ष सात फेरे और सात जन्मों का पावन बंधन एवं वरमाला।',
      rituals: ['जयमाला', 'कन्यादान', 'सप्तपदी', 'सिंदूर दान']
    },
    {
      id: 'priti-bhoj',
      order: 7,
      title: 'प्रीति भोज (रिसेप्शन)',
      englishTitle: 'Priti Bhoj (Grand Reception)',
      date: '5 December 2026',
      weekday: 'शनिवार (Saturday)',
      time: 'रात 08:00 बजे',
      isoDate: '2026-12-05T20:00:00',
      locationType: 'RECEPTION',
      iconType: 'feast',
      description: 'नव-दंपति के स्वागत में भव्य रात्रिभोज एवं मंगल शुभकामना मिलन समारोह।',
      rituals: ['आशीर्वाद समारोह', 'रंगारंग शाम', 'शाही भोज']
    }
  ],
  family: {
    darshanabhilashi: [
      { name1: "कैलाश चंद्र शर्मा", name2: "संजय शर्मा" },
      { name1: "गोपाल शर्मा", name2: "विकास शर्मा" },
      { name1: "राजेन्द्र शर्मा", name2: "कपिल शर्मा" },
      { name1: "दिलीप शर्मा", name2: "गौरव शर्मा" },
      { name1: "सुनील शर्मा", name2: "आयुष शर्मा" }
    ],
    nanihalPaksh: {
      elders: ["जगदीश प्रसाद झा"],
      uncles: ["राजीव पाठक", "गौरव पाठक"],
      cousins: ["भव्य पाठक", "कृशांग पाठक"] // preserve strictly कृशांग पाठक
    }
  },
  contacts: [
    {
      name: "अनिल शर्मा",
      nameEn: "Anil Sharma",
      phone: "+91 8758743895",
      whatsappNumber: "918758743895",
      role: "वर के पिता (Father of Groom)",
      roleEn: "Father of Groom"
    },
    {
      name: "प्रफुल्ल शर्मा",
      nameEn: "Prafull Sharma",
      phone: "+91 9106617895",
      whatsappNumber: "919106617895",
      role: "परिवारजन (Family Coordinator)",
      roleEn: "Family Coordinator"
    }
  ]
};

export const getGoogleMapsUrl = (location: WeddingLocation): string | null => {
  if (!location.isConfirmed || !location.mapQuery) {
    return null;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`;
};
