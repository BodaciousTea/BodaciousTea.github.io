document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const about = document.getElementById("about");
  const aboutOpen = document.getElementById("about-open");
  const aboutClose = document.getElementById("about-close");
  const aboutBackdrop = document.getElementById("about-backdrop");
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxStage = document.getElementById("lightbox-stage");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const lightboxLinks = document.getElementById("lightbox-links");
  const lightboxThumbnails = document.getElementById("lightbox-thumbnails");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastFocusedElement = null;

  const isVideo = (src = "") => /\.mp4(?:$|\?)/i.test(src);

  function createGallery() {
    const fragment = document.createDocumentFragment();
    let featuredMotionAssigned = false;

    portfolioData.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "project";

      const button = document.createElement("button");
      button.className = "project__button";
      button.type = "button";
      button.setAttribute("aria-label", `View ${item.title || "project"}`);

      let media;
      if (isVideo(item.thumbnail)) {
        media = document.createElement("video");
        media.className = "project__media lazy-video";
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
        media.preload = "none";
        media.dataset.src = item.thumbnail;
        media.dataset.loading = "true";
        media.setAttribute("disablePictureInPicture", "");
        media.setAttribute("aria-hidden", "true");

        if (!featuredMotionAssigned) {
          media.dataset.motion = "featured";
          featuredMotionAssigned = true;
        }
      } else {
        media = document.createElement("img");
        media.className = "project__media";
        media.src = item.thumbnail;
        media.alt = "";
        media.decoding = "async";
        media.loading = index < 3 ? "eager" : "lazy";
        if (index === 0) media.fetchPriority = "high";
      }

      const caption = document.createElement("span");
      caption.className = "project__caption";
      caption.innerHTML = `<span class="project__title"></span>${
        isVideo(item.thumbnail) ? '<span class="project__motion">Motion</span>' : ""
      }`;
      caption.querySelector(".project__title").textContent = item.title || "Untitled";

      button.append(media, caption);
      button.addEventListener("click", () => openProject(item, button));
      article.appendChild(button);
      fragment.appendChild(article);
    });

    gallery.appendChild(fragment);
    observeVideos();
  }

  function observeVideos() {
    const videos = document.querySelectorAll(".lazy-video");

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            loadVideo(video);
            if (video.dataset.motion === "featured" && !reduceMotion) {
              video.play().catch(() => {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { rootMargin: "280px 0px", threshold: 0.15 },
    );

    videos.forEach((video) => observer.observe(video));
  }

  function loadVideo(video) {
    if (video.src || !video.dataset.src) return;

    video.src = video.dataset.src;
    video.preload = video.dataset.motion === "featured" ? "auto" : "metadata";
    const revealVideo = () => {
      video.dataset.loading = "false";
    };
    video.addEventListener("loadedmetadata", revealVideo, { once: true });
    video.addEventListener("error", revealVideo, { once: true });
    video.load();
  }

  function openModal(element, trigger) {
    lastFocusedElement = trigger || document.activeElement;
    element.classList.add("is-open");
    element.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => element.querySelector(".close-button")?.focus());
  }

  function closeModal(element) {
    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    const activeVideo = element.querySelector("video");
    if (activeVideo) activeVideo.pause();
    lastFocusedElement?.focus();
  }

  function openProject(item, trigger) {
    lightboxTitle.textContent = item.title || "Untitled";
    lightboxDescription.textContent = item.description || "";
    lightboxDescription.hidden = !item.description;
    lightboxLinks.replaceChildren();
    lightboxThumbnails.replaceChildren();

    (item.links || []).forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.label;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      lightboxLinks.appendChild(anchor);
    });

    const media = [item.thumbnail, ...(item.images || [])];
    showProjectMedia(media[0], item.title);

    if (media.length > 1) {
      media.forEach((src, index) => {
        if (isVideo(src)) return;
        const thumb = document.createElement("button");
        thumb.className = `lightbox__thumbnail${index === 0 ? " is-active" : ""}`;
        thumb.type = "button";
        thumb.setAttribute("aria-label", `Show image ${index + 1} of ${media.length}`);

        const image = document.createElement("img");
        image.src = src;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        thumb.appendChild(image);

        thumb.addEventListener("click", () => {
          lightboxThumbnails
            .querySelectorAll(".lightbox__thumbnail")
            .forEach((node) => node.classList.remove("is-active"));
          thumb.classList.add("is-active");
          showProjectMedia(src, item.title);
        });
        lightboxThumbnails.appendChild(thumb);
      });
    }

    openModal(lightbox, trigger);
  }

  function showProjectMedia(src, title) {
    const currentVideo = lightboxStage.querySelector("video");
    if (currentVideo) currentVideo.pause();
    lightboxStage.replaceChildren();

    if (isVideo(src)) {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = !reduceMotion;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", title || "Project video");
      lightboxStage.appendChild(video);
    } else {
      const image = document.createElement("img");
      image.src = src;
      image.alt = title || "Project image";
      image.decoding = "async";
      lightboxStage.appendChild(image);
    }
  }

  aboutOpen.addEventListener("click", () => openModal(about, aboutOpen));
  aboutClose.addEventListener("click", () => closeModal(about));
  aboutBackdrop.addEventListener("click", () => closeModal(about));
  lightboxClose.addEventListener("click", () => closeModal(lightbox));
  lightboxBackdrop.addEventListener("click", () => closeModal(lightbox));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (lightbox.classList.contains("is-open")) closeModal(lightbox);
    else if (about.classList.contains("is-open")) closeModal(about);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  createGallery();
});
