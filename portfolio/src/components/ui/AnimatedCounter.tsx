"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp end={value} duration={duration} suffix={suffix} />
      ) : (
        `0${suffix}`
      )}
    </span>
  );
}
