// Search functionality
function showSuggestions(query) {
  const suggestions = document.getElementById("searchSuggestions");
  if (query.length > 0) {
    suggestions.style.display = "block";
  } else {
    suggestions.style.display = "none";
  }
}

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  const searchContainer = document.querySelector(".header-search");
  const suggestions = document.getElementById("searchSuggestions");
  if (!searchContainer.contains(e.target)) {
    suggestions.style.display = "none";
  }
});

// View Toggle
function setView(viewType) {
  const gridContainer = document.getElementById("comicsGrid");
  const viewButtons = document.querySelectorAll(".view-btn");

  // Update button states
  viewButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.closest(".view-btn").classList.add("active");

  // Update grid class
  if (viewType === "list") {
    gridContainer.className = "comics-list";
    // Add list-view class to all cards
    document.querySelectorAll(".comic-card").forEach((card) => {
      card.classList.add("list-view");
    });
  } else {
    gridContainer.className = "comics-grid";
    // Remove list-view class from all cards
    document.querySelectorAll(".comic-card").forEach((card) => {
      card.classList.remove("list-view");
    });
  }
}

// Filter Toggle
function toggleFilter(element) {
  const checkbox = element.querySelector(".filter-checkbox");
  checkbox.classList.toggle("checked");

  // Add animation
  element.style.transform = "scale(0.95)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 150);

  // Update results (simulate)
  updateResults();
}

// Sort Comics
function sortComics(sortType) {
  const container = document.getElementById("comicsGrid");
  const cards = Array.from(container.children);

  // Add loading state
  container.style.opacity = "0.5";

  setTimeout(() => {
    // Simulate sorting animation
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
    });

    container.style.opacity = "1";
  }, 500);
}

// Clear All Filters
function clearAllFilters() {
  document.querySelectorAll(".filter-checkbox.checked").forEach((checkbox) => {
    checkbox.classList.remove("checked");
  });

  // Reset year range
  document.getElementById("yearRange").value = 2020;
  document.getElementById("yearValue").textContent = "2020";

  updateResults();
}

// Update Results
function updateResults() {
  // Simulate API call
  const resultsInfo = document.querySelector(".results-info");
  resultsInfo.style.opacity = "0.5";

  setTimeout(() => {
    resultsInfo.style.opacity = "1";
    // Update count would happen here
  }, 300);
}

// Year Range Slider
document.getElementById("yearRange").addEventListener("input", function () {
  document.getElementById("yearValue").textContent = this.value;
});

// Pagination
function nextPage() {
  // Add loading animation
  const container = document.getElementById("comicsContainer");
  container.innerHTML =
    '<div class="loading"><div class="spinner"></div></div>';

  // Simulate loading
  setTimeout(() => {
    // Reload content (simulate)
    location.reload();
  }, 1000);
}

// Smooth scroll to top when changing pages
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll animations
function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  document.querySelectorAll(".comic-card").forEach((card) => {
    observer.observe(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addScrollAnimations();

  // Add hover effects to cards
  document.querySelectorAll(".comic-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click handlers for suggestion items
  document.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", function () {
      const searchInput = document.querySelector(".search-input");
      searchInput.value = this.textContent.trim();
      document.getElementById("searchSuggestions").style.display = "none";
    });
  });
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "g":
      if (!e.target.matches("input")) {
        setView("grid");
      }
      break;
    case "l":
      if (!e.target.matches("input")) {
        setView("list");
      }
      break;
    case "c":
      if (!e.target.matches("input")) {
        clearAllFilters();
      }
      break;
    case "/":
      e.preventDefault();
      document.querySelector(".search-input").focus();
      break;
  }
});

// Mobile touch gestures
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next page
      nextPage();
    } else {
      // Swipe right - previous page
      // prevPage();
    }
  }
}

// Add dynamic effects
setInterval(() => {
  const trendingItems = document.querySelectorAll(".trending-item");
  trendingItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transform = "scale(1.02)";
      setTimeout(() => {
        item.style.transform = "scale(1)";
      }, 200);
    }, index * 100);
  });
}, 5000);
