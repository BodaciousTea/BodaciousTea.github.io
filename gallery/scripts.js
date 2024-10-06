document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const sidebarImages = document.querySelectorAll('#sidebar img');
    const navLinks = document.querySelectorAll('.navlinks a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.dataset.filter;
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                fadeEffect(showAllImages);
            } else {
                updateActiveLink(this);
                fadeEffect(() => filterImages(filter));
            }
        });
    });

    sidebarImages.forEach(img => {
        img.addEventListener('click', function() {
            const targetId = this.dataset.target;
            scrollToGalleryItem(targetId);
        });
    });

    function updateActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function showAllImages() {
        galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = ''; // Reset opacity to CSS default
        });
        sidebarImages.forEach(img => {
            img.style.display = 'block';
            img.style.opacity = ''; // Reset opacity to CSS default
        });
    }

    function fadeEffect(callback) {
        fadeOutImages();
        setTimeout(() => {
            callback();
            fadeInImages();
        }, 100); // Reduced fade-out duration for quicker response
    }

    function fadeOutImages() {
        galleryItems.forEach(item => item.style.opacity = '0');
        sidebarImages.forEach(img => img.style.opacity = '0');
    }

    function fadeInImages() {
        setTimeout(() => {
            galleryItems.forEach(item => {
                item.style.opacity = ''; // Reset opacity to CSS default
            });
            sidebarImages.forEach(img => {
                img.style.opacity = ''; // Reset opacity to CSS default
            });
        }, 100); // Reduced fade-in delay for smoother transition
    }

    function filterImages(filter) {
        galleryItems.forEach((item, index) => {
            if (item.classList.contains(filter)) {
                item.style.display = 'block';
                item.style.opacity = '0'; // Ensure opacity is reset for a clean fade-in
            } else {
                item.style.display = 'none';
            }
            sidebarImages[index].style.display = item.style.display;
            sidebarImages[index].style.opacity = item.style.display === 'block' ? '' : '0'; // Reset or set opacity based on display
        });
    }

    function scrollToGalleryItem(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement.style.display !== 'none') {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});


/* Video Carousel */
document.addEventListener('DOMContentLoaded', function () {
    const radios = document.querySelectorAll('input[name="slider"]');
    const cards = document.querySelectorAll('.cards label');
    const videos = document.querySelectorAll('.carousel-video');
    const videoPlayer = document.querySelector('.video-player');
    const videoPlayerInfo = document.querySelector('.video-info'); // Video info block
    const videoPlayerTitle = document.querySelector('.video-info .title');
    const videoPlayerLink = document.querySelector('.youtube-link');
    const videoPlayerDuration = document.querySelector('.duration');

    let currentIndex = 0;

    // Function to update the video player with the current video info
    function updateVideoPlayer() {
        const currentVideoCard = cards[currentIndex];
        const videoTitle = currentVideoCard.getAttribute('data-title');
        const videoLink = currentVideoCard.getAttribute('data-link');
        const videoDuration = currentVideoCard.getAttribute('data-duration');

        // Fade out the video-info text with slide-down effect
        videoPlayerInfo.classList.remove('visible');
        videoPlayerInfo.classList.add('hidden');

        // Wait for the fade-out animation to complete, then update the content
        setTimeout(() => {
            // Update the video player details
            videoPlayerTitle.innerText = videoTitle;
            videoPlayerLink.setAttribute('onclick', `window.open('${videoLink}', '_blank')`);
            videoPlayerDuration.innerText = videoDuration;

            // Fade back in with slide-up effect
            videoPlayerInfo.classList.remove('hidden');
            videoPlayerInfo.classList.add('visible');
        }, 500); // Delay matches the transition duration (0.5s)
    }

    // Function to update the carousel view
    function updateCarousel() {
        // Hide all cards initially and pause all videos
        cards.forEach((card, index) => {
            card.classList.remove('active-card', 'left-card', 'right-card');
            card.style.display = 'none'; // Hide all cards
            videos[index].pause(); // Pause all videos
            videos[index].currentTime = 0; // Reset video to the beginning
        });

        // Calculate the previous and next card indices
        let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        let nextIndex = (currentIndex + 1) % cards.length;

        // Show the previous, current, and next cards
        cards[prevIndex].style.display = 'flex';
        cards[prevIndex].classList.add('left-card');

        cards[currentIndex].style.display = 'flex';
        cards[currentIndex].classList.add('active-card');
        videos[currentIndex].play(); // Play the center video

        cards[nextIndex].style.display = 'flex';
        cards[nextIndex].classList.add('right-card');

        // Update the video player with the current video details
        updateVideoPlayer();
    }

    // Move the carousel to the next or previous video
    function moveCarousel(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % cards.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        updateCarousel();
    }

    // Add click event listeners to the left and right cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('left-card')) {
                moveCarousel('prev');
            } else if (card.classList.contains('right-card')) {
                moveCarousel('next');
            }
        });
    });

    // Add event listeners to the radio buttons
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Initial setup
    updateCarousel();
});
