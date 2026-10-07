const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const moreToggle = document.querySelector("[data-more-toggle]");
const morePanel = document.querySelector("[data-more-panel]");
const mobileMoreToggle = document.querySelector("[data-mobile-more-toggle]");
const mobileMorePanel = document.querySelector("[data-mobile-more-panel]");

const carousel = document.querySelector("[data-hero-carousel]");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".hero-slide")];
  const dots = [...carousel.querySelectorAll("[data-hero-dot]")];
  let active = 0;
  let timer;
  const showSlide = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === active));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === active));
  };
  const start = () => {
    clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => showSlide(active + 1), 6000);
  };
  carousel.querySelector("[data-hero-prev]")?.addEventListener("click", () => { showSlide(active - 1); start(); });
  carousel.querySelector("[data-hero-next]")?.addEventListener("click", () => { showSlide(active + 1); start(); });
  dots.forEach(dot => dot.addEventListener("click", () => { showSlide(Number(dot.dataset.heroDot)); start(); }));
  start();
}

const alumniCarousel = document.querySelector("[data-alumni-carousel]");
if (alumniCarousel) {
  const track = alumniCarousel.querySelector("[data-alumni-track]");
  const slides = [...alumniCarousel.querySelectorAll("[data-alumni-slide]")];
  const dots = [...alumniCarousel.querySelectorAll("[data-alumni-dot]")];
  const status = alumniCarousel.querySelector("[data-alumni-status]");
  let active = 0;
  let pointerStart = null;

  const showStory = (index) => {
    active = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${active * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === active;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
      if (!isActive) slide.querySelectorAll("details[open]").forEach(details => details.removeAttribute("open"));
    });
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === active));
    status.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  alumniCarousel.closest(".alumni-stories")?.querySelector("[data-alumni-prev]")?.addEventListener("click", () => showStory(active - 1));
  alumniCarousel.closest(".alumni-stories")?.querySelector("[data-alumni-next]")?.addEventListener("click", () => showStory(active + 1));
  dots.forEach(dot => dot.addEventListener("click", () => showStory(Number(dot.dataset.alumniDot))));
  alumniCarousel.addEventListener("pointerdown", event => { pointerStart = event.clientX; });
  alumniCarousel.addEventListener("pointerup", event => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) > 55) showStory(active + (distance < 0 ? 1 : -1));
  });
  alumniCarousel.addEventListener("pointercancel", () => { pointerStart = null; });
  showStory(0);
}

const pressCarousel = document.querySelector("[data-press-carousel]");
if (pressCarousel) {
  const track = pressCarousel.querySelector("[data-press-track]");
  const slides = [...pressCarousel.querySelectorAll("[data-press-slide]")];
  const dots = [...pressCarousel.querySelectorAll("[data-press-dot]")];
  const status = pressCarousel.querySelector("[data-press-status]");
  let active = 0;
  let pointerStart = null;
  let suppressClick = false;
  const frame = pressCarousel.querySelector(".press-carousel__window");
  const resizePress = () => {
    if (!document.body.classList.contains("journeys-page")) return;
    const image = slides[active].querySelector("img");
    const ratio = Number(image.getAttribute("width")) / Number(image.getAttribute("height"));
    frame.style.height = `${Math.min(frame.clientWidth / ratio, 620)}px`;
  };

  const showPressImage = (index) => {
    active = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${active * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === active;
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
    });
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === active));
    status.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    resizePress();
  };

  pressCarousel.querySelector("[data-press-prev]")?.addEventListener("click", () => showPressImage(active - 1));
  pressCarousel.querySelector("[data-press-next]")?.addEventListener("click", () => showPressImage(active + 1));
  dots.forEach(dot => dot.addEventListener("click", () => showPressImage(Number(dot.dataset.pressDot))));
  pressCarousel.addEventListener("pointerdown", event => {
    pointerStart = event.clientX;
    suppressClick = false;
    event.target.closest("[data-press-slide]")?.setPointerCapture(event.pointerId);
  });
  pressCarousel.addEventListener("pointerup", event => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) > 55) {
      suppressClick = true;
      showPressImage(active + (distance < 0 ? 1 : -1));
      setTimeout(() => { suppressClick = false; }, 0);
    }
  });
  pressCarousel.addEventListener("pointercancel", () => { pointerStart = null; });
  pressCarousel.addEventListener("click", event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  pressCarousel.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showPressImage(active + (event.key === "ArrowRight" ? 1 : -1));
  });
  if (document.body.classList.contains("journeys-page")) new ResizeObserver(resizePress).observe(frame);
  showPressImage(0);
}

const testimonialShowcase = document.querySelector("[data-testimonial-showcase]");
if (testimonialShowcase) {
  const tabs = [...testimonialShowcase.querySelectorAll("[data-testimonial-tab]")];
  const panels = [...testimonialShowcase.querySelectorAll("[data-testimonial-panel]")];
  const status = testimonialShowcase.querySelector("[data-testimonial-status]");
  let active = 0;

  const showTestimonial = (index, moveFocus = false) => {
    active = (index + panels.length) % panels.length;
    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === active;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && moveFocus) tab.focus();
    });
    panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === active;
      panel.hidden = !isActive;
      if (!isActive) panel.querySelector("video")?.pause();
    });
    status.textContent = `${String(active + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
  };

  tabs.forEach(tab => tab.addEventListener("click", () => showTestimonial(Number(tab.dataset.testimonialTab))));
  testimonialShowcase.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => showTestimonial(active - 1));
  testimonialShowcase.querySelector("[data-testimonial-next]")?.addEventListener("click", () => showTestimonial(active + 1));
  testimonialShowcase.querySelector('[role="tablist"]')?.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === "Home" ? 0 : event.key === "End" ? panels.length - 1 : active + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1);
    showTestimonial(index, true);
  });
  showTestimonial(0);
}

const setMenu = (open) => {
  if (!mobileNav || !menuToggle) return;
  mobileNav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
  if (!open && mobileMoreToggle && mobileMorePanel) {
    mobileMoreToggle.setAttribute("aria-expanded", "false");
    mobileMorePanel.hidden = true;
  }
  if (open) mobileNav.querySelector("a")?.focus();
};

menuToggle?.addEventListener("click", () => setMenu(!mobileNav.classList.contains("is-open")));
menuClose?.addEventListener("click", () => setMenu(false));
mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));

mobileMoreToggle?.addEventListener("click", () => {
  const open = mobileMoreToggle.getAttribute("aria-expanded") !== "true";
  mobileMoreToggle.setAttribute("aria-expanded", String(open));
  if (mobileMorePanel) mobileMorePanel.hidden = !open;
});

moreToggle?.addEventListener("click", () => {
  const open = !morePanel.classList.contains("is-open");
  morePanel.classList.toggle("is-open", open);
  moreToggle.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (morePanel && !event.target.closest(".nav-more")) {
    morePanel.classList.remove("is-open");
    moreToggle?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenu(false);
  morePanel?.classList.remove("is-open");
  moreToggle?.setAttribute("aria-expanded", "false");
  mobileMoreToggle?.setAttribute("aria-expanded", "false");
  if (mobileMorePanel) mobileMorePanel.hidden = true;
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

const dialog = document.querySelector("[data-lightbox-dialog]");
const dialogImage = dialog?.querySelector("[data-lightbox-image]");
const lightboxTriggers = [...document.querySelectorAll("[data-lightbox]")];
if (dialog && dialogImage && lightboxTriggers.length) {
  const counter = dialog.querySelector("[data-lightbox-counter]");
  const label = dialog.querySelector("[data-lightbox-label]");
  const previous = dialog.querySelector("[data-lightbox-prev]");
  const next = dialog.querySelector("[data-lightbox-next]");
  let activeTriggers = [];
  let activeIndex = 0;
  let opener = null;
  let touchStartX = null;

  const renderLightbox = () => {
    const trigger = activeTriggers[activeIndex];
    if (!trigger) return;
    dialogImage.src = trigger.dataset.src;
    dialogImage.alt = trigger.querySelector("img")?.alt || "Expanded gallery view";
    label.textContent = dialogImage.alt;
    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activeTriggers.length).padStart(2, "0")}`;
    previous.disabled = activeTriggers.length < 2;
    next.disabled = activeTriggers.length < 2;
  };
  const moveLightbox = step => {
    if (activeTriggers.length < 2) return;
    activeIndex = (activeIndex + step + activeTriggers.length) % activeTriggers.length;
    renderLightbox();
  };
  const openLightbox = trigger => {
    opener = trigger;
    const group = trigger.dataset.lightboxGroup || "default";
    activeTriggers = lightboxTriggers.filter(item => (item.dataset.lightboxGroup || "default") === group);
    activeIndex = Math.max(0, activeTriggers.indexOf(trigger));
    renderLightbox();
    document.body.classList.add("lightbox-open");
    dialog.showModal();
    dialog.querySelector("[data-lightbox-close]").focus();
  };
  const closeLightbox = () => {
    if (!dialog.open) return;
    dialog.close();
  };

  lightboxTriggers.forEach(trigger => trigger.addEventListener("click", () => openLightbox(trigger)));
  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  previous?.addEventListener("click", () => moveLightbox(-1));
  next?.addEventListener("click", () => moveLightbox(1));
  dialog.addEventListener("click", event => { if (event.target === dialog) closeLightbox(); });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); moveLightbox(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveLightbox(1); }
  });
  dialog.addEventListener("pointerdown", event => {
    touchStartX = event.pointerType === "touch" && event.target === dialogImage ? event.clientX : null;
  });
  dialog.addEventListener("pointerup", event => {
    if (touchStartX === null) return;
    const distance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 50) moveLightbox(distance > 0 ? -1 : 1);
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    opener?.focus({ preventScroll: true });
    opener = null;
  });
}

const whatsappForm = document.querySelector("[data-whatsapp-form]");
whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!whatsappForm.reportValidity()) return;
  const data = new FormData(whatsappForm);
  const message = [
    "Hello Unicom TIC, I would like to make an enquiry.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email")}`,
    `Enquiry: ${data.get("enquiry")}`
  ].join("\n");
  whatsappForm.querySelector("[data-form-status]").textContent = "Opening WhatsApp with your enquiry...";
  window.open(`https://wa.me/94740030977?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

if (!(window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
  const revealTargets = document.querySelectorAll(".section-head, .feature-card, .program-card, .person-card, .story-list article, .alumni-story, .alumni-review-grid blockquote, .alumni-stats__grid > div");
  revealTargets.forEach(target => target.dataset.reveal = "");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach(target => observer.observe(target));
}

if (document.body.classList.contains("journeys-page")) {
  const navigation = document.querySelector(".journey-tabs");
  const links = [...navigation.querySelectorAll("a")];
  const sections = links.map(link => document.querySelector(link.getAttribute("href")));
  let scheduled = false;
  const updateJourneyNavigation = () => {
    scheduled = false;
    const threshold = navigation.getBoundingClientRect().bottom + 40;
    let active = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= threshold) active = index; });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const updateJourneyOffset = () => {
    const offset = header.getBoundingClientRect().height + navigation.getBoundingClientRect().height + 24;
    document.documentElement.style.scrollPaddingTop = `${offset}px`;
    updateJourneyNavigation();
  };
  new ResizeObserver(updateJourneyOffset).observe(navigation);
  addEventListener("scroll", () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateJourneyNavigation); }
  }, { passive: true });
  updateJourneyOffset();
  requestAnimationFrame(() => {
    const target = sections.find(section => `#${section.id}` === location.hash);
    target?.scrollIntoView({ behavior: "instant" });
  });

  document.querySelectorAll("[data-journey-video]").forEach(wrapper => {
    const preview = wrapper.querySelector("button[data-journey-preview]");
    const media = wrapper.querySelector("video, iframe");
    const feedback = wrapper.querySelector("[data-media-feedback]");
    const message = wrapper.querySelector("[data-media-status]");
    const retry = wrapper.querySelector("[data-video-retry]");
    let timer;
    let activated = false;
    let embedReachable = false;
    let embedLoaded = false;
    let attempt = 0;
    const setFeedback = (text, canRetry = false) => {
      message.textContent = text;
      retry.hidden = !canRetry;
      feedback.hidden = !text;
    };
    const ready = () => { clearTimeout(timer); setFeedback(""); };
    const loading = () => {
      clearTimeout(timer);
      setFeedback("Loading video...");
      timer = setTimeout(() => setFeedback("Video is taking longer to load.", true), 18000);
    };
    const activate = () => {
      const currentAttempt = ++attempt;
      activated = true;
      preview.hidden = true;
      media.hidden = false;
      media.focus({ preventScroll: true });
      loading();
      if (media.tagName === "VIDEO") {
        media.preload = "metadata";
        media.load();
        media.play().catch(error => {
          if (error.name === "AbortError") return;
          clearTimeout(timer);
          setFeedback("Video unavailable. Try again.", true);
        });
      } else {
        embedReachable = false;
        embedLoaded = false;
        media.loading = "eager";
        media.src = media.getAttribute("src");
        fetch(media.getAttribute("src"), { mode: "no-cors", signal: AbortSignal.timeout(12000) }).then(() => {
          if (currentAttempt !== attempt) return;
          embedReachable = true;
          if (embedLoaded) ready();
        }).catch(() => {
          if (currentAttempt !== attempt) return;
          clearTimeout(timer);
          setFeedback("Video unavailable. Try again.", true);
        });
      }
    };
    preview.addEventListener("click", activate);
    retry.addEventListener("click", activate);
    if (media.tagName === "VIDEO") {
      media.addEventListener("canplay", ready);
      media.addEventListener("playing", ready);
      media.addEventListener("waiting", () => { if (activated) loading(); });
      media.addEventListener("error", () => {
        if (!activated) return;
        clearTimeout(timer);
        setFeedback("Video unavailable. Try again.", true);
      });
      media.addEventListener("pause", () => {
        if (wrapper.closest("[data-testimonial-panel][hidden]")) ready();
      });
    } else {
      media.addEventListener("load", () => {
        embedLoaded = true;
        if (embedReachable) ready();
      });
      media.addEventListener("error", () => {
        clearTimeout(timer);
        setFeedback("Video unavailable. Try again.", true);
      });
    }
  });
}
