import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://res.cloudinary.com/cq6xoqbz/video/upload/Woman_turning_head-clip-1_20260914211932.mp4';
const SENSITIVITY = 0.8;

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const prevXRef = useRef<number | null>(null);
  const seekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const currentX = e.clientX;
      const prevX = prevXRef.current;
      prevXRef.current = currentX;
      if (prevX === null) return;

      const delta = currentX - prevX;
      const deltaFraction = delta / window.innerWidth;
      const deltaSeconds = deltaFraction * SENSITIVITY * video.duration;
      let target = targetTimeRef.current + deltaSeconds;
      target = Math.max(0, Math.min(video.duration, target));
      targetTimeRef.current = target;

      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = target;
      }
    };

    const handleSeeked = () => {
      seekingRef.current = false;
      const target = targetTimeRef.current;
      if (Math.abs(video.currentTime - target) > 0.05) {
        seekingRef.current = true;
        video.currentTime = target;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      muted
      playsInline
      preload="auto"
    >
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}
