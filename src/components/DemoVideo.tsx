"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DemoVideoProps {
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function DemoVideo({
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = true,
}: DemoVideoProps) {
  const [src, setSrc] = useState("/demo.mp4");
  const [poster, setPoster] = useState("/demo-home.webp");

  useEffect(() => {
    if (window.location.hostname.endsWith("github.io")) {
      setSrc("/clepyousif/demo.mp4");
      setPoster("/clepyousif/demo-home.webp");
    }
  }, []);

  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      preload="metadata"
    >
      <track kind="captions" />
    </video>
  );
}
