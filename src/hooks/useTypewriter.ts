import { useEffect, useRef, useState } from 'react';

export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        indexRef.current += 1;
        const next = text.slice(0, indexRef.current);
        setDisplayed(next);
        if (indexRef.current >= text.length) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
