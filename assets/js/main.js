document.addEventListener("DOMContentLoaded", () => {

  /* ================= SHOWCASE ================= */
  const showcaseTrack = document.querySelector(".showcase-track");
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const prev = document.querySelector(".slide-btn.prev");
  const next = document.querySelector(".slide-btn.next");
  let showcaseAuto;

  if (showcaseTrack && showcaseItems.length) {
    let index = 0;
    let visibleCount = window.innerWidth <= 768 ? 1 : 4;
    let maxIndex = showcaseItems.length - visibleCount;

    function updateShowcase() {
      const w = showcaseItems[0].offsetWidth;
      showcaseTrack.style.transform = `translateX(${-index * w}px)`;
    }

    function recalcShowcase() {
      visibleCount = window.innerWidth <= 768 ? 1 : 4;
      maxIndex = showcaseItems.length - visibleCount;
      index = Math.min(index, maxIndex);
      updateShowcase();
    }

    function startShowcaseAuto() {
      clearInterval(showcaseAuto);
      showcaseAuto = setInterval(() => {
        index = index >= maxIndex ? 0 : index + 1;
        updateShowcase();
      }, 3500);
    }

    next?.addEventListener("click", () => {
      index = index >= maxIndex ? 0 : index + 1;
      updateShowcase();
      startShowcaseAuto();
    });

    prev?.addEventListener("click", () => {
      index = index <= 0 ? maxIndex : index - 1;
      updateShowcase();
      startShowcaseAuto();
    });

    window.addEventListener("resize", recalcShowcase);
    recalcShowcase();
    startShowcaseAuto();
  }

  /* ================= PARTNERS ================= */
  const partnerTrack = document.querySelector(".partners-track");
  if (partnerTrack) {
    const logos = partnerTrack.querySelectorAll("img");
    let partnerMode = null; // 'pc' | 'mobile'
    let partnerInterval = null;
    let idx = 0;

    function clearPartner() {
      clearInterval(partnerInterval);
      partnerInterval = null;
      partnerTrack.style.transform = "";
      logos.forEach(l => l.classList.remove("auto-hover"));
      idx = 0;
    }

    function initPC() {
      clearPartner();
      partnerMode = "pc";

      let current = 0;
      partnerInterval = setInterval(() => {
        logos.forEach(l => l.classList.remove("auto-hover"));
        logos[current].classList.add("auto-hover");
        current = (current + 1) % logos.length;
      }, 2000);
    }

    function initMobile() {
      clearPartner();
      partnerMode = "mobile";

      function move() {
        const containerW = partnerTrack.parentElement.offsetWidth;
        const visible = window.innerWidth < 420 ? 1 : window.innerWidth < 640 ? 2 : 3;
        const slideW = containerW / visible;
        if (idx > logos.length - visible) idx = 0;
        partnerTrack.style.transform = `translateX(${-idx * slideW}px)`;
      }

      partnerInterval = setInterval(() => { idx++; move(); }, 2500);
      move();
    }

    function checkPartnerMode() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && partnerMode !== "mobile") initMobile();
      if (!isMobile && partnerMode !== "pc") initPC();
    }

    checkPartnerMode();
    window.addEventListener("resize", checkPartnerMode);
  }

  /* ================= ABOUT IMAGE ================= */
  const images = document.querySelectorAll(".about-img");
  if (images.length) {
    let currentImgIdx = 0;
    setInterval(() => {
      const currentImg = images[currentImgIdx];
      const nextIdx = (currentImgIdx + 1) % images.length;
      const nextImg = images[nextIdx];

      currentImg.classList.remove("active");
      currentImg.classList.add("suck-out");

      nextImg.classList.add("active", "expand-in");

      setTimeout(() => {
        currentImg.classList.remove("suck-out");
        nextImg.classList.remove("expand-in");
        currentImgIdx = nextIdx;
      }, 800);

    }, 4000);
  }
  if (window.innerWidth > 768) return; // 웹에서는 적용하지 않음

  const items = document.querySelectorAll(".product-item");

  function checkHover() {
    const windowMiddle = window.innerHeight / 2;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemMiddle = rect.top + rect.height / 2;

      // 중앙 근처 (+-50px)면 hover
      if ( Math.abs(itemMiddle - windowMiddle) < 50  ) {
        item.classList.add("auto-hover");
      } else {
        item.classList.remove("auto-hover");
      }
    });
  }

  window.addEventListener("scroll", checkHover);
  window.addEventListener("resize", checkHover);

  checkHover(); // 초기 실행

  

});

// cutting-slider.js
document.addEventListener("DOMContentLoaded", function() {
const track = document.querySelector(".cutting-slider-track");
const slides = document.querySelectorAll(".cutting-slide");
const total = slides.length;
let index = 0;

setInterval(() => {
  index = (index + 1) % total;
  track.style.transform = `translateX(-${index * (100 / total)}%)`;
}, 2000);
});

function handleSectionScroll() {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.85; // 화면 85% 지점에서 애니메이션 시작

    if (rect.top < triggerPoint) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible'); // 스크롤 올리면 다시 사라지게 (옵션)
    }
  });
}

// 초기 실행
window.addEventListener('load', handleSectionScroll);
// 스크롤 시 실행
document.addEventListener('scroll', handleSectionScroll);