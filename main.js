document.addEventListener("DOMContentLoaded", () => {
  // === NAVIGATION TOGGLE ===
  const toggleButton = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // === IMAGE SLIDER ===
  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const slides = document.querySelectorAll(".slide");
  const slideIcons = document.querySelectorAll(".slide-icon");

  let slideNumber = 0;
  const numberOfSlides = slides.length;
  let playSlider;

  const changeSlide = (increment = 1) => {
    slides.forEach(slide => slide.classList.remove("active"));
    slideIcons.forEach(icon => icon.classList.remove("active"));
    slideNumber = (slideNumber + increment + numberOfSlides) % numberOfSlides;
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  };

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener("click", () => changeSlide(1));
    prevBtn.addEventListener("click", () => changeSlide(-1));

    const repeater = () => {
      playSlider = setInterval(() => changeSlide(1), 4000);
    };
    repeater();

    if (slider) {
      slider.addEventListener("mouseover", () => clearInterval(playSlider));
      slider.addEventListener("mouseout", repeater);
    }
  }

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // === LAZY LOAD IMAGES ===
  document.querySelectorAll("img").forEach(img => {
    img.loading = "lazy";
  });

  // === ACTIVE NAV ITEM HIGHLIGHT ===
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach(item => {
    if (item.getAttribute("href") === currentPath) {
      item.classList.add("active-link");
    }
  });

  // === TABS LOGIC ===
  const tabLists = document.querySelectorAll(".tabs_list ul li");
  const tabItems = document.querySelectorAll(".tab_item");

  tabLists.forEach(list => {
    list.addEventListener("click", () => {
      const tabData = list.getAttribute("data-tc");
      tabLists.forEach(el => el.classList.remove("active"));
      list.classList.add("active");

      tabItems.forEach(item => {
        const tabClass = item.className.split(" ");
        item.style.display = tabClass.includes(tabData) ? "block" : "none";
      });
    });
  });

  // === IMAGE ZOOM ===
  const zoomOverlay = document.getElementById("image-zoom-overlay");
  const zoomedImg = document.getElementById("zoomed-img");

  if (zoomOverlay && zoomedImg) {
    document.querySelectorAll(".zoomable-image").forEach(img => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        zoomedImg.src = img.src;
        zoomOverlay.style.display = "flex";
      });
    });

    zoomOverlay.addEventListener("click", () => {
      zoomOverlay.style.display = "none";
    });
  }

  // === DROPDOWN TOGGLES ===
  document.querySelectorAll('[data-toggle="dropdown"]').forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.closest(".dropdown");
      parent.classList.toggle("active");

      document.querySelectorAll(".dropdown").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });
    });
  });

  document.querySelectorAll('[data-toggle="sub-dropdown"]').forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.closest(".sub-dropdown");
      parent.classList.toggle("active");

      document.querySelectorAll(".sub-dropdown").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });
    });
  });

  // === CLOSE DROPDOWNS ON OUTSIDE CLICK ===
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown, .sub-dropdown").forEach(item =>
        item.classList.remove("active")
      );
    }
  });
});
