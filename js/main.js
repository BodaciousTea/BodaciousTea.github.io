// Portfolio Main JavaScript - Proper horizontal to vertical masonry transition

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const unifiedGrid = document.getElementById('unified-grid');
  const introOverlays = document.getElementById('intro-overlays');
  const introCenter = document.getElementById('intro-center');
  const introNoise = document.getElementById('intro-noise');
  const enterBtn = document.getElementById('enter-btn');
  const mainNav = document.getElementById('main-nav');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxLinks = document.getElementById('lightbox-links');
  const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
  const aboutBtn = document.getElementById('about-btn');

  let currentItem = null;
  let currentImageIndex = 0;
  let isGalleryMode = false;
  let allGridItems = [];
  let imagesLoaded = 0;
  let totalImages = 0;

  // ============================================
  // INITIALIZE GRID - Load images first to get aspect ratios
  // ============================================
  
  function initGrid() {
    const mediaItems = portfolioData.filter(item => item.type !== 'text');
    
    // Create items - more for a fuller grid
    const itemsToShow = [];
    while (itemsToShow.length < 40) {
      mediaItems.forEach(item => {
        if (itemsToShow.length < 40) {
          itemsToShow.push({ ...item, _uniqueId: itemsToShow.length });
        }
      });
    }

    // Shuffle
    for (let i = itemsToShow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemsToShow[i], itemsToShow[j]] = [itemsToShow[j], itemsToShow[i]];
    }

    totalImages = itemsToShow.length;

    // Create grid items
    itemsToShow.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'grid-item';
      div.dataset.id = item.id;
      div.dataset.category = item.category;
      div.dataset.uniqueId = item._uniqueId;
      
      if (item.type === 'video' && item.videoUrl && item.videoUrl !== '#') {
        const video = document.createElement('video');
        video.src = item.videoUrl;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.setAttribute('disablePictureInPicture', '');
        div.appendChild(video);
        div.classList.add('video-item');
        
        // Default aspect ratio for videos
        div.dataset.aspectRatio = 16/9;
        imageLoaded();
      } else {
        const img = document.createElement('img');
        img.src = item.thumbnail;
        img.alt = item.title || '';
        img.onload = () => {
          // Store natural aspect ratio once loaded
          div.dataset.aspectRatio = img.naturalWidth / img.naturalHeight;
          imageLoaded();
        };
        img.onerror = () => {
          div.dataset.aspectRatio = 1.5;
          imageLoaded();
        };
        div.appendChild(img);
      }
      
      // Add hover overlay with title, date, and plus icon
      const hoverOverlay = document.createElement('div');
      hoverOverlay.className = 'hover-overlay';
      hoverOverlay.innerHTML = `
        <div class="hover-info">
          <span class="hover-title">${item.title || 'Untitled'}</span>
          <span class="hover-date">${item.date || ''}</span>
        </div>
        <div class="hover-plus"></div>
      `;
      div.appendChild(hoverOverlay);
      
      div._itemData = item;
      
      div.addEventListener('click', () => {
        if (isGalleryMode) {
          openLightbox(item);
        }
      });
      
      unifiedGrid.appendChild(div);
      allGridItems.push(div);
    });
  }
  
  function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded >= totalImages) {
      // All images loaded - layout the grid and start reveal animation
      layoutGalleryGrid();
      startIntroAnimation();
    }
  }
  
  // Layout the normal masonry grid from the start
  function layoutGalleryGrid() {
    const { positions } = calculateVerticalMasonryPositions();
    
    // Position items in their final masonry positions
    allGridItems.forEach((item, i) => {
      const pos = positions[i];
      item.style.position = 'absolute';
      item.style.left = pos.left + 'px';
      item.style.top = pos.top + 'px';
      item.style.width = pos.width + 'px';
      item.style.height = pos.height + 'px';
    });
    
    // Set container height
    const containerHeight = window.innerHeight;
    unifiedGrid.style.height = containerHeight + 'px';
    unifiedGrid.style.overflow = 'hidden';
  }
  
  function startIntroAnimation() {
    // Show enter button
    setTimeout(() => {
      introCenter.classList.add('visible');
    }, 800);
    
    // Reveal images with stagger from center outward (fade in, unblur)
    setTimeout(() => {
      // Calculate center of viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Sort items by distance from center
      const itemsWithDistance = allGridItems.map(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(itemCenterX - centerX, 2) + 
          Math.pow(itemCenterY - centerY, 2)
        );
        return { item, distance };
      });
      
      // Sort by distance (center items first)
      itemsWithDistance.sort((a, b) => a.distance - b.distance);
      
      // Reveal with stagger based on distance from center
      itemsWithDistance.forEach(({ item }, i) => {
        const delay = i * 40; // 40ms between each item
        setTimeout(() => {
          item.classList.add('revealed');
        }, delay);
      });
    }, 400);
  }

  // ============================================
  // VERTICAL MASONRY LAYOUT (columns)
  // Returns target positions for animation
  // ============================================
  
  function calculateVerticalMasonryPositions() {
    const gap = 8;
    const topPadding = 80;
    const maxColumnWidth = 400;
    
    let columnCount = 3;
    if (window.innerWidth <= 900) columnCount = 2;
    if (window.innerWidth <= 500) columnCount = 1;
    
    // Calculate column width (max 400px each)
    const columnWidth = Math.min(maxColumnWidth, (window.innerWidth - 24 - (gap * (columnCount - 1))) / columnCount);
    const totalGridWidth = (columnWidth * columnCount) + (gap * (columnCount - 1));
    const sideMargin = (window.innerWidth - totalGridWidth) / 2;
    
    const columnHeights = new Array(columnCount).fill(topPadding);
    const positions = [];
    
    allGridItems.forEach((item) => {
      // Find shortest column
      let shortestCol = 0;
      let shortestHeight = columnHeights[0];
      for (let c = 1; c < columnCount; c++) {
        if (columnHeights[c] < shortestHeight) {
          shortestCol = c;
          shortestHeight = columnHeights[c];
        }
      }
      
      const left = sideMargin + (shortestCol * (columnWidth + gap));
      const top = columnHeights[shortestCol];
      
      // Get aspect ratio - height based on aspect ratio
      const aspectRatio = parseFloat(item.dataset.aspectRatio) || 1.5;
      const height = columnWidth / aspectRatio;
      
      positions.push({
        left: left,
        top: top,
        width: columnWidth,
        height: height
      });
      
      columnHeights[shortestCol] += height + gap;
    });
    
    // Return positions and total height
    const totalHeight = Math.max(...columnHeights) + 60;
    return { positions, totalHeight };
  }

  // ============================================
  // TRANSITION TO GALLERY
  // Already in gallery layout, just remove overlays and enable scrolling
  // ============================================

  function transitionToGallery() {
    if (isGalleryMode) return; // Prevent multiple triggers
    isGalleryMode = true;
    
    // Slight delay before effects dissipate
    setTimeout(() => {
      // Calculate full gallery height
      const { totalHeight } = calculateVerticalMasonryPositions();
      
      // Hide intro elements with animation
      introCenter.classList.add('hidden');
      introOverlays.classList.add('hidden');
      introNoise.classList.add('hidden');
      mainNav.classList.add('visible');
      document.body.classList.add('scrollable');
      
      // Enable scrolling and set full height
      unifiedGrid.style.height = totalHeight + 'px';
      unifiedGrid.style.overflow = 'visible';
      
      // Enable gallery mode on all items (makes them hoverable/clickable)
      allGridItems.forEach((item) => {
        item.classList.add('gallery-mode');
      });
    }, 150);
  }
  
  // Show intro/about overlay again
  function showIntro() {
    isGalleryMode = false;
    
    // Reset scroll first
    window.scrollTo(0, 0);
    
    // Hide nav first
    mainNav.classList.remove('visible');
    
    // Disable gallery mode on items
    allGridItems.forEach((item) => {
      item.classList.remove('gallery-mode');
    });
    
    // Show intro elements with slight delay for smoothness
    setTimeout(() => {
      introOverlays.classList.remove('hidden');
      introNoise.classList.remove('hidden');
      introCenter.classList.remove('hidden');
      document.body.classList.remove('scrollable');
      
      // Reset container
      unifiedGrid.style.height = window.innerHeight + 'px';
      unifiedGrid.style.overflow = 'hidden';
    }, 50);
  }

  // ============================================
  // LIGHTBOX
  // ============================================

  function openLightbox(item) {
    currentItem = item;
    currentImageIndex = 0;

    lightboxTitle.textContent = item.title || '';
    lightboxDescription.textContent = item.description || '';

    lightboxLinks.innerHTML = '';
    if (item.links && item.links.length > 0) {
      item.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.label;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        lightboxLinks.appendChild(a);
      });
    }

    if (item.type === 'video' && item.videoUrl && item.videoUrl !== '#') {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = item.videoUrl;
      lightboxVideo.play();
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxImage.style.display = 'block';
      updateMainImage(0);
    }

    lightboxThumbnails.innerHTML = '';
    if (item.images && item.images.length > 1) {
      item.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.className = `lightbox-thumb ${index === 0 ? 'active' : ''}`;
        thumb.src = imgSrc;
        thumb.alt = '';
        thumb.addEventListener('click', () => {
          updateMainImage(index);
          document.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
            t.classList.toggle('active', i === index);
          });
        });
        lightboxThumbnails.appendChild(thumb);
      });
    }

    lightbox.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function updateMainImage(index) {
    if (currentItem && currentItem.images) {
      currentImageIndex = index;
      lightboxImage.src = currentItem.images[index];
    }
  }

  function closeLightbox() {
    lightbox.classList.remove('visible');
    lightboxVideo.pause();
    lightboxVideo.src = '';
    document.body.style.overflow = '';
    currentItem = null;
  }

  // ============================================
  // FILTERING - Animate visible items
  // ============================================

  function filterGallery(category) {
    // First fade out items that will be hidden
    allGridItems.forEach(item => {
      const shouldShow = category === 'all' || item.dataset.category === category;
      if (!shouldShow) {
        item.style.transition = 'opacity 0.3s ease';
        item.style.opacity = '0';
      }
    });
    
    // After fade out, recalculate layout
    setTimeout(() => {
      const visibleItems = allGridItems.filter(item => {
        const shouldShow = category === 'all' || item.dataset.category === category;
        if (!shouldShow) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
        return shouldShow;
      });
      
      // Recalculate positions for visible items only
      relayoutVisibleItems(visibleItems);
      
      // Fade in
      setTimeout(() => {
        visibleItems.forEach(item => {
          item.style.transition = 'opacity 0.3s ease';
          item.style.opacity = '1';
        });
      }, 50);
    }, 300);
  }
  
  function relayoutVisibleItems(visibleItems) {
    const gap = 8;
    const topPadding = 80;
    const maxColumnWidth = 400;
    
    let columnCount = 3;
    if (window.innerWidth <= 900) columnCount = 2;
    if (window.innerWidth <= 500) columnCount = 1;
    
    const columnWidth = Math.min(maxColumnWidth, (window.innerWidth - 24 - (gap * (columnCount - 1))) / columnCount);
    const totalGridWidth = (columnWidth * columnCount) + (gap * (columnCount - 1));
    const sideMargin = (window.innerWidth - totalGridWidth) / 2;
    const columnHeights = new Array(columnCount).fill(topPadding);
    
    visibleItems.forEach((item) => {
      let shortestCol = 0;
      let shortestHeight = columnHeights[0];
      for (let c = 1; c < columnCount; c++) {
        if (columnHeights[c] < shortestHeight) {
          shortestCol = c;
          shortestHeight = columnHeights[c];
        }
      }
      
      const left = sideMargin + (shortestCol * (columnWidth + gap));
      const top = columnHeights[shortestCol];
      const aspectRatio = parseFloat(item.dataset.aspectRatio) || 1.5;
      const height = columnWidth / aspectRatio;
      
      item.style.left = left + 'px';
      item.style.top = top + 'px';
      item.style.width = columnWidth + 'px';
      item.style.height = height + 'px';
      
      columnHeights[shortestCol] += height + gap;
    });
    
    unifiedGrid.style.height = (Math.max(...columnHeights) + 60) + 'px';
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  // Enter button and Enter key trigger gallery transition
  enterBtn.addEventListener('click', transitionToGallery);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isGalleryMode) {
      transitionToGallery();
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
      closeLightbox();
    }
  });

  // About button shows intro again
  aboutBtn.addEventListener('click', showIntro);

  // Handle resize - instant re-layout
  window.addEventListener('resize', () => {
    const visibleItems = allGridItems.filter(item => item.style.display !== 'none');
    relayoutVisibleItems(visibleItems);
    
    // Update container height
    if (!isGalleryMode) {
      unifiedGrid.style.height = window.innerHeight + 'px';
    }
  });

  // ============================================
  // INIT
  // ============================================

  initGrid();
});
