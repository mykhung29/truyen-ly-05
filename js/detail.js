// Scroll Progress
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// Tab Functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanes = document.querySelectorAll(".tab-pane");
const tabIndicator = document.getElementById("tabIndicator");

function updateTabIndicator(activeTab) {
  const tabRect = activeTab.getBoundingClientRect();
  const containerRect = activeTab.parentElement.getBoundingClientRect();
  const left = tabRect.left - containerRect.left;
  const width = tabRect.width;

  tabIndicator.style.left = left + "px";
  tabIndicator.style.width = width + "px";
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tab;

    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Update active tab pane
    tabPanes.forEach((pane) => pane.classList.remove("active"));
    document.getElementById(targetTab).classList.add("active");

    // Update tab indicator
    updateTabIndicator(button);
  });
});

// Initialize tab indicator
const activeTab = document.querySelector(".tab-button.active");
if (activeTab) {
  updateTabIndicator(activeTab);
}

// Action Button Interactions
const likeBtn = document.getElementById("likeBtn");
const bookmarkBtn = document.getElementById("bookmarkBtn");

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("liked");
  const icon = likeBtn.querySelector("i");
  const text = likeBtn.querySelector("span");

  if (likeBtn.classList.contains("liked")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    text.textContent = "Đã thích (450.1K)";
    likeBtn.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
    text.textContent = "Yêu thích (450K)";
    likeBtn.style.background = "";
  }
});

bookmarkBtn.addEventListener("click", () => {
  bookmarkBtn.classList.toggle("bookmarked");
  const icon = bookmarkBtn.querySelector("i");
  const text = bookmarkBtn.querySelector("span");

  if (bookmarkBtn.classList.contains("bookmarked")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    text.textContent = "Đã lưu";
    bookmarkBtn.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
    text.textContent = "Đánh dấu";
    bookmarkBtn.style.background = "";
  }
});

// Modal Functions
function openShareModal() {
  document.getElementById("shareModal").classList.add("show");
}

function closeShareModal() {
  document.getElementById("shareModal").classList.remove("show");
}

function openRatingModal() {
  document.getElementById("ratingModal").classList.add("show");
}

function closeRatingModal() {
  document.getElementById("ratingModal").classList.remove("show");
}

function openImageModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageSrc;
  modal.classList.add("show");
}

function closeImageModal() {
  document.getElementById("imageModal").classList.remove("show");
}

// Copy Link Function
function copyLink() {
  const linkInput = document.querySelector('input[value*="comicverse.com"]');
  linkInput.select();
  document.execCommand("copy");

  // Show feedback
  const copyBtn = event.target.closest("button");
  const originalText = copyBtn.innerHTML;
  copyBtn.innerHTML = '<i class="fas fa-check"></i>';
  copyBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

  setTimeout(() => {
    copyBtn.innerHTML = originalText;
    copyBtn.style.background = "";
  }, 2000);
}

// Rating System
const ratingStars = document.querySelectorAll("#ratingModal .star");
let currentRating = 0;

ratingStars.forEach((star, index) => {
  star.addEventListener("click", () => {
    currentRating = index + 1;
    updateStarDisplay();
  });

  star.addEventListener("mouseenter", () => {
    highlightStars(index + 1);
  });
});

function updateStarDisplay() {
  ratingStars.forEach((star, index) => {
    if (index < currentRating) {
      star.textContent = "★";
      star.style.color = "#fbbf24";
    } else {
      star.textContent = "☆";
      star.style.color = "#d1d5db";
    }
  });
}

function highlightStars(rating) {
  ratingStars.forEach((star, index) => {
    if (index < rating) {
      star.style.color = "#fbbf24";
    } else {
      star.style.color = "#d1d5db";
    }
  });
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("show");
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".floating-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Progress ring animation
function animateProgressRing() {
  const circle = document.querySelector(".progress-ring-circle");
  const progress = 75; // 75% progress
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// Initialize animations
setTimeout(animateProgressRing, 500);

// Mission progress animation
function animateMissionProgress() {
  const progressBars = document.querySelectorAll(".mission-progress-fill");
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.transition = "width 1s ease";
    }, index * 200);
  });
}

setTimeout(animateMissionProgress, 1000);
