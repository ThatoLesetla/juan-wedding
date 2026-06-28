import React, { useState } from "react";
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

const accommodation = [
  {
    name: "Nantes Vue Guest House",
    description: "A simple, convenient guesthouse close to the celebration for guests who would like to stay nearby.",
    distance: "2 min from venue",
    tier: "Most budget-friendly",
    mapUrl: "https://maps.google.com/?q=Nantes+Vue+Guest+House+Paarl",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Under Oaks Guesthouse",
    description: "Comfortable vineyard accommodation with a peaceful setting and easy access to Nantes Estate.",
    distance: "5 min from venue",
    tier: "Budget-friendly",
    mapUrl: "https://maps.google.com/?q=Under+Oaks+Guesthouse+Paarl",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Zonnevanger Venue & Guesthouse",
    description: "A warm guesthouse option surrounded by gardens, ideal for a relaxed wedding-weekend stay.",
    distance: "8 min from venue",
    tier: "Moderate",
    mapUrl: "https://maps.google.com/?q=Zonnevanger+Venue+and+Guesthouse+Paarl",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Cana Vineyard Guesthouse",
    description: "A refined vineyard guesthouse for guests who prefer a more romantic and spacious stay.",
    distance: "10 min from venue",
    tier: "Refined stay",
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
  const [rsvpForm, setRsvpForm] = useState({
    name: "", email: "", attending: "", attendance: "Joyfully attending",
    meal: "", dietary: "",
  });

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
                    <p><span className="font-semibold text-[#4C3A5F]">Ceremony time:</span> TBC — we will confirm soon</p>
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
        <Section id="dresscode" eyebrow="Dress Code" title="With soft pastel elegance">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              ["Men", "Formal suit with dress shoes. Ties are optional."],
              ["Women", "Elegant dresses in soft pastel tones with heels."],
            ].map(([label, text], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-lg backdrop-blur">
                  <CardContent className="p-8">
                    <Sparkles size={24} className="mb-5 text-[#A989B6]" />
                    <h3 className="font-serif text-3xl text-[#4C3A5F]">{label}</h3>
                    <div className="my-4 h-px w-16 bg-[#DCCAEA]" />
                    <p className="text-sm leading-7 text-[#66536F]">{text}</p>
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
                    <p className="mt-3 text-sm leading-6 text-[#66536F]">{place.description}</p>
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

        {/* ── FOOD OPTIONS ── */}
        <Section id="food" eyebrow="Dining" title="Food Options">
          <Card className="mx-auto max-w-3xl rounded-[1.5rem] border-[#DCCAEA]/70 bg-white/85 shadow-xl backdrop-blur">
            <CardContent className="p-8 sm:p-12">
              <div className="mb-8 text-center">
                <FloralDivider />
                <p className="mt-4 text-sm leading-7 text-[#66536F]">
                  We would love for every guest to be comfortably cared for. Kindly share your meal preference and any dietary requirements when you RSVP.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-[#FBF8FC] p-6 border border-[#DCCAEA]/50">
                  <h3 className="font-serif text-2xl text-[#4C3A5F]">Menu</h3>
                  <GoldDivider />
                  <ul className="space-y-3 text-sm text-[#66536F]">
                    <li className="flex items-center gap-3"><span className="text-[#A989B6]">✦</span> Chicken</li>
                    <li className="flex items-center gap-3"><span className="text-[#A989B6]">✦</span> Beef</li>
                    <li className="flex items-center gap-3"><span className="text-[#A989B6]">✦</span> Vegetarian</li>
                    <li className="flex items-center gap-3"><span className="text-[#A989B6]">✦</span> Vegan</li>
                  </ul>
                </div>
                <div className="rounded-[1.25rem] bg-[#FBF8FC] p-6 border border-[#DCCAEA]/50">
                  <h3 className="font-serif text-2xl text-[#4C3A5F]">Dietary Needs</h3>
                  <GoldDivider />
                  <p className="text-sm leading-7 text-[#66536F]">
                    Please note any allergies or restrictions in your RSVP. We will do our best to accommodate everyone.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Gluten-free", "Dairy-free", "Nut allergy", "Halal", "Kosher"].map((tag) => (
                      <span key={tag} className="rounded-full border border-[#DCCAEA] px-3 py-1 text-xs text-[#76647F]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-xs italic text-[#76647F]">Please indicate your preferences in the RSVP form below.</p>
            </CardContent>
          </Card>
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
                      Your RSVP has been received with love. We cannot wait to celebrate with you.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="grid gap-4"
                    onSubmit={(e) => { e.preventDefault(); setRsvpSent(true); }}
                  >
                    <input
                      className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                      placeholder="Guest name"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    />
                    <input
                      className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                      type="email"
                      placeholder="Email address"
                      required
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                        type="number"
                        min="1"
                        placeholder="Number attending"
                        value={rsvpForm.attending}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                      />
                      <select
                        className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] transition-colors"
                        value={rsvpForm.attendance}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attendance: e.target.value })}
                      >
                        <option>Joyfully attending</option>
                        <option>Sadly cannot attend</option>
                      </select>
                    </div>
                    <select
                      className="rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] transition-colors"
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
                      className="min-h-24 resize-none rounded-2xl border border-[#DCCAEA] bg-white/70 p-4 outline-none focus:border-[#A989B6] focus:ring-1 focus:ring-[#A989B6] transition-colors"
                      placeholder="Dietary restrictions or allergies"
                      value={rsvpForm.dietary}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                    />
                    <Button className="rounded-full bg-[#A989B6] py-6 text-white hover:bg-[#9578A5] text-base">
                      Send RSVP ✦
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
            <Card className="overflow-hidden rounded-[1.5rem] border-[#DCCAEA]/50 bg-gradient-to-br from-[#4C3A5F] via-[#6F587C] to-[#A989B6] shadow-xl">
              <CardContent className="p-10 sm:p-14">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                  <div className="text-white">
                    <Gift className="mb-5 text-[#F1E5F5]" size={38} />
                    <h3 className="font-serif text-4xl sm:text-5xl leading-tight">With grateful hearts</h3>
                    <div className="my-5 h-px w-20 bg-[#E7D7EF]" />
                    <p className="leading-7 text-white/80 italic text-sm sm:text-base">
                      Should you wish to bless us with a gift, a contribution towards our honeymoon would be received with deep gratitude as we begin this new chapter together.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur border border-white/10">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#F1E5F5] mb-3">EFT Details</p>
                      <div className="space-y-2 text-sm text-white/80">
                        <p><span className="text-white font-medium">Account Name:</span> Miss TN Brown</p>
                        <p><span className="text-white font-medium">Bank:</span> Capitec</p>
                        <p><span className="text-white font-medium">Account No:</span> 1654096839</p>
                        <p><span className="text-white font-medium">Reference:</span> Honeymoon</p>
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur border border-white/10">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#F1E5F5] mb-3">Quick Payment</p>
                      <p className="text-sm leading-6 text-white/80">
                        A QR code or secure payment link can be added here once the final payment option is supplied.
                      </p>
                      <a
                        href="mailto:hello@juanandtaylor.co.za?subject=Honeymoon%20fund%20payment%20details"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/45 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
                      >
                        Request payment link
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
