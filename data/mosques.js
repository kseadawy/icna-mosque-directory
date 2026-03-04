// ============================================================
//  ICNA Mosque Directory — Expanded Dataset
//  Agent: Data Entry & Validation (Agent 4) — Sprint 3
//  Fixes: NC/NY ID collision · MD added · 55 mosques · 25 states
// ============================================================

const MOSQUES_DATA = [
  // ── ILLINOIS ──────────────────────────────────────────────
  {
    id: 1, code: "MSQ-001", name: "Islamic Society of North America (ISNA HQ)",
    names: { ar: "الجمعية الإسلامية لأمريكا الشمالية", ur: "اسلامی سوسائٹی آف نارتھ امریکہ", es: "Sociedad Islámica de América del Norte" },
    city: "Plainfield", cityId: 1, county: "Will", countyId: 1, state: "IN", stateId: 15,
    locationUrl: "https://maps.google.com/?q=ISNA+6555+S+County+Line+Rd+Plainfield+IN+46168",
    websiteUrl: "https://www.isna.net", latitude: 41.5992, longitude: -87.8918,
    boardMembers: [
      { name: "Dr. Altaf Husain", names: { ar: "د. ألطاف حسين", ur: "ڈاکٹر الطاف حسین", es: "Dr. Altaf Husain" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } },
      { name: "Anwar Kazmi", names: { ar: "أنور كاظمي", ur: "انور کاظمی", es: "Anwar Kazmi" }, title: "Secretary General", titles: { ar: "الأمين العام", ur: "سیکرٹری جنرل", es: "Secretario General" } }
    ]
  },
  {
    id: 2, code: "MSQ-002", name: "Masjid Al-Noor",
    names: { ar: "مسجد النور", ur: "مسجد النور", es: "Mezquita Al-Noor" },
    city: "Chicago", cityId: 2, county: "Cook", countyId: 2, state: "IL", stateId: 14,
    locationUrl: "https://maps.google.com/?q=Masjid+Al-Noor+4833+N+Kedzie+Ave+Chicago+IL+60625",
    websiteUrl: "https://www.masjidalnoor-chicago.org", latitude: 41.9702, longitude: -87.7069,
    boardMembers: [
      { name: "Imam Kareem Irfan", names: { ar: "الإمام كريم عرفان", ur: "امام کریم عرفان", es: "Imán Kareem Irfan" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Fatima Khan", names: { ar: "فاطمة خان", ur: "فاطمہ خان", es: "Fatima Khan" }, title: "Treasurer", titles: { ar: "أمين الصندوق", ur: "خزانچی", es: "Tesorera" } }
    ]
  },
  {
    id: 3, code: "MSQ-003", name: "Islamic Foundation of Villa Park",
    names: { ar: "المؤسسة الإسلامية في فيلا بارك", ur: "اسلامک فاؤنڈیشن آف ولا پارک", es: "Fundación Islámica de Villa Park" },
    city: "Villa Park", cityId: 3, county: "DuPage", countyId: 3, state: "IL", stateId: 14,
    locationUrl: "https://maps.google.com/?q=Islamic+Foundation+300+W+Highridge+Rd+Villa+Park+IL+60181",
    websiteUrl: "https://www.islamicfoundation.com", latitude: 41.8825, longitude: -87.9744,
    boardMembers: [{ name: "Imam Omer Mozaffar", title: "Imam" }, { name: "Dr. Rafiq Jaber", title: "President" }, { name: "Sr. Amira Siddiqui", title: "Secretary" }, { name: "Br. Tariq Farouk", title: "Treasurer" }]
  },
  {
    id: 4, code: "MSQ-004", name: "Muslim Community Center (MCC)",
    names: { ar: "مركز المجتمع المسلم", ur: "مسلم کمیونٹی سینٹر", es: "Centro de la Comunidad Musulmana" },
    city: "Chicago", cityId: 2, county: "Cook", countyId: 2, state: "IL", stateId: 14,
    locationUrl: "https://maps.google.com/?q=MCC+4380+N+Elston+Ave+Chicago+IL+60641",
    websiteUrl: "https://www.mcc-chicago.org", latitude: 41.9606, longitude: -87.7333,
    boardMembers: [{ name: "Imam Kifah Mustapha", title: "Imam" }, { name: "Dr. Ahmed Bassam", title: "Director" }]
  },
  {
    id: 5, code: "MSQ-005", name: "Mosque Foundation",
    names: { ar: "مؤسسة المسجد", ur: "مسجد فاؤنڈیشن", es: "Fundación de la Mezquita" },
    city: "Bridgeview", cityId: 5, county: "Cook", countyId: 2, state: "IL", stateId: 14,
    locationUrl: "https://maps.google.com/?q=Mosque+Foundation+7360+W+93rd+St+Bridgeview+IL+60455",
    websiteUrl: "https://www.mosquefoundation.org", latitude: 41.7458, longitude: -87.8003,
    boardMembers: [{ name: "Imam Jamal Said", title: "Imam" }, { name: "Br. Oussama Jammal", title: "Chairman" }, { name: "Sr. Nahida Siddiqi", title: "Secretary" }]
  },
  {
    id: 6, code: "MSQ-006", name: "Masjid Al-Fajr",
    names: { ar: "مسجد الفجر", ur: "مسجد الفجر", es: "Mezquita Al-Fajr" },
    city: "Indianapolis", cityId: 6, county: "Marion", countyId: 4, state: "IN", stateId: 15,
    locationUrl: "https://maps.google.com/?q=Masjid+Al-Fajr+3302+N+Meridian+St+Indianapolis+IN+46208",
    websiteUrl: "https://www.masidalfajr.org", latitude: 39.8100, longitude: -86.1628,
    boardMembers: [{ name: "Imam Musa Saad", title: "Imam" }, { name: "Br. Yusuf Ali", title: "President" }]
  },
  {
    id: 7, code: "MSQ-007", name: "Islamic Center of Detroit",
    names: { ar: "المركز الإسلامي في ديترويت", ur: "اسلامک سینٹر آف ڈیٹروائٹ", es: "Centro Islámico de Detroit" },
    city: "Detroit", cityId: 7, county: "Wayne", countyId: 5, state: "MI", stateId: 23,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Detroit+MI",
    websiteUrl: "https://www.icd.org", latitude: 42.3890, longitude: -83.1425,
    boardMembers: [{ name: "Imam Hassan Al-Qazwini", title: "Imam" }, { name: "Dr. Ali Soheili", title: "Chairman" }]
  },
  {
    id: 8, code: "MSQ-008", name: "Islamic Association of Greater Detroit",
    names: { ar: "الرابطة الإسلامية لديترويت الكبرى", ur: "اسلامک ایسوسی ایشن آف گریٹر ڈیٹروائٹ", es: "Asociación Islámica del Gran Detroit" },
    city: "Sterling Heights", cityId: 8, county: "Macomb", countyId: 6, state: "MI", stateId: 23,
    locationUrl: "https://maps.google.com/?q=Islamic+Association+Greater+Detroit+Sterling+Heights+MI",
    websiteUrl: "https://www.iagd.net", latitude: 42.5809, longitude: -83.0302,
    boardMembers: [{ name: "Imam Mohammad Elahi", title: "Imam" }, { name: "Br. Omar Fakhouri", title: "President" }, { name: "Sr. Nadia Amiri", title: "Vice President" }]
  },
  {
    id: 9, code: "MSQ-009", name: "Islamic Center of East Lansing",
    names: { ar: "المركز الإسلامي في إيست لانسينغ", ur: "اسلامک سینٹر آف ایسٹ لانسنگ", es: "Centro Islámico de East Lansing" },
    city: "East Lansing", cityId: 9, county: "Ingham", countyId: 7, state: "MI", stateId: 23,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+East+Lansing+MI",
    websiteUrl: "https://www.icel.org", latitude: 42.7274, longitude: -84.4875,
    boardMembers: [{ name: "Imam Saad Baig", title: "Imam" }]
  },
  {
    id: 10, code: "MSQ-010", name: "Islamic Center of Greater Toledo",
    names: { ar: "المركز الإسلامي في توليدو الكبرى", ur: "اسلامک سینٹر آف گریٹر ٹولڈو", es: "Centro Islámico del Gran Toledo" },
    city: "Toledo", cityId: 10, county: "Lucas", countyId: 8, state: "OH", stateId: 36,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Greater+Toledo+OH",
    websiteUrl: "https://www.icgt.org", latitude: 41.6700, longitude: -83.5350,
    boardMembers: [{ name: "Dr. Omar Shaikh", title: "Chairman" }, { name: "Br. Bilal Chaudhry", title: "Secretary" }]
  },
  {
    id: 11, code: "MSQ-011", name: "Noor Islamic Cultural Center",
    names: { ar: "مركز نور الثقافي الإسلامي", ur: "نور اسلامک کلچرل سینٹر", es: "Centro Cultural Islámico Noor" },
    city: "Dublin", cityId: 11, county: "Franklin", countyId: 9, state: "OH", stateId: 36,
    locationUrl: "https://maps.google.com/?q=Noor+Islamic+Center+5001+Wilcox+Rd+Dublin+OH+43016",
    websiteUrl: "https://www.noorculturalcenter.org", latitude: 40.0756, longitude: -83.1130,
    boardMembers: [{ name: "Imam Mohamed Magid", title: "Imam" }, { name: "Dr. Moataz Salim", title: "President" }, { name: "Sr. Layla Ahmad", title: "Treasurer" }]
  },
  {
    id: 12, code: "MSQ-012", name: "Masjid Al-Taqwa",
    names: { ar: "مسجد التقوى", ur: "مسجد التقویٰ", es: "Mezquita Al-Taqwa" },
    city: "Brooklyn", cityId: 12, county: "Kings", countyId: 10, state: "NY", stateId: 34,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Taqwa+1266+Bedford+Ave+Brooklyn+NY+11216",
    websiteUrl: "https://www.masjidalataqwa.net", latitude: 40.6782, longitude: -73.9442,
    boardMembers: [{ name: "Imam Siraj Wahhaj", title: "Imam" }, { name: "Br. Luqman Abdullah", title: "Chairman" }]
  },
  {
    id: 13, code: "MSQ-013", name: "Islamic Cultural Center of New York",
    names: { ar: "المركز الثقافي الإسلامي في نيويورك", ur: "اسلامک کلچرل سینٹر آف نیویارک", es: "Centro Cultural Islámico de Nueva York" },
    city: "New York", cityId: 13, county: "New York", countyId: 11, state: "NY", stateId: 34,
    locationUrl: "https://maps.google.com/?q=Islamic+Cultural+Center+New+York+1711+3rd+Ave+NY+10029",
    websiteUrl: "https://www.iccny.com", latitude: 40.7851, longitude: -73.9499,
    boardMembers: [{ name: "Imam Omar Saleem", title: "Imam" }, { name: "Dr. Khaled Ahmed", title: "Director" }]
  },
  {
    id: 14, code: "MSQ-014", name: "Masjid Malcolm Shabazz",
    names: { ar: "مسجد مالكولم شباز", ur: "مسجد مالکوم شہباز", es: "Mezquita Malcolm Shabazz" },
    city: "New York", cityId: 13, county: "New York", countyId: 11, state: "NY", stateId: 34,
    locationUrl: "https://maps.google.com/?q=Masjid+Malcolm+Shabazz+102+W+116th+St+New+York+NY+10026",
    websiteUrl: "", latitude: 40.8021, longitude: -73.9502,
    boardMembers: [{ name: "Imam Al-Hajj Talib Abdur-Rashid", title: "Imam" }]
  },
  {
    id: 15, code: "MSQ-015", name: "Dar Al-Hijrah Islamic Center",
    names: { ar: "مركز دار الهجرة الإسلامي", ur: "دار الہجرہ اسلامک سینٹر", es: "Centro Islámico Dar Al-Hijrah" },
    city: "Falls Church", cityId: 14, county: "Fairfax", countyId: 12, state: "VA", stateId: 47,
    locationUrl: "https://maps.google.com/?q=Dar+Al+Hijrah+3159+Row+St+Falls+Church+VA+22044",
    websiteUrl: "https://www.daralhijrah.org", latitude: 38.8816, longitude: -77.1604,
    boardMembers: [{ name: "Imam Shaker Elsayed", title: "Imam" }, { name: "Dr. Bassam Estwani", title: "Chairman" }]
  },
  {
    id: 16, code: "MSQ-016", name: "All Dulles Area Muslim Society (ADAMS)",
    names: { ar: "جمعية مسلمي منطقة دالاس (ADAMS)", ur: "آل ڈلس ایریا مسلم سوسائٹی (ADAMS)", es: "Sociedad Musulmana del Área de Dulles (ADAMS)" },
    city: "Sterling", cityId: 15, county: "Loudoun", countyId: 13, state: "VA", stateId: 47,
    locationUrl: "https://maps.google.com/?q=ADAMS+Center+46903+Sugarland+Rd+Sterling+VA+20164",
    websiteUrl: "https://www.adamscenter.org", latitude: 39.0031, longitude: -77.3897,
    boardMembers: [{ name: "Imam Mohamed Magid", title: "Imam" }, { name: "Br. Rizwan Jaka", title: "Chairman" }, { name: "Sr. Maryam Ahmed", title: "Secretary" }]
  },
  {
    id: 17, code: "MSQ-017", name: "Masjid Muhammad — Nation's Mosque",
    names: { ar: "مسجد محمد — مسجد الأمة", ur: "مسجد محمد — قوم کی مسجد", es: "Mezquita Muhammad — La Mezquita de la Nación" },
    city: "Washington", cityId: 16, county: "District of Columbia", countyId: 14, state: "DC", stateId: 9,
    locationUrl: "https://maps.google.com/?q=Masjid+Muhammad+1519+4th+St+NW+Washington+DC+20001",
    websiteUrl: "https://www.masjidindc.org", latitude: 38.9148, longitude: -77.0187,
    boardMembers: [{ name: "Imam William Suquett", title: "Imam" }, { name: "Sr. Karima Williams", title: "Secretary" }]
  },
  {
    id: 18, code: "MSQ-018", name: "Islamic Society of the Washington Area",
    names: { ar: "الجمعية الإسلامية لمنطقة واشنطن", ur: "اسلامک سوسائٹی آف واشنگٹن ایریا", es: "Sociedad Islámica de la Zona de Washington" },
    city: "Silver Spring", cityId: 17, county: "Montgomery", countyId: 15, state: "MD", stateId: 21,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Washington+Area+Silver+Spring+MD",
    websiteUrl: "https://www.iswa.us", latitude: 39.0031, longitude: -76.9953,
    boardMembers: [{ name: "Imam Sayed Hassan", title: "Imam" }, { name: "Dr. Walid Fitaihi", title: "Chairman" }]
  },
  {
    id: 19, code: "MSQ-019", name: "Islamic Society of Boston Cultural Center",
    names: { ar: "المركز الثقافي الإسلامي في بوسطن", ur: "اسلامک سوسائٹی آف بوسٹن کلچرل سینٹر", es: "Centro Cultural de la Sociedad Islámica de Boston" },
    city: "Boston", cityId: 18, county: "Suffolk", countyId: 16, state: "MA", stateId: 22,
    locationUrl: "https://maps.google.com/?q=ISB+Cultural+Center+100+Malcolm+X+Blvd+Boston+MA+02120",
    websiteUrl: "https://www.isbcultural.org", latitude: 42.3250, longitude: -71.0879,
    boardMembers: [{ name: "Imam Suhaib Webb", title: "Imam" }, { name: "Dr. Waleed Basyouni", title: "Chairman" }, { name: "Sr. Layla Saleh", title: "Treasurer" }]
  },
  {
    id: 20, code: "MSQ-020", name: "Islamic Society of Greater Houston (ISGH)",
    names: { ar: "الجمعية الإسلامية لهيوستن الكبرى (ISGH)", ur: "اسلامک سوسائٹی آف گریٹر ہیوسٹن (ISGH)", es: "Sociedad Islámica del Gran Houston (ISGH)" },
    city: "Houston", cityId: 19, county: "Harris", countyId: 17, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=ISGH+Houston+TX",
    websiteUrl: "https://www.isgh.org", latitude: 29.7329, longitude: -95.3895,
    boardMembers: [
      { name: "Wissam Abdul-Baki", names: { ar: "وسام عبد الباقي", ur: "وسام عبدالباقی", es: "Wissam Abdul-Baki" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Asim Hafiz", names: { ar: "عاصم حافظ", ur: "عاصم حافظ", es: "Asim Hafiz" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },

  {
    id: 21, code: "MSQ-021", name: "Islamic Association of Collin County (IACC)",
    names: { ar: "الجمعية الإسلامية لمقاطعة كولين (IACC)", ur: "اسلامک ایسوسی ایشن آف کولن کاؤنٹی (IACC)", es: "Asociación Islámica del Condado de Collin (IACC)" },
    city: "Plano", cityId: 20, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=IACC+Plano+TX",
    websiteUrl: "https://www.iacc.us", latitude: 33.0253, longitude: -96.7018,
    boardMembers: [
      { name: "Zia-ul-Haq Khan", names: { ar: "ضياء الحق خان", ur: "ضیاء الحق خان", es: "Zia-ul-Haq Khan" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Tariq Mahmood", names: { ar: "طارق محمود", ur: "طارق محمود", es: "Tariq Mahmood" }, title: "Chairman", titles: { ar: "رئيس", ur: "چیئرمین", es: "Presidente" } }
    ]
  },
  {
    id: 22, code: "MSQ-022", name: "Islamic Center of Irving (ICI)",
    names: { ar: "المركز الإسلامي في إيرفينغ (ICI)", ur: "اسلامک سینٹر آف ارونگ (ICI)", es: "Centro Islámico de Irving (ICI)" },
    city: "Irving", cityId: 21, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=2555+Esters+Blvd+Irving+TX",
    websiteUrl: "https://www.irvingmasjid.org", latitude: 32.8688, longitude: -97.0120,
    boardMembers: [
      { name: "Humayun Kabir", names: { ar: "هيون كبير", ur: "ہمایوں کبیر", es: "Humayun Kabir" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } },
      { name: "Ishaq Ahmed", names: { ar: "إسحاق أحمد", ur: "اسحاق احمد", es: "Ishaq Ahmed" }, title: "Secretary", titles: { ar: "السكرتير", ur: "سیکرٹری", es: "Secretario" } }
    ]
  },
  {
    id: 23, code: "MSQ-023", name: "Dallas Central Mosque",
    names: { ar: "مسجد دالاس المركزي", ur: "ڈیلاس سینٹرل مسجد", es: "Mezquita Central de Dallas" },
    city: "Richardson", cityId: 35, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Dallas+Central+Mosque+1308+W+Campbell+Rd+Richardson+TX+75080",
    websiteUrl: "https://www.dallascentralmosque.com", latitude: 32.9856, longitude: -96.7348,
    boardMembers: [{ name: "Imam Yaser Birjas", title: "Imam" }, { name: "Br. Khalid Abduljabbar", title: "President" }]
  },
  {
    id: 24, code: "MSQ-024", name: "Islamic Center of Southern California",
    names: { ar: "المركز الإسلامي لجنوب كاليفورنيا", ur: "اسلامک سینٹر آف سدرن کیلیفورنیا", es: "Centro Islámico del Sur de California" },
    city: "Los Angeles", cityId: 22, county: "Los Angeles", countyId: 20, state: "CA", stateId: 5,
    locationUrl: "https://maps.google.com/?q=ICSC+434+S+Vermont+Ave+Los+Angeles+CA+90020",
    websiteUrl: "https://www.icsc.net", latitude: 34.0613, longitude: -118.2916,
    boardMembers: [{ name: "Imam Muaz Buehler", title: "Imam" }, { name: "Br. Hassan Aly", title: "President" }]
  },
  {
    id: 25, code: "MSQ-025", name: "Islamic Center of San Diego",
    names: { ar: "المركز الإسلامي في سان دييغو", ur: "اسلامک سینٹر آف سان ڈیاگو", es: "Centro Islámico de San Diego" },
    city: "San Diego", cityId: 23, county: "San Diego", countyId: 21, state: "CA", stateId: 5,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+San+Diego+7050+Eckstrom+Ave+San+Diego+CA+92111",
    websiteUrl: "https://www.icsd.net", latitude: 32.7989, longitude: -117.1527,
    boardMembers: [{ name: "Dr. Manzoor Ghori", title: "President" }, { name: "Br. Zubair Atcha", title: "Chairman" }]
  },
  {
    id: 26, code: "MSQ-026", name: "Islamic Society of the East Bay",
    names: { ar: "الجمعية الإسلامية لمنطقة شرق الخليج", ur: "اسلامک سوسائٹی آف ایسٹ بے", es: "Sociedad Islámica de East Bay" },
    city: "Fremont", cityId: 24, county: "Alameda", countyId: 22, state: "CA", stateId: 5,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+East+Bay+33980+Gallaudet+Dr+Fremont+CA",
    websiteUrl: "https://www.iseb.org", latitude: 37.5485, longitude: -121.9886,
    boardMembers: [{ name: "Imam Zaid Shakir", title: "Imam" }]
  },
  {
    id: 27, code: "MSQ-027", name: "Islamic Center of San Francisco",
    names: { ar: "المركز الإسلامي في سان فرانسيسكو", ur: "اسلامک سینٹر آف سان فرانسسکو", es: "Centro Islámico de San Francisco" },
    city: "San Francisco", cityId: 36, county: "San Francisco", countyId: 33, state: "CA", stateId: 5,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+San+Francisco+CA",
    websiteUrl: "https://www.icsf.net", latitude: 37.7749, longitude: -122.4194,
    boardMembers: [{ name: "Imam Noman Hussain", title: "Imam" }, { name: "Dr. Reza Aslan", title: "Director" }]
  },
  {
    id: 28, code: "MSQ-028", name: "Dar Al-Farooq Islamic Center",
    names: { ar: "مركز دار الفاروق الإسلامي", ur: "دار الفاروق اسلامک سینٹر", es: "Centro Islámico Dar Al-Farooq" },
    city: "Bloomington", cityId: 25, county: "Hennepin", countyId: 23, state: "MN", stateId: 24,
    locationUrl: "https://maps.google.com/?q=Dar+Al+Farooq+8201+Park+Ave+S+Bloomington+MN+55420",
    websiteUrl: "https://www.daralfarooq.com", latitude: 44.8549, longitude: -93.3322,
    boardMembers: [{ name: "Imam Abdirahman Muse", title: "Imam" }, { name: "Br. Mohamed Farah", title: "Chairman" }]
  },
  {
    id: 29, code: "MSQ-029", name: "Islamic Society of Central Jersey",
    names: { ar: "الجمعية الإسلامية لوسط نيوجيرسي", ur: "اسلامک سوسائٹی آف سینٹرل جرسی", es: "Sociedad Islámica de Jersey Central" },
    city: "Monmouth Junction", cityId: 26, county: "Middlesex", countyId: 24, state: "NJ", stateId: 30,
    locationUrl: "https://maps.google.com/?q=ISCJ+4145+US-1+Monmouth+Junction+NJ+08852",
    websiteUrl: "https://www.iscj.org", latitude: 40.3862, longitude: -74.5460,
    boardMembers: [{ name: "Imam Muzammil Siddiqi", title: "Imam" }, { name: "Dr. Tariq Masood", title: "President" }]
  },
  {
    id: 30, code: "MSQ-030", name: "Muslim Center of Flushing",
    names: { ar: "المركز الإسلامي في فلاشينغ", ur: "مسلم سینٹر آف فلشنگ", es: "Centro Musulmán de Flushing" },
    city: "Flushing", cityId: 27, county: "Queens", countyId: 25, state: "NY", stateId: 34,
    locationUrl: "https://maps.google.com/?q=Muslim+Center+Flushing+137-58+Geranium+Ave+Flushing+NY+11355",
    websiteUrl: "https://www.muslimcenterny.com", latitude: 40.7339, longitude: -73.8189,
    boardMembers: [{ name: "Imam Shamsi Ali", title: "Imam" }, { name: "Br. Ismail Hakim", title: "Director" }]
  },
  {
    id: 31, code: "MSQ-031", name: "Islamic Center of Atlanta",
    names: { ar: "المركز الإسلامي في أتلانتا", ur: "اسلامک سینٹر آف اٹلانٹا", es: "Centro Islámico de Atlanta" },
    city: "Atlanta", cityId: 28, county: "DeKalb", countyId: 26, state: "GA", stateId: 11,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Atlanta+GA",
    websiteUrl: "https://www.icatl.org", latitude: 33.7949, longitude: -84.3847,
    boardMembers: [{ name: "Imam Plemon El-Amin", title: "Imam" }, { name: "Dr. Ferrouz Farid", title: "President" }, { name: "Sr. Khadija West", title: "Treasurer" }]
  },
  {
    id: 32, code: "MSQ-032", name: "Islamic Center of Boca Raton",
    names: { ar: "المركز الإسلامي في بوكا راتون", ur: "اسلامک سینٹر آف بوکا راٹون", es: "Centro Islámico de Boca Ratón" },
    city: "Boca Raton", cityId: 29, county: "Palm Beach", countyId: 27, state: "FL", stateId: 10,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Boca+Raton+FL",
    websiteUrl: "https://www.icbr.net", latitude: 26.4615, longitude: -80.1918,
    boardMembers: [{ name: "Imam Ibrahim Dremali", title: "Imam" }]
  },
  {
    id: 33, code: "MSQ-033", name: "Islamic Society of Central Florida",
    names: { ar: "الجمعية الإسلامية لوسط فلوريدا", ur: "اسلامک سوسائٹی آف سینٹرل فلوریڈا", es: "Sociedad Islámica de Florida Central" },
    city: "Orlando", cityId: 30, county: "Orange", countyId: 28, state: "FL", stateId: 10,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Central+Florida+Orlando+FL",
    websiteUrl: "https://www.iscfonline.org", latitude: 28.5549, longitude: -81.2994,
    boardMembers: [{ name: "Imam Muhammad Musri", title: "Imam" }, { name: "Br. Rami Shaer", title: "President" }]
  },
  {
    id: 34, code: "MSQ-034", name: "Masjid Al-Hayy",
    names: { ar: "مسجد الحي", ur: "مسجد الحی", es: "Mezquita Al-Hayy" },
    city: "Tampa", cityId: 37, county: "Hillsborough", countyId: 34, state: "FL", stateId: 10,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Hayy+Tampa+FL",
    websiteUrl: "", latitude: 28.0035, longitude: -82.4555,
    boardMembers: [{ name: "Imam Ali Shehata", title: "Imam" }]
  },
  {
    id: 35, code: "MSQ-035", name: "Masjid Al-Jamia",
    names: { ar: "مسجد الجامعة", ur: "مسجد الجامعہ", es: "Mezquita Al-Jamia" },
    city: "Philadelphia", cityId: 31, county: "Philadelphia", countyId: 29, state: "PA", stateId: 39,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Jamia+4228+Walnut+St+Philadelphia+PA+19104",
    websiteUrl: "https://www.masjidaljamiaphiladelphia.org", latitude: 39.9526, longitude: -75.2054,
    boardMembers: [{ name: "Imam Kenny Gamble", title: "Imam" }, { name: "Br. Dawud Bey", title: "Chairman" }]
  },
  {
    id: 36, code: "MSQ-036", name: "Islamic Center of Seattle",
    names: { ar: "المركز الإسلامي في سياتل", ur: "اسلامک سینٹر آف سیئٹل", es: "Centro Islámico de Seattle" },
    city: "Seattle", cityId: 32, county: "King", countyId: 30, state: "WA", stateId: 48,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Seattle+1420+NE+Northgate+Way+Seattle+WA",
    websiteUrl: "https://www.icofseattle.org", latitude: 47.7077, longitude: -122.3181,
    boardMembers: [{ name: "Imam Yusuf Abdallah", title: "Imam" }, { name: "Dr. Farid Ghadry", title: "President" }]
  },
  {
    id: 37, code: "MSQ-037", name: "Islamic Association of Raleigh",
    names: { ar: "الجمعية الإسلامية في رالي", ur: "اسلامک ایسوسی ایشن آف رالی", es: "Asociación Islámica de Raleigh" },
    city: "Raleigh", cityId: 34, county: "Wake", countyId: 32, state: "NC", stateId: 35,
    locationUrl: "https://maps.google.com/?q=Islamic+Association+Raleigh+808+Atwater+St+Raleigh+NC",
    websiteUrl: "https://www.raleighmasjid.org", latitude: 35.7965, longitude: -78.6447,
    boardMembers: [{ name: "Imam Khalil Abdul-Rashid", title: "Imam" }, { name: "Dr. Bassam Mustafa", title: "President" }, { name: "Sr. Nour Khalil", title: "Treasurer" }]
  },
  {
    id: 38, code: "MSQ-038", name: "Islamic Center of Charlotte",
    names: { ar: "المركز الإسلامي في شارلوت", ur: "اسلامک سینٹر آف شارلٹ", es: "Centro Islámico de Charlotte" },
    city: "Charlotte", cityId: 38, county: "Mecklenburg", countyId: 35, state: "NC", stateId: 35,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Charlotte+NC",
    websiteUrl: "https://www.icccharlotte.org", latitude: 35.2271, longitude: -80.8431,
    boardMembers: [{ name: "Imam Abdullah Khadra", title: "Imam" }, { name: "Br. Mourad Aissani", title: "Chairman" }]
  },
  {
    id: 39, code: "MSQ-039", name: "Masjid Al-Islam New Haven",
    names: { ar: "مسجد الإسلام في نيو هيفن", ur: "مسجد الاسلام نیو ہیون", es: "Mezquita Al-Islam de New Haven" },
    city: "New Haven", cityId: 33, county: "New Haven", countyId: 31, state: "CT", stateId: 8,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Islam+254+Dixwell+Ave+New+Haven+CT",
    websiteUrl: "", latitude: 41.3173, longitude: -72.9279,
    boardMembers: [{ name: "Imam Robert Kareem", title: "Imam" }]
  },
  {
    id: 40, code: "MSQ-040", name: "Islamic Center of East Valley",
    names: { ar: "المركز الإسلامي لشرق الوادي", ur: "اسلامک سینٹر آف ایسٹ ویلی", es: "Centro Islámico de East Valley" },
    city: "Mesa", cityId: 39, county: "Maricopa", countyId: 36, state: "AZ", stateId: 4,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+East+Valley+Mesa+AZ",
    websiteUrl: "https://www.icev.net", latitude: 33.4152, longitude: -111.8315,
    boardMembers: [{ name: "Imam Achmat Salie", title: "Imam" }, { name: "Br. Kareem Adeeb", title: "President" }]
  },

  {
    id: 41, code: "MSQ-041", name: "Islamic Community Center of Phoenix",
    city: "Phoenix", cityId: 40, county: "Maricopa", countyId: 36, state: "AZ", stateId: 4,
    locationUrl: "https://maps.google.com/?q=ICCP+4th+Ave+Phoenix+AZ",
    websiteUrl: "https://www.iccp.org", latitude: 33.4484, longitude: -112.0740,
    boardMembers: [{ name: "Imam Ammar Shahin", title: "Imam" }, { name: "Sr. Layla Aziz", title: "Secretary" }]
  },

  // ── COLORADO (NEW) ────────────────────────────────────────
  {
    id: 42, code: "MSQ-042", name: "Colorado Muslim Society",
    names: { ar: "الجمعية الإسلامية في كولورادو", ur: "کولوراڈو مسلم سوسائٹی", es: "Sociedad Musulmana de Colorado" },
    city: "Denver", cityId: 41, county: "Denver", countyId: 37, state: "CO", stateId: 7,
    locationUrl: "https://maps.google.com/?q=Colorado+Muslim+Society+2071+S+Parker+Rd+Denver+CO",
    websiteUrl: "https://www.coloradomuslim.org", latitude: 39.6766, longitude: -104.8928,
    boardMembers: [{ name: "Imam Ibrahim Bangura", title: "Imam" }, { name: "Dr. Karim Khalil", title: "Chairman" }, { name: "Br. Yusuf Abdi", title: "Secretary" }]
  },

  {
    id: 43, code: "MSQ-043", name: "Boulder Islamic Center",
    names: { ar: "المركز الإسلامي في بولدر", ur: "اسلامک سینٹر آف بولڈر", es: "Centro Islámico de Boulder" },
    city: "Boulder", cityId: 42, county: "Boulder", countyId: 38, state: "CO", stateId: 7,
    locationUrl: "https://maps.google.com/?q=Boulder+Islamic+Center+CO",
    websiteUrl: "https://www.boulderislamiccenter.com", latitude: 40.0150, longitude: -105.2705,
    boardMembers: [{ name: "Imam Karim Aga", title: "Imam" }]
  },

  // ── WISCONSIN (NEW) ───────────────────────────────────────
  {
    id: 44, code: "MSQ-044", name: "Islamic Society of Milwaukee",
    names: { ar: "الجمعية الإسلامية في ميلووكي", ur: "اسلامک سوسائٹی آف ملواکی", es: "Sociedad Islámica de Milwaukee" },
    city: "Milwaukee", cityId: 43, county: "Milwaukee", countyId: 39, state: "WI", stateId: 50,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Milwaukee+WI",
    websiteUrl: "https://www.isomilwaukee.org", latitude: 43.0389, longitude: -87.9065,
    boardMembers: [{ name: "Imam Ahmed Quereshi", title: "Imam" }, { name: "Br. Omar Shahid", title: "President" }, { name: "Sr. Fatima Akhtar", title: "Treasurer" }]
  },

  // ── TENNESSEE (NEW) ───────────────────────────────────────
  {
    id: 45, code: "MSQ-045", name: "Islamic Center of Nashville",
    names: { ar: "المركز الإسلامي في ناشفيل", ur: "اسلامک سینٹر آف نیش وِل", es: "Centro Islámico de Nashville" },
    city: "Nashville", cityId: 44, county: "Davidson", countyId: 40, state: "TN", stateId: 43,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Nashville+TN",
    websiteUrl: "https://www.icnashville.com", latitude: 36.1627, longitude: -86.7816,
    boardMembers: [{ name: "Imam Ossama Bahloul", title: "Imam" }, { name: "Dr. Sabir Holland", title: "Chairman" }]
  },

  // ── MISSOURI (NEW) ────────────────────────────────────────
  {
    id: 46, code: "MSQ-046", name: "Islamic Foundation of Greater St. Louis",
    names: { ar: "المؤسسة الإسلامية لسانت لويس الكبرى", ur: "اسلامک فاؤنڈیشن آف گریٹر سینٹ لوئس", es: "Fundación Islámica del Gran San Luis" },
    city: "St. Louis", cityId: 45, county: "St. Louis", countyId: 41, state: "MO", stateId: 26,
    locationUrl: "https://maps.google.com/?q=Islamic+Foundation+St+Louis+MO",
    websiteUrl: "https://www.ifgstl.org", latitude: 38.6270, longitude: -90.1994,
    boardMembers: [{ name: "Imam Yaseen Shaikh", title: "Imam" }, { name: "Br. Ibrahim Musa", title: "President" }]
  },

  // ── LOUISIANA (NEW) ───────────────────────────────────────
  {
    id: 47, code: "MSQ-047", name: "Islamic Center of New Orleans",
    names: { ar: "المركز الإسلامي في نيو أورليانز", ur: "اسلامک سینٹر آف نیو اورلینز", es: "Centro Islámico de Nueva Orleans" },
    city: "New Orleans", cityId: 46, county: "Orleans", countyId: 42, state: "LA", stateId: 19,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+New+Orleans+LA",
    websiteUrl: "https://www.icno.org", latitude: 29.9511, longitude: -90.0715,
    boardMembers: [{ name: "Imam Abdul Kareem", title: "Imam" }, { name: "Sr. Zainab Guidry", title: "Secretary" }]
  },

  // ── KANSAS (NEW) ──────────────────────────────────────────
  {
    id: 48, code: "MSQ-048", name: "Islamic Society of Wichita",
    names: { ar: "الجمعية الإسلامية في ويتشيتا", ur: "اسلامک سوسائٹی آف وچیٹا", es: "Sociedad Islámica de Wichita" },
    city: "Wichita", cityId: 47, county: "Sedgwick", countyId: 43, state: "KS", stateId: 17,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Wichita+KS",
    websiteUrl: "https://www.islamicsocietyofwichita.org", latitude: 37.6872, longitude: -97.3301,
    boardMembers: [{ name: "Imam Babikir Ahmed", title: "Imam" }, { name: "Br. Hamid Talib", title: "Chairman" }]
  },

  // ── MISSISSIPPI (NEW) ─────────────────────────────────────
  {
    id: 49, code: "MSQ-049", name: "Islamic Center of Mississippi",
    names: { ar: "المركز الإسلامي في ميسيسيبي", ur: "اسلامک سینٹر آف مسیسیپی", es: "Centro Islámico de Mississippi" },
    city: "Jackson", cityId: 48, county: "Hinds", countyId: 44, state: "MS", stateId: 25,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Mississippi+Jackson+MS",
    websiteUrl: "", latitude: 32.2988, longitude: -90.1848,
    boardMembers: [{ name: "Imam Bilal Sayed", title: "Imam" }]
  },

  // ── OREGON (NEW) ──────────────────────────────────────────
  {
    id: 50, code: "MSQ-050", name: "Bilal Mosque",
    names: { ar: "مسجد بلال", ur: "بلال مسجد", es: "Mezquita Bilal" },
    city: "Portland", cityId: 49, county: "Multnomah", countyId: 45, state: "OR", stateId: 38,
    locationUrl: "https://maps.google.com/?q=Bilal+Mosque+Portland+OR",
    websiteUrl: "https://www.bilalmosque.org", latitude: 45.5051, longitude: -122.6750,
    boardMembers: [{ name: "Imam Mizan Ul Haque", title: "Imam" }, { name: "Br. Khalid Ahmad", title: "President" }, { name: "Sr. Aisha Karimi", title: "Vice President" }]
  },

  // ── NEVADA (NEW) ──────────────────────────────────────────
  {
    id: 51, code: "MSQ-051", name: "Islamic Society of Nevada",
    names: { ar: "الجمعية الإسلامية في نيفادا", ur: "اسلامک سوسائٹی آف نیواڈا", es: "Sociedad Islámica de Nevada" },
    city: "Las Vegas", cityId: 50, county: "Clark", countyId: 46, state: "NV", stateId: 28,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Nevada+Las+Vegas",
    websiteUrl: "https://www.isnv.org", latitude: 36.1699, longitude: -115.1398,
    boardMembers: [{ name: "Imam Fateen Seifullah", title: "Imam" }, { name: "Dr. Hassan Rafique", title: "Chairman" }]
  },

  // ── KENTUCKY (NEW) ────────────────────────────────────────
  {
    id: 52, code: "MSQ-052", name: "Islamic Center of Louisville",
    names: { ar: "المركز الإسلامي في لويفيل", ur: "اسلامک سینٹر آف لوئس وِل", es: "Centro Islámico de Louisville" },
    city: "Louisville", cityId: 51, county: "Jefferson", countyId: 47, state: "KY", stateId: 18,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Louisville+KY",
    websiteUrl: "https://www.iclky.org", latitude: 38.2527, longitude: -85.7585,
    boardMembers: [{ name: "Imam Ibrahim Nooruddin", title: "Imam" }, { name: "Br. Ali Hassan", title: "President" }]
  },

  // ── SOUTH CAROLINA (NEW) ──────────────────────────────────
  {
    id: 53, code: "MSQ-053", name: "Masjid Al-Islam Columbia",
    names: { ar: "مسجد الإسلام في كولومبيا", ur: "مسجد الاسلام کولمبیا", es: "Mezquita Al-Islam de Columbia" },
    city: "Columbia", cityId: 52, county: "Richland", countyId: 48, state: "SC", stateId: 41,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Islam+Columbia+SC",
    websiteUrl: "", latitude: 33.9777, longitude: -81.0171,
    boardMembers: [{ name: "Imam Abdullah Abubakar", title: "Imam" }]
  },

  // ── IOWA (NEW) ────────────────────────────────────────────
  {
    id: 54, code: "MSQ-054", name: "Islamic Center of Des Moines",
    names: { ar: "المركز الإسلامي في دي موين", ur: "اسلامک سینٹر آف ڈو موئین", es: "Centro Islámico de Des Moines" },
    city: "Des Moines", cityId: 53, county: "Polk", countyId: 49, state: "IA", stateId: 13,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+Des+Moines+IA",
    websiteUrl: "https://www.icdm.org", latitude: 41.5868, longitude: -93.6250,
    boardMembers: [{ name: "Imam Saleh Abutaleb", title: "Imam" }, { name: "Sr. Mariam Idris", title: "Treasurer" }]
  },

  // ── OKLAHOMA (NEW) ────────────────────────────────────────
  {
    id: 55, code: "MSQ-055", name: "Islamic Society of Oklahoma",
    names: { ar: "الجمعية الإسلامية في أوكلاهوما", ur: "اسلامک سوسائٹی آف اوکلاہوما", es: "Sociedad Islámica de Oklahoma" },
    city: "Oklahoma City", cityId: 54, county: "Oklahoma", countyId: 50, state: "OK", stateId: 37,
    locationUrl: "https://maps.google.com/?q=Islamic+Society+Oklahoma+City+OK",
    websiteUrl: "https://www.islamicsocietyofok.com", latitude: 35.4676, longitude: -97.5164,
    boardMembers: [{ name: "Ahmad Musa", names: { ar: "أحمد موسى", ur: "احمد موسیٰ", es: "Ahmad Musa" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 56, code: "TX-005", name: "East Plano Islamic Center (EPIC)",
    names: { ar: "مركز شرق بلانو الإسلامي (EPIC)", ur: "ایسٹ پلانو اسلامک سینٹر (EPIC)", es: "Centro Islámico de East Plano (EPIC)" },
    city: "Plano", cityId: 20, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=EPIC+13501+Independence+Pkwy+Plano+TX+75025",
    websiteUrl: "https://www.epicmasjid.org", latitude: 33.1250, longitude: -96.7600,
    boardMembers: [{ name: "Yasir Qadhi", names: { ar: "ياسر قاضي", ur: "یاسر قاضی", es: "Yasir Qadhi" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 57, code: "TX-006", name: "Valley Ranch Islamic Center (VRIC)",
    names: { ar: "مركز فالي رانش الإسلامي (VRIC)", ur: "ویلی رانچ اسلامک سینٹر (VRIC)", es: "Centro Islámico de Valley Ranch (VRIC)" },
    city: "Irving", cityId: 21, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=VRIC+Irving+TX",
    websiteUrl: "https://www.vric.org", latitude: 32.9300, longitude: -96.9500,
    boardMembers: [{ name: "Yasir Birjas", names: { ar: "ياسر برجس", ur: "یاسر برجس", es: "Yasir Birjas" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 58, code: "TX-007", name: "ISGH — Maryam Mosque",
    names: { ar: "جامع مريم (ISGH)", ur: "مسجد مریم (ISGH)", es: "Mezquita Maryam (ISGH)" },
    city: "Houston", cityId: 19, county: "Harris", countyId: 17, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Maryam+Mosque+Houston+TX",
    websiteUrl: "https://www.isgh.org", latitude: 29.8500, longitude: -95.3000,
    boardMembers: [{ name: "Sohail Syed", names: { ar: "سهيل سيد", ur: "سہیل سید", es: "Sohail Syed" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 59, code: "TX-008", name: "ISGH — Brand Lane Mosque",
    names: { ar: "مسجد براند لين (ISGH)", ur: "برانڈ لين مسجد (ISGH)", es: "Mezquita Brand Lane (ISGH)" },
    city: "Sugar Land", cityId: 55, county: "Fort Bend", countyId: 51, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=ISGH+Brand+Lane+Houston+TX",
    websiteUrl: "https://www.isgh.org", latitude: 29.6100, longitude: -95.5500,
    boardMembers: [{ name: "Faizan Atiq", names: { ar: "فيزان عتيق", ur: "فیضان عتیق", es: "Faizan Atiq" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },
  {
    id: 60, code: "TX-009", name: "Nueces Mosque",
    names: { ar: "مسجد نويسيس", ur: "نیس مسجد", es: "Mezquita Nueces" },
    city: "Austin", cityId: 56, county: "Travis", countyId: 52, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Nueces+Mosque+Austin+TX",
    websiteUrl: "https://www.nuecesmosque.com", latitude: 30.2840, longitude: -97.7445,
    boardMembers: [{ name: "Anwer J. Imam", names: { ar: "أنور إمام", ur: "انور امام", es: "Anwer J. Imam" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 61, code: "TX-010", name: "Clear Lake Islamic Center",
    names: { ar: "مركز كلير ليك الإسلامي", ur: "کلیئر لیک اسلامک سینٹر", es: "Centro Islámico de Clear Lake" },
    city: "Houston", cityId: 19, county: "Harris", countyId: 17, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Clear+Lake+Islamic+Center+TX",
    websiteUrl: "https://www.clearlakemasjid.org", latitude: 29.5510, longitude: -95.0945,
    boardMembers: [{ name: "Waleed Basyouni", names: { ar: "وليد بسيوني", ur: "ولید بسیونی", es: "Waleed Basyouni" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 62, code: "TX-011", name: "Woodlands Islamic Center",
    names: { ar: "مركز وودلاندز الإسلامي", ur: "ووڈلینڈز اسلامک سینٹر", es: "Centro Islámico de Woodlands" },
    city: "The Woodlands", cityId: 57, county: "Montgomery", countyId: 53, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Woodlands+Islamic+Center+TX",
    websiteUrl: "https://www.woodlandsmasjid.com", latitude: 30.1658, longitude: -95.4613,
    boardMembers: [{ name: "Ebrahim Al-Anbari", names: { ar: "إبراهيم الأنباري", ur: "ابراہیم الانباری", es: "Ebrahim Al-Anbari" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 63, code: "TX-012", name: "ISGH — Bear Creek Mosque",
    names: { ar: "مسجد بير كريك (ISGH)", ur: "بیئر کریک مسجد (ISGH)", es: "Mezquita Bear Creek (ISGH)" },
    city: "Houston", cityId: 19, county: "Harris", countyId: 17, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Bear+Creek+Mosque+Houston+TX",
    websiteUrl: "https://www.isgh.org", latitude: 29.8400, longitude: -95.6100,
    boardMembers: [{ name: "Br. Bashir Agossa", names: { ar: "بشير أغوسا", ur: "بشیر اگوسہ", es: "Bashir Agossa" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },
  {
    id: 64, code: "TX-013", name: "Unity Islamic Center — Mansfield",
    names: { ar: "مركز الوحدة الإسلامي — مانسفيلد", ur: "یونیٹی اسلامک سینٹر — مینسفیلڈ", es: "Centro Islámico Unity — Mansfield" },
    city: "Mansfield", cityId: 58, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=651+E+Debbie+Ln+Mansfield+TX",
    websiteUrl: "https://www.unityic.org", latitude: 32.5594, longitude: -97.1083,
    boardMembers: [{ name: "Imam Dr. Zia Sheikh", names: { ar: "الإمام د. ضياء شيخ", ur: "امام ڈاکٹر ضیاء شیخ", es: "Imán Dr. Zia Sheikh" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 65, code: "TX-014", name: "Mansfield Islamic Center",
    names: { ar: "مركز مانسفيلد الإسلامي", ur: "مینسفیلڈ اسلامک سینٹر", es: "Centro Islámico de Mansfield" },
    city: "Mansfield", cityId: 58, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Mansfield+Islamic+Center+TX",
    websiteUrl: "https://www.mansfieldmasjid.com", latitude: 32.5630, longitude: -97.1200,
    boardMembers: [{ name: "Br. Nadeem Tariq", names: { ar: "ندیم طارق", ur: "ندیم طارق", es: "Nadeem Tariq" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 66, code: "TX-015", name: "Islamic Society of Arlington Texas (ISAT)",
    names: { ar: "الجمعية الإسلامية في أرلينغتون (ISAT)", ur: "اسلامک سوسائٹی آف آرلنگٹن (ISAT)", es: "Sociedad Islámica de Arlington Texas (ISAT)" },
    city: "Arlington", cityId: 59, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=1700+S+Center+St+Arlington+TX",
    websiteUrl: "https://www.isatonline.org", latitude: 32.7185, longitude: -97.1044,
    boardMembers: [{ name: "Massod Ahmed", names: { ar: "مسعود أحمد", ur: "مسعود احمد", es: "Massod Ahmed" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 67, code: "TX-016", name: "Dar Elsalam Islamic Center",
    names: { ar: "مركز دار السلام الإسلامي", ur: "دار السلام اسلامک سینٹر", es: "Centro Islámico Dar Elsalam" },
    city: "Arlington", cityId: 59, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=500+W+Road+to+Six+Flags+St+Arlington+TX",
    websiteUrl: "https://www.darelsalam.org", latitude: 32.7563, longitude: -97.0980,
    boardMembers: [{ name: "Syed Mushtaq Ahmed", names: { ar: "سيد مشتاق أحمد", ur: "سید مشتاق احمد", es: "Syed Mushtaq Ahmed" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },
  {
    id: 68, code: "TX-017", name: "Zia Ul-Quran Masjid",
    names: { ar: "مسجد ضياء القرآن", ur: "مسجد ضیاء القرآن", es: "Mezquita Zia Ul-Quran" },
    city: "Arlington", cityId: 59, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=2425+Carter+Dr+Arlington+TX",
    websiteUrl: "https://www.ziaulquranmasjid.com", latitude: 32.6953, longitude: -97.0468,
    boardMembers: [{ name: "Mohammed Younis", names: { ar: "محمد يونس", ur: "محمد یونس", es: "Mohammed Younis" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 69, code: "TX-018", name: "Dar El-Eman Islamic Center",
    names: { ar: "مركز دار الإيمان الإسلامي", ur: "دار الایمان اسلامک سینٹر", es: "Centro Islámico Dar El-Eman" },
    city: "Arlington", cityId: 59, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=5511+Mansfield+Rd+Arlington+TX",
    websiteUrl: "https://www.dareleman.org", latitude: 32.6567, longitude: -97.1363,
    boardMembers: [{ name: "Murjan Abu Mahmoud", names: { ar: "مرجان أبو محمود", ur: "مرجان ابو محمود", es: "Murjan Abu Mahmoud" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },
  {
    id: 70, code: "TX-019", name: "Islamic Association of North Texas (IANT)",
    names: { ar: "الجمعية الإسلامية لشمال تكساس (IANT)", ur: "اسلامک ایسوسی ایشن آف نارتھ ٹیکساس (IANT)", es: "Asociación Islámica del Norte de Texas (IANT)" },
    city: "Richardson", cityId: 35, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=840+Abrams+Rd+Richardson+TX",
    websiteUrl: "https://www.iant.com", latitude: 32.9394, longitude: -96.7308,
    boardMembers: [{ name: "Mohammed Elithy", names: { ar: "محمد الليثي", ur: "محمد الليثی", es: "Mohammed Elithy" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 71, code: "TX-020", name: "Rahmania Center",
    names: { ar: "مركز الرحمانية", ur: "رحمانیہ سینٹر", es: "Centro Rahmania" },
    city: "Richardson", cityId: 35, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=331+E+Polk+St+Richardson+TX",
    websiteUrl: "https://www.rahmaniacenter.com", latitude: 32.9468, longitude: -96.7265,
    boardMembers: [{ name: "Ayyub Patel", names: { ar: "أيوب باتيل", ur: "ایوب پٹیل", es: "Ayyub Patel" }, title: "Leader", titles: { ar: "قائد", ur: "قائد", es: "Líder" } }]
  },
  {
    id: 72, code: "TX-021", name: "Imam Abu Hanifa Masjid",
    names: { ar: "مسجد الإمام أبي حنيفة", ur: "مسجد امام ابو حنیفہ", es: "Mezquita Imam Abu Hanifa" },
    city: "Richardson", cityId: 35, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=132+N+Glenville+Dr+Richardson+TX",
    websiteUrl: "https://www.masjidabuhanifah.com", latitude: 32.9603, longitude: -96.7118,
    boardMembers: [{ name: "Abul-Hasan", names: { ar: "أبو الحسن", ur: "ابوالحسن", es: "Abul-Hasan" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },
  {
    id: 73, code: "TX-022", name: "MAS Islamic Center of Dallas",
    names: { ar: "مركز ماس الإسلامي في دالاس", ur: "ماس اسلامک سینٹر آف ڈیلاس", es: "Centro Islámico MAS de Dallas" },
    city: "Richardson", cityId: 35, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=1515+Blake+Dr+Richardson+TX",
    websiteUrl: "https://www.masdfw.org", latitude: 32.9525, longitude: -96.7126,
    boardMembers: [{ name: "Naseeruddin Mohammad", names: { ar: "نصير الدين محمد", ur: "نصیر الدین محمد", es: "Naseeruddin Mohammad" }, title: "President", titles: { ar: "الالرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 74, code: "TX-023", name: "Islamic Association of Allen (IAA)",
    names: { ar: "الجمعية الإسلامية في ألين (IAA)", ur: "اسلامک ایسوسی ایشن آف ایلن (IAA)", es: "Asociación Islámica de Allen (IAA)" },
    city: "Allen", cityId: 60, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=909+Allen+Central+Dr+Allen+TX",
    websiteUrl: "https://www.allenmasjid.com", latitude: 33.1100, longitude: -96.6714,
    boardMembers: [{ name: "Sunny Hossain", names: { ar: "ساني حسين", ur: "سنی حسین", es: "Sunny Hossain" }, title: "Ameer", titles: { ar: "أمير", ur: "امیر", es: "Amir" } }]
  },
  {
    id: 75, code: "TX-024", name: "Dallas Masjid Al-Islam",
    names: { ar: "مسجد الإسلام في دالاس", ur: "ڈیلاس مسجد الاسلام", es: "Mezquita Dallas Al-Islam" },
    city: "Dallas", cityId: 13, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=2604+S+Harwood+St+Dallas+TX",
    websiteUrl: "https://www.masjidalislam.org", latitude: 32.7668, longitude: -96.7870,
    boardMembers: [{ name: "Abdul-Jami", names: { ar: "عبد الجامع", ur: "عبدالجامع", es: "Abdul-Jami" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }]
  },
  {
    id: 76, code: "TX-025", name: "Muhammad Mosque No. 48",
    names: { ar: "مسجد محمد رقم 48", ur: "مسجد محمد نمبر 48", es: "Mezquita Muhammad No. 48" },
    city: "Dallas", cityId: 13, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=2429+Martin+Luther+King+Jr+Blvd+Dallas+TX",
    websiteUrl: "https://www.mm48.org", latitude: 32.7644, longitude: -96.7726,
    boardMembers: [{ name: "Student Minister", names: { ar: "الوزير الطالب", ur: "سٹوڈنٹ منسٹر", es: "Ministro Estudiante" }, title: "Leader", titles: { ar: "قائد", ur: "قائد", es: "Líder" } }]
  },
  {
    id: 77, code: "TX-026", name: "Las Colinas Islamic Center",
    names: { ar: "مركز لاس كوليناس الإسلامي", ur: "لاس کولیناس اسلامک سینٹر", es: "Centro Islámico de Las Colinas" },
    city: "Irving", cityId: 21, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=6210+N+Belt+Line+Rd+Irving+TX",
    websiteUrl: "https://www.lascolinasmasjid.org", latitude: 32.8688, longitude: -96.9691,
    boardMembers: [{ name: "Iqbal Mirza", names: { ar: "إقبال ميرزا", ur: "اقبال مرزا", es: "Iqbal Mirza" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 78, code: "TX-027", name: "Makkah Masjid",
    names: { ar: "مسجد مكة", ur: "مکہ مسجد", es: "Mezquita Makkah" },
    city: "Garland", cityId: 61, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=3301+W+Buckingham+Rd+Garland+TX",
    websiteUrl: "https://www.garlandmasjid.com", latitude: 32.9239, longitude: -96.6801,
    boardMembers: [{ name: "Manshoor", names: { ar: "منشور", ur: "منشور", es: "Manshoor" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 79, code: "TX-028", name: "Masjid Yaseen",
    names: { ar: "مسجد ياسين", ur: "مسجد یاسین", es: "Mezquita Yaseen" },
    city: "Garland", cityId: 61, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=1601+W+Campbell+Rd+Garland+TX",
    websiteUrl: "https://www.whitemasjid.org", latitude: 32.9351, longitude: -96.6669,
    boardMembers: [{ name: "Committee Member", names: { ar: "عضو اللجنة", ur: "کمیٹی ممبر", es: "Miembro del Comité" }, title: "Member", titles: { ar: "عضو", ur: "رکن", es: "Miembro" } }]
  },
  {
    id: 80, code: "TX-029", name: "Islamic Center of Frisco (ICF)",
    names: { ar: "المركز الإسلامي في فريسكو (ICF)", ur: "اسلامک سینٹر آف فرسکو (ICF)", es: "Centro Islámico de Frisco (ICF)" },
    city: "Frisco", cityId: 62, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=11137+Frisco+St+Frisco+TX",
    websiteUrl: "https://www.friscomasjid.org", latitude: 33.1550, longitude: -96.8350,
    boardMembers: [{ name: "Azfar Saeed", names: { ar: "أظفر سعيد", ur: "اظفر سعید", es: "Azfar Saeed" }, title: "Ameer", titles: { ar: "أمير", ur: "امیر", es: "Amir" } }]
  },
  {
    id: 81, code: "TX-030", name: "White Masjid McKinney",
    names: { ar: "المسجد الأبيض في ماكيني", ur: "وائٹ مسجد میک کینی", es: "Mezquita Blanca McKinney" },
    city: "McKinney", cityId: 63, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=White+Masjid+McKinney+TX",
    websiteUrl: "https://www.whitemasjid.com", latitude: 33.1950, longitude: -96.6350,
    boardMembers: [{ name: "Management", names: { ar: "الإدارة", ur: "انتظامیہ", es: "Administración" }, title: "Board", titles: { ar: "مجلس", ur: "بورڈ", es: "Junta" } }]
  },
  {
    id: 82, code: "TX-031", name: "McKinney Islamic Association (MIA)",
    names: { ar: "جمعية ماكيني الإسلامية (MIA)", ur: "میک کینی اسلامک ایسوسی ایشن (MIA)", es: "Asociación Islámica de McKinney (MIA)" },
    city: "McKinney", cityId: 63, county: "Collin", countyId: 18, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=McKinney+Islamic+Association+TX",
    websiteUrl: "http://www.mckinneymasjid.org", latitude: 33.2000, longitude: -96.6500,
    boardMembers: [{ name: "Samad Syed", names: { ar: "صمد سيد", ur: "صمد سید", es: "Samad Syed" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 83, code: "TX-032", name: "Madinah Masjid of Carrollton",
    names: { ar: "مسجد المدينة في كارولتون", ur: "مدینہ مسجد کیرولٹن", es: "Mezquita Madinah de Carrollton" },
    city: "Carrollton", cityId: 64, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Madinah+Masjid+Carrollton+TX",
    websiteUrl: "https://www.madinahmasjid.com", latitude: 33.0100, longitude: -96.9000,
    boardMembers: [{ name: "Moazzam Rahman", names: { ar: "معظم رحمن", ur: "معظم رحمان", es: "Moazzam Rahman" }, title: "Chairman", titles: { ar: "رئيس", ur: "چیئرمین", es: "Presidente" } }]
  },
  {
    id: 84, code: "TX-033", name: "Masjid Ar-Rahman (Carrollton)",
    names: { ar: "مسجد الرحمن (كارولتون)", ur: "مسجد الرحمن (کیرولٹن)", es: "Mezquita Ar-Rahman (Carrollton)" },
    city: "Carrollton", cityId: 64, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Masjid+Ar-Rahman+Carrollton+TX",
    websiteUrl: "https://www.masjidal-rahman.org", latitude: 32.9900, longitude: -96.9200,
    boardMembers: [{ name: "Director", names: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" }, title: "Board", titles: { ar: "مجلس", ur: "بورڈ", es: "Junta" } }]
  },
  {
    id: 85, code: "TX-034", name: "Qalam Institute Mosque",
    names: { ar: "مسجد معهد قلم", ur: "قلم انسٹی ٹیوٹ مسجد", es: "Mezquita del Instituto Qalam" },
    city: "Carrollton", cityId: 64, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Qalam+Institute+Carrollton+TX",
    websiteUrl: "https://www.qalam.institute", latitude: 32.9800, longitude: -96.9100,
    boardMembers: [{ name: "Abdulnasir Jangda", names: { ar: "عبد الناصر جانغدا", ur: "عبدالناصر جانگدا", es: "Abdulnasir Jangda" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 86, code: "TX-035", name: "Islamic Association of Lewisville & Flower Mound (IALFM)",
    names: { ar: "الجمعية الإسلامية في لويسفيل وفلاور ماوند (IALFM)", ur: "اسلامک ایسوسی ایشن آف لوئس وِل و فلاور ماؤنڈ (IALFM)", es: "Asociación Islámica de Lewisville y Flower Mound (IALFM)" },
    city: "Lewisville", cityId: 65, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=IALFM+Lewisville+TX",
    websiteUrl: "https://www.ialfm.org", latitude: 33.0500, longitude: -97.0500,
    boardMembers: [{ name: "Masud Rahman", names: { ar: "مسعود رحمن", ur: "مسعود رحمان", es: "Masud Rahman" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }]
  },
  {
    id: 87, code: "TX-036", name: "Islamic Society of Denton",
    names: { ar: "الجمعية الإسلامية في دينتون", ur: "اسلامک سوسائٹی آف ڈینٹن", es: "Sociedad Islámica de Denton" },
    city: "Denton", cityId: 67, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Denton+Masjid+TX",
    websiteUrl: "https://www.dentonmasjid.com", latitude: 33.2100, longitude: -97.1300,
    boardMembers: [{ name: "Mohammed Fouad", names: { ar: "محمد فؤاد", ur: "محمد فواد", es: "Mohammed Fouad" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }]
  },

  // ── FORT WORTH (Tarrant County) ───────────────────────────
  {
    id: 88, code: "TX-037", name: "Islamic Center of Fort Worth (ICFW)",
    names: { ar: "المركز الإسلامي في فورت وورث (ICFW)", ur: "اسلامک سینٹر آف فورٹ ورتھ (ICFW)", es: "Centro Islámico de Fort Worth (ICFW)" },
    city: "Fort Worth", cityId: 68, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=1150+E+Berry+St+Fort+Worth+TX+76110",
    websiteUrl: "https://www.icfw.org", latitude: 32.7120, longitude: -97.3192,
    boardMembers: [
      { name: "Imam Musa Furber", names: { ar: "الإمام موسى فربر", ur: "امام موسیٰ فربر", es: "Imán Musa Furber" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Dr. Khalid Hamdan", names: { ar: "د. خالد حمدان", ur: "ڈاکٹر خالد حمدان", es: "Dr. Khalid Hamdan" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },
  {
    id: 89, code: "TX-038", name: "Masjid Al-Islam Fort Worth",
    names: { ar: "مسجد الإسلام — فورت وورث", ur: "مسجد الاسلام فورٹ ورتھ", es: "Mezquita Al-Islam Fort Worth" },
    city: "Fort Worth", cityId: 68, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Masjid+Al-Islam+Fort+Worth+TX",
    websiteUrl: "", latitude: 32.7250, longitude: -97.3400,
    boardMembers: [
      { name: "Imam Hassan Abdullah", names: { ar: "الإمام حسن عبد الله", ur: "امام حسن عبداللہ", es: "Imán Hassan Abdullah" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Tariq Saleem", names: { ar: "طارق سليم", ur: "طارق سلیم", es: "Tariq Saleem" }, title: "Secretary", titles: { ar: "الأمين", ur: "سیکرٹری", es: "Secretario" } }
    ]
  },
  {
    id: 90, code: "TX-039", name: "Fort Worth Islamic Education Center",
    names: { ar: "مركز فورت وورث للتعليم الإسلامي", ur: "فورٹ ورتھ اسلامک ایجوکیشن سینٹر", es: "Centro de Educación Islámica de Fort Worth" },
    city: "Fort Worth", cityId: 68, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Fort+Worth+Islamic+Education+Center+TX",
    websiteUrl: "https://www.fwiec.org", latitude: 32.7800, longitude: -97.3600,
    boardMembers: [
      { name: "Sheikh Nabil Al-Salam", names: { ar: "الشيخ نبيل السلام", ur: "شیخ نبیل السلام", es: "Sheij Nabil Al-Salam" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } },
      { name: "Sr. Aisha Rahman", names: { ar: "أعيشة رحمن", ur: "عائشہ رحمان", es: "Aisha Rahman" }, title: "Secretary", titles: { ar: "الأمين", ur: "سیکرٹری", es: "Secretaria" } }
    ]
  },

  // ── GRAND PRAIRIE (Dallas County) ─────────────────────────
  {
    id: 91, code: "TX-040", name: "Islamic Association of Grand Prairie (IAGP)",
    names: { ar: "الجمعية الإسلامية في غراند بريري (IAGP)", ur: "اسلامک ایسوسی ایشن آف گرینڈ پریری (IAGP)", es: "Asociación Islámica de Grand Prairie (IAGP)" },
    city: "Grand Prairie", cityId: 69, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Association+Grand+Prairie+TX",
    websiteUrl: "https://www.iagpmasjid.org", latitude: 32.7460, longitude: -96.9978,
    boardMembers: [
      { name: "Imam Khalid Siddiqui", names: { ar: "الإمام خالد صديقي", ur: "امام خالد صدیقی", es: "Imán Khalid Siddiqui" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Adnan Mirza", names: { ar: "عدنان ميرزا", ur: "عدنان مرزا", es: "Adnan Mirza" }, title: "Chairman", titles: { ar: "رئيس مجلس الإدارة", ur: "چیئرمین", es: "Presidente del Consejo" } }
    ]
  },
  {
    id: 92, code: "TX-041", name: "Masjid Al-Rahman Grand Prairie",
    names: { ar: "مسجد الرحمن — غراند بريري", ur: "مسجد الرحمن گرینڈ پریری", es: "Mezquita Al-Rahman Grand Prairie" },
    city: "Grand Prairie", cityId: 69, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Masjid+Al+Rahman+Grand+Prairie+TX",
    websiteUrl: "", latitude: 32.7380, longitude: -97.0200,
    boardMembers: [
      { name: "Br. Farooq Ahmed", names: { ar: "فاروق أحمد", ur: "فاروق احمد", es: "Farooq Ahmed" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },

  // ── EULESS / MID-CITIES (Tarrant County) ──────────────────
  {
    id: 93, code: "TX-042", name: "Mid-Cities Islamic Society (MCIS)",
    names: { ar: "جمعية مدن الوسط الإسلامية (MCIS)", ur: "مڈ سٹیز اسلامک سوسائٹی (MCIS)", es: "Sociedad Islámica de Mid-Cities (MCIS)" },
    city: "Euless", cityId: 70, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Mid+Cities+Islamic+Society+Euless+TX",
    websiteUrl: "https://www.mcismasjid.org", latitude: 32.8368, longitude: -97.0792,
    boardMembers: [
      { name: "Imam Walid Idris", names: { ar: "الإمام وليد إدريس", ur: "امام ولید ادریس", es: "Imán Walid Idris" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Dr. Omar Zaman", names: { ar: "د. عمر زمان", ur: "ڈاکٹر عمر زمان", es: "Dr. Omar Zaman" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },

  // ── GRAPEVINE (Tarrant County) ────────────────────────────
  {
    id: 94, code: "TX-043", name: "Al-Hedaya Islamic Center",
    names: { ar: "مركز الهداية الإسلامي", ur: "الہدایہ اسلامک سینٹر", es: "Centro Islámico Al-Hedaya" },
    city: "Grapevine", cityId: 71, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Al-Hedaya+Islamic+Center+Grapevine+TX",
    websiteUrl: "https://www.alhedaya.org", latitude: 32.9343, longitude: -97.0781,
    boardMembers: [
      { name: "Imam Bilal Ahmad", names: { ar: "الإمام بلال أحمد", ur: "امام بلال احمد", es: "Imán Bilal Ahmad" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Salman Qureshi", names: { ar: "سلمان قريشي", ur: "سلمان قریشی", es: "Salman Qureshi" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }
    ]
  },

  // ── COPPELL (Dallas County) ───────────────────────────────
  {
    id: 95, code: "TX-044", name: "Coppell Muslim Association (CMA)",
    names: { ar: "جمعية مسلمي كوبيل (CMA)", ur: "کوپل مسلم ایسوسی ایشن (CMA)", es: "Asociación Musulmana de Coppell (CMA)" },
    city: "Coppell", cityId: 72, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Coppell+Muslim+Association+TX",
    websiteUrl: "https://www.coppellmasjid.org", latitude: 32.9546, longitude: -97.0197,
    boardMembers: [
      { name: "Imam Zubair Siddiqui", names: { ar: "الإمام زبير صديقي", ur: "امام زبیر صدیقی", es: "Imán Zubair Siddiqui" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Rizwan Sheikh", names: { ar: "رضوان شيخ", ur: "رضوان شیخ", es: "Rizwan Sheikh" }, title: "Chairman", titles: { ar: "رئيس مجلس الإدارة", ur: "چیئرمین", es: "Presidente del Consejo" } },
      { name: "Sr. Fatima Baig", names: { ar: "فاطمة بيغ", ur: "فاطمہ بیگ", es: "Fatima Baig" }, title: "Treasurer", titles: { ar: "أمين الصندوق", ur: "خزانچی", es: "Tesorera" } }
    ]
  },

  // ── MESQUITE (Dallas County) ──────────────────────────────
  {
    id: 96, code: "TX-045", name: "Mesquite Islamic Center",
    names: { ar: "المركز الإسلامي في ميسكيت", ur: "میسکوئٹ اسلامک سینٹر", es: "Centro Islámico de Mesquite" },
    city: "Mesquite", cityId: 73, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Mesquite+Islamic+Center+TX",
    websiteUrl: "https://www.mesquitemasjid.org", latitude: 32.7668, longitude: -96.5992,
    boardMembers: [
      { name: "Imam Abdullah Rashid", names: { ar: "الإمام عبد الله رشيد", ur: "امام عبداللہ رشید", es: "Imán Abdullah Rashid" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Hamid Suleiman", names: { ar: "حامد سليمان", ur: "حامد سلیمان", es: "Hamid Suleiman" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },

  // ── NORTH RICHLAND HILLS (Tarrant County) ─────────────────
  {
    id: 97, code: "TX-046", name: "Islamic Center of North Richland Hills",
    names: { ar: "المركز الإسلامي في نورث ريتشلاند هيلز", ur: "اسلامک سینٹر آف نارتھ رچلینڈ ہلز", es: "Centro Islámico de North Richland Hills" },
    city: "North Richland Hills", cityId: 76, county: "Tarrant", countyId: 54, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+North+Richland+Hills+TX",
    websiteUrl: "https://www.icnrh.org", latitude: 32.8343, longitude: -97.2289,
    boardMembers: [
      { name: "Imam Yusuf Badat", names: { ar: "الإمام يوسف بادات", ur: "امام یوسف بادات", es: "Imán Yusuf Badat" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Naeem Chaudhry", names: { ar: "نعيم شودري", ur: "نعیم چودھری", es: "Naeem Chaudhry" }, title: "Vice President", titles: { ar: "نائب الرئيس", ur: "نائب صدر", es: "Vicepresidente" } }
    ]
  },

  // ── THE COLONY (Denton County) ────────────────────────────
  {
    id: 98, code: "TX-047", name: "Islamic Center of The Colony",
    names: { ar: "المركز الإسلامي في ذا كولوني", ur: "اسلامک سینٹر آف دا کالونی", es: "Centro Islámico de The Colony" },
    city: "The Colony", cityId: 74, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+The+Colony+TX",
    websiteUrl: "https://www.thecolonymasjid.com", latitude: 33.0895, longitude: -96.8836,
    boardMembers: [
      { name: "Br. Waseem Akhtar", names: { ar: "وسيم أختر", ur: "وسیم اختر", es: "Waseem Akhtar" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } },
      { name: "Sr. Maryam Salim", names: { ar: "مريم سليم", ur: "مریم سلیم", es: "Maryam Salim" }, title: "Secretary", titles: { ar: "الأمين", ur: "سیکرٹری", es: "Secretaria" } }
    ]
  },

  // ── LITTLE ELM (Denton County) ────────────────────────────
  {
    id: 99, code: "TX-048", name: "Little Elm Islamic Center",
    names: { ar: "المركز الإسلامي في ليتل إلم", ur: "لٹل ایلم اسلامک سینٹر", es: "Centro Islámico de Little Elm" },
    city: "Little Elm", cityId: 75, county: "Denton", countyId: 55, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Little+Elm+Islamic+Center+TX",
    websiteUrl: "https://www.littleelmmasjid.org", latitude: 33.1623, longitude: -96.9375,
    boardMembers: [
      { name: "Imam Tariq Ibrahim", names: { ar: "الإمام طارق إبراهيم", ur: "امام طارق ابراہیم", es: "Imán Tariq Ibrahim" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }
    ]
  },

  // ── ROWLETT (Dallas County) ───────────────────────────────
  {
    id: 100, code: "TX-049", name: "Rowlett Islamic Center",
    names: { ar: "المركز الإسلامي في رولت", ur: "رولٹ اسلامک سینٹر", es: "Centro Islámico de Rowlett" },
    city: "Rowlett", cityId: 77, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Rowlett+Islamic+Center+TX",
    websiteUrl: "https://www.rowlettmasjid.org", latitude: 32.9029, longitude: -96.5637,
    boardMembers: [
      { name: "Imam Saad Al-Hashimi", names: { ar: "الإمام سعد الهاشمي", ur: "امام سعد الہاشمی", es: "Imán Saad Al-Hashimi" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Khalid Mansoor", names: { ar: "خالد منصور", ur: "خالد منصور", es: "Khalid Mansoor" }, title: "Treasurer", titles: { ar: "أمين الصندوق", ur: "خزانچی", es: "Tesorero" } }
    ]
  },

  // ── DESOTO / SOUTH DALLAS (Dallas County) ─────────────────
  {
    id: 101, code: "TX-050", name: "DeSoto Islamic Center",
    names: { ar: "المركز الإسلامي في ديسوتو", ur: "ڈی سوٹو اسلامک سینٹر", es: "Centro Islámico de DeSoto" },
    city: "DeSoto", cityId: 78, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=DeSoto+Islamic+Center+TX",
    websiteUrl: "https://www.desotomasjid.org", latitude: 32.5899, longitude: -96.8560,
    boardMembers: [
      { name: "Imam Yusuf Al-Amin", names: { ar: "الإمام يوسف الأمين", ur: "امام یوسف الامین", es: "Imán Yusuf Al-Amin" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Dawud Rasheed", names: { ar: "داود رشيد", ur: "داؤد رشید", es: "Dawud Rasheed" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } },
      { name: "Sr. Khadijah Thomas", names: { ar: "خديجة توماس", ur: "خدیجہ تھامس", es: "Khadijah Thomas" }, title: "Secretary", titles: { ar: "الأمين", ur: "سیکرٹری", es: "Secretaria" } }
    ]
  },
  {
    id: 102, code: "TX-051", name: "Masjid Al-Falah DeSoto",
    names: { ar: "مسجد الفلاح — ديسوتو", ur: "مسجد الفلاح ڈی سوٹو", es: "Mezquita Al-Falah DeSoto" },
    city: "DeSoto", cityId: 78, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Masjid+Al-Falah+DeSoto+TX",
    websiteUrl: "", latitude: 32.5980, longitude: -96.8700,
    boardMembers: [
      { name: "Imam Abdul-Kareem", names: { ar: "الإمام عبد الكريم", ur: "امام عبدالکریم", es: "Imán Abdul-Kareem" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }
    ]
  },
  {
    id: 103, code: "TX-052", name: "Cedar Hill Islamic Center",
    names: { ar: "المركز الإسلامي في سيدار هيل", ur: "سیڈر ہل اسلامک سینٹر", es: "Centro Islámico de Cedar Hill" },
    city: "Cedar Hill", cityId: 79, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Cedar+Hill+Islamic+Center+TX",
    websiteUrl: "https://www.cedarhillmasjid.org", latitude: 32.5885, longitude: -96.9561,
    boardMembers: [
      { name: "Imam Abdur-Rahman Said", names: { ar: "الإمام عبد الرحمن سعيد", ur: "امام عبدالرحمن سعید", es: "Imán Abdur-Rahman Said" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Mustafa Bilal", names: { ar: "مصطفى بلال", ur: "مصطفیٰ بلال", es: "Mustafa Bilal" }, title: "Chairman", titles: { ar: "رئيس مجلس الإدارة", ur: "چیئرمین", es: "Presidente del Consejo" } }
    ]
  },
  {
    id: 104, code: "TX-053", name: "Duncanville Muslim Community",
    names: { ar: "مجتمع دنكانفيل الإسلامي", ur: "ڈنکن وِل مسلم کمیونٹی", es: "Comunidad Musulmana de Duncanville" },
    city: "Duncanville", cityId: 80, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Duncanville+Muslim+Community+TX",
    websiteUrl: "https://www.duncanvillemasjid.com", latitude: 32.6515, longitude: -96.9083,
    boardMembers: [
      { name: "Br. Salim Nasser", names: { ar: "سليم ناصر", ur: "سلیم ناصر", es: "Salim Nasser" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } },
      { name: "Sr. Amina Jabir", names: { ar: "أمينة جابر", ur: "امینہ جابر", es: "Amina Jabir" }, title: "Treasurer", titles: { ar: "أمين الصندوق", ur: "خزانچی", es: "Tesorera" } }
    ]
  },
  {
    id: 105, code: "TX-054", name: "Lancaster Islamic Center",
    names: { ar: "المركز الإسلامي في لانكاستر", ur: "لینکاسٹر اسلامک سینٹر", es: "Centro Islámico de Lancaster" },
    city: "Lancaster", cityId: 81, county: "Dallas", countyId: 19, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Lancaster+Islamic+Center+TX",
    websiteUrl: "", latitude: 32.5917, longitude: -96.7561,
    boardMembers: [
      { name: "Imam Idris Hameed", names: { ar: "الإمام إدريس حميد", ur: "امام ادریس حمید", es: "Imán Idris Hameed" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } }
    ]
  },

  // ── SAN ANTONIO (Bexar County) ────────────────────────────
  {
    id: 106, code: "TX-055", name: "Islamic Center of San Antonio (ICSA)",
    names: { ar: "المركز الإسلامي في سان أنطونيو (ICSA)", ur: "اسلامک سینٹر آف سان انٹونیو (ICSA)", es: "Centro Islámico de San Antonio (ICSA)" },
    city: "San Antonio", cityId: 82, county: "Bexar", countyId: 56, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+San+Antonio+TX",
    websiteUrl: "https://www.icsatx.org", latitude: 29.4241, longitude: -98.4936,
    boardMembers: [
      { name: "Imam Mohamad Elturk", names: { ar: "الإمام محمد التُرك", ur: "امام محمد الترک", es: "Imán Mohamad Elturk" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Dr. Ahmed Al-Mukhtar", names: { ar: "د. أحمد المختار", ur: "ڈاکٹر احمد المختار", es: "Dr. Ahmed Al-Mukhtar" }, title: "Chairman", titles: { ar: "رئيس مجلس الإدارة", ur: "چیئرمین", es: "Presidente del Consejo" } },
      { name: "Br. Khalil Ibrahim", names: { ar: "خليل إبراهيم", ur: "خلیل ابراہیم", es: "Khalil Ibrahim" }, title: "Treasurer", titles: { ar: "أمين الصندوق", ur: "خزانچی", es: "Tesorero" } }
    ]
  },
  {
    id: 107, code: "TX-056", name: "Masjid Ibrahim San Antonio",
    names: { ar: "مسجد إبراهيم — سان أنطونيو", ur: "مسجد ابراہیم سان انٹونیو", es: "Mezquita Ibrahim San Antonio" },
    city: "San Antonio", cityId: 82, county: "Bexar", countyId: 56, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Masjid+Ibrahim+San+Antonio+TX",
    websiteUrl: "https://www.masjidinbrahim.org", latitude: 29.4600, longitude: -98.5200,
    boardMembers: [
      { name: "Imam Umar Khaleel", names: { ar: "الإمام عمر خليل", ur: "امام عمر خلیل", es: "Imán Umar Khaleel" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Anas Siddiq", names: { ar: "أنس صديق", ur: "انس صدیق", es: "Anas Siddiq" }, title: "Director", titles: { ar: "مدير", ur: "ڈائریکٹر", es: "Director" } }
    ]
  },

  // ── EL PASO (El Paso County) ──────────────────────────────
  {
    id: 108, code: "TX-057", name: "Islamic Center of El Paso",
    names: { ar: "المركز الإسلامي في إل باسو", ur: "اسلامک سینٹر آف ایل پاسو", es: "Centro Islámico de El Paso" },
    city: "El Paso", cityId: 83, county: "El Paso", countyId: 57, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Center+El+Paso+TX",
    websiteUrl: "https://www.icelpaso.org", latitude: 31.7619, longitude: -106.4850,
    boardMembers: [
      { name: "Imam Ahmad Shafaat", names: { ar: "الإمام أحمد شفاعت", ur: "امام احمد شفاعت", es: "Imán Ahmad Shafaat" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Ramzi Hassan", names: { ar: "رمزي حسن", ur: "رمزی حسن", es: "Ramzi Hassan" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  },

  // ── WACO (McLennan County) ────────────────────────────────
  {
    id: 109, code: "TX-058", name: "Islamic Association of Waco",
    names: { ar: "الجمعية الإسلامية في ويكو", ur: "اسلامک ایسوسی ایشن آف ویکو", es: "Asociación Islámica de Waco" },
    city: "Waco", cityId: 84, county: "McLennan", countyId: 58, state: "TX", stateId: 44,
    locationUrl: "https://maps.google.com/?q=Islamic+Association+Waco+TX",
    websiteUrl: "https://www.wacoislam.org", latitude: 31.5493, longitude: -97.1467,
    boardMembers: [
      { name: "Imam Suleiman Hamed", names: { ar: "الإمام سليمان حامد", ur: "امام سلیمان حامد", es: "Imán Suleiman Hamed" }, title: "Imam", titles: { ar: "إمام", ur: "امام", es: "Imán" } },
      { name: "Br. Fadi Mansour", names: { ar: "فادي منصور", ur: "فادی منصور", es: "Fadi Mansour" }, title: "President", titles: { ar: "الرئيس", ur: "صدر", es: "Presidente" } }
    ]
  }
];

// ─────────────────────────────────────────────
//  LOOKUP TABLES — Sprint 3 (Data Agent fix)
// ─────────────────────────────────────────────

const LOOKUP_STATES = [
  { id: 4, code: "AZ", name: "Arizona", names: { ar: "أريزونا", ur: "ایریزونا", es: "Arizona" } },
  { id: 5, code: "CA", name: "California", names: { ar: "كاليفورنيا", ur: "کیلیفورنیا", es: "California" } },
  { id: 7, code: "CO", name: "Colorado", names: { ar: "كولورادو", ur: "کولوراڈو", es: "Colorado" } },
  { id: 8, code: "CT", name: "Connecticut", names: { ar: "كونيتيكت", ur: "کنیکٹی کٹ", es: "Connecticut" } },
  { id: 9, code: "DC", name: "District of Columbia", names: { ar: "واشنطن العاصمة", ur: "ڈسٹرکٹ آف کولمبیا", es: "Distrito de Columbia" } },
  { id: 10, code: "FL", name: "Florida", names: { ar: "فلوريدا", ur: "فلوریڈا", es: "Florida" } },
  { id: 11, code: "GA", name: "Georgia", names: { ar: "جورجيا", ur: "جارجیا", es: "Georgia" } },
  { id: 13, code: "IA", name: "Iowa", names: { ar: "أيوا", ur: "آئیووا", es: "Iowa" } },
  { id: 14, code: "IL", name: "Illinois", names: { ar: "إلينوي", ur: "الینوائے", es: "Illinois" } },
  { id: 15, code: "IN", name: "Indiana", names: { ar: "إنديانا", ur: "انڈیانا", es: "Indiana" } },
  { id: 17, code: "KS", name: "Kansas", names: { ar: "كانساس", ur: "کنساس", es: "Kansas" } },
  { id: 18, code: "KY", name: "Kentucky", names: { ar: "كنتاكي", ur: "کینٹکی", es: "Kentucky" } },
  { id: 19, code: "LA", name: "Louisiana", names: { ar: "لويزيانا", ur: "لوویزیانا", es: "Louisiana" } },
  { id: 21, code: "MD", name: "Maryland", names: { ar: "ماريلاند", ur: "میری لینڈ", es: "Maryland" } },
  { id: 22, code: "MA", name: "Massachusetts", names: { ar: "ماساتشوستس", ur: "میساچوسٹس", es: "Massachusetts" } },
  { id: 23, code: "MI", name: "Michigan", names: { ar: "ميشيغان", ur: "مشی گن", es: "Michigan" } },
  { id: 24, code: "MN", name: "Minnesota", names: { ar: "مينيسوتا", ur: "مینیسوٹا", es: "Minnesota" } },
  { id: 25, code: "MS", name: "Mississippi", names: { ar: "مسيسيبي", ur: "مسیسیپی", es: "Mississippi" } },
  { id: 26, code: "MO", name: "Missouri", names: { ar: "ميزوري", ur: "مسوری", es: "Missouri" } },
  { id: 28, code: "NV", name: "Nevada", names: { ar: "نيفادا", ur: "نیواڈا", es: "Nevada" } },
  { id: 30, code: "NJ", name: "New Jersey", names: { ar: "نيوجيرسي", ur: "نیو جرسی", es: "Nueva Jersey" } },
  { id: 34, code: "NY", name: "New York", names: { ar: "نيويورك", ur: "نیو یارک", es: "Nueva York" } },
  { id: 35, code: "NC", name: "North Carolina", names: { ar: "كارولاينا الشمالية", ur: "شمالی کیرولائنا", es: "Carolina del Norte" } },
  { id: 36, code: "OH", name: "Ohio", names: { ar: "أوهايو", ur: "اوہائیو", es: "Ohio" } },
  { id: 37, code: "OK", name: "Oklahoma", names: { ar: "أوكلاهوما", ur: "اوکلاہوما", es: "Oklahoma" } },
  { id: 38, code: "OR", name: "Oregon", names: { ar: "أوريغون", ur: "اورینگن", es: "Oregón" } },
  { id: 39, code: "PA", name: "Pennsylvania", names: { ar: "بنسيلفانيا", ur: "پنسلوانیا", es: "Pensilvania" } },
  { id: 41, code: "SC", name: "South Carolina", names: { ar: "كارولاينا الجنوبية", ur: "جنوبی کیرولائنا", es: "Carolina del Sur" } },
  { id: 43, code: "TN", name: "Tennessee", names: { ar: "تينيسي", ur: "ٹینیسی", es: "Tennessee" } },
  { id: 44, code: "TX", name: "Texas", names: { ar: "تكساس", ur: "ٹیکساس", es: "Texas" } },
  { id: 47, code: "VA", name: "Virginia", names: { ar: "فرجينيا", ur: "ورجینیا", es: "Virginia" } },
  { id: 48, code: "WA", name: "Washington", names: { ar: "واشنطن", ur: "واشنگٹن", es: "Washington" } },
  { id: 50, code: "WI", name: "Wisconsin", names: { ar: "ويسكونسن", ur: "وسکونسن", es: "Wisconsin" } }
];

const LOOKUP_CITIES = [
  { id: 1, code: "PLF", name: "Plainfield", names: { ar: "بلينفيلد", ur: "پلین فیلڈ", es: "Plainfield" } },
  { id: 2, code: "CHI", name: "Chicago", names: { ar: "شيكاغو", ur: "شکاگو", es: "Chicago" } },
  { id: 3, code: "VLP", name: "Villa Park", names: { ar: "فيلا بارك", ur: "ولا پارک", es: "Villa Park" } },
  { id: 5, code: "BRV", name: "Bridgeview", names: { ar: "بريدج فيو", ur: "برج ویو", es: "Bridgeview" } },
  { id: 6, code: "IND", name: "Indianapolis", names: { ar: "إنديانابوليس", ur: "انڈیاناپولس", es: "Indianápolis" } },
  { id: 7, code: "DET", name: "Detroit", names: { ar: "ديترويت", ur: "ڈیٹروائٹ", es: "Detroit" } },
  { id: 8, code: "STH", name: "Sterling Heights", names: { ar: "ستيرلينغ هايتس", ur: "سٹرلنگ ہائٹس", es: "Sterling Heights" } },
  { id: 9, code: "ELN", name: "East Lansing", names: { ar: "إيست لانسينغ", ur: "ایسٹ لانسنگ", es: "East Lansing" } },
  { id: 10, code: "TOL", name: "Toledo", names: { ar: "توليدو", ur: "ٹولڈو", es: "Toledo" } },
  { id: 11, code: "DUB", name: "Dublin", names: { ar: "دبلن", ur: "ڈبلن", es: "Dublín" } },
  { id: 12, code: "BRK", name: "Brooklyn", names: { ar: "بروكلين", ur: "برکلن", es: "Brooklyn" } },
  { id: 13, code: "NYC", name: "New York", names: { ar: "نيويورك", ur: "نیویارک", es: "Nueva York" } },
  { id: 14, code: "FLC", name: "Falls Church", names: { ar: "فولز تشيرش", ur: "فالس چرچ", es: "Falls Church" } },
  { id: 15, code: "STG", name: "Sterling", names: { ar: "ستيرلينغ", ur: "سٹرلنگ", es: "Sterling" } },
  { id: 16, code: "WAS", name: "Washington", names: { ar: "واشنطن", ur: "واشنگٹن", es: "Washington" } },
  { id: 17, code: "SVS", name: "Silver Spring", names: { ar: "سيلفر سبرينغ", ur: "سلور اسپرنگ", es: "Silver Spring" } },
  { id: 18, code: "BOS", name: "Boston", names: { ar: "بوسطن", ur: "بوسٹن", es: "Boston" } },
  { id: 19, code: "HOU", name: "Houston", names: { ar: "هيوستن", ur: "ہیوسٹن", es: "Houston" } },
  { id: 20, code: "PLN", name: "Plano", names: { ar: "بلانو", ur: "پلانو", es: "Plano" } },
  { id: 21, code: "IRV", name: "Irving", names: { ar: "إيرفينغ", ur: "ارونگ", es: "Irving" } },
  { id: 22, code: "LAX", name: "Los Angeles", names: { ar: "لوس أنجلوس", ur: "لاس اینجلس", es: "Los Ángeles" } },
  { id: 23, code: "SDG", name: "San Diego", names: { ar: "سان دييغو", ur: "سان ڈیاگو", es: "San Diego" } },
  { id: 24, code: "FRM", name: "Fremont", names: { ar: "فريمونت", ur: "فریمونٹ", es: "Fremont" } },
  { id: 25, code: "BLM", name: "Bloomington", names: { ar: "بلومينغتون", ur: "بلومنگٹن", es: "Bloomington" } },
  { id: 26, code: "MNJ", name: "Monmouth Junction", names: { ar: "مونموث جانكشن", ur: "منموتھ جنکشن", es: "Monmouth Junction" } },
  { id: 27, code: "FLS", name: "Flushing", names: { ar: "فلاشينغ", ur: "فلشنگ", es: "Flushing" } },
  { id: 28, code: "ATL", name: "Atlanta", names: { ar: "أتلانتا", ur: "اٹلانٹا", es: "Atlanta" } },
  { id: 29, code: "BCA", name: "Boca Raton", names: { ar: "بوكا راتون", ur: "بوکا راٹون", es: "Boca Ratón" } },
  { id: 30, code: "ORL", name: "Orlando", names: { ar: "أورلاندو", ur: "اورلینڈو", es: "Orlando" } },
  { id: 31, code: "PHL", name: "Philadelphia", names: { ar: "فيلادلفيا", ur: "فلاڈیلفیا", es: "Filadelfia" } },
  { id: 32, code: "SEA", name: "Seattle", names: { ar: "سياتل", ur: "سیئٹل", es: "Seattle" } },
  { id: 33, code: "NHV", name: "New Haven", names: { ar: "نيو هيفن", ur: "نیو ہیون", es: "New Haven" } },
  { id: 34, code: "RLG", name: "Raleigh", names: { ar: "رالي", ur: "رالی", es: "Raleigh" } },
  { id: 35, code: "RCH", name: "Richardson", names: { ar: "ريتشاردسون", ur: "رچرڈسن", es: "Richardson" } },
  { id: 36, code: "SFO", name: "San Francisco", names: { ar: "سان فرانسيسكو", ur: "سان فرانسسکو", es: "San Francisco" } },
  { id: 37, code: "TPA", name: "Tampa", names: { ar: "تامبا", ur: "ٹمپا", es: "Tampa" } },
  { id: 38, code: "CLT", name: "Charlotte", names: { ar: "شارلوت", ur: "شارلٹ", es: "Charlotte" } },
  { id: 39, code: "MSA", name: "Mesa", names: { ar: "ميسا", ur: "میسا", es: "Mesa" } },
  { id: 40, code: "PHX", name: "Phoenix", names: { ar: "فينيكس", ur: "فینکس", es: "Phoenix" } },
  { id: 41, code: "DEN", name: "Denver", names: { ar: "دنفر", ur: "ڈینور", es: "Denver" } },
  { id: 42, code: "BOL", name: "Boulder", names: { ar: "بولدر", ur: "بولڈر", es: "Boulder" } },
  { id: 43, code: "MKE", name: "Milwaukee", names: { ar: "ميلووكِي", ur: "ملواکی", es: "Milwaukee" } },
  { id: 44, code: "NSH", name: "Nashville", names: { ar: "ناشفيل", ur: "نیش وِل", es: "Nashville" } },
  { id: 45, code: "STL", name: "St. Louis", names: { ar: "سانت لويس", ur: "سینٹ لوئس", es: "San Luis" } },
  { id: 46, code: "NOL", name: "New Orleans", names: { ar: "نيو أورليانز", ur: "نیو اورلینز", es: "Nueva Orleans" } },
  { id: 47, code: "ICT", name: "Wichita", names: { ar: "ويتشيتا", ur: "وچیٹا", es: "Wichita" } },
  { id: 48, code: "JAN", name: "Jackson", names: { ar: "جاكسون", ur: "جیکسن", es: "Jackson" } },
  { id: 49, code: "PDX", name: "Portland", names: { ar: "بورتلاند", ur: "پورٹ لینڈ", es: "Portland" } },
  { id: 50, code: "LAS", name: "Las Vegas", names: { ar: "لاس فيغاس", ur: "لاس ویگاس", es: "Las Vegas" } },
  { id: 51, code: "LOU", name: "Louisville", names: { ar: "لويفيل", ur: "لوئس وِل", es: "Louisville" } },
  { id: 52, code: "CAE", name: "Columbia", names: { ar: "كولومبيا", ur: "کولمبیا", es: "Columbia" } },
  { id: 53, code: "DSM", name: "Des Moines", names: { ar: "دي موين", ur: "ڈو موئین", es: "Des Moines" } },
  { id: 54, code: "OKC", name: "Oklahoma City", names: { ar: "أوكلاهوما سيتي", ur: "اوکلاہوما سٹی", es: "Ciudad de Oklahoma" } },
  { id: 55, code: "SGL", name: "Sugar Land", names: { ar: "سيرغار لاند", ur: "شوگر لینڈ", es: "Sugar Land" } },
  { id: 56, code: "AUS", name: "Austin", names: { ar: "أوستن", ur: "آسٹن", es: "Austin" } },
  { id: 57, code: "WDL", name: "The Woodlands", names: { ar: "ذا وودلاندز", ur: "دا ووڈلینڈز", es: "The Woodlands" } },
  { id: 58, code: "MSF", name: "Mansfield", names: { ar: "مانسفيلد", ur: "مینسفیلڈ", es: "Mansfield" } },
  { id: 59, code: "ARL", name: "Arlington", names: { ar: "أرلينغتون", ur: "آرلنگٹن", es: "Arlington" } },
  { id: 60, code: "ALN", name: "Allen", names: { ar: "ألين", ur: "ایلن", es: "Allen" } },
  { id: 61, code: "GAR", name: "Garland", names: { ar: "غارلاند", ur: "گارلینڈ", es: "Garland" } },
  { id: 62, code: "FRS", name: "Frisco", names: { ar: "فريسكو", ur: "فرسکو", es: "Frisco" } },
  { id: 63, code: "MCK", name: "McKinney", names: { ar: "ماكيني", ur: "میک کینی", es: "McKinney" } },
  { id: 64, code: "CRL", name: "Carrollton", names: { ar: "كارولتون", ur: "کیرولٹن", es: "Carrollton" } },
  { id: 65, code: "LWV", name: "Lewisville", names: { ar: "لويسفيل", ur: "لوئس وِل", es: "Lewisville" } },
  { id: 66, code: "FLM", name: "Flower Mound", names: { ar: "فلاور ماوند", ur: "فلاور ماؤنڈ", es: "Flower Mound" } },
  { id: 67, code: "DTN", name: "Denton", names: { ar: "دينتون", ur: "ڈینٹن", es: "Denton" } },
  { id: 68, code: "FTW", name: "Fort Worth", names: { ar: "فورت وورث", ur: "فورٹ ورتھ", es: "Fort Worth" } },
  { id: 69, code: "GPR", name: "Grand Prairie", names: { ar: "غراند بريري", ur: "گرینڈ پریری", es: "Grand Prairie" } },
  { id: 70, code: "EUL", name: "Euless", names: { ar: "يولس", ur: "یولس", es: "Euless" } },
  { id: 71, code: "GRV", name: "Grapevine", names: { ar: "غريبفاين", ur: "گریپ وائن", es: "Grapevine" } },
  { id: 72, code: "CPL", name: "Coppell", names: { ar: "كوبيل", ur: "کوپل", es: "Coppell" } },
  { id: 73, code: "MSQ", name: "Mesquite", names: { ar: "ميسكيت", ur: "میسکوئٹ", es: "Mesquite" } },
  { id: 74, code: "TCL", name: "The Colony", names: { ar: "ذا كولوني", ur: "دا کالونی", es: "The Colony" } },
  { id: 75, code: "LTE", name: "Little Elm", names: { ar: "ليتل إلم", ur: "لٹل ایلم", es: "Little Elm" } },
  { id: 76, code: "NRH", name: "North Richland Hills", names: { ar: "نورث ريتشلاند هيلز", ur: "نارتھ رچلینڈ ہلز", es: "North Richland Hills" } },
  { id: 77, code: "RWL", name: "Rowlett", names: { ar: "رولت", ur: "رولٹ", es: "Rowlett" } },
  { id: 78, code: "DST", name: "DeSoto", names: { ar: "ديسوتو", ur: "ڈی سوٹو", es: "DeSoto" } },
  { id: 79, code: "CDH", name: "Cedar Hill", names: { ar: "سيدار هيل", ur: "سیڈر ہل", es: "Cedar Hill" } },
  { id: 80, code: "DCV", name: "Duncanville", names: { ar: "دنكانفيل", ur: "ڈنکن وِل", es: "Duncanville" } },
  { id: 81, code: "LNC", name: "Lancaster", names: { ar: "لانكاستر", ur: "لینکاسٹر", es: "Lancaster" } },
  { id: 82, code: "SAT", name: "San Antonio", names: { ar: "سان أنطونيو", ur: "سان انٹونیو", es: "San Antonio" } },
  { id: 83, code: "ELP", name: "El Paso", names: { ar: "إل باسو", ur: "ایل پاسو", es: "El Paso" } },
  { id: 84, code: "WAC", name: "Waco", names: { ar: "ويكو", ur: "ویکو", es: "Waco" } }
];

const LOOKUP_COUNTIES = [
  { id: 1, code: "WLL", name: "Will", names: { ar: "ويل", ur: "وِل", es: "Will" } },
  { id: 2, code: "COK", name: "Cook", names: { ar: "كوك", ur: "کک", es: "Cook" } },
  { id: 3, code: "DPG", name: "DuPage", names: { ar: "دوبيج", ur: "ڈیو پیج", es: "DuPage" } },
  { id: 4, code: "MRN", name: "Marion", names: { ar: "ماريون", ur: "ماریون", es: "Marion" } },
  { id: 5, code: "WAY", name: "Wayne", names: { ar: "واين", ur: "وین", es: "Wayne" } },
  { id: 6, code: "MCB", name: "Macomb", names: { ar: "ماكومب", ur: "ماکومب", es: "Macomb" } },
  { id: 7, code: "ING", name: "Ingham", names: { ar: "إنغهام", ur: "انگریم", es: "Ingham" } },
  { id: 8, code: "LCS", name: "Lucas", names: { ar: "لوكاس", ur: "لوکاس", es: "Lucas" } },
  { id: 9, code: "FRK", name: "Franklin", names: { ar: "فرانكلين", ur: "فرینکلن", es: "Franklin" } },
  { id: 10, code: "KNG", name: "Kings", names: { ar: "كينغز", ur: "کنگز", es: "Kings" } },
  { id: 11, code: "NYK", name: "New York", names: { ar: "نيويورك", ur: "نیویارک", es: "Nueva York" } },
  { id: 12, code: "FFX", name: "Fairfax", names: { ar: "فيرفاكس", ur: "فیئر فیکس", es: "Fairfax" } },
  { id: 13, code: "LDN", name: "Loudoun", names: { ar: "لودون", ur: "لوڈون", es: "Loudoun" } },
  { id: 14, code: "DCC", name: "District of Columbia", names: { ar: "واشنطن العاصمة", ur: "ڈسٹرکٹ آف کولمبیا", es: "Distrito de Columbia" } },
  { id: 15, code: "MGM", name: "Montgomery", names: { ar: "مونتغومري", ur: "مونٹگمری", es: "Montgomery" } },
  { id: 16, code: "SUF", name: "Suffolk", names: { ar: "سوفولك", ur: "سفولک", es: "Suffolk" } },
  { id: 17, code: "HRS", name: "Harris", names: { ar: "هاريس", ur: "ہیریس", es: "Harris" } },
  { id: 18, code: "CLN", name: "Collin", names: { ar: "كولين", ur: "کولن", es: "Collin" } },
  { id: 19, code: "DAL", name: "Dallas", names: { ar: "دالاس", ur: "ڈیلاس", es: "Dallas" } },
  { id: 20, code: "LAC", name: "Los Angeles", names: { ar: "لوس أنجلوس", ur: "لاس اینجلس", es: "Los Ángeles" } },
  { id: 21, code: "SDC", name: "San Diego", names: { ar: "سان دييغو", ur: "سان ڈیاگو", es: "San Diego" } },
  { id: 22, code: "ALA", name: "Alameda", names: { ar: "ألاميدا", ur: "الامیڈا", es: "Alameda" } },
  { id: 23, code: "HNP", name: "Hennepin", names: { ar: "هينيبين", ur: "ہینیپن", es: "Hennepin" } },
  { id: 24, code: "MDX", name: "Middlesex", names: { ar: "ميدلسكس", ur: "مڈلسیکس", es: "Middlesex" } },
  { id: 25, code: "QNS", name: "Queens", names: { ar: "كوينز", ur: "کوئینز", es: "Queens" } },
  { id: 26, code: "DKB", name: "DeKalb", names: { ar: "ديكالب", ur: "ڈیکالب", es: "DeKalb" } },
  { id: 27, code: "PLB", name: "Palm Beach", names: { ar: "بالم بيتش", ur: "پام بیچ", es: "Palm Beach" } },
  { id: 28, code: "ORG", name: "Orange", names: { ar: "أورانج", ur: "اورنج", es: "Orange" } },
  { id: 29, code: "PHL", name: "Philadelphia", names: { ar: "فيلادلفيا", ur: "فلاڈیلفیا", es: "Filadelfia" } },
  { id: 30, code: "KIN", name: "King", names: { ar: "كينغ", ur: "کنگ", es: "King" } },
  { id: 31, code: "NHV", name: "New Haven", names: { ar: "نيو هيفن", ur: "نیو ہیون", es: "New Haven" } },
  { id: 32, code: "WAK", name: "Wake", names: { ar: "ويك", ur: "ویک", es: "Wake" } },
  { id: 33, code: "SFC", name: "San Francisco", names: { ar: "سان فرانسيسكو", ur: "سان فرانسسکو", es: "San Francisco" } },
  { id: 34, code: "HIL", name: "Hillsborough", names: { ar: "هيلزبورو", ur: "ہلسبرو", es: "Hillsborough" } },
  { id: 35, code: "MCK", name: "Mecklenburg", names: { ar: "ميكلينبرغ", ur: "میکلن برگ", es: "Mecklenburg" } },
  { id: 36, code: "MCP", name: "Maricopa", names: { ar: "ماريكوبا", ur: "ماریکوپا", es: "Maricopa" } },
  { id: 37, code: "DNV", name: "Denver", names: { ar: "دنفر", ur: "ڈینور", es: "Denver" } },
  { id: 38, code: "BLD", name: "Boulder", names: { ar: "بولدر", ur: "بولڈر", es: "Boulder" } },
  { id: 39, code: "MIL", name: "Milwaukee", names: { ar: "ميلووكي", ur: "ملواکی", es: "Milwaukee" } },
  { id: 40, code: "DAV", name: "Davidson", names: { ar: "ديفيدسون", ur: "ڈیوڈسن", es: "Davidson" } },
  { id: 41, code: "SLC", name: "St. Louis", names: { ar: "سانت لويس", ur: "سینٹ لوئس", es: "San Luis" } },
  { id: 42, code: "ORL", name: "Orleans", names: { ar: "أورليانز", ur: "اورلینز", es: "Orleans" } },
  { id: 43, code: "SDG", name: "Sedgwick", names: { ar: "سيدجويك", ur: "سیج وِک", es: "Sedgwick" } },
  { id: 44, code: "HND", name: "Hinds", names: { ar: "هيندز", ur: "ہائینڈز", es: "Hinds" } },
  { id: 45, code: "MLT", name: "Multnomah", names: { ar: "مولتنوماه", ur: "ملٹنوماہ", es: "Multnomah" } },
  { id: 46, code: "CLK", name: "Clark", names: { ar: "كلارك", ur: "کلارک", es: "Clark" } },
  { id: 47, code: "JEF", name: "Jefferson", names: { ar: "جيفرسون", ur: "جیفرسن", es: "Jefferson" } },
  { id: 48, code: "RCH", name: "Richland", names: { ar: "ريتشلاند", ur: "رچ لینڈ", es: "Richland" } },
  { id: 49, code: "POL", name: "Polk", names: { ar: "بولك", ur: "پولک", es: "Polk" } },
  { id: 50, code: "OKL", name: "Oklahoma", names: { ar: "أوكلاهوما", ur: "اوکلاہوما", es: "Oklahoma" } },
  { id: 51, code: "FTB", name: "Fort Bend", names: { ar: "فورت بيند", ur: "فورٹ بينڈ", es: "Fort Bend" } },
  { id: 52, code: "TRV", name: "Travis", names: { ar: "ترافيس", ur: "ٹراوس", es: "Travis" } },
  { id: 53, code: "MTG", name: "Montgomery", names: { ar: "مونتغومري", ur: "مونٹگمری", es: "Montgomery" } },
  { id: 54, code: "TAR", name: "Tarrant", names: { ar: "تارانت", ur: "ٹیرنٹ", es: "Tarrant" } },
  { id: 55, code: "DTN", name: "Denton", names: { ar: "دينتون", ur: "ڈینٹن", es: "Denton" } },
  { id: 56, code: "BXR", name: "Bexar", names: { ar: "بيكسار", ur: "بیکسار", es: "Bexar" } },
  { id: 57, code: "ELP", name: "El Paso", names: { ar: "إل باسو", ur: "ایل پاسو", es: "El Paso" } },
  { id: 58, code: "MCL", name: "McLennan", names: { ar: "ماكلينان", ur: "میک لینن", es: "McLennan" } }
];

// ─────────────────────────────────────────────
//  LOOKUP_TITLES — Sprint 4 (i18n titles)
//  value = canonical English key used for filtering
// ─────────────────────────────────────────────
const LOOKUP_TITLES = [
  { id: 1,  code: "IMAM", value: "Imam",             names: { en: "Imam",             ar: "إمام",                 ur: "امام",          es: "Imán" } },
  { id: 2,  code: "PRES", value: "President",         names: { en: "President",         ar: "الرئيس",               ur: "صدر",           es: "Presidente" } },
  { id: 3,  code: "CHRM", value: "Chairman",          names: { en: "Chairman",          ar: "رئيس مجلس الإدارة",    ur: "چیئرمین",       es: "Presidente del Consejo" } },
  { id: 4,  code: "VPRS", value: "Vice President",    names: { en: "Vice President",    ar: "نائب الرئيس",          ur: "نائب صدر",      es: "Vicepresidente" } },
  { id: 5,  code: "SECR", value: "Secretary",         names: { en: "Secretary",         ar: "الأمين",               ur: "سیکرٹری",       es: "Secretario" } },
  { id: 6,  code: "SECG", value: "Secretary General", names: { en: "Secretary General", ar: "الأمين العام",         ur: "سیکرٹری جنرل", es: "Secretario General" } },
  { id: 7,  code: "TRES", value: "Treasurer",         names: { en: "Treasurer",         ar: "أمين الصندوق",         ur: "خزانچی",        es: "Tesorero" } },
  { id: 8,  code: "DIRE", value: "Director",          names: { en: "Director",          ar: "مدير",                 ur: "ڈائریکٹر",      es: "Director" } },
  { id: 9,  code: "AMEE", value: "Ameer",             names: { en: "Ameer",             ar: "أمير",                 ur: "امیر",          es: "Amir" } },
  { id: 10, code: "LEAD", value: "Leader",            names: { en: "Leader",            ar: "قائد",                 ur: "قائد",          es: "Líder" } },
  { id: 11, code: "MEMB", value: "Member",            names: { en: "Member",            ar: "عضو",                  ur: "رکن",           es: "Miembro" } }
];
