// Framer Motion animation presets for 9Router
// Follows Apple HIG motion guidelines and Material Design timing

export const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springGentle = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }, // Custom ease-out
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05, // 50ms stagger
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
};

// Respect prefers-reduced-motion
export const getReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const withReducedMotion = (variants) => {
  if (getReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 },
    };
  }
  return variants;
};
