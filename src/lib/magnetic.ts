type MagneticOptions = {
  radius?: number;
  maxTranslate?: number;
};

const isTouchDevice = () => {
  if (typeof window === "undefined") return true;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia?.("(pointer: coarse)").matches
  );
};

export function initMagneticButtons(options: MagneticOptions = {}) {
  if (typeof window === "undefined") return () => {};
  if (isTouchDevice()) return () => {};

  const radius = options.radius ?? 100;
  const maxTranslate = options.maxTranslate ?? 15;

  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
  if (!els.length) return () => {};

  const onMove = (e: MouseEvent) => {
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const force = 1 - dist / radius;
        const tx = (dx / radius) * maxTranslate * force;
        const ty = (dy / radius) * maxTranslate * force;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      } else {
        el.style.transform = "translate3d(0,0,0)";
      }
    }
  };

  const onLeave = () => {
    for (const el of els) el.style.transform = "translate3d(0,0,0)";
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("blur", onLeave);

  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("blur", onLeave);
    onLeave();
  };
}

