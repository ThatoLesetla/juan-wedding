import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── phases: "idle" → "opening" → "rising" → "ready" → "exiting" ─────────────
export default function EnvelopeIntro({ onComplete }) {
  const [phase, setPhase] = useState("idle");
  const prefersReduced = useReducedMotion();

  // ── Lock body scroll while intro is active ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Keyboard accessibility ──────────────────────────────────────────────────
  const doOpen = useCallback(() => {
    if (phase !== "idle") return;
    if (prefersReduced) {
      // Respect reduced-motion: skip straight to website
      setPhase("exiting");
      return;
    }
    setPhase("opening");
    setTimeout(() => setPhase("rising"), 700);
    setTimeout(() => setPhase("ready"), 1500);
  }, [phase, prefersReduced]);

  const doExit = useCallback(() => {
    if (phase === "exiting") return;
    setPhase("exiting");
  }, [phase]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        doExit();
      } else if ((e.key === "Enter" || e.key === " ") && phase === "idle") {
        e.preventDefault();
        doOpen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, doOpen, doExit]);

  // ── Derived state ───────────────────────────────────────────────────────────
  const isOpen   = phase !== "idle";
  const cardRisen = phase === "rising" || phase === "ready";

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        onComplete();
      }}
    >
      {phase !== "exiting" && (
        <motion.div
          key="envelope-intro"
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center"
          style={{ background: "linear-gradient(145deg, #FBF8FC 0%, #EFE5F4 48%, #FBF8FC 100%)" }}
          exit={{ opacity: 0, transition: { duration: 0.85, ease: "easeInOut" } }}
        >
          {/* ── Skip button ── */}
          <button
            onClick={doExit}
            className="absolute right-5 top-5 z-10 rounded-full border border-[#DCCAEA] bg-white/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.45em] text-[#76647F] backdrop-blur-sm transition-all hover:border-[#A989B6] hover:text-[#4C3A5F] focus:outline-none focus:ring-2 focus:ring-[#A989B6]"
            aria-label="Skip intro"
          >
            Skip
          </button>

          <div className="flex flex-col items-center px-4">
            {/* ── Eyebrow ── */}
            <motion.p
              className="mb-7 text-center text-[10px] uppercase tracking-[0.7em] text-[#8F6FA0]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
            >
              You are cordially invited
            </motion.p>

            {/* ─────────────────────── ENVELOPE SCENE ─────────────────────── */}
            <motion.div
              className={phase === "idle" ? "relative cursor-pointer" : "relative"}
              style={{
                width: "min(380px, 90vw)",
                height: "min(260px, calc(90vw * 0.684))",
              }}
              initial={{ opacity: 0, y: 44, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.42, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={phase === "idle" ? { y: -5, transition: { duration: 0.3 } } : undefined}
              onClick={phase === "idle" ? doOpen : undefined}
              role={phase === "idle" ? "button" : undefined}
              tabIndex={phase === "idle" ? 0 : undefined}
              onKeyDown={
                phase === "idle"
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        doOpen();
                      }
                    }
                  : undefined
              }
              aria-label={phase === "idle" ? "Open the invitation" : undefined}
            >
              {/* 3-D perspective wrapper */}
              <div
                className="absolute inset-0"
                style={{ perspective: "1200px", perspectiveOrigin: "50% 10%" }}
              >
                {/* ── Envelope back body ── */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(155deg, #8F6FA0 0%, #6F587C 100%)",
                    borderRadius: 6,
                    boxShadow: [
                      "0 36px 80px rgba(76,58,95,0.34)",
                      "0 10px 30px rgba(76,58,95,0.24)",
                      "inset 0 0 0 1.5px rgba(255,255,255,0.18)",
                    ].join(", "),
                  }}
                />

                {/* ── Bottom V – interior darkening ── */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: "55%",
                    background: "linear-gradient(180deg, #6F587C 0%, #4C3A5F 100%)",
                    clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
                    zIndex: 2,
                  }}
                />

                {/* ── Left wing ── */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: "51%",
                    background: "#7F6590",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    zIndex: 3,
                    filter: "brightness(0.9)",
                  }}
                />

                {/* ── Right wing ── */}
                <div
                  className="absolute inset-y-0 right-0"
                  style={{
                    width: "51%",
                    background: "#7F6590",
                    clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                    zIndex: 3,
                    filter: "brightness(0.9)",
                  }}
                />

                {/* ── INVITATION CARD ── */}
                <motion.div
                  className="absolute"
                  style={{
                    top: "28%",
                    left: "50%",
                    x: "-50%",
                    width: "82%",
                    zIndex: 6,
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: phase === "idle" ? 0 : 1,
                    y: cardRisen ? -220 : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.35, delay: phase === "opening" ? 0.2 : 0 },
                    y: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <div
                    className="rounded-lg px-5 py-5 text-center"
                    style={{
                      background: "linear-gradient(170deg, #FFFFFF 0%, #FBF8FC 100%)",
                      border: "1.5px solid rgba(220,202,234,0.9)",
                      boxShadow: [
                        "0 24px 60px rgba(76,58,95,0.22)",
                        "0 6px 20px rgba(169,137,182,0.18)",
                      ].join(", "),
                    }}
                  >
                    <p className="font-serif text-lg text-[#DCCAEA]">❀ ✦ ❀</p>
                    <h2
                      className="mt-1.5 font-serif text-[#4C3A5F]"
                      style={{ fontSize: "clamp(1.1rem, 4vw, 1.75rem)", lineHeight: 1.2 }}
                    >
                      Taylor & Juan's <br></br>Wedding
                    </h2>
                    <div className="mx-auto my-2.5 h-px w-12 bg-[#A989B6]" />
                    <p
                      className="mt-1 text-[#76647F]"
                      style={{ fontSize: "clamp(0.55rem, 1.4vw, 0.65rem)" }}
                    >
                      Nantes Estate · Paarl, South Africa
                    </p>

                    {/* Enter Website button – appears once card is fully risen */}
                    <AnimatePresence>
                      {phase === "ready" && (
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            doExit();
                          }}
                          className="mt-4 w-full rounded-full bg-[#4C3A5F] py-2.5 text-[10px] uppercase tracking-[0.4em] text-white shadow-md transition-all hover:bg-[#6F587C] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A989B6]"
                          aria-label="Enter website"
                        >
                          Enter Website
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* ── TOP FLAP (the one that opens) ── */}
                <motion.div
                  className="absolute inset-x-0 top-0"
                  style={{
                    height: "52%",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformOrigin: "50% 0%",
                    zIndex: 10,
                    background: "linear-gradient(175deg, #BFA9CA 0%, #9F82AE 70%, #7F6590 100%)",
                    willChange: "transform, opacity",
                    filter: "drop-shadow(0 6px 14px rgba(76,58,95,0.24))",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    rotateX: isOpen ? -178 : 0,
                  }}
                  transition={{
                    rotateX: { duration: 0.82, ease: [0.4, 0, 0.15, 1] },
                  }}
                />

                {/* ── WAX SEAL ── */}
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.22 } }}
                      className="pointer-events-none absolute z-[15]"
                      style={{ top: "44%", left: "50%", x: "-50%", y: "-50%" }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                        style={{
                          background: "radial-gradient(circle at 33% 33%, #E7D7EF, #A989B6)",
                          boxShadow: [
                            "0 4px 18px rgba(76,58,95,0.24)",
                            "inset 0 1.5px 3px rgba(255,255,255,0.35)",
                            "inset 0 -1px 2px rgba(0,0,0,0.22)",
                          ].join(", "),
                        }}
                      >
                        <span className="font-serif text-[11px] font-semibold leading-none text-[#4C3A5F]">
                          J&T
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            {/* ── END ENVELOPE SCENE ── */}

            {/* ── "Open Invitation" button (below envelope) ── */}
            <AnimatePresence>
              {phase === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="mt-10 flex flex-col items-center gap-2.5"
                >
                  <motion.button
                    onClick={doOpen}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-full bg-[#4C3A5F] px-10 py-3.5 text-xs uppercase tracking-[0.45em] text-white shadow-xl transition-colors hover:bg-[#6F587C] focus:outline-none focus:ring-2 focus:ring-[#A989B6] focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="Open invitation"
                  >
                    Open Invitation
                  </motion.button>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#8F6FA0]">
                    Press Enter or Space
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
