// Subpage chrome: header hairline on scroll, reveal-on-scroll, year.
(function () {
  var hdr = document.getElementById("hdr");
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle("scrolled", (window.scrollY || 0) > 20); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (Math.min(i, 6) * 60) + "ms"; io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }

  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
