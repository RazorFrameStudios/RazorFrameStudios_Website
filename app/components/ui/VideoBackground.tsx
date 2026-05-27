import { ReactNode } from "react";

interface VideoBackgroundProps {
  src: string;
  children?: ReactNode;
}

export default function VideoBackground({ src, children }: VideoBackgroundProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={src} type="video/mp4" />
      </video>


      <div className="relative z-10">{children}</div>
    </div>
  );
}