// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileSearchBtn = document.querySelector(".md\\:hidden");
const mobileSearch = document.getElementById("mobile-search");
const mobileSearchClose = document.getElementById("mobile-search-close");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterBtn = document.getElementById("newsletter-btn");

// Mobile Menu Toggle
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains("translate-x-0");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  mobileMenu.classList.remove("-translate-x-full");
  mobileMenu.classList.add("translate-x-0");
  mobileMenuOverlay.classList.remove("opacity-0", "invisible");
  mobileMenuOverlay.classList.add("opacity-100", "visible");

  // Hamburger animation
  const lines = mobileMenuBtn.querySelectorAll("span");
  lines[0].style.transform = "rotate(45deg) translate(2px, 2px)";
  lines[0].style.background = "#3b82f6";
  lines[1].style.opacity = "0";
  lines[1].style.transform = "translateX(-10px)";
  lines[2].style.transform = "rotate(-45deg) translate(2px, -2px)";
  lines[2].style.background = "#3b82f6";

  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("-translate-x-full");
  mobileMenuOverlay.classList.remove("opacity-100", "visible");
  mobileMenuOverlay.classList.add("opacity-0", "invisible");

  // Reset hamburger animation
  const lines = mobileMenuBtn.querySelectorAll("span");
  lines[0].style.transform = "rotate(0deg)";
  lines[0].style.background = "#334155";
  lines[1].style.opacity = "1";
  lines[1].style.transform = "translateX(0)";
  lines[2].style.transform = "rotate(0deg)";
  lines[2].style.background = "#334155";

  document.body.style.overflow = "";
}

// Event Listeners
mobileMenuBtn.addEventListener("click", toggleMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

mobileSearchClose.addEventListener("click", () => {
  mobileSearch.classList.remove("translate-y-0");
  mobileSearch.classList.add("-translate-y-full");
});

// Newsletter Form
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterEmail.value.trim();

  if (email && isValidEmail(email)) {
    const originalText = newsletterBtn.innerHTML;
    newsletterBtn.innerHTML =
      '<i class="fas fa-spinner animate-spin"></i> Đang xử lý...';
    newsletterBtn.disabled = true;

    setTimeout(() => {
      newsletterBtn.innerHTML = '<i class="fas fa-check"></i> Thành công!';
      newsletterBtn.classList.remove("from-primary-600", "to-secondary-600");
      newsletterBtn.classList.add("from-green-500", "to-green-600");
      newsletterEmail.value = "";

      setTimeout(() => {
        newsletterBtn.innerHTML = originalText;
        newsletterBtn.classList.remove("from-green-500", "to-green-600");
        newsletterBtn.classList.add("from-primary-600", "to-secondary-600");
        newsletterBtn.disabled = false;
      }, 2000);
    }, 1000);
  } else {
    newsletterEmail.classList.add("border-red-500", "ring-red-100");
    newsletterBtn.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Email không hợp lệ!';
    newsletterBtn.classList.remove("from-primary-600", "to-secondary-600");
    newsletterBtn.classList.add("from-red-500", "to-red-600");

    setTimeout(() => {
      newsletterEmail.classList.remove("border-red-500", "ring-red-100");
      newsletterBtn.innerHTML = "Đăng ký";
      newsletterBtn.classList.remove("from-red-500", "to-red-600");
      newsletterBtn.classList.add("from-primary-600", "to-secondary-600");
    }, 2000);
  }
});

// Search Functionality
function performSearch(query) {
  if (query.trim()) {
    console.log("Searching for:", query);
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    // Add your search logic here
  }
}

// Desktop Search
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch(e.target.value);
      }
    });
  }
});

// Mobile Search
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input-mobile");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch(e.target.value);
      }
    });
  }
});

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "/") {
    e.preventDefault();
    if (window.innerWidth >= 768) {
      document.querySelector(".md\\:flex input").focus();
    } else {
      mobileSearch.classList.remove("-translate-y-full");
      mobileSearch.classList.add("translate-y-0");
      setTimeout(() => {
        mobileSearch.querySelector("input").focus();
      }, 300);
    }
  }

  if (e.key === "Escape") {
    closeMobileMenu();
    mobileSearch.classList.remove("translate-y-0");
    mobileSearch.classList.add("-translate-y-full");
  }
});

// Window Resize Handler
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    closeMobileMenu();
  }

  if (window.innerWidth >= 768) {
    mobileSearch.classList.remove("translate-y-0");
    mobileSearch.classList.add("-translate-y-full");
  }
});

// Click handlers for action buttons
document.querySelectorAll("button[title]").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Action:", btn.title);
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 150);
  });
});




document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('categoriesmobile');
    const submenu = document.getElementById('categories-submenu');

    btn.addEventListener('click', function () {
        submenu.classList.toggle('hidden');
    });
});
