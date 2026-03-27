import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animClass =
    direction === 'left'
      ? 'reveal-left'
      : direction === 'right'
      ? 'reveal-right'
      : 'reveal-up';

  return (
    <div
      ref={ref}
      className={`${animClass} ${visible ? 'revealed' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
