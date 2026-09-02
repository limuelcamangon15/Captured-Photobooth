"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera as CameraIcon,
  Check,
  RotateCcw,
  Type,
} from "lucide-react";

const filters = [
  {
    name: "Natural",
    value: "none",
  },
  {
    name: "Mono",
    value: "grayscale(1)",
  },
  {
    name: "Warm",
    value: "sepia(0.25) saturate(1.2) brightness(1.05)",
  },
  {
    name: "Cool",
    value: "saturate(0.85) hue-rotate(10deg)",
  },
  {
    name: "Fade",
    value: "contrast(0.85) saturate(0.75) brightness(1.08)",
  },
];

const papers = [
  {
    name: "White",
    value: "bg-white",
  },
  {
    name: "Warm",
    value: "bg-[#f0ede5]",
  },
  {
    name: "Black",
    value: "bg-[#171717]",
  },
];

const borders = [
  {
    name: "Clean",
    value: "p-3",
  },
  {
    name: "Classic",
    value: "p-5",
  },
  {
    name: "Wide",
    value: "p-7",
  },
];

const fonts = [
  {
    name: "Sans",
    className: "font-sans",
  },
  {
    name: "Serif",
    className: "font-serif",
  },
  {
    name: "Mono",
    className: "font-mono",
  },
  {
    name: "Cursive",
    className: "font-cursive",
  },
];

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraError, setCameraError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Natural");

  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);

  const [isCapturing, setIsCapturing] = useState(false);

  const [showStrip, setShowStrip] = useState(false);

  // Customization
  const [selectedPaper, setSelectedPaper] = useState("White");

  const [selectedBorder, setSelectedBorder] = useState("Clean");

  const [message, setMessage] = useState("");

  const [selectedFont, setSelectedFont] = useState("Sans");

  const [isBold, setIsBold] = useState(false);

  const [isItalic, setIsItalic] = useState(false);

  const dateToday = new Date().toLocaleDateString("en-PH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  /*
   * -----------------------------------------
   * CAMERA
   * -----------------------------------------
   */

  async function startCamera() {
    try {
      setCameraError(false);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(true);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  /*
   * Start camera when capture screen is active.
   * Stop camera when viewing the strip.
   *
   * This is the important fix for the retake problem.
   */
  useEffect(() => {
    if (!showStrip) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showStrip]);

  /*
   * -----------------------------------------
   * FILTER
   * -----------------------------------------
   */

  const activeFilter = filters.find((filter) => filter.name === selectedFilter);

  /*
   * -----------------------------------------
   * CAPTURE PHOTO
   * -----------------------------------------
   */

  async function capturePhoto() {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    // Mirror the captured image.
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    // Apply selected filter.
    context.filter = activeFilter?.value ?? "none";

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg", 0.9);

    setPhotos((currentPhotos) => [...currentPhotos, image]);
  }

  /*
   * -----------------------------------------
   * CAPTURE SEQUENCE
   * -----------------------------------------
   */

  async function startCapture() {
    if (isCapturing) return;
    if (photos.length >= 3) return;

    setIsCapturing(true);

    for (let i = 3; i > 0; i--) {
      setCountdown(i);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setCountdown(null);

    await capturePhoto();

    setIsCapturing(false);
  }

  /*
   * -----------------------------------------
   * RETAKE
   * -----------------------------------------
   */

  function resetPhotos() {
    setPhotos([]);
    setShowStrip(false);
    setCountdown(null);
    setIsCapturing(false);
  }

  /*
   * -----------------------------------------
   * STRIP
   * -----------------------------------------
   */

  function createStrip() {
    if (photos.length !== 3) return;

    setShowStrip(true);
  }

  /*
   * -----------------------------------------
   * STRIP STYLING
   * -----------------------------------------
   */

  const activePaper = papers.find((paper) => paper.name === selectedPaper);

  const activeBorder = borders.find((border) => border.name === selectedBorder);

  const activeFont = fonts.find((font) => font.name === selectedFont);

  /*
   * -----------------------------------------
   * DOWNLOAD STRIP
   * -----------------------------------------
   */

  async function downloadStrip() {
    if (photos.length !== 3) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // -------------------------
    // CANVAS SETTINGS
    // -------------------------

    const width = 600;
    const spacing = 16;
    const padding = 32;
    const textArea = 100;

    // -------------------------
    // BORDER
    // -------------------------

    let borderSize = 0;

    if (selectedBorder === "Classic") {
      borderSize = 24;
    }

    if (selectedBorder === "Wide") {
      borderSize = 40;
    }

    // -------------------------
    // LOAD PHOTOS
    // -------------------------

    const images = await Promise.all(
      photos.map((photo) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();

          image.onload = () => resolve(image);
          image.onerror = reject;

          image.src = photo;
        });
      })
    );

    // -------------------------
    // PHOTO SIZE
    // -------------------------

    const photoWidth = width - (padding + borderSize) * 2;

    const imageRatio = images[0].width / images[0].height;

    const photoHeight = photoWidth / imageRatio;

    // -------------------------
    // CANVAS SIZE
    // -------------------------

    const height = padding + photoHeight * 3 + spacing * 2 + textArea + padding;

    canvas.width = width;
    canvas.height = height;

    // -------------------------
    // PAPER COLOR
    // -------------------------

    let paperColor = "#ffffff";

    if (selectedPaper === "Warm") {
      paperColor = "#f4eee2";
    }

    if (selectedPaper === "Black") {
      paperColor = "#111111";
    }

    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, width, height);

    // -------------------------
    // DRAW PHOTOS
    // -------------------------

    images.forEach((image, index) => {
      const y = padding + index * (photoHeight + spacing);

      ctx.drawImage(image, padding + borderSize, y, photoWidth, photoHeight);
    });

    // -------------------------
    // WAIT FOR FONTS
    // -------------------------

    await document.fonts.ready;

    // -------------------------
    // FONT
    // -------------------------

    let fontFamily = "Arial";
    let fontSize = 32;

    if (selectedFont === "Serif") {
      fontFamily = "Georgia";
    }

    if (selectedFont === "Mono") {
      fontFamily = "monospace";
    }

    if (selectedFont === "Cursive") {
      fontFamily = "Dancing Script";
      fontSize = 42;
    }

    // -------------------------
    // FONT STYLE
    // -------------------------

    let fontStyle = "";

    if (isItalic) {
      fontStyle += "italic ";
    }

    if (isBold) {
      fontStyle += "bold ";
    }

    ctx.font = `${fontStyle}${fontSize}px ${fontFamily}`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // -------------------------
    // MESSAGE
    // -------------------------

    ctx.fillStyle =
      selectedPaper === "Black" ? "rgba(255, 255, 255)" : "rgba(17, 17, 17)";
    ctx.fillText(message || " ", width / 2, height - padding - textArea / 2);

    // -------------------------
    // WATERMARK
    // -------------------------

    ctx.font = "16px Arial";
    ctx.fillStyle =
      selectedPaper === "Black"
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(17, 17, 17, 0.6)";
    ctx.fillText(
      "Made with Captured · " + dateToday,
      width / 2,
      height - textArea / 2 + 8
    );

    // -------------------------
    // DOWNLOAD
    // -------------------------

    const link = document.createElement("a");

    link.download = "captured.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  }

  /*
   * -----------------------------------------
   * STRIP SCREEN
   * -----------------------------------------
   */

  if (showStrip) {
    return (
      <main className="min-h-screen bg-[#f5f5f2] text-[#111111]">
        {/* Header */}
        <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="text-lg font-semibold tracking-[-0.04em]">
            Captured.
          </span>

          <button
            type="button"
            onClick={resetPhotos}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </header>

        <section className="min-h-screen px-6 py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_360px]">
            {/* Preview */}
            <div className="flex items-center justify-center">
              <div
                className={`w-[240px] shadow-[0_25px_70px_rgba(0,0,0,0.14)] transition-all ${activePaper?.value} ${activeBorder?.value}`}
              >
                <div className="space-y-2">
                  {photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Captured photo ${index + 1}`}
                      className="block aspect-[4/3] w-full object-cover"
                    />
                  ))}
                </div>

                <div
                  className={`px-2 pb-3 pt-5 text-center ${
                    selectedPaper === "Black" ? "text-white" : "text-black"
                  }`}
                >
                  <p
                    className={`${
                      selectedFont === "Cursive" ? "text-base" : "text-xs"
                    } ${activeFont?.className} ${
                      isBold ? "font-bold" : "font-normal"
                    } ${isItalic ? "italic" : ""}`}
                  >
                    {message || " "}
                  </p>

                  <p className={`text-[7px] tracking-tighter opacity-50`}>
                    Made with Captured · {dateToday}
                  </p>
                </div>
              </div>
            </div>

            {/* Customization */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/35">
                Customize
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">
                Make it yours.
              </h1>

              <p className="mt-4 text-sm leading-6 text-black/45">
                Choose how your memory should look before you take it home.
              </p>

              {/* Paper */}
              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold">Paper</span>

                  <span className="text-xs text-black/35">{selectedPaper}</span>
                </div>

                <div className="flex gap-2">
                  {papers.map((paper) => {
                    const isSelected = selectedPaper === paper.name;

                    return (
                      <button
                        key={paper.name}
                        type="button"
                        onClick={() => setSelectedPaper(paper.name)}
                        className={`h-12 flex-1 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/55 hover:border-black/25"
                        }`}
                      >
                        {paper.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Border */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold">Border</span>

                  <span className="text-xs text-black/35">
                    {selectedBorder}
                  </span>
                </div>

                <div className="flex gap-2">
                  {borders.map((border) => {
                    const isSelected = selectedBorder === border.name;

                    return (
                      <button
                        key={border.name}
                        type="button"
                        onClick={() => setSelectedBorder(border.name)}
                        className={`h-12 flex-1 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/55 hover:border-black/25"
                        }`}
                      >
                        {border.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="mt-7">
                <div className="mb-3 flex items-center gap-2">
                  <Type className="h-3.5 w-3.5" strokeWidth={1.8} />

                  <span className="text-xs font-semibold">Message</span>
                </div>

                <input
                  type="text"
                  value={message}
                  maxLength={28}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write something..."
                  className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none transition-colors placeholder:text-black/25 focus:border-black/30"
                />
              </div>

              {/* Font */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold">Font</span>

                  <span className="text-xs text-black/35">{selectedFont}</span>
                </div>

                <div className="flex gap-2">
                  {fonts.map((font) => {
                    const isSelected = selectedFont === font.name;

                    return (
                      <button
                        key={font.name}
                        type="button"
                        onClick={() => setSelectedFont(font.name)}
                        className={`h-12 flex-1 rounded-xl border text-sm transition-all ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/55 hover:border-black/25"
                        } ${font.className}`}
                      >
                        {font.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text style */}
              <div className="mt-7">
                <span className="mb-3 block text-xs font-semibold">Style</span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBold((value) => !value)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold transition-all ${
                      isBold
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    B
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsItalic((value) => !value)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm italic transition-all ${
                      isItalic
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    I
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 border-t border-black/10 pt-6">
                <button
                  onClick={downloadStrip}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#111111] px-6 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.01] active:scale-[0.98]"
                >
                  Download strip
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={resetPhotos}
                  className="mx-auto mt-4 flex items-center gap-2 text-xs font-medium text-black/40 transition-colors hover:text-black"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Retake photos
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * -----------------------------------------
   * CAMERA SCREEN
   * -----------------------------------------
   */

  const photoCount = photos.length;

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#111111]">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="text-lg font-semibold tracking-[-0.04em]">
          Captured.
        </span>

        <button
          type="button"
          onClick={() => {
            stopCamera();
            window.location.href = "/";
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </header>

      <section className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-[900px]">
          {/* Camera */}
          <div className="relative md:h-[650px] sm:aspect-3/4 md:aspect-auto overflow-hidden rounded-[2rem] bg-[#1c1c1e] shadow-2xl">
            {cameraError ? (
              <div className="flex h-full items-center justify-center px-8 text-center text-white">
                <div>
                  <CameraIcon className="mx-auto mb-4 h-8 w-8 opacity-40" />

                  <p className="text-sm text-white/70">
                    Camera access is required to use Captured.
                  </p>

                  <button
                    type="button"
                    onClick={startCamera}
                    className="mt-5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
                style={{
                  filter: activeFilter?.value,
                  transform: "scaleX(-1)",
                }}
              />
            )}

            {/* Filter label */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                {selectedFilter}
              </div>
            </div>

            {/* Countdown */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="text-[120px] font-medium tracking-[-0.08em] text-white drop-shadow-2xl">
                  {countdown}
                </span>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="mt-6 flex items-center justify-center gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter.name;

              return (
                <button
                  key={filter.name}
                  type="button"
                  disabled={isCapturing}
                  onClick={() => setSelectedFilter(filter.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-[#111111] text-white"
                      : "bg-white text-black/55 hover:text-black"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" strokeWidth={2} />}

                  {filter.name}
                </button>
              );
            })}
          </div>

          {/* Capture */}
          <div className="mt-7 flex items-center justify-center">
            {photoCount < 3 ? (
              <button
                type="button"
                onClick={startCapture}
                disabled={isCapturing || cameraError}
                className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[6px] border-white bg-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <div className="h-[54px] w-[54px] rounded-full border border-white/20" />
              </button>
            ) : (
              <button
                type="button"
                onClick={createStrip}
                className="flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                View strip
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </button>
            )}
          </div>

          {/* Counter */}
          <div className="mt-5 text-center">
            <span className="text-xs font-medium tracking-[0.15em] text-black/40">
              {photoCount} / 3
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
