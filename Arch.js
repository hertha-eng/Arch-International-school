const loginform = document.querySelector('.login-form');
const loginBtn = document.querySelector('#login-btn');
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('#menu-btn');

if (loginBtn && loginform) {
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    loginform.classList.toggle('active');
    if (navbar) {
      navbar.classList.remove('active');
    }
  });
}

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navbar.classList.toggle('active');
    if (loginform) {
      loginform.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', () => {
  if (loginform) {
    loginform.classList.remove('active');
  }

  if (navbar) {
    navbar.classList.remove('active');
  }
});

const galleryItems = Array.from(document.querySelectorAll('.gallery-item, .gallery-card'));
const galleryRail = document.querySelector('#gallery-rail');
const scrollButtons = document.querySelectorAll('.gallery-scroll-btn');
const lightbox = document.querySelector('#gallery-lightbox');

if (galleryRail && scrollButtons.length) {
  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.scroll === 'left' ? -1 : 1;
      const scrollAmount = Math.min(galleryRail.clientWidth * 0.85, 420) * direction;
      galleryRail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

if (galleryItems.length && lightbox) {
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDescription = lightbox.querySelector('.lightbox-description');
  const closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
  const prevButton = lightbox.querySelector('[data-lightbox-nav="prev"]');
  const nextButton = lightbox.querySelector('[data-lightbox-nav="next"]');
  let currentIndex = 0;

  const renderLightbox = (index) => {
    const item = galleryItems[index];
    const imageSrc = item.dataset.image || item.querySelector('img')?.src || '';
    const imageAlt = item.querySelector('img')?.alt || item.dataset.title || 'Gallery image';
    const title = item.dataset.title || imageAlt;
    const description = item.dataset.description || 'ARCH International School gallery photo';

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    currentIndex = index;
  };

  const openLightbox = (index) => {
    renderLightbox(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    renderLightbox(nextIndex);
  };

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    renderLightbox(prevIndex);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeLightbox);
  });

  if (prevButton) {
    prevButton.addEventListener('click', showPrev);
  }

  if (nextButton) {
    nextButton.addEventListener('click', showNext);
  }

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowRight') {
      showNext();
    }

    if (event.key === 'ArrowLeft') {
      showPrev();
    }
  });
}
