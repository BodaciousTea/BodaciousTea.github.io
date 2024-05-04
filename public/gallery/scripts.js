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
            item.style.opacity = '1';
        });
        sidebarImages.forEach(img => {
            img.style.display = 'block';
            img.style.opacity = '1';
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
                item.style.opacity = '1';
            });
            sidebarImages.forEach(img => {
                img.style.opacity = '1';
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
            sidebarImages[index].style.opacity = item.style.opacity;
        });
    }

    function scrollToGalleryItem(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement.style.display !== 'none') {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});