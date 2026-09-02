"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Check,
  Download,
  Lock,
  MousePointer2,
  Sparkles,
  Type,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#181818]">
      {/* ─────────────────────────────────────────
          NAVIGATION
      ───────────────────────────────────────── */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-8 lg:px-10">
          <nav className="flex h-14 items-center justify-between rounded-full border border-black/[0.07] bg-[#f7f7f5]/80 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-5">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-tighter"
            >
              Captured.
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              <a
                href="#about"
                className="text-[13px] text-black/45 transition-colors hover:text-black"
              >
                About
              </a>

              <a
                href="#how-it-works"
                className="text-[13px] text-black/45 transition-colors hover:text-black"
              >
                How it works
              </a>

              <a
                href="#privacy"
                className="text-[13px] text-black/45 transition-colors hover:text-black"
              >
                Privacy
              </a>
            </div>

            <Link href="/capture">
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-full bg-[#181818] px-4 py-2 text-[12px] font-medium text-white"
              >
                Open booth
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}

      <section className="relative min-h-[100svh] overflow-hidden px-5 pt-32 sm:px-8 lg:px-10">
        {/* subtle vertical guide */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px bg-black/[0.035] lg:block" />

        <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center gap-16 pb-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          {/* Left */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-[11px] font-medium uppercase tracking-[0.18em] text-black/35"
            >
              3... 2... 1... Smile! · 01
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-4xl md:text-[7rem] font-semibold leading-[0.86] tracking-[-0.075em]"
            >
              Keep
              <br />
              the moment{" "}
              <span className="relative">
                captured.
                <span className="bg-[#171717] w-full h-1 md:h-2 absolute bottom-0 left-0 rotate-2" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-9 max-w-md text-[16px] leading-7 tracking-[-0.01em] text-black/48 sm:text-[17px]"
            >
              Three photos, your style, one strip. Captured turns your browser
              into a tiny photobooth — no app, no account, no upload.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-9 flex items-center gap-5"
            >
              <Link href="/capture">
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full bg-[#181818] px-6 py-3.5 text-[13px] font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                >
                  <Camera className="h-4 w-4" />
                  Start capturing
                </motion.div>
              </Link>

              <a
                href="#how-it-works"
                className="hidden items-center gap-2 text-[13px] font-medium text-black/45 transition-colors hover:text-black sm:flex"
              >
                See how it works
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Photo strip */}
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-[min(72vw,310px)]"
          >
            {/* shadow */}
            <div className="absolute -inset-5 rounded-[2rem] bg-black/[0.08] blur-3xl" />

            <div className="relative bg-[#fffdf8] p-3 pb-7 shadow-[0_25px_70px_rgba(0,0,0,0.15)]">
              <Photo image="one" />
              <Photo image="two" />
              <Photo image="three" />

              <div className="pt-4 text-center">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-black/40">
                  captured · 2026
                </p>
              </div>
            </div>

            {/* little physical detail */}
            <div className="absolute -right-8 bottom-12 hidden rotate-90 text-[8px] uppercase tracking-[0.3em] text-black/25 sm:block">
              THREE FRAMES
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black/25 lg:flex">
          <ArrowDown className="h-3 w-3" />
          Scroll to explore
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT
      ───────────────────────────────────────── */}

      <section
        id="about"
        className="scroll-mt-24 border-t border-black/[0.07] bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.42fr_1fr] lg:gap-28">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/30">
                02 · About
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-[clamp(2.7rem,5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                The feeling of a photobooth, without having to find one.
              </h2>

              <div className="mt-12 grid gap-10 border-t border-black/[0.07] pt-10 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Made for the moment.</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-black/45">
                    Captured is deliberately simple. Open it with your friends,
                    take three pictures, make a strip, and move on with your
                    day.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Nothing to maintain.</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-black/45">
                    The entire experience runs in your browser. Your camera,
                    your photos, and your finished strip stay on your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TUTORIAL / HOW IT WORKS
      ───────────────────────────────────────── */}

      <section id="how-it-works" className="scroll-mt-24 bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
          <div className="flex flex-col justify-between gap-8 border-b border-black/[0.07] pb-12 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/30">
                03 · How it works
              </p>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Three steps.
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-6 text-black/40">
              Nothing complicated. The whole experience takes about a minute.
            </p>
          </div>

          <div className="divide-y divide-black/[0.07]">
            <TutorialStep
              number="01"
              icon={<Camera className="h-5 w-5" />}
              title="Step into the booth"
              description="Open Captured and give your browser permission to use your camera. Nothing is uploaded."
              detail="Choose your filter before you start."
            />

            <TutorialStep
              number="02"
              icon={<MousePointer2 className="h-5 w-5" />}
              title="Strike three poses"
              description="The countdown gives you a moment to get ready before each shot. Three photos become one strip."
              detail="3 · 2 · 1 · flash."
            />

            <TutorialStep
              number="03"
              icon={<Sparkles className="h-5 w-5" />}
              title="Make it yours"
              description="Choose your paper, add a message, pick your typeface, and adjust the style."
              detail="Normal · Bold · Italic · Your choice."
            />

            <TutorialStep
              number="04"
              icon={<Download className="h-5 w-5" />}
              title="Take the memory"
              description="Your strip is rendered locally and downloaded directly to your device as an image."
              detail="No upload. No waiting."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CUSTOMIZATION
      ───────────────────────────────────────── */}

      <section className="overflow-hidden bg-[#181818] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
          <div className="grid items-center gap-20 lg:grid-cols-[0.8fr_1fr] lg:gap-28">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
                04 · Your strip
              </p>

              <h2 className="mt-5 max-w-xl text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.065em]">
                Small details make it yours.
              </h2>

              <p className="mt-8 max-w-md text-[16px] leading-7 text-white/45">
                The photo is only half of the memory. Choose how the final strip
                feels.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-12 rounded-full bg-white/[0.03] blur-3xl" />

              <div className="relative bg-[#fffdf8] p-3 pb-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
                <div className="grid grid-cols-2 gap-1">
                  <div className="aspect-square bg-[#d7d2c8]" />
                  <div className="aspect-square bg-[#b8b3ac]" />
                  <div className="aspect-square bg-[#c6c0b5]" />
                  <div className="aspect-square bg-[#aaa59e]" />
                </div>

                <div className="px-2 pt-7">
                  <p className="text-center font-serif text-xl italic">
                    best nights
                  </p>

                  <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.3em] text-black/35">
                    captured · 09.02.26
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid border-t border-white/[0.1] sm:grid-cols-3">
            <CustomizationItem
              icon={<Sparkles className="h-4 w-4" />}
              title="Five filters"
              text="From clean and natural to nostalgic and monochrome."
            />

            <CustomizationItem
              icon={<Type className="h-4 w-4" />}
              title="Your words"
              text="Add a message to the bottom of your strip."
            />

            <CustomizationItem
              icon={<Check className="h-4 w-4" />}
              title="Your style"
              text="Choose the typeface, weight, and italic treatment."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          PRIVACY
      ───────────────────────────────────────── */}

      <section id="privacy" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.42fr_1fr] lg:gap-28">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f7f5]">
                <Lock className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </div>

              <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.18em] text-black/30">
                05 · Privacy
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                Your face shouldn't need a server.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-black/45">
                Captured was designed to be completely client-side. Your camera
                feed is processed by your browser, and your photos are used to
                create the strip right on your device.
              </p>

              <div className="mt-14 border-y border-black/[0.07]">
                <PrivacyRow
                  title="No photo uploads"
                  text="Your captured photos don't need to leave your device."
                />

                <PrivacyRow
                  title="No accounts"
                  text="There is nothing to register and nothing to remember."
                />

                <PrivacyRow
                  title="No photo library"
                  text="Captured doesn't maintain a server-side collection of your photos."
                />

                <PrivacyRow
                  title="Local generation"
                  text="The final strip is generated in your browser before you download it."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────── */}

      <section className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-7xl px-5 py-28 text-center sm:px-8 lg:px-10 lg:py-40">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/30">
            06 · Make one
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
            Ready when
            <br />
            you are.
          </h2>

          <Link href="/capture">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full bg-[#181818] px-7 py-4 text-[13px] font-medium text-white shadow-[0_15px_40px_rgba(0,0,0,0.13)]"
            >
              <Camera className="h-4 w-4" />
              Open Captured
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────── */}

      <footer className="border-t border-black/[0.07] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-7 text-[11px] text-black/35 sm:flex-row sm:px-8 lg:px-10">
          <p>Captured. © 2026</p>

          <p>Three moments. One strip.</p>

          <p>Developed by Limuel Camangon</p>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────────────
   PHOTO STRIP
───────────────────────────────────────────── */

function Photo({ image }: { image: string }) {
  const backgrounds = {
    one: "bg-[#c9c3ba]",
    two: "bg-[#b3ada5]",
    three: "bg-[#d1cbc2]",
  };

  return (
    <div
      className={`relative mb-1 aspect-[4/3] overflow-hidden ${
        backgrounds[image as keyof typeof backgrounds]
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />

      <div className="absolute bottom-3 left-3 text-[8px] uppercase tracking-[0.2em] text-white/60">
        photo
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TUTORIAL
───────────────────────────────────────────── */

function TutorialStep({
  number,
  icon,
  title,
  description,
  detail,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="grid gap-7 py-10 sm:grid-cols-[70px_50px_1fr_auto] sm:items-start">
      <span className="font-mono text-[10px] text-black/25">{number}</span>

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08]">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-medium tracking-[-0.02em]">{title}</h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
          {description}
        </p>
      </div>

      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/25 sm:text-right">
        {detail}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CUSTOMIZATION
───────────────────────────────────────────── */

function CustomizationItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-white/[0.1] py-7 sm:border-b-0 sm:border-r sm:px-7 first:sm:pl-0 last:sm:border-r-0">
      <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] text-white/70">
        {icon}
      </div>

      <h3 className="text-sm font-medium">{title}</h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">{text}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRIVACY
───────────────────────────────────────────── */

function PrivacyRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid gap-2 border-b border-black/[0.07] py-6 last:border-b-0 sm:grid-cols-[0.4fr_1fr]">
      <p className="text-sm font-medium">{title}</p>

      <p className="text-sm leading-6 text-black/40">{text}</p>
    </div>
  );
}
