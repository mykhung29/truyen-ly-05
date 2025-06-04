// Global Variables
let currentPage = 1;
let totalPages = 15;
let currentZoom = 25;
let currentTheme = "light";
let currentReadingMode = "vertical";
let isAutoScrolling = false;
let autoScrollSpeed = 1;
let autoScrollInterval;
let isFullscreen = false;
let readingStartTime = Date.now();
let gestureStartX = 0;
let gestureStartY = 0;
let isGesturing = false;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeReader();
  setupEventListeners();
  updateProgress();
  startReadingTimer();
});

function initializeReader() {
  // Show controls initially
  setTimeout(() => {
    showControls();
  }, 1000);

  // Hide controls after 3 seconds
  setTimeout(() => {
    hideControls();
  }, 4000);

  // Update page slider
  document.getElementById("pageSlider").max = totalPages;
  document.getElementById("totalPages").textContent = totalPages;

  // Load saved settings
  loadSettings();
}

function setupEventListeners() {
  // Mouse movement to show/hide controls
  let mouseTimer;
  document.addEventListener("mousemove", () => {
    showControls();
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(hideControls, 3000);
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboard);

  // Page slider
  document.getElementById("pageSlider").addEventListener("input", (e) => {
    goToPage(parseInt(e.target.value));
  });

  // Scroll speed slider
  document
    .getElementById("scrollSpeedSlider")
    .addEventListener("input", (e) => {
      autoScrollSpeed = parseFloat(e.target.value);
      document.getElementById("scrollSpeedValue").textContent =
        autoScrollSpeed + "x";
      document.getElementById("autoScrollSpeed").textContent =
        autoScrollSpeed + "x";
    });

  // Default zoom slider
  document
    .getElementById("defaultZoomSlider")
    .addEventListener("input", (e) => {
      const zoom = parseInt(e.target.value);
      document.getElementById("defaultZoomValue").textContent = zoom + "%";
      setZoom(zoom);
    });

  // Touch gestures
  setupTouchGestures();

  // Scroll tracking
  window.addEventListener("scroll", updateScrollProgress);

  // Page click navigation
  setupPageClickNavigation();
}

function setupTouchGestures() {
  const touchArea = document.getElementById("touchArea");

  touchArea.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      gestureStartX = e.touches[0].clientX;
      gestureStartY = e.touches[0].clientY;
      isGesturing = true;
    }
  });

  touchArea.addEventListener("touchmove", (e) => {
    e.preventDefault();
  });

  touchArea.addEventListener("touchend", (e) => {
    if (!isGesturing || !document.getElementById("swipeGestures").checked)
      return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - gestureStartX;
    const deltaY = touchEndY - gestureStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        previousPage();
      } else {
        nextPage();
      }
    }

    isGesturing = false;
  });
}

function setupPageClickNavigation() {
  document.addEventListener("click", (e) => {
    if (!document.getElementById("clickToTurn").checked) return;
    if (
      e.target.closest(
        ".control-panel, .bottom-controls, .floating-controls, .chapter-sidebar, .mission-panel, .settings-panel"
      )
    )
      return;

    const clickX = e.clientX;
    const windowWidth = window.innerWidth;

    if (clickX < windowWidth * 0.3) {
      previousPage();
    } else if (clickX > windowWidth * 0.7) {
      nextPage();
    }
  });
}

function handleKeyboard(e) {
  switch (e.key) {
    case "ArrowLeft":
    case "a":
    case "A":
      previousPage();
      break;
    case "ArrowRight":
    case "d":
    case "D":
      nextPage();
      break;
    case "ArrowUp":
    case "w":
    case "W":
      if (currentReadingMode === "vertical") {
        window.scrollBy(0, -200);
      }
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (currentReadingMode === "vertical") {
        window.scrollBy(0, 200);
      }
      break;
    case " ":
      e.preventDefault();
      toggleAutoScroll();
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
    case "t":
    case "T":
      toggleTheme();
      break;
    case "+":
    case "=":
      zoomIn();
      break;
    case "-":
    case "_":
      zoomOut();
      break;
    case "0":
      resetZoom();
      break;
    case "Escape":
      if (isFullscreen) {
        toggleFullscreen();
      }
      closeAllPanels();
      break;
  }
}

// Reading Mode Functions
function setReadingMode(mode) {
  currentReadingMode = mode;
  const container = document.getElementById("readingContainer");
  const pages = document.querySelectorAll(".comic-page");

  // Update active button
  document.querySelectorAll(".reading-mode-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-blue-500", "text-white");
    if (btn.dataset.mode === mode) {
      btn.classList.add("active", "bg-blue-500", "text-white");
    }
  });

  // Remove all mode classes
  container.className = "reading-container";
  pages.forEach((page) => {
    page.className = "comic-page";
  });

  // Apply new mode
  switch (mode) {
    case "vertical":
      container.classList.add("reading-mode-vertical");
      break;
    case "horizontal":
      container.classList.add("reading-mode-horizontal");
      pages.forEach((page) => page.classList.add("horizontal"));
      showCurrentPageOnly();
      break;
    case "webtoon":
      container.classList.add("reading-mode-webtoon");
      pages.forEach((page) => page.classList.add("webtoon"));
      break;
  }

  updateMissionProgress("readingMode");
}

function showCurrentPageOnly() {
  if (currentReadingMode !== "horizontal") return;

  const pages = document.querySelectorAll(".comic-page");
  pages.forEach((page, index) => {
    page.style.display = index + 1 === currentPage ? "block" : "none";
  });
}

// Navigation Functions
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageDisplay();
    updateProgress();
    if (currentReadingMode === "horizontal") {
      showCurrentPageOnly();
    }
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageDisplay();
    updateProgress();
    if (currentReadingMode === "horizontal") {
      showCurrentPageOnly();
    }
  } else {
    // End of chapter
    showChapterCompleteModal();
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    updatePageDisplay();
    updateProgress();
    if (currentReadingMode === "horizontal") {
      showCurrentPageOnly();
    }

    // Scroll to page in vertical mode
    if (currentReadingMode === "vertical") {
      const targetPage = document.querySelector(`[data-page="${page}"]`);
      if (targetPage) {
        targetPage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
}

function updatePageDisplay() {
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("pageSlider").value = currentPage;
}

function updateProgress() {
  const progress = (currentPage / totalPages) * 100;
  console.log(
    `Current Page: ${currentPage}, Total Pages: ${totalPages}, Progress: ${progress}%`
  );
  document.getElementById("progressBar").style.width = progress + "%";

  // Update mission progress
  document.getElementById("readingProgress").textContent =
    Math.round(progress) + "%";
  document.getElementById("readingProgressBar").style.width = progress + "%";
}

function updateScrollProgress() {
  if (currentReadingMode !== "vertical") return;

  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Update current page based on scroll position
  const pages = document.querySelectorAll(".comic-page");
  pages.forEach((page, index) => {
    const rect = page.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      currentPage = index + 1;
      updatePageDisplay();
    }
  });
}

// Zoom Functions
function zoomIn() {
  if (currentZoom < 100) {
    currentZoom += 25;
    setZoom(currentZoom);
    updateMissionProgress("zoom");
  }
}

function zoomOut() {
  if (currentZoom > 25) {
    currentZoom -= 25;
    setZoom(currentZoom);
  }
}

function resetZoom() {
  currentZoom = 25;
  setZoom(currentZoom);
}

function setZoom(zoom) {
  currentZoom = zoom;
  const pages = document.querySelectorAll(".comic-page");
  pages.forEach((page) => {
    page.style.width = `${zoom}%`; // Thay vì dùng scale
    page.style.height = "auto"; // Đảm bảo giữ đúng tỷ lệ ảnh
  });

  // Show zoom level
  const zoomLevel = document.getElementById("zoomLevel");
  zoomLevel.textContent = zoom + "%";
  zoomLevel.classList.add("show");
  setTimeout(() => {
    zoomLevel.classList.remove("show");
  }, 1500);
}

// Theme Functions
function toggleTheme() {
  const themes = ["light", "dark", "black", "sepia", "green"];
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.className = `theme-${theme}`;

  // Update control panels
  const panels = document.querySelectorAll(
    ".control-panel, .bottom-controls, .chapter-sidebar, .mission-panel"
  );
  const floatingElements = document.querySelectorAll(
    ".floating-btn, .nav-arrow"
  );

  panels.forEach((panel) => {
    panel.classList.toggle("dark", theme !== "light");
  });

  floatingElements.forEach((element) => {
    element.classList.toggle("dark", theme !== "light");
  });

  // Update settings panel
  const settingsPanel = document.getElementById("settingsPanel");
  settingsPanel.classList.toggle("dark", theme !== "light");

  // Update theme option buttons
  document.querySelectorAll(".theme-option").forEach((btn) => {
    btn.classList.remove("ring-2", "ring-blue-500");
    if (btn.dataset.theme === theme) {
      btn.classList.add("ring-2", "ring-blue-500");
    }
  });
}

// Auto Scroll Functions
function toggleAutoScroll() {
  if (isAutoScrolling) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
  updateMissionProgress("autoScroll");
}

function startAutoScroll() {
  if (currentReadingMode !== "vertical") return;

  isAutoScrolling = true;
  document.getElementById("autoScrollBtn").innerHTML =
    '<i class="fas fa-pause"></i>';
  document.getElementById("autoScrollIndicator").classList.add("show");

  autoScrollInterval = setInterval(() => {
    window.scrollBy(0, autoScrollSpeed * 2);

    // Auto page turn if enabled
    if (document.getElementById("autoPageTurn").checked) {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 100
      ) {
        nextPage();
      }
    }
  }, 50);
}

function stopAutoScroll() {
  isAutoScrolling = false;
  document.getElementById("autoScrollBtn").innerHTML =
    '<i class="fas fa-play"></i>';
  document.getElementById("autoScrollIndicator").classList.remove("show");

  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
  }
}

// Control Functions
function showControls() {
  document.getElementById("controlPanel").classList.add("show");
  document.getElementById("bottomControls").classList.add("show");
  document.getElementById("floatingControls").classList.add("show");
  document.getElementById("prevArrow").classList.add("show");
  document.getElementById("nextArrow").classList.add("show");
}

function hideControls() {
  document.getElementById("controlPanel").classList.remove("show");
  document.getElementById("bottomControls").classList.remove("show");
  document.getElementById("floatingControls").classList.remove("show");
  document.getElementById("prevArrow").classList.remove("show");
  document.getElementById("nextArrow").classList.remove("show");
}

function toggleChapterList() {
  const sidebar = document.getElementById("chapterSidebar");
  sidebar.classList.toggle("show");
}

function toggleMissions() {
  const panel = document.getElementById("missionPanel");
  panel.classList.toggle("show");
}

function toggleSettings() {
  document.getElementById("overlay").classList.add("show");
  document.getElementById("settingsPanel").classList.add("show");
}

function closeSettings() {
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("settingsPanel").classList.remove("show");
}

function closeAllPanels() {
  document.getElementById("chapterSidebar").classList.remove("show");
  document.getElementById("missionPanel").classList.remove("show");
  closeSettings();
}

// Fullscreen Functions
function toggleFullscreen() {
  if (!isFullscreen) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    isFullscreen = true;
    document.querySelector('[onclick="toggleFullscreen()"] i').className =
      "fas fa-compress";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullscreen = false;
    document.querySelector('[onclick="toggleFullscreen()"] i').className =
      "fas fa-expand";
  }
}

// Chapter Navigation
function previousChapter() {
  showLoading();
  setTimeout(() => {
    hideLoading();
    // Simulate loading previous chapter
    alert("Đang tải chương trước...");
  }, 1000);
}

function nextChapter() {
  showLoading();
  setTimeout(() => {
    hideLoading();
    // Simulate loading next chapter
    alert("Đang tải chương sau...");
  }, 1000);
}

function loadChapter(chapterNumber) {
  showLoading();
  setTimeout(() => {
    hideLoading();
    toggleChapterList();
    alert(`Đang tải chương ${chapterNumber}...`);
  }, 1000);
}

function goBack() {
  window.history.back();
}

// Loading Functions
function showLoading() {
  document.getElementById("loadingSpinner").classList.add("show");
}

function hideLoading() {
  document.getElementById("loadingSpinner").classList.remove("show");
}

// Mission Progress Functions
function updateMissionProgress(action) {
  switch (action) {
    case "zoom":
      // Mark zoom mission as complete
      break;
    case "readingMode":
      // Mark reading mode mission as complete
      break;
    case "autoScroll":
      // Mark auto scroll mission as complete
      break;
  }
}

function startReadingTimer() {
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - readingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById("readingTime").textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    // Update speed progress
    const targetTime = 600; // 10 minutes
    const progress = Math.min((elapsed / targetTime) * 100, 100);
    document.getElementById("speedProgressBar").style.width = progress + "%";
  }, 1000);
}

function showChapterCompleteModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                    <div class="text-6xl mb-4">🎉</div>
                    <h3 class="text-2xl font-bold mb-4">Hoàn thành chương!</h3>
                    <p class="text-gray-600 mb-6">Bạn đã đọc xong chương 179. Chuyển sang chương tiếp theo?</p>
                    <div class="flex gap-4">
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                            Ở lại
                        </button>
                        <button onclick="nextChapter(); this.closest('.fixed').remove()" class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                            Chương sau
                        </button>
                    </div>
                </div>
            `;
  document.body.appendChild(modal);
}

// Settings Functions
function loadSettings() {
  const savedTheme = localStorage.getItem("readerTheme") || "light";
  const savedZoom = localStorage.getItem("readerZoom") || "100";
  const savedScrollSpeed = localStorage.getItem("scrollSpeed") || "1";

  setTheme(savedTheme);
  setZoom(parseInt(savedZoom));
  document.getElementById("scrollSpeedSlider").value = savedScrollSpeed;
  document.getElementById("scrollSpeedValue").textContent =
    savedScrollSpeed + "x";
  autoScrollSpeed = parseFloat(savedScrollSpeed);
}

function saveSettings() {
  localStorage.setItem("readerTheme", currentTheme);
  localStorage.setItem("readerZoom", currentZoom.toString());
  localStorage.setItem("scrollSpeed", autoScrollSpeed.toString());
}

function resetSettings() {
  localStorage.removeItem("readerTheme");
  localStorage.removeItem("readerZoom");
  localStorage.removeItem("scrollSpeed");

  setTheme("light");
  setZoom(100);
  document.getElementById("scrollSpeedSlider").value = "1";
  document.getElementById("scrollSpeedValue").textContent = "1x";
  autoScrollSpeed = 1;

  // Reset checkboxes
  document.getElementById("autoPageTurn").checked = false;
  document.getElementById("fitToWidth").checked = true;
  document.getElementById("swipeGestures").checked = true;
  document.getElementById("clickToTurn").checked = true;
}

// Auto-save settings on change
window.addEventListener("beforeunload", saveSettings);

// Handle fullscreen change
document.addEventListener("fullscreenchange", () => {
  isFullscreen = !!document.fullscreenElement;
  const icon = document.querySelector('[onclick="toggleFullscreen()"] i');
  icon.className = isFullscreen ? "fas fa-compress" : "fas fa-expand";
});

// Prevent context menu on images
document.addEventListener("contextmenu", (e) => {
  if (e.target.classList.contains("comic-page")) {
    e.preventDefault();
  }
});

// Handle page visibility change
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isAutoScrolling) {
    stopAutoScroll();
  }
});

// Initialize reading mode
setReadingMode("vertical");
