"use client";

export default function Camera() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-white/40">Camera preview</p>
      </div>
    </div>
  );
}
