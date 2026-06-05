import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Music, Gift, Heart, Plane, Users, Mail,
  Download, Moon, Sun, Volume2, VolumeX, X, MessageCircle, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const weddingDate = new Date("2026-11-07T15:00:00");

const cn = (...classes) => classes.filter(Boolean).join(" ");

function useCountdown(targetDate) {
  const [now, setNow] = useState(new Date());
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

const story = [
  { title: "The First Hello", date: "Spring 2021", copy: "Taylor and Juan met through close friends over a relaxed dinner that became an unforgettable evening." },
  { title: "The First Date", date: "Summer 2021", copy: "A quiet garden café, endless conversation, and the kind of laughter that made time disappear." },
  { title: "The Proposal", date: "December 2025", copy: "Juan proposed beneath warm sunset light, surrounded by flowers, music, and the people they love most." },
];

const events = [
  { name: "Welcome Dinner", date: "Friday, 6 November 2026", time: "18:30", venue: "The Conservatory Garden House", dress: "Smart casual in soft neutrals", notes: "A relaxed evening of food, speeches, and meeting both families." },
  { name: "Ceremony", date: "Saturday, 7 November 2026", time: "15:00", venue: "Rosewood Estate Chapel", dress: "Formal garden elegance", notes: "Please arrive 30 minutes early. Phones on silent during the ceremony." },
  { name: "Reception", date: "Saturday, 7 November 2026", time: "17:30", venue: "Rosewood Estate Ballroom", dress: "Black tie optional", notes: "Dinner, dancing, cake, and golden-hour portraits." },
  { name: "After Party", date: "Saturday, 7 November 2026", time: "22:30", venue: "The Champagne Lounge", dress: "Celebrate in style", notes: "Late-night snacks, music, and one last toast to love." },
];

const gallery = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505944357431-27579db47558?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
];

const weddingParty = [
  ["Amelia", "Maid of Honor", "Taylor's sister and lifelong best friend.", 1494790108377],
  ["Sofia", "Bridesmaid", "Planner, hype woman, and queen of details.", 1500648767791],
  ["Mateo", "Best Man", "Juan's brother and official toast master.", 1507003211169],
  ["Andre", "Groomsman", "Friend since university and dance-floor starter.", 1544005313],
];

const initialMessages = [
  { name: "Mia", message: "Wishing you a lifetime of laughter, friendship, and beautiful adventures." },
  { name: "Carlos", message: "So excited to celebrate this incredible love story with you both." },
  { name: "Nora", message: "May your marriage be filled with grace, joy, and endless dancing." },
];

function Section({ id, eyebrow, title, children, className }) {
  return (
    <section id={id} className={cn("relative px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#a0835f]">{eyebrow}</p>
          <h2 className="font-serif text-4xl text-[#35291f] dark:text-[#fff8ef] sm:text-5xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Countdown() {
  const time = useCountdown(weddingDate);
  return (
    <div className="grid grid-cols-4 gap-3 rounded-[2rem] border border-white/40 bg-white/25 p-3 shadow-2xl backdrop-blur-xl">
      {Object.entries(time).map(([label, value]) => (
        <div key={label} className="rounded-3xl bg-white/60 px-3 py-4 text-center dark:bg-white/10">
          <div className="font-serif text-3xl text-[#7d6548] dark:text-[#f4d8b4]">{value}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#635242] dark:text-[#f8ead8]">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function WeddingWebsite() {
  const [dark, setDark] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [guestMessage, setGuestMessage] = useState({ name: "", message: "" });
  const stats = useMemo(() => ({ attending: 86, pending: 21, meals: 64, songs: 38 }), []);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!guestMessage.name || !guestMessage.message) return;
    setMessages([{ ...guestMessage }, ...messages]);
    setGuestMessage({ name: "", message: "" });
  };

  return (
    <main className={cn(dark && "dark", "min-h-screen scroll-smooth")}>
      <div className="min-h-screen overflow-hidden bg-[#fffaf2] text-[#3b3028] transition-colors duration-500 dark:bg-[#17110e] dark:text-[#fff8ef]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
          <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-[#f2cfd5] blur-3xl" />
          <div className="absolute right-[-8%] top-96 h-96 w-96 rounded-full bg-[#c8d6bd] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#ead7b9] blur-3xl" />
        </div>

        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/30 bg-white/55 px-4 py-3 backdrop-blur-2xl dark:bg-[#17110e]/60">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="#home" className="font-serif text-2xl text-[#8b6f4e] dark:text-[#f3d6ad]">T & J</a>
            <div className="hidden items-center gap-6 text-sm md:flex">
              {["Story", "Events", "Travel", "RSVP", "Gallery", "Registry"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#a0835f]">{item}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setMusicOn(!musicOn)}>
                {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Button asChild className="rounded-full bg-[#9c7b55] text-white hover:bg-[#846744]">
                <a href="#rsvp">RSVP</a>
              </Button>
            </div>
          </div>
        </nav>

        <header id="home" className="relative z-10 flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center px-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-[#fffaf2] dark:to-[#17110e]" />
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative mx-auto max-w-5xl pt-24 text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.5em]">Together with their families</p>
            <h1 className="font-serif text-7xl leading-none sm:text-8xl lg:text-9xl">Taylor & Juan</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-2xl">Invite you to celebrate their love story in an unforgettable garden wedding.</p>
            <div className="mx-auto mt-10 max-w-2xl"><Countdown /></div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white px-8 text-[#7d6548] hover:bg-[#fff4de]">
                <a href="#rsvp">Reserve Your Seat</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/70 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20">
                <a href="#events">View Details</a>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-white/90">
              <span className="flex items-center gap-2"><Calendar size={16} /> 7 November 2026</span>
              <span className="flex items-center gap-2"><MapPin size={16} /> Rosewood Estate</span>
            </div>
          </motion.div>
        </header>

        <Section id="story" eyebrow="Our Story" title="A love written in golden light">
          <div className="grid gap-6 md:grid-cols-3">
            {story.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
                <Card className="h-full rounded-[2rem] border-white/60 bg-white/70 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#efe1cc] text-[#8b6f4e] dark:bg-white/10"><Heart size={20} /></div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#a0835f]">{item.date}</p>
                    <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
                    <p className="mt-4 leading-7 text-[#6c5b4d] dark:text-[#eadcc9]">{item.copy}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="events" eyebrow="Wedding Weekend" title="Celebrate every beautiful moment" className="bg-[#f7efe3]/70 dark:bg-white/5">
          <div className="grid gap-6 lg:grid-cols-4">
            {events.map((event) => (
              <Card key={event.name} className="rounded-[2rem] border-white/60 bg-white/75 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
                <CardContent className="p-7">
                  <Sparkles className="mb-5 text-[#a0835f]" size={24} />
                  <h3 className="font-serif text-3xl">{event.name}</h3>
                  <div className="mt-5 space-y-3 text-sm leading-6 text-[#6c5b4d] dark:text-[#eadcc9]">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Dress:</strong> {event.dress}</p>
                    <p>{event.notes}</p>
                  </div>
                  <Button variant="outline" className="mt-6 w-full rounded-full">Open Map</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="travel" eyebrow="Travel & Stay" title="Everything guests need to arrive with ease">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              [Plane, "Arrivals", "Nearest airport: Cape Town International Airport. Shuttle options will be shared closer to the day."],
              [MapPin, "Accommodation", "Recommended hotels include The Garden House, Rosewood Suites, and Ivory Manor."],
              [Calendar, "Guest Tips", "Book early, bring comfortable shoes for garden photos, and leave room for dancing."],
            ].map(([Icon, title, copy]) => (
              <Card key={title} className="rounded-[2rem] border-white/60 bg-white/70 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
                <CardContent className="p-8">
                  <Icon className="mb-5 text-[#a0835f]" />
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-4 leading-7 text-[#6c5b4d] dark:text-[#eadcc9]">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/60 bg-[#d8c7ad] p-4 shadow-xl dark:border-white/10 dark:bg-white/10">
            <div className="flex h-72 items-center justify-center rounded-[1.5rem] bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center text-center text-white">
              <div className="rounded-3xl bg-black/30 p-8 backdrop-blur">
                <MapPin className="mx-auto mb-3" />
                <p className="font-serif text-3xl">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="rsvp" eyebrow="RSVP" title="We saved you a seat" className="bg-[#f7efe3]/70 dark:bg-white/5">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[2rem] border-white/60 bg-white/80 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/10">
              <CardContent className="p-8">
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setRsvpSent(true); }}>
                  <input className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" placeholder="Guest name" required />
                  <input className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" type="email" placeholder="Email address" required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" type="number" min="1" placeholder="Number attending" />
                    <select className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10">
                      <option>Joyfully attending</option>
                      <option>Sadly cannot attend</option>
                    </select>
                  </div>
                  <select className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10">
                    <option>Meal preference</option><option>Chicken</option><option>Beef</option><option>Vegetarian</option><option>Vegan</option>
                  </select>
                  <input className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" placeholder="Song request" />
                  <textarea className="min-h-28 rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" placeholder="Dietary restrictions or notes" />
                  <Button className="rounded-full bg-[#9c7b55] py-6 text-white hover:bg-[#846744]">Send RSVP</Button>
                </form>
                <AnimatePresence>
                  {rsvpSent && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 rounded-2xl bg-[#e8f0df] p-4 text-[#52663f]">Thank you. Your RSVP has been received with love.</motion.div>}
                </AnimatePresence>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-white/60 bg-white/80 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/10">
              <CardContent className="p-8">
                <h3 className="font-serif text-3xl">Admin Preview</h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {Object.entries(stats).map(([label, value]) => (
                    <div key={label} className="rounded-3xl bg-[#fff5e8] p-5 dark:bg-white/10">
                      <p className="font-serif text-3xl text-[#8b6f4e] dark:text-[#f3d6ad]">{value}</p>
                      <p className="text-xs uppercase tracking-[0.25em]">{label}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-6 w-full rounded-full"><Download size={16} className="mr-2" /> Export CSV</Button>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="gallery" eyebrow="Gallery" title="A glimpse of forever">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map((src, index) => (
              <motion.button key={src} onClick={() => setSelectedImage(src)} className="mb-5 block overflow-hidden rounded-[2rem] shadow-xl" whileHover={{ scale: 1.02 }}>
                <img src={src} alt={`Wedding gallery ${index + 1}`} className="h-auto w-full object-cover" />
              </motion.button>
            ))}
          </div>
        </Section>

        <Section id="playlist" eyebrow="Playlist" title="Songs that define our love story" className="bg-[#f7efe3]/70 dark:bg-white/5">
          <Card className="mx-auto max-w-3xl rounded-[2rem] border-white/60 bg-white/75 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
            <CardContent className="p-8 text-center">
              <Music className="mx-auto mb-5 text-[#a0835f]" size={34} />
              <h3 className="font-serif text-3xl">Spotify Playlist</h3>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6c5b4d] dark:text-[#eadcc9]">Replace the embed below with your own Spotify playlist URL.</p>
              <div className="mt-8 rounded-3xl bg-[#191414] p-6 text-left text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Now playing</p>
                <p className="mt-2 font-serif text-3xl">Golden Hour Forever</p>
                <div className="mt-5 h-2 rounded-full bg-white/20"><div className="h-2 w-2/3 rounded-full bg-white" /></div>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="registry" eyebrow="Registry" title="Your presence is the greatest gift">
          <div className="grid gap-6 md:grid-cols-3">
            {[[Gift, "Gift Registry"], [Plane, "Honeymoon Fund"], [Heart, "Cash Fund"]].map(([Icon, title]) => (
              <Card key={title} className="rounded-[2rem] border-white/60 bg-white/70 text-center shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
                <CardContent className="p-8">
                  <Icon className="mx-auto mb-5 text-[#a0835f]" size={32} />
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-4 leading-7 text-[#6c5b4d] dark:text-[#eadcc9]">Add your preferred external link or payment details here.</p>
                  <Button variant="outline" className="mt-6 rounded-full">View Option</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="messages" eyebrow="Guestbook" title="Leave a message for the couple" className="bg-[#f7efe3]/70 dark:bg-white/5">
          <form onSubmit={submitMessage} className="mx-auto mb-10 grid max-w-3xl gap-4 rounded-[2rem] bg-white/75 p-6 shadow-xl backdrop-blur dark:bg-white/10">
            <input value={guestMessage.name} onChange={(e) => setGuestMessage({ ...guestMessage, name: e.target.value })} className="rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" placeholder="Your name" />
            <textarea value={guestMessage.message} onChange={(e) => setGuestMessage({ ...guestMessage, message: e.target.value })} className="min-h-24 rounded-2xl border bg-white/70 p-4 outline-none dark:bg-white/10" placeholder="Write a heartfelt note" />
            <Button className="rounded-full bg-[#9c7b55] text-white hover:bg-[#846744]"><MessageCircle size={16} className="mr-2" /> Add Message</Button>
          </form>
          <div className="grid gap-5 md:grid-cols-3">
            {messages.map((msg, index) => (
              <motion.div key={`${msg.name}-${index}`} initial={{ rotate: index % 2 ? 2 : -2, opacity: 0 }} whileInView={{ rotate: index % 2 ? 1 : -1, opacity: 1 }} viewport={{ once: true }} className="rounded-[1.5rem] bg-white p-6 shadow-xl dark:bg-white/10">
                <p className="font-serif text-2xl">{msg.name}</p>
                <p className="mt-4 leading-7 text-[#6c5b4d] dark:text-[#eadcc9]">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="party" eyebrow="Wedding Party" title="The people standing beside us">
          <div className="grid gap-6 md:grid-cols-4">
            {weddingParty.map(([name, role, bio, imgId], index) => (
              <Card key={name} className="overflow-hidden rounded-[2rem] border-white/60 bg-white/70 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=600&q=80)` }} />
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 text-[#a0835f]" />
                  <h3 className="font-serif text-2xl">{name}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#a0835f]">{role}</p>
                  <p className="mt-3 text-sm leading-6 text-[#6c5b4d] dark:text-[#eadcc9]">{bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <footer className="relative z-10 bg-[#2f241d] px-4 py-16 text-center text-[#fff8ef]">
          <p className="font-serif text-5xl">Taylor & Juan</p>
          <p className="mt-4 text-[#e6d2b9]">#TaylorAndJuanForever</p>
          <div className="mt-6 flex justify-center gap-4 text-sm">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">TikTok</a>
            <a href="mailto:hello@taylorandjuan.com" className="inline-flex items-center gap-2 hover:text-white"><Mail size={14} /> Contact</a>
          </div>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl text-[#e6d2b9]">"To love and be loved is to feel the sun from both sides."</p>
        </footer>

        <AnimatePresence>
          {selectedImage && (
            <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}>
              <button className="absolute right-6 top-6 rounded-full bg-white p-3 text-black"><X size={20} /></button>
              <motion.img src={selectedImage} alt="Selected" className="max-h-[85vh] rounded-[2rem] object-contain shadow-2xl" initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
