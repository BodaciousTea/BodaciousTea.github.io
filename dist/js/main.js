document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const emptyState = document.getElementById("empty-state");
  const infoView = document.getElementById("info-view");
  const infoBackdrop = document.getElementById("info-backdrop");
  const infoPanels = [...document.querySelectorAll("[data-panel]")];
  const workLabel = document.getElementById("work-menu-label");
  const viewLabel = document.getElementById("view-menu-label");
  const workOptions = [...document.querySelectorAll("[data-work]")];
  const viewOptions = [...document.querySelectorAll("[data-view]")];
  const dropdowns = [...document.querySelectorAll("[data-menu]")];
  const brand = document.querySelector(".brand");
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  const lightboxStage = document.getElementById("lightbox-stage");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const lightboxLinks = document.getElementById("lightbox-links");
  const lightboxThumbnails = document.getElementById("lightbox-thumbnails");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeWork = "cinematography";
  let activeView = "showcase";
  let lastFocusedElement = null;
  let videoObserver = null;
  let gallerySwitchTimer = null;

  const isVideo = (src = "") => /\.mp4(?:$|\?)/i.test(src);
  const displayName = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  function projectsFor(category) {
    return portfolioData.filter((item) => category === "cinematography" || item.id === 11);
  }

  function renderGallery(category) {
    videoObserver?.disconnect();
    videoObserver = null;
    gallery.replaceChildren();

    const projects = projectsFor(category);
    const fragment = document.createDocumentFragment();

    projects.forEach((item, projectIndex) => {
      const row = document.createElement("article");
      row.className = "gallery-row";
      const mediaSources = [...new Set([item.thumbnail, ...(item.images || [])].filter(Boolean))].slice(0, 3);
      let rowMotionAssigned = false;

      const button = document.createElement("button");
      button.className = "project-set__button";
      button.type = "button";
      button.setAttribute("aria-label", `Open ${item.title || "project"}`);

      const mediaGrid = document.createElement("span");
      mediaGrid.className = "project-set__media";
      mediaGrid.dataset.count = String(mediaSources.length);

      mediaSources.forEach((src, mediaIndex) => {
        const tile = document.createElement("span");
        tile.className = "project";

        let media;
        if (isVideo(src)) {
          media = document.createElement("video");
          media.className = "project__media lazy-video";
          media.muted = true;
          media.loop = true;
          media.playsInline = true;
          media.preload = "none";
          media.dataset.src = src;
          media.dataset.loading = "true";
          media.setAttribute("disablePictureInPicture", "");
          media.setAttribute("aria-hidden", "true");

          if (!rowMotionAssigned) {
            media.dataset.motion = "featured";
            rowMotionAssigned = true;
          }
        } else {
          media = document.createElement("img");
          media.className = "project__media";
          media.src = src;
          media.alt = "";
          media.decoding = "async";
          media.loading = projectIndex === 0 ? "eager" : "lazy";
          if (projectIndex === 0 && mediaIndex === 0) media.fetchPriority = "high";
        }

        tile.appendChild(media);
        mediaGrid.appendChild(tile);
      });

      for (let placeholderIndex = mediaSources.length; placeholderIndex < 3; placeholderIndex += 1) {
        const placeholder = document.createElement("span");
        placeholder.className = "project project--placeholder";
        placeholder.setAttribute("aria-hidden", "true");
        mediaGrid.appendChild(placeholder);
      }

      const preview = document.createElement("span");
      preview.className = "row-preview";
      preview.setAttribute("aria-hidden", "true");
      preview.innerHTML = '<span><span class="row-preview__title"></span><span class="row-preview__meta"></span></span>';
      preview.querySelector(".row-preview__title").textContent = item.title || "Untitled";
      preview.querySelector(".row-preview__meta").textContent = item.date || item.description || "";

      button.append(mediaGrid, preview);
      button.addEventListener("click", () => openProject(item, button));
      row.appendChild(button);
      fragment.appendChild(row);
    });

    gallery.appendChild(fragment);
    gallery.setAttribute("aria-label", `Selected ${category}`);
    emptyState.hidden = projects.length > 0;
    observeVideos();
  }

  function observeVideos() {
    const videos = document.querySelectorAll(".lazy-video");

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }

    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            loadVideo(video);
            if (video.dataset.motion === "featured" && !reduceMotion && activeView === "showcase") {
              video.play().catch(() => {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { rootMargin: "220px 0px", threshold: 0.15 },
    );

    videos.forEach((video) => videoObserver.observe(video));
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

  function filterGallery(category, animate = true) {
    if (lightbox.classList.contains("is-open")) closeModal(lightbox, false);
    activeWork = category;
    workLabel.textContent = displayName(category);
    workOptions.forEach((option) => {
      const selected = option.dataset.work === category;
      option.setAttribute("aria-checked", String(selected));
      option.hidden = selected;
    });

    window.clearTimeout(gallerySwitchTimer);
    if (!animate || reduceMotion || !gallery.childElementCount) {
      gallery.classList.remove("is-switching");
      renderGallery(category);
      return;
    }

    document.querySelectorAll(".project video").forEach((video) => video.pause());
    gallery.classList.add("is-switching");
    gallerySwitchTimer = window.setTimeout(() => {
      renderGallery(category);
      requestAnimationFrame(() => {
        gallery.classList.remove("is-switching");
      });
      gallerySwitchTimer = null;
    }, 240);
  }

  function selectView(view, restoreFocus = false) {
    if (lightbox.classList.contains("is-open")) closeModal(lightbox, false);
    activeView = view;
    viewLabel.textContent = displayName(view);
    viewOptions.forEach((option) => {
      const selected = option.dataset.view === view;
      option.setAttribute("aria-checked", String(selected));
      option.hidden = selected;
    });

    if (view === "showcase") {
      infoView.classList.remove("is-open");
      infoView.setAttribute("aria-hidden", "true");
      infoPanels.forEach((panel) => {
        panel.hidden = true;
      });
      document.body.classList.remove("modal-open");
      resumeFeaturedVideos();
      if (restoreFocus) document.getElementById("view-menu-trigger").focus();
      return;
    }

    document.querySelectorAll(".project video").forEach((video) => video.pause());
    infoPanels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== view;
    });
    infoView.classList.add("is-open");
    infoView.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const activePanel = infoPanels.find((panel) => panel.dataset.panel === view);
    if (activePanel) {
      activePanel.tabIndex = -1;
      requestAnimationFrame(() => activePanel.focus());
    }
  }

  function resumeFeaturedVideos() {
    if (reduceMotion) return;
    document.querySelectorAll('.lazy-video[data-motion="featured"]').forEach((video) => {
      const rect = video.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        loadVideo(video);
        video.play().catch(() => {});
      }
    });
  }

  function closeMenus(except = null) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      const trigger = dropdown.querySelector(".nav-menu__trigger");
      const menu = dropdown.querySelector(".nav-menu__options");
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-menu__trigger");
    const menu = dropdown.querySelector(".nav-menu__options");
    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeMenus(willOpen ? dropdown : null);
      trigger.setAttribute("aria-expanded", String(willOpen));
      menu.hidden = !willOpen;
      if (willOpen) requestAnimationFrame(() => menu.querySelector("button:not([hidden])")?.focus());
    });
  });

  workOptions.forEach((option) => {
    option.addEventListener("click", () => {
      filterGallery(option.dataset.work);
      selectView("showcase");
      closeMenus();
      document.getElementById("work-menu-trigger").focus();
    });
  });

  viewOptions.forEach((option) => {
    option.addEventListener("click", () => {
      lastFocusedElement = document.getElementById("view-menu-trigger");
      selectView(option.dataset.view);
      closeMenus();
      if (option.dataset.view === "showcase") lastFocusedElement.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-menu]")) closeMenus();
  });

  brand.addEventListener("click", () => {
    filterGallery("cinematography");
    selectView("showcase");
    closeMenus();
  });

  infoBackdrop.addEventListener("click", () => selectView("showcase", true));

  function openModal(element, trigger) {
    lastFocusedElement = trigger || document.activeElement;
    element.classList.add("is-open");
    element.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (element === lightbox) element.scrollTop = 0;
    requestAnimationFrame(() => element.querySelector(".close-button")?.focus());
  }

  function closeModal(element, restoreFocus = true) {
    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    const activeVideo = element.querySelector("video");
    if (activeVideo) activeVideo.pause();
    if (restoreFocus) lastFocusedElement?.focus();
    if (element === lightbox && activeView === "showcase") resumeFeaturedVideos();
  }

  function openProject(item, trigger) {
    document.querySelectorAll(".project video").forEach((video) => video.pause());
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
      media.slice(1).forEach((src, index) => {
        if (isVideo(src)) return;
        const thumb = document.createElement("button");
        thumb.className = "lightbox__thumbnail";
        thumb.type = "button";
        thumb.setAttribute("aria-label", `Show additional image ${index + 1} of ${media.length - 1}`);

        const image = document.createElement("img");
        image.src = src;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        thumb.appendChild(image);

        thumb.addEventListener("click", () => {
          lightboxThumbnails.querySelectorAll(".lightbox__thumbnail").forEach((node) => node.classList.remove("is-active"));
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

  lightboxClose.addEventListener("click", () => closeModal(lightbox));
  lightboxBackdrop.addEventListener("click", () => closeModal(lightbox));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openDropdown = dropdowns.find((dropdown) => dropdown.querySelector('.nav-menu__trigger[aria-expanded="true"]'));
    if (openDropdown) {
      const trigger = openDropdown.querySelector(".nav-menu__trigger");
      closeMenus();
      trigger.focus();
    } else if (lightbox.classList.contains("is-open")) {
      closeModal(lightbox);
    } else if (infoView.classList.contains("is-open")) {
      selectView("showcase", true);
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  filterGallery(activeWork, false);
  selectView(activeView);
});
