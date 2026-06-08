// Mobile menu — Motion (motion.dev). Full-screen overlay, fade in,
// staggered link reveal. Shared across every page.
import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.18.0/+esm";

const btn   = document.getElementById("menuBtn");
const menu  = document.getElementById("menu");
if (btn && menu) {
  const closeBtn = menu.querySelector(".menu-close");
  const items = Array.from(menu.querySelectorAll(".menu-nav a, .menu-foot"));
  const ease = [0.16, 1, 0.3, 1];
  let open = false, busy = false;

  const openMenu = () => {
    if (open || busy) return;
    open = true; busy = true;
    menu.style.display = "flex";
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("menu-open");
    if (window.lenis) window.lenis.stop();
    animate(menu, { opacity: [0, 1] }, { duration: 0.4, ease });
    items.forEach((el, i) =>
      animate(el, { opacity: [0, 1], y: [34, 0] },
        { duration: 0.6, delay: 0.12 + i * 0.06, ease })
    );
    setTimeout(() => (busy = false), 320);
  };

  const closeMenu = (after) => {
    if (!open || busy) return;
    open = false; busy = true;
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    animate(menu, { opacity: [1, 0] }, { duration: 0.32, ease }).finished.then(() => {
      menu.style.display = "none";
      document.documentElement.classList.remove("menu-open");
      if (window.lenis) window.lenis.start();
      items.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
      busy = false;
      if (typeof after === "function") requestAnimationFrame(after);
    });
  };

  btn.addEventListener("click", openMenu);
  closeBtn && closeBtn.addEventListener("click", () => closeMenu());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  menu.querySelectorAll(".menu-nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        // in-page section: close first, then scroll once Lenis is live again
        const target = document.querySelector(href);
        e.preventDefault();
        closeMenu(() => {
          if (!target) return;
          if (window.lenis) window.lenis.scrollTo(target, { offset: -40 });
          else target.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        closeMenu(); // navigating to another page
      }
    });
  });
}
