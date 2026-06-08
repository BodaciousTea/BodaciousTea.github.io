document.addEventListener('DOMContentLoaded', () => {
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

  function isVideo(src) {
    return src && src.toLowerCase().endsWith('.mp4');
  }

  function initGrid() {
    const itemsToShow = portfolioData.map((item, index) => ({ ...item, _uniqueId: index }));

    for (let i = itemsToShow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemsToShow[i], itemsToShow[j]] = [itemsToShow[j], itemsToShow[i]];
    }

    totalImages = itemsToShow.length;

    itemsToShow.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'grid-item';
      div.dataset.id = item.id;
      div.dataset.uniqueId = item._uniqueId;
      
      if (isVideo(item.thumbnail)) {
        const video = document.createElement('video');
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';       
        video.setAttribute('disablePictureInPicture', '');
        div.appendChild(video);
        div.classList.add('video-item');
        
        let metadataLoaded = false;

video.preload = 'metadata';
video.src = item.thumbnail;

video.addEventListener('loadedmetadata', () => {
  if (!metadataLoaded) {
    metadataLoaded = true;
    div.dataset.aspectRatio = video.videoWidth / video.videoHeight;
    imageLoaded();
  }
});

video.addEventListener('canplay', () => {
  video.play().catch(() => {});
});

video.addEventListener('error', () => {
  if (!metadataLoaded) {
    metadataLoaded = true;
    div.dataset.aspectRatio = 16 / 9;
    imageLoaded();
  }
});

setTimeout(() => {
  if (!metadataLoaded) {
    metadataLoaded = true;
    div.dataset.aspectRatio = 16 / 9;
    imageLoaded();
  }
}, 5000);
        
      } else {
        const img = document.createElement('img');
        img.src = item.thumbnail;
        img.alt = item.title || '';
        img.onload = () => {
          div.dataset.aspectRatio = img.naturalWidth / img.naturalHeight;
          imageLoaded();
        };
        img.onerror = () => {
          div.dataset.aspectRatio = 1.5;
          imageLoaded();
        };
        div.appendChild(img);
      }
      
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
      layoutGalleryGrid();
      startIntroAnimation();
      
      setTimeout(() => {
        allGridItems.forEach(item => {
          const video = item.querySelector('video');
          if (video && (video.paused || video.readyState < 3)) {
            video.src = video.src.split('?')[0] + '?t=' + Date.now();
            video.load();
            video.play().catch(() => {});
          }
        });
      }, 2000);
      
      setTimeout(() => {
        allGridItems.forEach(item => {
          const video = item.querySelector('video');
          if (video && (video.paused || video.readyState < 3)) {
            video.src = video.src.split('?')[0] + '?t=' + Date.now();
            video.load();
            video.play().catch(() => {});
          }
        });
      }, 5000);
      
      setTimeout(() => {
        allGridItems.forEach(item => {
          const video = item.querySelector('video');
          if (video && (video.paused || video.readyState < 3)) {
            video.src = video.src.split('?')[0] + '?t=' + Date.now();
            video.load();
            video.play().catch(() => {});
          }
        });
      }, 10000);
    }
  }
  
  function layoutGalleryGrid() {
    const { positions } = calculateVerticalMasonryPositions();
    
    allGridItems.forEach((item, i) => {
      const pos = positions[i];
      item.style.position = 'absolute';
      item.style.left = pos.left + 'px';
      item.style.top = pos.top + 'px';
      item.style.width = pos.width + 'px';
      item.style.height = pos.height + 'px';
    });
    
    const containerHeight = window.innerHeight;
    unifiedGrid.style.height = containerHeight + 'px';
    unifiedGrid.style.overflow = 'hidden';
  }
  
  function startIntroAnimation() {
    setTimeout(() => {
      introCenter.classList.add('visible');
    }, 800);
    
    setTimeout(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
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
      
      itemsWithDistance.sort((a, b) => a.distance - b.distance);
      
      itemsWithDistance.forEach(({ item }, i) => {
        const delay = i * 40;
        setTimeout(() => {
          item.classList.add('revealed');
        }, delay);
      });
    }, 400);
  }

  function calculateVerticalMasonryPositions() {
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
    const positions = [];
    
    allGridItems.forEach((item) => {
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
      
      positions.push({
        left: left,
        top: top,
        width: columnWidth,
        height: height
      });
      
      columnHeights[shortestCol] += height + gap;
    });
    
    const totalHeight = Math.max(...columnHeights) + 60;
    return { positions, totalHeight };
  }

  function transitionToGallery() {
    if (isGalleryMode) return;
    isGalleryMode = true;
    
    setTimeout(() => {
      const { totalHeight } = calculateVerticalMasonryPositions();
      
      introCenter.classList.add('hidden');
      introOverlays.classList.add('hidden');
      introNoise.classList.add('hidden');
      mainNav.classList.add('visible');
      document.body.classList.add('scrollable');
      
      unifiedGrid.style.height = totalHeight + 'px';
      unifiedGrid.style.overflow = 'visible';
      
      allGridItems.forEach((item) => {
        item.classList.add('gallery-mode');
      });
    }, 150);
  }
  
  function showIntro() {
    isGalleryMode = false;
    
    window.scrollTo(0, 0);
    
    mainNav.classList.remove('visible');
    
    allGridItems.forEach((item) => {
      item.classList.remove('gallery-mode');
    });
    
    setTimeout(() => {
      introOverlays.classList.remove('hidden');
      introNoise.classList.remove('hidden');
      introCenter.classList.remove('hidden');
      document.body.classList.remove('scrollable');
      
      unifiedGrid.style.height = window.innerHeight + 'px';
      unifiedGrid.style.overflow = 'hidden';
    }, 50);
  }

  function openLightbox(item) {
    currentItem = item;
    currentImageIndex = 0;
    
    const allImages = [item.thumbnail, ...(item.images || [])];

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

    if (isVideo(item.thumbnail)) {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = item.thumbnail;
      lightboxVideo.play();
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxImage.style.display = 'block';
      lightboxImage.src = allImages[0];
    }

    lightboxThumbnails.innerHTML = '';
    if (allImages.length > 1 && !isVideo(item.thumbnail)) {
      allImages.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.className = `lightbox-thumb ${index === 0 ? 'active' : ''}`;
        thumb.src = imgSrc;
        thumb.alt = '';
        thumb.addEventListener('click', () => {
          currentImageIndex = index;
          lightboxImage.src = allImages[index];
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

  function closeLightbox() {
    lightbox.classList.remove('visible');
    lightboxVideo.pause();
    lightboxVideo.src = '';
    document.body.style.overflow = '';
    currentItem = null;
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

  aboutBtn.addEventListener('click', showIntro);

  window.addEventListener('resize', () => {
    const visibleItems = allGridItems.filter(item => item.style.display !== 'none');
    relayoutVisibleItems(visibleItems);
    
    if (!isGalleryMode) {
      unifiedGrid.style.height = window.innerHeight + 'px';
    }
  });

  initGrid();
});
