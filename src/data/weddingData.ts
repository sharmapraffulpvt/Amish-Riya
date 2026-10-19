export interface WeddingLocation {
  id: 'HOME' | 'WEDDING' | 'RECEPTION';
  name: string;
  nameEn: string;
  subName?: string;
  subNameEn?: string;
  address: string | null;
  mapQuery: string | null;
  mapsUrl?: string | null;
  isConfirmed: boolean;
  unconfirmedMessage?: string;
  metroInfo?: string;
  metroInfoEn?: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
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
    photoUrl?: string;
  };
  bride: {
    name: string;
    englishName: string;
    parents: string;
    parentsDetails: string;
    photoUrl?: string;
  };
  weddingDate: {
    hindi: string;
    english: string;
    day: string;
    targetIso: string; // "2026-12-03T19:00:00+05:30"
  };
  receptionDate: {
    hindi: string;
    english: string;
    day: string;
    time: string;
    targetIso: string; // "2026-12-05T19:00:00+05:30"
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
    parentsDetails: "सुपुत्र श्री अनिल शर्मा एवं श्रीमती वंदना शर्मा",
    photoUrl: "/images/amish-groom.png"
  },
  bride: {
    name: "सुश्री रिया भारद्वाज",
    englishName: "Riya Bhardwaj",
    parents: "श्री मिथलेश भारद्वाज एवं श्रीमती रेखा भारद्वाज",
    parentsDetails: "सुपुत्री श्री मिथलेश भारद्वाज एवं श्रीमती रेखा भारद्वाज",
    photoUrl: "/images/riya-bride.png"
  },
  weddingDate: {
    hindi: "गुरुवार, 3 दिसंबर 2026",
    english: "Thursday, 3 December 2026",
    day: "गुरुवार",
    targetIso: "2026-12-03T19:00:00+05:30"
  },
  receptionDate: {
    hindi: "शनिवार, 5 दिसंबर 2026",
    english: "Saturday, 5 December 2026",
    day: "शनिवार",
    time: "शाम 07:00 बजे (07:00 PM)",
    targetIso: "2026-12-05T19:00:00+05:30"
  },
  mantras: {
    ganeshaMukhya: "॥ श्री गणेशाय नमः ॥",
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    shlokaMeaning: "हे विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी गणेश जी, मेरे सभी कार्यों को सदा बाधा रहित पूर्ण करें।",
    invitationNote: "परमपिता परमेश्वर एवं कुलदेवी की असीम अनुकंपा से हमारे प्रिय पुत्र का शुभ विवाह सम्पन्न होने जा रहा है। इस पावन बेला पर आप सपरिवार पधारकर वर-वधू को अपना स्नेह, वात्सल्य एवं शुभाशीर्वाद प्रदान कर हमें अनुगृहीत करें।"
  },
  locations: {
    HOME: {
      id: 'HOME',
      name: 'गृह निवास (Home Residence)',
      nameEn: 'Home Residence',
      address: 'B-203 Sunrise Heights Apartments, Opposite Lakme Salon, Sunpharma Road, Atladara, Vadodara - 390012',
      mapQuery: 'B-203 Sunrise Heights Apartments Opposite Lakme Salon Sunpharma Road Atladara Vadodara 390012',
      mapsUrl: 'https://maps.app.goo.gl/YhAdMbryPXXEMzFx5',
      isConfirmed: true
    },
    WEDDING: {
      id: 'WEDDING',
      name: 'होटल मुकुट रीजेंसी (Hotel Mukut Regency)',
      nameEn: 'Hotel Mukut Regency',
      subName: 'अ यूनिट ऑफ जानकी महल होटल प्रा. लि. (वुडबरी कैफे)',
      subNameEn: 'A Unit of Janki Mahal Hotel Pvt. Ltd. (Woodburry Cafe)',
      address: 'CC-1, Sector-13, Vasundhara, Near Vasundhara Haat, Ghaziabad, U.P.',
      mapQuery: 'Hotel Mukut Regency CC-1 Sector-13 Vasundhara Ghaziabad UP',
      mapsUrl: 'https://maps.app.goo.gl/RZuPLCFnyDGftvzG7',
      metroInfo: 'निकटतम मेट्रो स्टेशन: 1. वैशाली (ब्लू लाइन), 2. मोहन नगर (रेड लाइन)',
      metroInfoEn: 'Nearest Metro: 1. Vaishali (Blue Line), 2. Mohan Nagar (Red Line)',
      phone: '+91-120-4566998, +91-9582751602',
      website: 'https://www.hotelmukutregency.com',
      imageUrl: '/images/hotel-mukut-regency.jpg',
      isConfirmed: true
    },
    RECEPTION: {
      id: 'RECEPTION',
      name: 'प्रीति भोज (रिसेप्शन) स्थल',
      nameEn: 'Reception Venue',
      address: 'होटल ग्रैंड मर्क्युरी, सुर्या पैलेस, जेतलपुर रोड, पारसी अगियारी के सामने, सयाजीगंज, वड़ोदरा',
      mapQuery: 'Grand Mercure Vadodara Surya Palace, Jetalpur Road, Sayajiganj, Vadodara',
      mapsUrl: 'https://maps.app.goo.gl/CTGN1KRXoq2GPEDf9',
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
      date: '30 November 2026',
      weekday: 'सोमवार (Monday)',
      time: 'सुबह 10:00 बजे',
      isoDate: '2026-11-30T10:00:00',
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
      title: 'शुभ विवाह एवं मंगल फेरे',
      englishTitle: 'Wedding Ceremony & Mangal Phere',
      date: '3-4 December 2026',
      weekday: 'गुरुवार - शुक्रवार (Thu - Fri)',
      time: '3 दिसंबर सायं 07:00 बजे से (फेरे: 4 दिसंबर प्रातः 05:00 बजे)',
      isoDate: '2026-12-03T19:00:00',
      locationType: 'WEDDING',
      iconType: 'fire',
      description: 'शुभ विवाह महोत्सव एवं पवित्र अग्नि के समक्ष सात फेरे और सात जन्मों का पावन बंधन एवं वरमाला। होटल मुकुट रीजेंसी, वसुंधरा, गाजियाबाद।',
      rituals: ['वरमाला / जयमाला', 'शुभ विवाह संस्कार', 'कन्यादान', 'सप्तपदी (मंगल फेरे)', 'सिंदूर दान']
    },
    {
      id: 'priti-bhoj',
      order: 7,
      title: 'प्रीति भोज (रिसेप्शन)',
      englishTitle: 'Priti Bhoj (Grand Reception)',
      date: '5 December 2026',
      weekday: 'शनिवार (Saturday)',
      time: 'शाम 07:00 बजे',
      isoDate: '2026-12-05T19:00:00',
      locationType: 'RECEPTION',
      iconType: 'feast',
      description: 'नव-दंपति के स्वागत में भव्य प्रीति भोज एवं मंगल शुभकामना मिलन समारोह।',
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
      name: "प्रफुल्ल शर्मा",
      nameEn: "Prafful Sharma",
      phone: "+91 9106617895",
      whatsappNumber: "919106617895",
      role: "वर के भ्राता (Groom's Brother)",
      roleEn: "Groom's Brother"
    }
  ]
};

export const getGoogleMapsUrl = (location: WeddingLocation): string | null => {
  if (!location.isConfirmed) {
    return null;
  }
  if (location.mapsUrl) {
    return location.mapsUrl;
  }
  if (location.mapQuery) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`;
  }
  return null;
};
