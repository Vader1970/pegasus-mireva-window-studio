export const EASE = "cubic-bezier(.2,.7,.1,1)";
export const BLIND = "cubic-bezier(.7,0,.2,1)";
export const REVEAL = "cubic-bezier(.25,.1,.25,1)";

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readNumber(el: HTMLElement, key: string, fallback: number) {
  const raw = el.dataset[key];
  if (raw == null || raw === "") return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

function whenImageReady(img: HTMLImageElement | null, run: () => void) {
  if (!(img instanceof HTMLImageElement) || img.complete) {
    run();
    return;
  }

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    run();
  };

  const timer = window.setTimeout(finish, 280);
  const onReady = () => {
    window.clearTimeout(timer);
    if (typeof img.decode === "function") {
      img.decode().then(finish).catch(finish);
    } else {
      finish();
    }
  };

  img.addEventListener("load", onReady, { once: true });
  img.addEventListener("error", finish, { once: true });
}

export function showReveal(el: HTMLElement, instant = false) {
  if (el.dataset.revealed === "true" || el.dataset.revealing === "true") return;
  el.dataset.revealing = "true";
  const t = el.dataset.reveal;
  const immediate = instant || reduceMotion();
  const delay = immediate ? 0 : Number(el.dataset.delay || 0);

  if (immediate) {
    el.dataset.revealed = "true";
    el.style.transition = "none";
    el.style.opacity = "";
    el.style.clipPath = "";
    if (t !== "slat") el.style.transform = "";
    const img = el.querySelector("img");
    if (img instanceof HTMLElement) {
      img.style.scale = "";
      img.style.transition = "";
    }
    return;
  }

  if (t === "up") {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .7s ease ${delay}ms, transform .9s ${EASE} ${delay}ms`;
  } else if (t === "fade") {
    el.style.opacity = "0";
    el.style.transition = `opacity 1s ease ${delay}ms`;
  } else if (t === "clip") {
    const img = el.querySelector("img");
    const clipMs = readNumber(el, "clipMs", 1600);
    const scaleMs = readNumber(el, "scaleMs", 1750);
    const scaleFrom = readNumber(el, "scaleFrom", 1.06);

    whenImageReady(img instanceof HTMLImageElement ? img : null, () => {
      if (el.dataset.revealed === "true") return;

      el.style.clipPath = "inset(0 0 100% 0)";
      el.style.transition = `clip-path ${clipMs}ms ${REVEAL} ${delay}ms`;
      if (img instanceof HTMLElement) {
        img.style.scale = String(scaleFrom);
        img.style.transition = `transform ${scaleMs}ms ${REVEAL}, scale ${scaleMs}ms ${REVEAL} ${delay}ms`;
      }

      void el.offsetWidth;
      el.dataset.revealed = "true";
      el.style.clipPath = "inset(0 0 0% 0)";
      if (img instanceof HTMLElement) img.style.scale = "1";
    });
    return;
  } else if (t === "line") {
    el.style.transform = "scaleX(0)";
    el.style.transition = `transform 1.1s ${BLIND} ${delay}ms`;
  } else if (t === "mask") {
    el.style.transform = "translateY(108%)";
    el.style.transition = `transform 1s ${EASE} ${delay}ms`;
  } else if (t === "slat") {
    el.style.clipPath = "inset(0 100% 0 0)";
    el.style.transition = `clip-path 1.2s ${BLIND} ${delay}ms`;
  }

  void el.offsetWidth;
  el.dataset.revealed = "true";

  if (t === "up") {
    el.style.opacity = "1";
    el.style.transform = "none";
  } else if (t === "fade") {
    el.style.opacity = "1";
  } else if (t === "line") {
    el.style.transform = "scaleX(1)";
  } else if (t === "mask") {
    el.style.transform = "none";
  } else if (t === "slat") {
    el.style.clipPath = "inset(0 0% 0 0)";
  }
}

export function paintScrollMotion(scrolled: { current: boolean }) {
  const y = window.scrollY;
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (header) {
    const next = y > 24;
    if (next !== scrolled.current) {
      scrolled.current = next;
      header.style.backgroundColor = next
        ? "rgba(255,255,255,0.97)"
        : "rgba(251,251,251,0)";
      header.style.boxShadow = next
        ? "0 2px 0 #E1E1E1"
        : "0 2px 0 rgba(225,225,225,0)";
    }
    header.style.height = window.innerWidth < 1024 ? "64px" : next ? "72px" : "88px";
  }

  const motion = !reduceMotion() && window.innerWidth >= 1024;
  const hero = document.querySelector<HTMLElement>("[data-hero-parallax]");
  if (hero) {
    if (motion && y > 0 && y < window.innerHeight * 1.5) {
      hero.style.transform = `translate3d(0,${(y * 0.1).toFixed(1)}px,0)`;
    } else if (!motion || y <= 0) {
      hero.style.transform = "";
    }
  }

  const slats = document.querySelector<HTMLElement>("[data-cta-slats]");
  const section = slats?.closest("section");
  if (slats && section) {
    const rect = section.getBoundingClientRect();
    if (motion && rect.bottom > 0 && rect.top < window.innerHeight) {
      const shift = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.12;
      slats.style.transform = `translate3d(0,${shift.toFixed(1)}px,0)`;
    } else if (!motion) {
      slats.style.transform = "none";
    }
  }
}
