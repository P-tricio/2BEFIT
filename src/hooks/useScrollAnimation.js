import { useEffect, useRef } from 'react';

/**
 * Hook para trigger animaciones cuando elementos entran en viewport
 * @param {Object} options - Configuración de IntersectionObserver
 * @param {number} options.threshold - Porcentaje visible para trigger (default: 0.1)
 * @param {string} options.rootMargin - Margen para detección (default: "0px 0px -100px 0px")
 * @param {boolean} options.once - Si true, anima solo una vez (default: true)
 * @returns {React.RefObject} Ref para aplicar al elemento a animar
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('animate-in');
        if (once) {
          observer.unobserve(element);
        }
      } else if (!once) {
        element.classList.remove('animate-in');
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
};

export default useScrollAnimation;
