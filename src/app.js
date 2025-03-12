document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const container = document.querySelector(".carousel-container");
    let isDragging = false;
    let isHovering = false; // Track hover state
    let startX, scrollLeft;
    let scrollAmount = 0;
    const speed = 1; // Scroll speed
    const cloneImages = [...carousel.children]; // Clone images
  
    // Clone images to simulate infinite scrolling
    cloneImages.forEach((img) => {
      const clone = img.cloneNode(true);
      carousel.appendChild(clone);
    });
  
    // Prevent image dragging
    carousel.querySelectorAll("img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });
  
    // Auto-scroll function
    const autoScroll = () => {
      if (!isDragging && !isHovering) {
        // Stop scrolling when hovering or dragging
        scrollAmount += speed; // Increment scroll position
        const maxScroll = carousel.scrollWidth / 2; // Limit to half of the duplicated content
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0; // Reset to start
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
      }
      requestAnimationFrame(autoScroll);
    };
  
    // Mouse events for manual scrolling
    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = scrollAmount;
      container.style.cursor = "grabbing";
    });
  
    container.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX; // Distance dragged
      scrollAmount = scrollLeft - walk;
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });
  
    container.addEventListener("mouseup", () => {
      isDragging = false;
      container.style.cursor = "grab";
    });
  
    container.addEventListener("mouseleave", () => {
      isDragging = false;
    });
  
    // Stop auto-scroll on hover
    container.addEventListener("mouseenter", () => {
      isHovering = true; // Set hover state to true
    });
  
    // Resume auto-scroll when hover ends
    container.addEventListener("mouseleave", () => {
      isHovering = false; // Set hover state to false
    });
  
    autoScroll(); // Start auto-scroll
  });
  
  function goBack() {
      window.history.back();
    }

    document.querySelector('.hamburger-menu').addEventListener('click', function () {
        const overlay = document.getElementById('navOverlay');
        overlay.classList.toggle('show');
      });
    
      // Close the overlay when clicking outside or on links
      document.getElementById('navOverlay').addEventListener('click', function (e) {
        if (e.target === this || e.target.tagName === 'A') {
          this.classList.remove('show');
        }
      });