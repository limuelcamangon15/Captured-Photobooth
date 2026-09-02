"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera as CameraIcon } from "lucide-react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
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

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#111111]">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="text-lg font-semibold tracking-[-0.04em]">
          Captured.
        </span>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </header>

      {/* Camera */}
      <section className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-[520px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#1c1c1e] shadow-2xl">
            {cameraError ? (
              <div className="flex h-full items-center justify-center px-8 text-center text-white">
                <div>
                  <CameraIcon className="mx-auto mb-4 h-8 w-8 opacity-40" />

                  <p className="text-sm text-white/70">
                    Camera access is required to use Captured.
                  </p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
