import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import {
  Calendar, MapPin, Gift, Heart, Mail,
  Volume2, VolumeX, X, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ─── Constants ────────────────────────────────────────────────────────────────
const weddingDate = new Date("2026-11-07T15:00:00");
const cn = (...classes) => classes.filter(Boolean).join(" ");
const venueMapUrl = "https://maps.app.goo.gl/yS1cqqnQfjnew8yd6?g_st=ic";
const heroImage = "/IMG_7434.JPG";
const rsvpWhatsappNumber = "27649818636";

// ─── Data ─────────────────────────────────────────────────────────────────────
const journeyPhotos = [
  "/IMG_7344.JPG",
  "/IMG_7346.JPG",
  "/IMG_7424.JPG",
  "/IMG_7432.JPG",
  "/IMG_7433.JPG",
  "/IMG_7434.JPG",
  "/IMG_7458.JPG"
];

const accommodation = [
  {
    name: "Nantes Vue Guest House",
    description: "A simple, convenient guesthouse close to the celebration for guests who would like to stay nearby.",
    distance: "2 min from venue",
    tier: "Most budget-friendly",
    mapUrl: "https://maps.google.com/?q=Nantes+Vue+Guest+House+Paarl",
    img: "https://b-cdn.springnest.com/media/img/1km/nantesvue__-1072d64f8a.jpg?width=560",
  },
  {
    name: "Under Oaks Guesthouse",
    description: "Comfortable vineyard accommodation with a peaceful setting and easy access to Nantes Estate.",
    distance: "5 min from venue",
    tier: "Budget-friendly",
    mapUrl: "https://maps.google.com/?q=Under+Oaks+Guesthouse+Paarl",
    img: "https://underoaks.co.za/wp-content/uploads/2024/10/www.lizellelotter.co_.zaJune24-37.jpg",
  },
  {
    name: "Zonnevanger Venue & Guesthouse",
    description: "A warm guesthouse option surrounded by gardens, ideal for a relaxed wedding-weekend stay.",
    distance: "8 min from venue",
    tier: "Moderate",
    mapUrl: "https://maps.google.com/?q=Zonnevanger+Venue+and+Guesthouse+Paarl",
    img: "https://zonnevanger.co.za/wp-content/uploads/2026/04/2.jpg",
  },
  {
    name: "Cana Vineyard Guesthouse",
    description: "A refined vineyard guesthouse for guests who prefer a more romantic and spacious stay.",
    distance: "10 min from venue",
    tier: "Refined stay",
    mapUrl: "https://maps.google.com/?q=Cana+Vineyard+Guesthouse+Paarl",
    img: "https://canaguesthouse.co.za/wp-content/uploads/2019/04/Standard-Mountain-1.jpg",
  },
];

const dressCode = [
  {
    label: "Men",
    text: "Long white shirt paired with tailored beige pants.",
    image: "/men.jpeg",
  },
  {
    label: "Women",
    text: "Elegant dresses in soft pastel tones with heels.",
    image: "/women.jpeg",
  },
];

const confettiPieces = Array.from({ length: 34 }, (_, index) => ({
  id: `confetti-${index}`,
  left: `${6 + ((index * 17) % 88)}%`,
  drift: index % 2 === 0 ? 28 : -28,
  delay: (index % 9) * 0.08,
  duration: 2.1 + (index % 5) * 0.16,
  rotate: index % 2 === 0 ? 210 : -190,
  color: ["#F1E5F5", "#DCCAEA", "#FFFFFF", "#A989B6", "#F7DFA6"][index % 5],
  width: index % 3 === 0 ? 8 : 6,
  height: index % 4 === 0 ? 16 : 11,
}));

const fireworkBursts = [
  { id: "left", left: "18%", top: "25%", delay: 0.05 },
  { id: "center", left: "50%", top: "18%", delay: 0.24 },
  { id: "right", left: "82%", top: "30%", delay: 0.42 },
];

function HoneymoonCelebration() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {fireworkBursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: burst.left, top: burst.top }}
        >
          {Array.from({ length: 12 }, (_, ray) => {
            const angle = ray * 30;
            return (
              <motion.span
                key={ray}
                className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1, 0.2],
                  x: Math.cos((angle * Math.PI) / 180) * 58,
                  y: Math.sin((angle * Math.PI) / 180) * 58,
                }}
                transition={{
                  duration: 1.2,
                  delay: burst.delay,
                  repeat: 2,
                  repeatDelay: 0.7,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      ))}

      {confettiPieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-[-12%] rounded-sm"
          style={{
            left: piece.left,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
          }}
          initial={{ opacity: 0, y: -40, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: ["0%", "78vh"],
            x: [0, piece.drift, 0],
            rotate: piece.rotate,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: 1,
            repeatDelay: 0.25,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const difference = Math.max(targetDate.getTime() - now.getTime(), 0);
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// ─── Shared components ────────────────────────────────────────────────────────
function Section({ id, eyebrow, title, children, className }) {
  return (
    <section id={id} className={cn("relative px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#A989B6]">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-serif text-4xl text-[#4C3A5F] sm:text-5xl">{title}</h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function Countdown() {
  const time = useCountdown(weddingDate);
  return (
    <div className="grid grid-cols-4 gap-3 rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-xl">
      {Object.entries(time).map(([label, value]) => (
        <div key={label} className="rounded-3xl bg-white/60 px-3 py-4 text-center">
          <div className="font-serif text-3xl text-[#4C3A5F]">{String(value).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#76647F]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#DCCAEA]" />
      <span className="text-[#A989B6] text-xl">✦</span>
      <span className="text-[#DCCAEA] text-2xl">❀</span>
      <span className="text-[#A989B6] text-xl">✦</span>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#DCCAEA]" />
    </div>
  );
}

function GoldDivider() {
  return <div className="mx-auto my-5 h-px w-20 bg-[#A989B6]" />;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WeddingWebsite() {
  const [introComplete, setIntroComplete] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [fundSpotlight, setFundSpotlight] = useState(false);
  const fundSpotlightTimer = useRef(null);
  const [rsvpForm, setRsvpForm] = useState({
    name: "", email: "", attending: "", attendance: "Joyfully attending",
    meal: "", dietary: "",
  });

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    const scrollToTop = () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };

    scrollToTop();
    const animationFrame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 100);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  const spotlightFund = () => {
    window.clearTimeout(fundSpotlightTimer.current);
    setFundSpotlight(true);
    document.getElementById("fund")?.scrollIntoView({ behavior: "smooth", block: "start" });
    fundSpotlightTimer.current = window.setTimeout(() => setFundSpotlight(false), 5000);
  };

  const sendRsvpToWhatsapp = () => {
    const message = [
      "New RSVP for Juan & Taylor's wedding",
      "",
      `Name: ${rsvpForm.name || "Not supplied"}`,
      `Email: ${rsvpForm.email || "Not supplied"}`,
      `Meal preference: ${rsvpForm.meal || "Not supplied"}`,
      `Dietary restrictions/allergies: ${rsvpForm.dietary || "None supplied"}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${rsvpWhatsappNumber}?text=${encodeURIComponent(message)}`;
    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappUrl;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.click();
  };

  const handleRsvpSubmit = (event) => {
    event.preventDefault();
    sendRsvpToWhatsapp();
    setRsvpSent(true);
    window.setTimeout(spotlightFund, 850);
  };

  return (
    <>
      {!introComplete && (
        <EnvelopeIntro onComplete={() => setIntroComplete(true)} />
      )}
    <main className="min-h-screen scroll-smooth">
      <div className="min-h-screen overflow-hidden bg-[#FBF8FC] text-[#4C3A5F]">

        {/* ── NAV ── */}
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#DCCAEA]/60 bg-white/75 px-4 py-3 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="#home" className="font-serif text-2xl text-[#4C3A5F] tracking-wide">J & T</a>
            <div className="hidden items-center gap-6 text-sm text-[#4C3A5F] md:flex">
              {[
                ["Pictures", "journey"],
                ["Wedding Day", "events"],
                ["Dress Code", "dresscode"],
                ["Stay", "accommodation"],
                ["Food", "food"],
                ["RSVP", "rsvp"],
                ["Fund", "fund"],
              ].map(([label, href]) => (
                <a key={href} href={`#${href}`} className="hover:text-[#A989B6] transition-colors">{label}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setMusicOn(!musicOn)} className="text-[#4C3A5F]">
                {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </Button>
              <Button asChild className="rounded-full bg-[#A989B6] px-6 text-white hover:bg-[#9578A5]">
                <a href="#rsvp">RSVP</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header
          id="home"
          className="relative z-10 flex min-h-screen items-center justify-center bg-cover bg-center px-4 text-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#4C3A5F]/55 via-[#6F587C]/30 to-[#FBF8FC]" />
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative mx-auto max-w-5xl pt-24"
          >
            <p className="mb-4 text-[#DCCAEA] text-2xl tracking-[0.4em]">❀ ✦ ❀</p>
            <h1 className="font-serif text-7xl leading-none text-white sm:text-8xl lg:text-[9rem]">
              Juan & Taylor
            </h1>
            <GoldDivider />
            <p className="mx-auto max-w-2xl text-lg italic text-white/90 sm:text-xl leading-8">
              Request the honour of your presence as they enter<br className="hidden sm:block" />
              into the sacred covenant of marriage.
            </p>

            {/* Venue */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#E7D7EF]">
                <MapPin size={16} />
                <span className="font-semibold tracking-widest uppercase text-sm">Nantes Estate</span>
              </div>
              <p className="text-white/75 text-sm">Paarl, South Africa</p>
            </div>

            {/* Countdown */}
            <div className="mx-auto mt-8 max-w-sm sm:max-w-md">
              <Countdown />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/75 text-sm">
              <Calendar size={15} className="text-[#E7D7EF]" />
              <span>7 November 2026</span>
            </div>
          </motion.div>
        </header>

        {/* ── LOVE IN PICTURES ── */}
        <Section id="journey" eyebrow="Our Love in Pictures" title="Moments we hold dear">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {journeyPhotos.map((src, index) => (
              <motion.button
                key={src}
                onClick={() => setSelectedImage(src)}
                className="mb-5 block w-full overflow-hidden rounded-[1.25rem] border border-white/70 shadow-lg"
                whileHover={{ scale: 1.015 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <img src={src} alt={`Juan and Taylor ${index + 1}`} className="h-auto w-full object-cover" />
              </motion.button>
            ))}
          </div>
          <div className="mx-auto mt-14 max-w-2xl text-center">
            <FloralDivider />
            <blockquote className="mt-6 font-serif text-2xl italic text-[#4C3A5F] sm:text-3xl leading-snug">
              "I have found the one whom my soul loves."
            </blockquote>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#A989B6]">Song of Solomon 3:4</p>
            <FloralDivider />
          </div>
        </Section>

        {/* ── EVENTS ── */}
        <Section id="events" eyebrow="Wedding Day" title="Ceremony & Reception" className="bg-white/55">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <Card className="overflow-hidden rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-xl backdrop-blur">
              <CardContent className="p-8 sm:p-12">
                <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
                  <div>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E7D7EF]">
                      <Heart size={24} className="text-[#8F6FA0]" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#A989B6]">Saturday, 7 November 2026</p>
                    <h3 className="mt-3 font-serif text-4xl text-[#4C3A5F]">Nantes Estate</h3>
                    <p className="mt-2 text-sm leading-7 text-[#66536F]">Paarl, Western Cape, South Africa</p>
                  </div>
                  <div className="space-y-4 text-sm leading-7 text-[#66536F]">
                    <p><span className="font-semibold text-[#4C3A5F]">Arrival:</span> 10:00 AM</p>
                    <p><span className="font-semibold text-[#4C3A5F]">Ceremony starts:</span> 11:00 AM</p>
                    <p><span className="font-semibold text-[#4C3A5F]">Reception:</span> To follow at the same venue</p>
                    <p className="italic text-[#76647F]">
                      We kindly invite you to share in a day of love, thanksgiving, dinner, and celebration as we begin married life together.
                    </p>
                    <a
                      href={venueMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#A989B6] px-5 py-2.5 text-sm text-[#8F6FA0] hover:bg-[#F4EDF8] transition-colors"
                    >
                      <MapPin size={14} /> Open in Google Maps
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Section>

        {/* ── DRESS CODE ── */}
        <Section id="dresscode" eyebrow="Dress Code" title="Formal attire requested">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {dressCode.map((attire, index) => (
              <motion.div
                key={attire.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-lg backdrop-blur">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#F4EDF8]">
                    <img
                      src={attire.image}
                      alt={`${attire.label} formal attire inspiration`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <CardContent className="p-7">
                    <Sparkles size={24} className="mb-5 text-[#A989B6]" />
                    <h3 className="font-serif text-3xl text-[#4C3A5F]">{attire.label}</h3>
                    <div className="my-4 h-px w-16 bg-[#DCCAEA]" />
                    <p className="text-sm leading-7 text-[#66536F]">{attire.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── ACCOMMODATION ── */}
        <Section id="accommodation" eyebrow="Where to Stay" title="Accommodation Nearby" className="bg-white/55">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accommodation.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-lg backdrop-blur">
                  <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${place.img})` }} />
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg text-[#4C3A5F] leading-snug">{place.name}</h3>
                    <p className="mt-1 text-xs text-[#A989B6] uppercase tracking-wide">{place.distance}</p>
                    <p className="mt-2 inline-flex rounded-full bg-[#F4EDF8] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#76647F]">{place.tier}</p>
                    <a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#A989B6] py-2.5 text-xs text-[#8F6FA0] hover:bg-[#F4EDF8] transition-colors"
                    >
                      <MapPin size={12} /> View on Map
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </Section>

        {/* ── RSVP ── */}
        <Section id="rsvp" eyebrow="RSVP" title="The favour of your reply" className="bg-white/55">
          <Card className="mx-auto max-w-2xl rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-xl backdrop-blur">
            <CardContent className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {rsvpSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <Mail className="mx-auto text-[#A989B6]" size={42} />
                    <h3 className="mt-4 font-serif text-3xl text-[#4C3A5F]">Thank you</h3>
                    <p className="mt-3 leading-7 text-[#66536F]">
                      Your WhatsApp RSVP is ready to send. We cannot wait to celebrate with you.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="grid gap-4"
                    onSubmit={handleRsvpSubmit}
                  >
                    <input
                      className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                      placeholder="Guest name"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    />
                    <select
                      className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] transition-colors"
                      value={rsvpForm.meal}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, meal: e.target.value })}
                    >
                      <option value="">Meal preference</option>
                      <option>Beef</option>
                      <option>Fish</option>
                      <option>Vegan</option>
                    </select>
                    <textarea
                      className="min-h-24 resize-none rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                      placeholder="Dietary restrictions or allergies"
                      value={rsvpForm.dietary}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                    />
                    <Button className="rounded-full bg-[#A989B6] py-6 text-white hover:bg-[#9578A5] text-base">
                      Send RSVP via WhatsApp ✦
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </Section>

        {/* ── HONEYMOON FUND ── */}
        <Section id="fund" eyebrow="Gift" title="Honeymoon Fund" className="bg-white/55">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <motion.div
              animate={fundSpotlight ? { scale: [1, 1.025, 1], y: [0, -8, 0] } : { scale: 1, y: 0 }}
              transition={{ duration: 0.9, repeat: fundSpotlight ? 2 : 0, ease: "easeInOut" }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
              className="relative"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-[#DCCAEA]/55 blur-2xl"
                animate={{ opacity: fundSpotlight ? [0.28, 0.72, 0.34] : [0.14, 0.25, 0.14] }}
                transition={{ duration: fundSpotlight ? 0.9 : 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <Card className="relative overflow-hidden rounded-[1.5rem] border-[#DCCAEA]/50 bg-gradient-to-br from-[#4C3A5F] via-[#6F587C] to-[#A989B6] shadow-2xl">
                <AnimatePresence>{fundSpotlight && <HoneymoonCelebration />}</AnimatePresence>
                <CardContent className="relative p-10 sm:p-14">
                  <AnimatePresence>
                    {fundSpotlight && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white shadow-lg backdrop-blur"
                      >
                        <Sparkles size={14} /> Thank you for your RSVP
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div className="text-white">
                      <motion.div
                        animate={{ rotate: fundSpotlight ? [0, -8, 8, 0] : 0, scale: fundSpotlight ? [1, 1.12, 1] : 1 }}
                        transition={{ duration: 0.7, repeat: fundSpotlight ? 3 : 0 }}
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-lg"
                      >
                        <Gift className="text-[#F1E5F5]" size={38} />
                      </motion.div>
                      <h3 className="font-serif text-4xl sm:text-5xl leading-tight">With grateful hearts</h3>
                      <div className="my-5 h-px w-20 bg-[#E7D7EF]" />
                      <p className="leading-7 text-white/80 italic text-sm sm:text-base">
                        Should you wish to bless us with a gift, a contribution towards our honeymoon would be received with deep gratitude as we begin this new chapter together.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur border border-white/10 transition-colors hover:bg-white/15">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#F1E5F5] mb-3">EFT Details</p>
                        <div className="space-y-2 text-sm text-white/80">
                          <p><span className="text-white font-medium">Account Name:</span> Miss TN Brown</p>
                          <p><span className="text-white font-medium">Bank:</span> Capitec</p>
                          <p><span className="text-white font-medium">Account No:</span> 1654096839</p>
                          <p><span className="text-white font-medium">Reference:</span> Honeymoon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 bg-[#4C3A5F] px-4 py-16 text-center text-white">
          <p className="text-[#DCCAEA] text-2xl tracking-[0.4em] mb-4">❀ ✦ ❀</p>
          <p className="font-serif text-5xl text-white">Juan & Taylor</p>
          <p className="mt-3 text-[#E7D7EF] text-sm uppercase tracking-[0.3em]">7 November 2026</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[#DCCAEA]/85 text-sm">
            <MapPin size={14} className="text-[#E7D7EF]" />
            <span>Nantes Estate, Paarl, South Africa</span>
          </div>
          <div className="mt-5">
            <a
              href="mailto:hello@juanandtaylor.co.za"
              className="inline-flex items-center gap-2 text-sm text-[#DCCAEA]/75 hover:text-white transition-colors"
            >
              <Mail size={14} /> Contact Us
            </a>
          </div>
          <div className="mx-auto mt-8 h-px w-32 bg-[#DCCAEA]/45" />
        </footer>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button className="absolute right-6 top-6 rounded-full bg-white p-3 text-black shadow-xl">
                <X size={20} />
              </button>
              <motion.img
                src={selectedImage}
                alt="Selected"
                className="max-h-[85vh] rounded-[2rem] object-contain shadow-2xl"
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.92 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
    </>
  );
}
