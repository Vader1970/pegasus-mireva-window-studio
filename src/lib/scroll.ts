function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function headerOffset() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  return header?.offsetHeight ?? (window.innerWidth >= 1024 ? 72 : 64);
}

export function scrollToHash(hash: string, options?: { updateHistory?: boolean }) {
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    if (options?.updateHistory !== false && window.location.hash) {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  if (options?.updateHistory !== false) {
    const next = `#${id}`;
    if (window.location.hash !== next) {
      history.pushState(null, "", next);
    }
  }
}

export function bindHashNavigation() {
  const onPopOrHash = () => {
    if (window.location.hash) {
      scrollToHash(window.location.hash, { updateHistory: false });
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  window.addEventListener("popstate", onPopOrHash);
  window.addEventListener("hashchange", onPopOrHash);

  if (window.location.hash) {
    requestAnimationFrame(() => {
      scrollToHash(window.location.hash, { updateHistory: false });
    });
  }

  return () => {
    window.removeEventListener("popstate", onPopOrHash);
    window.removeEventListener("hashchange", onPopOrHash);
  };
}

export function onAnchorClick(
  event: { preventDefault: () => void; currentTarget: EventTarget & { getAttribute: (name: string) => string | null } },
  options?: { afterClose?: () => void },
) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;

  event.preventDefault();
  options?.afterClose?.();

  const run = () => scrollToHash(href);
  if (options?.afterClose) {
    requestAnimationFrame(() => requestAnimationFrame(run));
  } else {
    run();
  }
}
