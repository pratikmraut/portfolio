"use client";

import { useEffect } from "react";
import { navigateToSection } from "./section-navigation";

// Fragment navigation belongs to this document, not the framework's RSC router.
export function SectionNavigation() {
  useEffect(() => {
    const documentUrl = window.location.pathname + window.location.search;
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".identity-rail");
    const sectionId = (hash: string) => {
      try {
        return decodeURIComponent(hash.slice(1)) || "top";
      } catch {
        return "";
      }
    };
    const updateOffset = () => {
      const height = header && window.matchMedia("(max-width: 1240px)").matches
        ? header.getBoundingClientRect().height : 0;
      root.style.setProperty("--header-offset", `${height}px`);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (header) observer.observe(header);
    window.addEventListener("resize", updateOffset);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname + url.search !== documentUrl || !url.hash) return;
      const id = sectionId(url.hash);
      if (!document.getElementById(id)) return;
      event.preventDefault();
      navigateToSection(id);
    };
    const onHistoryNavigation = (event: Event) => {
      navigateToSection((event as CustomEvent<string>).detail, false);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("portfolio:history-navigation", onHistoryNavigation);
    if (window.location.hash) navigateToSection(sectionId(window.location.hash), false);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("portfolio:history-navigation", onHistoryNavigation);
      root.style.removeProperty("--header-offset");
    };
  }, []);
  return null;
}
