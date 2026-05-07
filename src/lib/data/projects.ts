import { Project } from '../types/project';

// Marhaba
import marhabaLogo from '@/assets/project_images/marhaba/0.png';
import marhaba1 from '@/assets/project_images/marhaba/1.png';
import marhaba2 from '@/assets/project_images/marhaba/2.png';
import marhaba3 from '@/assets/project_images/marhaba/3.png';
import marhaba4 from '@/assets/project_images/marhaba/4.png';
import marhaba5 from '@/assets/project_images/marhaba/5.png';
import marhaba6 from '@/assets/project_images/marhaba/6.png';

// Koor
import koorLogo from '@/assets/project_images/koor/0.jpg';
import koor1 from '@/assets/project_images/koor/1.jpg';
import koor2 from '@/assets/project_images/koor/2.jpg';
import koor3 from '@/assets/project_images/koor/3.jpg';
import koor4 from '@/assets/project_images/koor/4.jpg';
import koor5 from '@/assets/project_images/koor/5.jpg';
import koor6 from '@/assets/project_images/koor/6.jpg';

// MoverMate
import movermateLogo from '@/assets/project_images/movermate/0.jpg';
import movermate1 from '@/assets/project_images/movermate/1.jpg';
import movermate2 from '@/assets/project_images/movermate/2.jpg';
import movermate3 from '@/assets/project_images/movermate/3.jpg';
import movermate4 from '@/assets/project_images/movermate/4.jpg';

// Counsellor App
import counsellorLogo from '@/assets/project_images/counsellor_app/0.jpg';
import counsellor1 from '@/assets/project_images/counsellor_app/1.jpg';
import counsellor2 from '@/assets/project_images/counsellor_app/2.jpg';
import counsellor3 from '@/assets/project_images/counsellor_app/3.jpg';
import counsellor4 from '@/assets/project_images/counsellor_app/4.jpg';

// Spotted
import spottedLogo from '@/assets/project_images/spotted/0.webp';
import spotted1 from '@/assets/project_images/spotted/1.png';
import spotted2 from '@/assets/project_images/spotted/2.png';
import spotted3 from '@/assets/project_images/spotted/3.png';
import spotted4 from '@/assets/project_images/spotted/4.png';
import spotted5 from '@/assets/project_images/spotted/5.png';

// SSC AI
import sscLogo from '@/assets/project_images/ssc_ai/0.jpg';
import ssc1 from '@/assets/project_images/ssc_ai/1.jpg';
import ssc2 from '@/assets/project_images/ssc_ai/2.png';
import ssc3 from '@/assets/project_images/ssc_ai/3.png';
import ssc4 from '@/assets/project_images/ssc_ai/4.png';
import ssc5 from '@/assets/project_images/ssc_ai/5.png';
import ssc6 from '@/assets/project_images/ssc_ai/6.png';
import ssc7 from '@/assets/project_images/ssc_ai/7.png';
import ssc8 from '@/assets/project_images/ssc_ai/8.png';

export const projects: Project[] = [
  {
    id: "marhaba",
    title: "Marhaba Auctions",
    logo: marhabaLogo,
    description: "Built for a big auction company in Dubai. Uses WebSockets for live bidding, full payment gateway integration, and a dedicated in-app wallet. Accommodates a comprehensive vehicle lifecycle including selling and shipping cars.",
    tech: ["Flutter", "WebSockets", "Payments", "Live Bidding", "Wallet"],
    link: "https://play.google.com/store/apps/details?id=com.marhabaautosales.android",
    screenshots: 6,
    screenshotExt: "png",
    iosLink: "https://apps.apple.com/in/app/marhaba-auction/id1276558362",
    screenshotPaths: [marhaba1, marhaba2, marhaba3, marhaba4, marhaba5, marhaba6],
    webLink: "https://marhabaauctions.com/"
  },
  {
    id: "koor",
    title: "Koor",
    logo: koorLogo,
    description: "A property buying, selling, and renting platform for Gulf countries. Achieved 10K+ downloads in the first month with zero marketing spend. Built from scratch with multilingual localization, deep linking, offline-first support, and nearby property search. Available on both iOS and Play Store with 4.5+ rating.",
    tech: ["Flutter", "Firebase", "Google Maps", "Deep Linking", "Localization", "AI Moderation"],
    link: "https://play.google.com/store/apps/details?id=com.ulearnatech.koor",
    screenshots: 6,
    screenshotExt: "jpg",
    iosLink: "https://apps.apple.com/no/app/koor-buy-rent-property/id6746753805",
    screenshotPaths: [koor1, koor2, koor3, koor4, koor5, koor6],
    webLink: "https://koor.co/"
  },
  {
    id: "movermate",
    title: "MoverMate",
    logo: movermateLogo,
    description: "A high-performance logistics and moving app with advanced navigation, real-time tracking, and Stripe Tap-to-Pay for secure transactions. Features real-time messaging and calendar for scheduling moves. Delivers seamless cross-platform support for iOS and Android. Available on both iOS and Play Store",
    tech: ["Flutter", "Stripe", "Radar API", "Real-Time", "Geofencing", "Calendar"],
    link: "https://play.google.com/store/apps/details?id=com.movermate.crew_app",
    screenshots: 4,
    screenshotExt: "jpg",
    iosLink: "https://apps.apple.com/no/app/movermate-crew/id6737702875",
    screenshotPaths: [movermate1, movermate2, movermate3, movermate4],
    webLink: "https://movermate.com.au/"
  },
  {
    id: "counsellor_app",
    title: "Counsellor App",
    logo: counsellorLogo,
    description: "The SwiftAMS Business App is a mobile solution that grants users swift access to the SwiftAMS dashboard, empowering them to manage leads, tasks, and real-time updates. With the ability to create, assign, and track leads, businesses can ensure that no opportunities are missed. Tasks and follow-ups can be easily created, streamlining workflows and facilitating effective communication with prospects.",
    tech: ["Flutter", "Call Logs", "Dialer", "Call Recording"],
    link: "https://play.google.com/store/apps/details?id=com.codexplabs.swiftcounsellorapp",
    screenshots: 4,
    screenshotExt: "jpg",
    iosLink: "https://apps.apple.com/no/app/swiftams-business/id6451433255",
    screenshotPaths: [counsellor1, counsellor2, counsellor3, counsellor4],
    webLink: "https://swiftams.com/"
  },
  {
    id: "spotted",
    title: "Spotted",
    logo: spottedLogo,
    description: "Spotted – Scan, Pay & Earn Cashback Instantly. Spotted is a smart and rewarding way to make payments. Simply scan our QR code, complete your payment using any UPI app (like Google Pay, PhonePe, Paytm, etc.), and earn instant cashback directly into your in-app wallet. Available on both iOS and Play Store",
    tech: ["Flutter", "Riverpod", "Real-Time", "Payments", "Social", "Chat"],
    link: "https://play.google.com/store/apps/details?id=com.spottedapp.user",
    screenshots: 5,
    screenshotExt: "png",
    iosLink: "https://apps.apple.com/no/app/spotted-share-with-friends/id6753819174",
    screenshotPaths: [spotted1, spotted2, spotted3, spotted4, spotted5],
    webLink: "https://www.tryspotted.com/"
  },
  {
    id: "ssc_ai",
    title: "SSC Ai",
    logo: sscLogo,
    description: "A comprehensive quiz app for SSC students with AI-powered explanations. Features Gemini API integration for generating brief solutions to every question. Includes AI chat for generating questions and curated notes based on topics. Previous year questions extracted using Local LLM with Phi-4 model.",
    tech: ["Flutter", "Gemini API", "AI/ML", "Firebase", "LLM", "Supabase"],
    link: "https://play.google.com/store/apps/details?id=com.mmstq.quiz.ssc_quiz",
    screenshots: 8,
    screenshotExt: "png",
    iosLink: "",
    screenshotPaths: [ssc1, ssc2, ssc3, ssc4, ssc5, ssc6, ssc7, ssc8],
    webLink: "https://sscaiapp.com/"
  }
];
