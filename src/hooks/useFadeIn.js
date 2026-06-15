import { useEffect, useRef } from 'react';

/**
 * Hook that applies the 'visible' class to the ref element
 * when it enters the viewport (Intersection Observer).
 */
export function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [threshold]);

  return ref;
}
