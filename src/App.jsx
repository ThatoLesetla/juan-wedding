import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import {
  Calendar, MapPin, Music, Gift, Heart, Mail,
  Volume2, VolumeX, X, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ─── Constants ────────────────────────────────────────────────────────────────
const weddingDate = new Date("2026-11-07T15:00:00");
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Data ─────────────────────────────────────────────────────────────────────
const journeyPhotos = [
  "/IMG_7344.JPG",
  "/IMG_7346.JPG",
  "/IMG_7424.JPG",
  "/IMG_7432.JPG",
  "/IMG_7433.JPG",
  "/IMG_7434.JPG",
  "/IMG_7458.JPG",
  "/IMG_7459.JPG",
];

const gallery = [
  "/IMG_7344.JPG",
  "/IMG_7346.JPG",
  "/IMG_7424.JPG",
  "/IMG_7432.JPG",
  "/IMG_7433.JPG",
  "/IMG_7434.JPG",
  "/IMG_7458.JPG",
  "/IMG_7459.JPG",
];

const accommodation = [
  {
    name: "Nantes Vue Guest House",
    description: "A charming guesthouse nestled in the heart of Paarl's wine country, offering luxury rooms with vineyard views.",
    distance: "2 min from venue",
    mapUrl: "https://maps.google.com/?q=Nantes+Vue+Guest+House+Paarl",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Under Oaks Guesthouse",
    description: "Elegant accommodation under centuries-old oak trees, blending classic Cape Dutch architecture with modern comfort.",
    distance: "5 min from venue",
    mapUrl: "https://maps.google.com/?q=Under+Oaks+Guesthouse+Paarl",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Zonnevanger Venue & Guesthouse",
    description: "A boutique guesthouse surrounded by beautiful gardens and the scenic Paarl Valley mountains.",
    distance: "8 min from venue",
    mapUrl: "https://maps.google.com/?q=Zonnevanger+Venue+and+Guesthouse+Paarl",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Cana Vineyard Guesthouse",
    description: "Romantic vineyard guesthouse offering an intimate escape with award-winning wines and breathtaking mountain vistas.",
    distance: "10 min from venue",
    mapUrl: "https://maps.google.com/?q=Cana+Vineyard+Guesthouse+Paarl",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80",
  },
];

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
    <section id={id} className={cn("relative px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-serif text-4xl text-[#2D1B5E] sm:text-5xl">{title}</h2>
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
          <div className="font-serif text-3xl text-[#2D1B5E]">{String(value).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#7B6A9C]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D8C4F1]" />
      <span className="text-[#D4AF37] text-xl">✦</span>
      <span className="text-[#D8C4F1] text-2xl">❀</span>
      <span className="text-[#D4AF37] text-xl">✦</span>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D8C4F1]" />
    </div>
  );
}

function GoldDivider() {
  return <div className="mx-auto my-5 h-px w-20 bg-[#D4AF37]" />;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WeddingWebsite() {
  const [introComplete, setIntroComplete] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [songSent, setSongSent] = useState(false);
  const [song, setSong] = useState("");
  const [rsvpForm, setRsvpForm] = useState({
    name: "", email: "", attending: "", attendance: "Joyfully attending",
    meal: "", dietary: "", songRequest: "",
  });

  return (
    <>
      {!introComplete && (
        <EnvelopeIntro onComplete={() => setIntroComplete(true)} />
      )}
    <main className="min-h-screen scroll-smooth">
      <div className="min-h-screen overflow-hidden bg-[#FAF7F2] text-[#2D1B5E]">

        {/* ── Ambient blobs ── */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
          <div className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-[#D8C4F1] blur-3xl" />
          <div className="absolute right-[-8%] top-96 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-[#D8C4F1]/50 blur-3xl" />
        </div>

        {/* ── NAV ── */}
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#D8C4F1]/40 bg-white/70 px-4 py-3 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="#home" className="font-serif text-2xl text-[#2D1B5E] tracking-wide">J & T</a>
            <div className="hidden items-center gap-6 text-sm text-[#2D1B5E] md:flex">
              {[
                ["Journey", "journey"],
                ["Events", "events"],
                ["Dress Code", "dresscode"],
                ["Accommodation", "accommodation"],
                ["RSVP", "rsvp"],
                ["Gallery", "gallery"],
                ["Fund", "fund"],
              ].map(([label, href]) => (
                <a key={href} href={`#${href}`} className="hover:text-[#D4AF37] transition-colors">{label}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setMusicOn(!musicOn)} className="text-[#2D1B5E]">
                {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </Button>
              <Button asChild className="rounded-full bg-[#D4AF37] px-6 text-white hover:bg-[#b8961e]">
                <a href="#rsvp">RSVP</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header
          id="home"
          className="relative z-10 flex min-h-screen items-center justify-center bg-[url('/IMG_7459.JPG')] bg-cover bg-center px-4 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B5E]/55 via-[#2D1B5E]/30 to-[#FAF7F2]" />
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative mx-auto max-w-5xl pt-24"
          >
            <p className="mb-4 text-[#D8C4F1] text-2xl tracking-[0.4em]">❀ ✦ ❀</p>
            <h1 className="font-serif text-7xl leading-none text-white sm:text-8xl lg:text-[9rem]">
              Juan & Taylor
            </h1>
            <GoldDivider />
            <p className="mx-auto max-w-2xl text-lg italic text-white/90 sm:text-xl leading-8">
              Invite you to witness the sacred covenant of marriage<br className="hidden sm:block" />
              and share in the joy of their union.
            </p>

            {/* Venue */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <MapPin size={16} />
                <span className="font-semibold tracking-widest uppercase text-sm">Nantes Estate</span>
              </div>
              <p className="text-white/75 text-sm">Paarl, South Africa</p>
              <a
                href="https://maps.app.goo.gl/yS1cqqnQfjnew8yd6?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/70 bg-[#D4AF37]/10 px-5 py-2 text-sm text-[#D4AF37] backdrop-blur hover:bg-[#D4AF37]/20 transition-colors"
              >
                <MapPin size={13} /> View Location
              </a>
            </div>

            {/* Countdown */}
            <div className="mx-auto mt-8 max-w-sm sm:max-w-md">
              <Countdown />
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-[#D4AF37] px-8 text-white hover:bg-[#b8961e]">
                <a href="#rsvp">Reserve Your Seat</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/70 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20">
                <a href="#events">View Details</a>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/75 text-sm">
              <Calendar size={15} className="text-[#D4AF37]" />
              <span>7 November 2026</span>
            </div>
          </motion.div>
        </header>

        {/* ── OUR JOURNEY ── */}
        <Section id="journey" eyebrow="Our Journey" title="A love written in the stars">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <FloralDivider />
            <blockquote className="mt-6 font-serif text-2xl italic text-[#2D1B5E] sm:text-3xl leading-snug">
              "I have found the one whom my soul loves." 🤍
            </blockquote>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Song of Solomon 3:4</p>
            <FloralDivider />
          </div>
          <div className="columns-2 gap-4 sm:columns-3">
            {journeyPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-4 overflow-hidden rounded-[1.5rem] shadow-xl"
              >
                <img src={src} alt={`Our journey ${i + 1}`} className="h-auto w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── EVENTS ── */}
        <Section id="events" eyebrow="Wedding Day" title="Celebrate every beautiful moment" className="bg-white/50">
          <div className="grid gap-8 md:grid-cols-2">

            {/* Ceremony */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
                <CardContent className="p-8 sm:p-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D8C4F1]/40">
                    <Heart size={24} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Saturday, 7 November 2026</p>
                  <h3 className="mt-2 font-serif text-4xl text-[#2D1B5E]">Ceremony</h3>
                  <GoldDivider />
                  <div className="space-y-3 text-sm leading-7 text-[#5B4D8E]">
                    <p><span className="font-semibold text-[#2D1B5E]">Time:</span> 15:00</p>
                    <p><span className="font-semibold text-[#2D1B5E]">Venue:</span> Nantes Estate, Paarl</p>
                    <p><span className="font-semibold text-[#2D1B5E]">Dress Code:</span> Formal garden elegance — soft pastels & florals welcome</p>
                    <p className="italic text-[#7B6A9C]">Please arrive 30 minutes early. Phones on silent during the ceremony.</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/yS1cqqnQfjnew8yd6?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] py-3 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    <MapPin size={14} /> Open in Google Maps
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reception */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
                <CardContent className="p-8 sm:p-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15">
                    <Sparkles size={24} className="text-[#D4AF37]" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Saturday, 7 November 2026</p>
                  <h3 className="mt-2 font-serif text-4xl text-[#2D1B5E]">Reception</h3>
                  <GoldDivider />
                  <div className="space-y-3 text-sm leading-7 text-[#5B4D8E]">
                    <p><span className="font-semibold text-[#2D1B5E]">Time:</span> 17:30</p>
                    <p><span className="font-semibold text-[#2D1B5E]">Venue:</span> Nantes Estate, Paarl</p>
                    <p><span className="font-semibold text-[#2D1B5E]">Dress Code:</span> Black tie optional — celebrate in style</p>
                    <p className="italic text-[#7B6A9C]">Dinner, dancing, cake, and golden-hour portraits await.</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/yS1cqqnQfjnew8yd6?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] py-3 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    <MapPin size={14} /> Open in Google Maps
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Map preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-[#D8C4F1]/60 shadow-xl"
          >
            <div
              className="flex h-72 items-center justify-center bg-cover bg-center text-center text-white"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80)" }}
            >
              <div className="rounded-3xl bg-[#2D1B5E]/60 p-8 backdrop-blur">
                <MapPin className="mx-auto mb-3 text-[#D4AF37]" size={28} />
                <p className="font-serif text-2xl">Nantes Estate, Paarl</p>
                <a
                  href="https://maps.app.goo.gl/yS1cqqnQfjnew8yd6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-5 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-colors"
                >
                  <MapPin size={13} /> Open Map
                </a>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ── DRESS CODE ── */}
        <Section id="dresscode" eyebrow="Attire" title="Dress Code">
          <div className="grid gap-8 md:grid-cols-2">

            {/* Gentlemen */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full overflow-hidden rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80)" }}
                />
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Formal Attire</p>
                  <h3 className="mt-2 font-serif text-3xl text-[#2D1B5E]">Gentlemen</h3>
                  <div className="my-4 h-px w-16 bg-[#D8C4F1]" />
                  <ul className="space-y-3 text-sm text-[#5B4D8E]">
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> Suit</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> Dress shoes</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> No ties required</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ladies */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="h-full overflow-hidden rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: "url(https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?auto=format&fit=crop&w=800&q=80)" }}
                />
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Elegant Dresses</p>
                  <h3 className="mt-2 font-serif text-3xl text-[#2D1B5E]">Ladies</h3>
                  <div className="my-4 h-px w-16 bg-[#D8C4F1]" />
                  <ul className="space-y-3 text-sm text-[#5B4D8E]">
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> Soft pastel colours</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> Heels encouraged</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37] text-base">✦</span> Wedding-appropriate formal wear</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* ── ACCOMMODATION ── */}
        <Section id="accommodation" eyebrow="Where to Stay" title="Accommodation Nearby" className="bg-white/50">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accommodation.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
                  <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${place.img})` }} />
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg text-[#2D1B5E] leading-snug">{place.name}</h3>
                    <p className="mt-1 text-xs text-[#D4AF37] uppercase tracking-wide">{place.distance}</p>
                    <p className="mt-3 text-sm leading-6 text-[#5B4D8E]">{place.description}</p>
                    <a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] py-2.5 text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      <MapPin size={12} /> View on Map
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Accommodation map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-[#D8C4F1]/60 shadow-xl"
          >
            <div
              className="flex h-64 items-center justify-center bg-cover bg-center text-center text-white"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80)" }}
            >
              <div className="rounded-3xl bg-[#2D1B5E]/60 p-8 backdrop-blur">
                <MapPin className="mx-auto mb-3 text-[#D4AF37]" size={28} />
                <p className="font-serif text-xl">Paarl, Western Cape</p>
                <a
                  href="https://maps.google.com/?q=guesthouses+near+Paarl+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-5 py-2 text-sm text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-colors"
                >
                  Explore Area
                </a>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ── FOOD OPTIONS ── */}
        <Section id="food" eyebrow="Dining" title="Food Options">
          <Card className="mx-auto max-w-3xl rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-2xl backdrop-blur">
            <CardContent className="p-8 sm:p-12">
              <div className="mb-8 text-center">
                <FloralDivider />
                <p className="mt-4 text-sm leading-7 text-[#5B4D8E]">
                  We want to ensure every guest is well taken care of. Please indicate your meal preference and dietary requirements when you RSVP.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#FAF7F2] p-6 border border-[#D8C4F1]/40">
                  <h3 className="font-serif text-2xl text-[#2D1B5E]">Menu</h3>
                  <GoldDivider />
                  <ul className="space-y-3 text-sm text-[#5B4D8E]">
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37]">✦</span> Chicken</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37]">✦</span> Beef</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37]">✦</span> Vegetarian</li>
                    <li className="flex items-center gap-3"><span className="text-[#D4AF37]">✦</span> Vegan</li>
                  </ul>
                </div>
                <div className="rounded-[1.5rem] bg-[#FAF7F2] p-6 border border-[#D8C4F1]/40">
                  <h3 className="font-serif text-2xl text-[#2D1B5E]">Dietary Needs</h3>
                  <GoldDivider />
                  <p className="text-sm leading-7 text-[#5B4D8E]">
                    Please note any allergies or restrictions in your RSVP. We will do our best to accommodate everyone.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Gluten-free", "Dairy-free", "Nut allergy", "Halal", "Kosher"].map((tag) => (
                      <span key={tag} className="rounded-full border border-[#D8C4F1] px-3 py-1 text-xs text-[#7B6A9C]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-xs italic text-[#7B6A9C]">Indicate your preferences in the RSVP form below</p>
            </CardContent>
          </Card>
        </Section>

        {/* ── RSVP ── */}
        <Section id="rsvp" eyebrow="RSVP" title="We saved you a seat" className="bg-white/50">
          <Card className="mx-auto max-w-2xl rounded-[2rem] border-[#D8C4F1]/60 bg-white/85 shadow-2xl backdrop-blur">
            <CardContent className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {rsvpSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <p className="text-5xl">💌</p>
                    <h3 className="mt-4 font-serif text-3xl text-[#2D1B5E]">Thank you!</h3>
                    <p className="mt-3 leading-7 text-[#5B4D8E]">
                      Your RSVP has been received with love. We can't wait to celebrate with you.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="grid gap-4"
                    onSubmit={(e) => { e.preventDefault(); setRsvpSent(true); }}
                  >
                    <input
                      className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                      placeholder="Guest name"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    />
                    <input
                      className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                      type="email"
                      placeholder="Email address"
                      required
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                        type="number"
                        min="1"
                        placeholder="Number attending"
                        value={rsvpForm.attending}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                      />
                      <select
                        className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] transition-colors"
                        value={rsvpForm.attendance}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attendance: e.target.value })}
                      >
                        <option>Joyfully attending</option>
                        <option>Sadly cannot attend</option>
                      </select>
                    </div>
                    <select
                      className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] transition-colors"
                      value={rsvpForm.meal}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, meal: e.target.value })}
                    >
                      <option value="">Meal preference</option>
                      <option>Chicken</option>
                      <option>Beef</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                    </select>
                    <textarea
                      className="min-h-24 resize-none rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                      placeholder="Dietary restrictions or allergies"
                      value={rsvpForm.dietary}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                    />
                    <input
                      className="rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                      placeholder="🎵 Song request for the dance floor"
                      value={rsvpForm.songRequest}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, songRequest: e.target.value })}
                    />
                    <Button className="rounded-full bg-[#D4AF37] py-6 text-white hover:bg-[#b8961e] text-base">
                      Send RSVP ✦
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </Section>

        {/* ── GALLERY ── */}
        <Section id="gallery" eyebrow="Gallery" title="Our Love Story in Pictures">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <FloralDivider />
            <blockquote className="mt-6 font-serif text-2xl italic text-[#2D1B5E] sm:text-3xl leading-snug">
              "I have found the one whom my soul loves." 🤍
            </blockquote>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Song of Solomon 3:4</p>
            <FloralDivider />
          </div>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map((src, index) => (
              <motion.button
                key={src}
                onClick={() => setSelectedImage(src)}
                className="mb-5 block w-full overflow-hidden rounded-[2rem] shadow-xl"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <img src={src} alt={`Gallery ${index + 1}`} className="h-auto w-full object-cover" />
              </motion.button>
            ))}
          </div>
        </Section>

        {/* ── HONEYMOON FUND ── */}
        <Section id="fund" eyebrow="Gift" title="" className="bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <Card className="overflow-hidden rounded-[2rem] border-[#D4AF37]/40 bg-gradient-to-br from-[#2D1B5E] via-[#3D2878] to-[#4A3470] shadow-2xl">
              <CardContent className="p-10 sm:p-14">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                  <div className="text-white">
                    <p className="text-4xl mb-4">✈️ 🤍</p>
                    <h3 className="font-serif text-4xl sm:text-5xl leading-tight">Honeymoon<br />Fund</h3>
                    <div className="my-5 h-px w-20 bg-[#D4AF37]" />
                    <p className="leading-7 text-white/80 italic text-sm sm:text-base">
                      Should you feel led to bless us with a gift, we would be grateful for a contribution towards our dream honeymoon as we begin this new chapter together.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur border border-white/10">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">EFT Details</p>
                      <div className="space-y-2 text-sm text-white/80">
                        <p><span className="text-white font-medium">Account Name:</span> Miss TN Brown</p>
                        <p><span className="text-white font-medium">Bank:</span> Capitec</p>
                        <p><span className="text-white font-medium">Account No:</span> 1654096839</p>
                        <p><span className="text-white font-medium">Reference:</span> Honeymoon</p>
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur border border-white/10 flex items-center justify-center min-h-32">
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">QR Code</p>
                        <div className="mx-auto h-20 w-20 rounded-xl bg-white/20 flex items-center justify-center">
                          <Gift size={30} className="text-[#D4AF37]" />
                        </div>
                        <p className="mt-2 text-xs text-white/50">Placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Section>

        {/* ── SONG REQUESTS ── */}
        <Section id="songs" eyebrow="Playlist" title="Song Requests">
          <Card className="mx-auto max-w-2xl rounded-[2rem] border-[#D8C4F1]/60 bg-white/80 shadow-xl backdrop-blur">
            <CardContent className="p-8 sm:p-12 text-center">
              <Music className="mx-auto mb-5 text-[#D4AF37]" size={34} />
              <p className="mx-auto max-w-md leading-7 text-[#5B4D8E]">
                Help us build the perfect playlist! Suggest a song you'd love to hear on the dance floor.
              </p>
              <AnimatePresence mode="wait">
                {songSent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-2xl bg-[#D8C4F1]/30 p-4 text-[#2D1B5E]"
                  >
                    Thank you for your song suggestion! 🎵
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex gap-3">
                    <input
                      className="flex-1 rounded-2xl border border-[#D8C4F1] bg-white/70 p-4 outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Artist – Song title"
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                    />
                    <Button
                      className="rounded-full bg-[#D4AF37] px-6 text-white hover:bg-[#b8961e]"
                      onClick={() => { if (song.trim()) setSongSent(true); }}
                    >
                      Add
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 bg-[#2D1B5E] px-4 py-16 text-center text-white">
          <p className="text-[#D8C4F1] text-2xl tracking-[0.4em] mb-4">❀ ✦ ❀</p>
          <p className="font-serif text-5xl text-white">Juan & Taylor</p>
          <p className="mt-3 text-[#D4AF37] text-sm uppercase tracking-[0.3em]">7 November 2026</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[#D8C4F1]/80 text-sm">
            <MapPin size={14} className="text-[#D4AF37]" />
            <span>Nantes Estate, Paarl, South Africa</span>
          </div>
          <div className="mt-5">
            <a
              href="mailto:hello@juanandtaylor.co.za"
              className="inline-flex items-center gap-2 text-sm text-[#D8C4F1]/70 hover:text-white transition-colors"
            >
              <Mail size={14} /> Contact Us
            </a>
          </div>
          <div className="mx-auto mt-8 h-px w-32 bg-[#D4AF37]/40" />
          <blockquote className="mx-auto mt-6 max-w-lg font-serif text-xl italic text-[#D8C4F1]">
            "I have found the one whom my soul loves."
          </blockquote>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Song of Solomon 3:4</p>
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
