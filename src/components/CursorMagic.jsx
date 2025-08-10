import React, { useEffect, useRef } from "react";

export default function CursorMagic() {
  const elRef = useRef();

  useEffect(() => {
    // create element
    const el = document.createElement("div");
    el.className = "magical-cursor";
    el.innerHTML = `<div class="dot"></div>`;
    document.body.appendChild(el);
    elRef.current = el;

    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };
    const onClick = (e) => {
      // pulse animation
      el.classList.remove("pulse");
      void el.offsetWidth;
      el.classList.add("pulse");
      // spark DOM
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      el.remove();
    };
  }, []);

  return null;
}
