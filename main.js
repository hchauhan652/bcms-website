document.addEventListener("DOMContentLoaded", () => {
  // === RESPONSIVE NAV TOGGLE ===
  const barsIcon = document.getElementById("bars");
  const timesIcon = document.getElementById("times");
  const navLinks = document.getElementById("nav-links");
  const barLabel = document.querySelector(".bar");

  if (barsIcon && timesIcon && barLabel && navLinks) {
    barsIcon.style.display = "inline";
    timesIcon.style.display = "none";

    barLabel.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isOpen = navLinks.classList.contains("active");
      barsIcon.style.display = isOpen ? "none" : "inline";
      timesIcon.style.display = isOpen ? "inline" : "none";
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

  const updateSlider = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === slideNumber);
    });
    slideIcons.forEach((icon, index) => {
      icon.classList.toggle("active", index === slideNumber);
    });
  };

  if (nextBtn && prevBtn && numberOfSlides > 0) {
    nextBtn.addEventListener("click", () => {
      slideNumber = (slideNumber + 1) % numberOfSlides;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      slideNumber = (slideNumber - 1 + numberOfSlides) % numberOfSlides;
      updateSlider();
    });

    let playSlider = setInterval(() => {
      slideNumber = (slideNumber + 1) % numberOfSlides;
      updateSlider();
    }, 4000);

    if (slider) {
      slider.addEventListener("mouseover", () => clearInterval(playSlider));
      slider.addEventListener("mouseout", () => {
        playSlider = setInterval(() => {
          slideNumber = (slideNumber + 1) % numberOfSlides;
          updateSlider();
        }, 4000);
      });
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
        const classes = item.className.split(" ");
        item.style.display = classes.includes(tabData) ? "block" : "none";
      });
    });
  });

  // === IMAGE ZOOM MODAL ===
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

  // === DROPDOWN & SUB-DROPDOWN TOGGLE ===
  document.querySelectorAll('[data-toggle="dropdown"]').forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      const parent = toggle.closest(".dropdown");
      parent.classList.toggle("active");

      document.querySelectorAll(".dropdown").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });
    });
  });

  document.querySelectorAll('[data-toggle="sub-dropdown"]').forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      const parent = toggle.closest(".sub-dropdown");
      parent.classList.toggle("active");

      document.querySelectorAll(".sub-dropdown").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });
    });
  });

  // === CLOSE DROPDOWNS ON OUTSIDE CLICK ===
  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown, .sub-dropdown")) {
      document.querySelectorAll(".dropdown, .sub-dropdown").forEach(item =>
        item.classList.remove("active")
      );
    }
  });

  // === IMAGE MODALS (PRODUCTS) ===
  document.querySelectorAll(".part-image").forEach(img => {
    img.addEventListener("click", () => {
      const modalId = img.dataset.modal;
      document.getElementById(modalId).style.display = "block";
    });
  });

  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    document.querySelectorAll(".modal").forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // === FIX: KEEP SUB-DROPDOWN OPEN LONG ENOUGH TO CLICK ===
  let timeout;

  document.querySelectorAll(".main-nav li").forEach(item => {
    item.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      const submenu = item.querySelector(".sub-dropdown");
      if (submenu) submenu.classList.add("show");
    });

    item.addEventListener("mouseleave", () => {
      const submenu = item.querySelector(".sub-dropdown");
      timeout = setTimeout(() => {
        if (submenu) submenu.classList.remove("show");
      }, 300); // Delay for smoother user experience
    });
  });
});
