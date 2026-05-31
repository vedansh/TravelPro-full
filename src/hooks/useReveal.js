import { useEffect, useRef } from 'react';

export function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('reveal-visible'), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    el.classList.add('reveal');
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
