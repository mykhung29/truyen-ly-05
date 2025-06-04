// Scroll Animation
const animatedElements = document.querySelectorAll(
  ".fade-in-up, .fade-in, .scale-in, .slide-in-left, .slide-in-right"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// Initialize Advanced Hero Swiper
const heroSwiperAdvanced = new Swiper(".hero-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".swiper-pagination-custom",
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  on: {
    slideChange: function () {},
  },
});

// Ranking Tab Functionality
const rankingTabs = document.querySelectorAll(".ranking-tab");
rankingTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const period = tab.dataset.period;

    // Update active tab
    rankingTabs.forEach((t) => {
      t.classList.remove("active");
      t.classList.add("text-gray-600", "hover:text-gray-900");
    });
    tab.classList.add("active");
    tab.classList.remove("text-gray-600", "hover:text-gray-900");

    console.log("Switched to ranking period:", period);

    // Here you would typically fetch and update the ranking data
    // For demo purposes, we'll just log the action
    if (period === "week") {
      console.log("Loading weekly rankings...");
    } else {
      console.log("Loading monthly rankings...");
    }
  });
});

// Live Search Functionality
const searchInput = document.getElementById("live-search");
const searchResults = document.getElementById("search-results");
let searchTimeout;

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  clearTimeout(searchTimeout);

  if (query.length < 2) {
    searchResults.classList.remove("show");
    return;
  }

  searchTimeout = setTimeout(() => {
    // Simulate search results
    const mockResults = [
      { title: "Solo Leveling", type: "Manhwa", chapter: "Chương 179" },
      { title: "Tower of God", type: "Manhwa", chapter: "Chương 588" },
      { title: "One Piece", type: "Manga", chapter: "Chương 1095" },
      { title: "Jujutsu Kaisen", type: "Manga", chapter: "Chương 245" },
    ];

    const filteredResults = mockResults.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredResults.length > 0) {
      searchResults.innerHTML = filteredResults
        .map(
          (item) => `
                        <div class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                            <div class="flex items-center gap-3">
                                <img src="images/truyen1.jpg" alt="${item.title}" class="w-12 h-12 object-cover rounded-lg">
                                <div>
                                    <h4 class="text-gray-900 font-semibold">${item.title}</h4>
                                    <p class="text-gray-600 text-sm">${item.type} • ${item.chapter}</p>
                                </div>
                            </div>
                        </div>
                    `
        )
        .join("");
      searchResults.classList.add("show");
    } else {
      searchResults.innerHTML =
        '<div class="p-4 text-gray-500 text-center">Không tìm thấy kết quả</div>';
      searchResults.classList.add("show");
    }
  }, 300);
});

// Hide search results when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    searchResults.classList.remove("show");
  }
});

// Mood-based Recommendations
const moodCards = document.querySelectorAll(".mood-card");
const moodRecommendations = document.getElementById("mood-recommendations");

moodCards.forEach((card) => {
  card.addEventListener("click", () => {
    const mood = card.dataset.mood;

    // Remove active state from all cards
    moodCards.forEach((c) => c.classList.remove("active"));

    // Add active state to clicked card
    card.classList.add("active");

    // Show recommendations based on mood
    showMoodRecommendations(mood);
  });
});

function showMoodRecommendations(mood) {
  const recommendations = {
    happy: [
      { title: "Komi Can't Communicate", genre: "Comedy", rating: "★★★★★" },
      { title: "Spy x Family", genre: "Comedy", rating: "★★★★☆" },
      { title: "One Punch Man", genre: "Comedy", rating: "★★★★★" },
      { title: "Mob Psycho 100", genre: "Comedy", rating: "★★★★★" },
    ],
    sad: [
      { title: "Your Name", genre: "Drama", rating: "★★★★★" },
      { title: "A Silent Voice", genre: "Drama", rating: "★★★★★" },
      { title: "Orange", genre: "Drama", rating: "★★★★☆" },
      { title: "Anohana", genre: "Drama", rating: "★★★★★" },
    ],
    excited: [
      { title: "Attack on Titan", genre: "Action", rating: "★★★★★" },
      { title: "Demon Slayer", genre: "Action", rating: "★★★★★" },
      { title: "Jujutsu Kaisen", genre: "Action", rating: "★★★★★" },
      { title: "Chainsaw Man", genre: "Action", rating: "★★★★☆" },
    ],
    relaxed: [
      { title: "Yuru Camp", genre: "Slice of Life", rating: "★★★★★" },
      { title: "Barakamon", genre: "Slice of Life", rating: "★★★★☆" },
      { title: "Non Non Biyori", genre: "Slice of Life", rating: "★★★★★" },
      { title: "Flying Witch", genre: "Slice of Life", rating: "★★★★☆" },
    ],
    thrilled: [
      { title: "Death Note", genre: "Thriller", rating: "★★★★★" },
      { title: "Monster", genre: "Thriller", rating: "★★★★★" },
      { title: "Psycho-Pass", genre: "Thriller", rating: "★★★★☆" },
      { title: "Future Diary", genre: "Thriller", rating: "★★★★☆" },
    ],
    romantic: [
      { title: "Horimiya", genre: "Romance", rating: "★★★★★" },
      { title: "Kaguya-sama", genre: "Romance", rating: "★★★★★" },
      { title: "Toradora", genre: "Romance", rating: "★★★★☆" },
      { title: "My Love Story", genre: "Romance", rating: "★★★★☆" },
    ],
  };

  const moodRecs = recommendations[mood] || [];

  if (moodRecs.length > 0) {
    const randomImageNumber = Math.floor(Math.random() * 10) + 1;
    const swiperWrapper = document.querySelector(
      ".mood-swiper .swiper-wrapper"
    );
    swiperWrapper.innerHTML = moodRecs
      .map(
        (rec) => `
                    <div class="swiper-slide">
                        <a href="detail.html">
                        <div class="minimal-card bg-gray-50 rounded-2xl overflow-hidden">
                            <div class="hover-zoom">
                                <img src="images/truyen${randomImageNumber}.jpg" alt="${rec.title}" class="w-full h-48 object-cover">
                            </div>
                            <div class="p-6">
                                <h3 class="text-lg font-bold text-gray-900 mb-2">${rec.title}</h3>
                                <p class="text-gray-600 text-sm mb-3">${rec.genre}</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-yellow-500">${rec.rating}</span>
                                    <button class="btn-primary">
                                        Đọc Ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>
                `
      )
      .join("");

    moodRecommendations.classList.remove("hidden");

    // Initialize mood swiper
    new Swiper(".mood-swiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: ".mood-swiper .swiper-button-next",
        prevEl: ".mood-swiper .swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
  }
}

// Random Discovery
const randomBtn = document.getElementById("random-discovery-btn");
const randomResults = document.getElementById("random-results");

randomBtn.addEventListener("click", () => {
  // Add loading animation
  randomBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin mr-3"></i>Đang tìm kiếm...';
  randomBtn.disabled = true;

  setTimeout(() => {
    const randomComics = [
      {
        title: "Vinland Saga",
        genre: "Historical",
        rating: "★★★★★",
        views: "2.1M",
      },
      {
        title: "Berserk",
        genre: "Dark Fantasy",
        rating: "★★★★★",
        views: "1.8M",
      },
    ];

    // Tạo kết quả HTML
    const resultsHTML = randomComics
      .map((comic) => {
        // Tạo số ngẫu nhiên từ 1 đến 10
        const randomImageNumber = Math.floor(Math.random() * 10) + 1;

        return `
          <div class="minimal-card bg-white rounded-2xl overflow-hidden shadow-md mb-4">
            <div class="hover-zoom">
                <a href="detail.html">
              <img src="images/truyen${randomImageNumber}.jpg" alt="${comic.title}" class="w-full h-48 object-cover">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold mb-1">${comic.title}</h3>
              <p class="text-sm text-gray-600 mb-1">${comic.genre}</p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-yellow-400">${comic.rating}</span>
                <span class="text-green-500">${comic.views} lượt xem</span>
              </div>

            </div>
            </a>
          </div>
        `;
      })
      .join("");

    // Hiển thị kết quả
    randomResults.innerHTML = resultsHTML;

    // Reset lại nút
    randomBtn.innerHTML = "Tìm Ngẫu Nhiên";
    randomBtn.disabled = false;
  }, 1000);
});

// Mission progress animation
const missionBars = document.querySelectorAll(".mission-progress");
const missionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progress = entry.target.style.getPropertyValue("--progress");
      entry.target.style.width = progress;
    }
  });
});

missionBars.forEach((bar) => {
  missionObserver.observe(bar);
});

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", function () {
  // For Safari
  document.body.scrollTop = 0;

  // For Chrome, Firefox, IE and Opera
  document.documentElement.scrollTop = 0;
});

// Initialize Action Swiper
const actionSwiper = new Swiper(".action-swiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".action-swiper .swiper-button-next",
    prevEl: ".action-swiper .swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 7,
    },
  },
});

// Initialize Tien Hiep Swiper
const tienhiepSwiper = new Swiper(".tienhiep-swiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".tienhiep-swiper .swiper-button-next",
    prevEl: ".tienhiep-swiper .swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 7,
    },
  },
});

// Ranking Tab Functionality (Fixed)
const rankingTabsFixed = document.querySelectorAll(".ranking-tab");
rankingTabsFixed.forEach((tab) => {
  tab.addEventListener("click", () => {
    const period = tab.dataset.period;

    // Update active tab
    rankingTabsFixed.forEach((t) => {
      t.classList.remove("active");
      t.classList.add("text-gray-600", "hover:text-gray-900");
    });
    tab.classList.add("active");
    tab.classList.remove("text-gray-600", "hover:text-gray-900");

    console.log("Switched to ranking period:", period);

    // Here you would typically fetch and update the ranking data
    // For demo purposes, we'll just log the action
    if (period === "week") {
      console.log("Loading weekly rankings...");
    } else {
      console.log("Loading monthly rankings...");
    }
  });
});

// News Filter Functionality
const newsFilterBtns = document.querySelectorAll(".news-filter-btn");
const newsArticles = document.querySelectorAll(".news-article");

newsFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    // Update active button
    newsFilterBtns.forEach((b) => {
      b.classList.remove("active", "bg-white", "text-gray-900", "shadow-sm");
      b.classList.add("text-gray-600", "hover:text-gray-900");
    });
    btn.classList.add("active", "bg-white", "text-gray-900", "shadow-sm");
    btn.classList.remove("text-gray-600", "hover:text-gray-900");

    // Filter articles
    newsArticles.forEach((article) => {
      const articleCategory = article.dataset.category;
      if (category === "all" || articleCategory === category) {
        article.style.display = "block";
        article.classList.add("fade-in-up");
      } else {
        article.style.display = "none";
      }
    });
  });
});
