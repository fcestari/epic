import { useState, useEffect, useRef, useCallback } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export function useScrambleText(target: string) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const chars = target.split('');
    const revealed = new Array(chars.length).fill(false);
    let frame = 0;
    const totalFrames = chars.length * 3 + 12;

    const tick = () => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * chars.length);
      for (let i = 0; i < revealCount; i++) revealed[i] = true;

      const result = chars.map((ch, i) => {
        if (ch === ' ') return ' ';
        if (revealed[i]) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });

      setDisplay(result.join(''));
      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    scramble();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [scramble]);

  return display;
}
