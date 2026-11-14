"use client";

import { useEffect } from "react";
import { paintScrollMotion, showReveal } from "@/lib/animations";
import { bindHashNavigation } from "@/lib/scroll";

/** Slight early trigger so reveals are mid-flight as sections enter — not finished early. */
const EARLY_PX = 64;
/** Prefetch clip images farther out so decode is ready when the reveal starts. */
const WARM_PX = 520;

export function MotionRoot() {
  // useEffect (not useLayoutEffect) so reveal/DOM mutations run after React hydration.
  useEffect(() => {
    const scrolled = { current: false };
    let frame = 0;
    let ticking = false;
    const pending = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let warmer: IntersectionObserver | undefined;
    let safety = 0;
    const unbindHash = bindHashNavigation();

    const paint = () => {
      ticking = false;
      paintScrollMotion(scrolled);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(paint);
    };

    const reveal = (el: HTMLElement, instant = false, delayOverride?: number) => {
      pending.delete(el);
      if (typeof delayOverride === "number") {
        el.dataset.delay = String(delayOverride);
      }
      showReveal(el, instant);
    };

    const revealAll = (instant: boolean) => {
      pending.forEach((el) => reveal(el, instant));
      observer?.disconnect();
      warmer?.disconnect();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const warmClipImage = (el: HTMLElement) => {
      if (el.dataset.reveal !== "clip") return;
      const img = el.querySelector("img");
      if (!(img instanceof HTMLImageElement) || img.dataset.warmed === "true") return;
      img.dataset.warmed = "true";
      if (img.loading === "lazy") img.loading = "eager";
      const src = img.currentSrc || img.src;
      if (!src) return;
      const pre = new window.Image();
      pre.decoding = "async";
      pre.src = src;
    };

    if (reduce || !("IntersectionObserver" in window) || document.visibilityState === "hidden") {
      nodes.forEach((el) => reveal(el, true));
    } else {
      const viewport = window.innerHeight;
      warmer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            warmClipImage(entry.target as HTMLElement);
            warmer?.unobserve(entry.target);
          });
        },
        { rootMargin: `${WARM_PX}px 0px ${WARM_PX}px 0px`, threshold: 0.01 },
      );

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target as HTMLElement);

          visible.forEach((el, index) => {
            warmClipImage(el);
            // Prefer authored delays. Only invent a tiny batch stagger when none is set.
            if (visible.length > 1 && el.dataset.delay == null) {
              reveal(el, false, index * 40);
            } else {
              reveal(el, false);
            }
            observer?.unobserve(el);
          });
        },
        // Expand top + bottom so reveals start ~150px early and survive large scroll jumps.
        { rootMargin: `${EARLY_PX}px 0px ${EARLY_PX}px 0px`, threshold: 0.01 },
      );

      nodes.forEach((el) => {
        if (el.getBoundingClientRect().top < viewport * 0.96) {
          reveal(el, true);
          return;
        }
        pending.add(el);
        observer?.observe(el);
        if (el.dataset.reveal === "clip") warmer?.observe(el);
      });

      const onPrint = () => revealAll(true);
      const onVisibility = () => {
        if (document.visibilityState === "hidden") revealAll(true);
      };
      window.addEventListener("beforeprint", onPrint);
      document.addEventListener("visibilitychange", onVisibility);

      const flushPending = () => {
        if (!pending.size) return;
        const limit = window.innerHeight + EARLY_PX;
        pending.forEach((el) => {
          if (el.getBoundingClientRect().top < limit) {
            warmClipImage(el);
            reveal(el);
          }
        });
      };

      // Catch fast scrolls if IntersectionObserver batches late.
      safety = window.setInterval(flushPending, 200);
      window.addEventListener("scroll", flushPending, { passive: true });

      return () => {
        unbindHash();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scroll", flushPending);
        window.removeEventListener("resize", onScroll);
        window.removeEventListener("beforeprint", onPrint);
        document.removeEventListener("visibilitychange", onVisibility);
        window.cancelAnimationFrame(frame);
        observer?.disconnect();
        warmer?.disconnect();
        window.clearInterval(safety);
      };
    }

    return () => {
      unbindHash();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
