
document.addEventListener("DOMContentLoaded", () => {
  // Select the haircut section and its images
  const haircutSection = document.querySelector(".haircut");
  const images = haircutSection.querySelectorAll("img");

  // Create the lightbox container
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.style.position = "fixed";
  lightbox.style.top = "0";
  lightbox.style.left = "0";
  lightbox.style.width = "100vw";
  lightbox.style.height = "100vh";
  lightbox.style.background = "rgba(0, 0, 0, 0.8)";
  lightbox.style.display = "flex";
  lightbox.style.alignItems = "center";
  lightbox.style.justifyContent = "center";
  lightbox.style.zIndex = "1000";
  lightbox.style.opacity = "0";
  lightbox.style.transition = "opacity 0.3s ease";
  document.body.appendChild(lightbox);

  // Lightbox content
  const lightboxImage = document.createElement("img");
  lightboxImage.style.maxWidth = "90%";
  lightboxImage.style.maxHeight = "90%";
  lightbox.appendChild(lightboxImage);

  // Navigation buttons
  const prevButton = document.createElement("button");
  prevButton.innerText = "❮";
  prevButton.style.position = "absolute";
  prevButton.style.left = "5%";
  prevButton.style.fontSize = "2rem";
  prevButton.style.color = "#fff";
  prevButton.style.background = "none";
  prevButton.style.border = "none";
  prevButton.style.cursor = "pointer";
  prevButton.style.display = "none";
  lightbox.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "❯";
  nextButton.style.position = "absolute";
  nextButton.style.right = "5%";
  nextButton.style.fontSize = "2rem";
  nextButton.style.color = "#fff";
  nextButton.style.background = "none";
  nextButton.style.border = "none";
  nextButton.style.cursor = "pointer";
  nextButton.style.display = "none";
  lightbox.appendChild(nextButton);

  // Variables for image navigation
  let currentIndex = -1;

  // Function to show the lightbox
  const showLightbox = (index) => {
    currentIndex = index;
    lightboxImage.src = images[index].src;
    lightbox.style.opacity = "1";
    lightbox.style.pointerEvents = "auto";
    prevButton.style.display = index > 0 ? "block" : "none";
    nextButton.style.display = index < images.length - 1 ? "block" : "none";
  };

  // Function to hide the lightbox
  const hideLightbox = () => {
    lightbox.style.opacity = "0";
    lightbox.style.pointerEvents = "none";
  };

  // Function to navigate to the previous image
  const showPrevImage = () => {
    if (currentIndex > 0) {
      showLightbox(currentIndex - 1);
    }
  };

  // Function to navigate to the next image
  const showNextImage = () => {
    if (currentIndex < images.length - 1) {
      showLightbox(currentIndex + 1);
    }
  };

  // Attach click event listeners to images
  images.forEach((img, index) => {
    img.addEventListener("click", () => showLightbox(index));
  });

  // Close lightbox when clicking outside the image or pressing Escape
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImage && e.target !== prevButton && e.target !== nextButton) {
      hideLightbox();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideLightbox();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  });

  // Attach click event listeners to navigation buttons
  prevButton.addEventListener("click", showPrevImage);
  nextButton.addEventListener("click", showNextImage);

  // Smooth scroll to the haircut section (optional)
  document.querySelector("div").addEventListener("click", () => {
    haircutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
