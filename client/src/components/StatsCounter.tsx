
import { useEffect, useRef, useState } from "react";

const StatsCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | undefined;
    let frameId = 0;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, isInView]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};
export default StatsCounter;
