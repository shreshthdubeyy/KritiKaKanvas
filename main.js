// ============================================================
//  HOW TO ADD TO THE GALLERY
//  Each item needs: { title, tag, type, src }
//
//  TYPE 1 — Local image (drop file in images/gallery/ folder):
//    { title: 'My Painting', tag: 'portrait', type: 'image', src: 'images/gallery/my-painting.jpg' }
//
//  TYPE 2 — Local video (drop .mp4 in images/gallery/ folder):
//    { title: 'Speed Paint', tag: 'custom', type: 'video', src: 'images/gallery/speedpaint.mp4' }
//
//  TYPE 3 — Instagram post OR reel (paste the post/reel URL):
//    { title: 'Floral Mandala', tag: 'mandala', type: 'instagram', src: 'https://www.instagram.com/p/ABC123xyz/' }
//    { title: 'Speed Reel',    tag: 'custom',  type: 'instagram', src: 'https://www.instagram.com/reel/ABC123xyz/' }
//    → Get the post URL from Instagram: open post → click ··· → Copy link
//
//  TYPE 4 — YouTube video (paste the video URL):
//    { title: 'Mandala Timelapse', tag: 'mandala', type: 'youtube', src: 'https://www.youtube.com/watch?v=XXXXXXXXXXX' }
//    { title: 'Speed Paint',       tag: 'custom',  type: 'youtube', src: 'https://youtu.be/XXXXXXXXXXX' }
//    → Get the URL from YouTube: open video → Share → Copy link
//
//  TAG options: 'portrait' | 'mandala' | 'custom'
//  (See cheat-sheet.md if you want to add/rename/remove filter tabs)
// ============================================================

const galleryItems = [
  // ── Real Gallery Items from images/gallery/ ────────────────
  { 
    title: 'Pet Portrait Study', 
    tag: 'portrait', 
    type: 'image', 
    src: 'images/gallery/cat-portrait.png',
    desc: 'A charming, realistic oil-on-canvas study of a curious tabby cat peeking out from behind a bright turquoise wall with wide, inquisitive green eyes and a delicate paw extended.'
  },
  { 
    title: 'Traditional Sakhi Saheli', 
    tag: 'portrait', 
    type: 'image', 
    src: 'images/gallery/sakhi-saheli.jpeg',
    desc: 'A gorgeous Indian folk art masterpiece portraying four close friends sharing stories and laughter, detailed with vibrant vermilion, mustard, and turquoise pigments, and two friendly parrot companions.'
  },
  { 
    title: 'Traditional Festive Dholak', 
    tag: 'portrait', 
    type: 'image', 
    src: 'images/gallery/faceless-silhouette.jpeg',
    desc: 'A festive, highly colorful depiction of rural village women gathering together to play the dholak drum, sing folk melodies, and share laughter under colorful bunting decorations.'
  },
  { 
    title: 'Van Gogh\'s Sunflower Sonata', 
    tag: 'portrait', 
    type: 'image', 
    src: 'images/gallery/66005950781246381.jpeg',
    desc: 'A beautiful, whimsical illustration paying homage to Vincent van Gogh playing a violin amidst a field of golden sunflowers, set under his legendary swirling Starry Night sky.'
  },
  
  { 
    title: 'Saraswati Veena Devotion', 
    tag: 'mandala', 
    type: 'image', 
    src: 'images/gallery/28569778881871839.jpeg',
    desc: 'A detailed devotional masterpiece depicting Goddess Saraswati playing her Veena, sitting gracefully on a pink lotus among white swans, detailed with sacred Om symbols and traditional scrollwork borders.'
  },
  { 
    title: 'Geometric Sun Sailboat', 
    tag: 'mandala', 
    type: 'image', 
    src: 'images/gallery/3799980931497220.jpeg',
    desc: 'An elegant graphic illustration of a majestic black sailboat sailing over geometric-patterned waves under three warm terracotta suns, blending nautical themes with contemporary abstract aesthetics.'
  },
  { 
    title: 'Vibrant Impasto Scream', 
    tag: 'mandala', 
    type: 'image', 
    src: 'images/gallery/774124931623666.jpeg',
    desc: 'An intense, high-energy modern portrait of a face screaming in raw emotion, rendered in thick, mosaic-like impasto oil strokes with mesmerizing pink and yellow spiral eyes.'
  },
  { 
    title: 'Imperial Ornate Llama', 
    tag: 'mandala', 
    type: 'image', 
    src: 'images/gallery/872783602822997848.jpeg',
    desc: 'A deeply detailed, playful portrait of a Peruvian llama wearing traditional Andean festive woven garments, round spectacles, and an elaborate golden halo medallion on a rich plum background.'
  },
  { 
    title: 'Sarcastic Buddha Poster', 
    tag: 'mandala', 
    type: 'image', 
    src: 'images/gallery/946530046699423499.jpeg',
    desc: 'A satirical, modern graphic poster depicting a stippled Buddha head wearing headphones and holding a sign with a sarcastic Hindi query ("आप जरा फ़क ऑफ़ होंगे?"), blending ancient calm with modern humor.'
  },
  
  { 
    title: 'Yakshagana Hanuman Study', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/hanuman.jpeg',
    desc: 'A bold, graphic-novel style study of a traditional Indian Yakshagana theatre performer portraying Lord Hanuman, complete with an elaborate golden crown, face paint, and the text "RUN IT UP".'
  },
  { 
    title: 'Sassy Mughal Rebellion', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/expressive-figure.jpeg',
    desc: 'A cheeky, boundary-pushing Mughal-miniature style illustration of a royal lady in a blue sari holding up her middle finger, captioned with "WO NA AAP GUU KHALO!!" as a playful modern-traditional rebellion.'
  },
  { 
    title: 'Whispering Wall Couple', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/abstract-figurative.jpeg',
    desc: 'A soft, romantic oil painting study capturing an intimate moment of a couple standing in close embrace near a weathered plaster wall, styled in warm peach and earthy charcoal shades.'
  },
  { 
    title: 'Royal Blue Persian Medallion', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/jojadoja.jpeg',
    desc: 'An exquisitely intricate, traditional Persian-carpet-style panel artwork with a central floral medallion in gold, cream, and deep indigo blue, filled with rich textures and scrollwork.'
  },
  { 
    title: 'Impressionist Floral Embrace', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/red-white-hearts.jpeg',
    desc: 'A gorgeous, warm impressionist painting of a young couple hugging tightly, with the young man hiding a bouquet of purple flowers behind his red shirt, full of romance and emotion.'
  },
  { 
    title: 'Solar Trumpet Collage', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/celestial-collage.jpeg',
    desc: 'A powerful contemporary graphic collage showing a young boy playing a brass trumpet with a golden sunburst halo against a background of hypnotic indigo and white waves.'
  },
  { 
    title: 'Yellow Graphic Tribal Silhouette', 
    tag: 'custom', 
    type: 'image', 
    src: 'images/gallery/914862419072425.jpeg',
    desc: 'A striking profile silhouette of an African warrior decorated in high-contrast black-and-white tribal line art patterns, set against a solid, glowing golden-yellow canvas.'
  }
];

// ── Render gallery ───────────────────────────────────────────
const grid = document.getElementById('gallery-grid');

function buildCard(item) {
  const card = document.createElement('div');
  card.className = 'g-card';
  card.setAttribute('data-tag', item.tag);

  let frontHTML = '';
  let backHTML = '';

  // 1. FRONT SIDE: PURE MEDIA ONLY (NO BORDERS/PADDING)
  if (item.type === 'image') {
    frontHTML = `<img src="${item.src}" alt="${item.title}" class="g-card-img" loading="lazy" />`;
  } else if (item.type === 'video') {
    frontHTML = `
      <video class="g-card-img" src="${item.src}" muted playsinline loop
        onmouseenter="this.play()" onmouseleave="this.pause();this.currentTime=0">
      </video>`;
  } else if (item.type === 'instagram') {
    frontHTML = `
      <div class="g-card-front-social g-card-front-insta">
        <svg class="insta-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px; fill: #fff; margin-bottom: 8px;">
          <radialGradient id="ig-c" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543f"/>
            <stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/>
            <stop offset=".841" stop-color="#c837ab"/>
          </radialGradient>
          <path fill="url(#ig-c)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20c.005 4.401-3.592 8.004-7.992 8.008z"/>
          <path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm6.5-3c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm1.5-6H16c-3.309 0-6 2.691-6 6v16c0 3.309 2.691 6 6 6h16c3.309 0 6-2.691 6-6V16c0-3.309-2.691-6-6-6zm4 22c0 2.206-1.794 4-4 4H16c-2.206 0-4-1.794-4-4V16c0-2.206 1.794-4 4-4h16c2.206 0 4 1.794 4 4v16z"/>
        </svg>
        <span class="insta-cta" style="font-family: 'Special Elite', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4);">Instagram Link</span>
      </div>`;
  } else if (item.type === 'youtube') {
    frontHTML = `
      <div class="g-card-front-social g-card-front-yt">
        <svg class="yt-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="width: 52px; height: 52px; margin-bottom: 8px;">
          <path fill="#FF3D00" d="M43.2 33.9c-.4 2.1-2.1 3.7-4.2 4-3.3.5-8.8 1.1-15 1.1-6.1 0-11.6-.6-15-1.1-2.1-.3-3.8-1.9-4.2-4-.4-2.3-.8-5.7-.8-9.9s.4-7.6.8-9.9c.4-2.1 2.1-3.7 4.2-4C12.3 9.6 17.8 9 24 9c6.2 0 11.6.6 15 1.1 2.1.3 3.8 1.9 4.2 4 .4 2.3.8 5.7.8 9.9s-.4 7.6-.8 9.9z"/>
          <path fill="#fff" d="M20 31.4V16.6L32 24z"/>
        </svg>
        <span class="yt-cta" style="font-family: 'Special Elite', monospace; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4);">Watch Video</span>
      </div>`;
  } else {
    frontHTML = `
      <div class="g-card-placeholder">
        <span class="placeholder-emoji">${item.emoji}</span>
        <span class="placeholder-label">Coming Soon</span>
      </div>`;
  }

  // 2. BACK SIDE: FLIP STORY & DETAILS (TACTILE CARD REVERSE)
  let ctaHTML = '';
  if (item.type === 'instagram') {
    ctaHTML = `<a href="${item.src}" target="_blank" rel="noopener" class="g-card-back-cta btn-insta">View Post ➔</a>`;
  } else if (item.type === 'youtube') {
    ctaHTML = `<a href="${item.src}" target="_blank" rel="noopener" class="g-card-back-cta btn-yt">Watch Video ➔</a>`;
  } else {
    ctaHTML = `<button class="g-card-back-cta btn-view-framed" aria-label="View Framed Canvas">View Framed ➔</button>`;
  }

  backHTML = `
    <div class="g-card-back-content">
      <h3 class="g-card-back-title">${item.title}</h3>
      <p class="g-card-back-story">${item.desc}</p>
      ${ctaHTML}
    </div>`;

  card.innerHTML = `
    <div class="g-card-inner">
      <div class="g-card-front">
        ${frontHTML}
      </div>
      <div class="g-card-back">
        ${backHTML}
      </div>
    </div>`;

  // Attach virtual framed lightbox click handler


  card.addEventListener('click', (e) => {
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (isTouch) {
      // Touch behavior: flip card on tap, open lightbox only on back cta button
      if (e.target.closest('.g-card-back-cta')) {
        if (e.target.closest('a.g-card-back-cta')) {
          return; // Let links navigate
        }
        openLightbox(item);
        return;
      }
      
      // Toggle flipped state on this card, close others
      document.querySelectorAll('.g-card').forEach(c => {
        if (c !== card) c.classList.remove('flipped');
      });
      card.classList.toggle('flipped');
      e.stopPropagation();
    } else {
      // Desktop behavior: click directly opens lightbox unless it's a social link
      if (e.target.closest('a.g-card-back-cta')) {
        return;
      }
      openLightbox(item);
    }
  });


  return card;
}


function renderGallery(filter) {
  grid.innerHTML = '';
  const list = filter === 'all' ? galleryItems : galleryItems.filter(i => i.tag === filter);
  list.forEach((item, idx) => {
    const card = buildCard(item);
    card.style.animationDelay = `${idx * 0.06}s`;
    grid.appendChild(card);
  });
}

renderGallery('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// ── Nav scroll ───────────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

// ── Mobile hamburger & Global Clicks ─────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Auto-close menu when clicking links on mobile
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Unflip cards when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.g-card')) {
    document.querySelectorAll('.g-card').forEach(c => c.classList.remove('flipped'));
  }
});


// ── COMMISSION FORM SUBMISSION (Apps Script + Brevo) ─────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyLZ_ikhIN5uvQPH2J__N8WZ3xClcMQjZqRb5ttf364wQUhBZ0r5s14NmpjlPvr-lbb/exec';

const toast = document.getElementById('toast');
const commissionForm = document.getElementById('commission-form');
const btnSubmit = document.getElementById('btn-submit');
const successEl = document.getElementById('fs-success');
const errorEl = document.getElementById('fs-error');

function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

if (commissionForm) {
  commissionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('f-name')?.value.trim();
    const email = document.getElementById('f-email')?.value.trim();
    const type = document.getElementById('f-type')?.value;
    const story = document.getElementById('f-story')?.value.trim();

    // Clear previous banners
    if (successEl) {
      successEl.textContent = '';
      successEl.style.display = 'none';
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }

    // Clear previous field errors
    document.querySelectorAll('.fs-field-error').forEach(span => span.textContent = '');

    // Client-side validations
    let valid = true;
    const setFieldError = (spanId, msg) => {
      const span = document.getElementById(spanId);
      if (span) span.textContent = msg;
      if (msg) valid = false;
    };

    setFieldError('err-f-name', name ? '' : 'Please enter your name');
    setFieldError('err-f-email', /\S+@\S+\.\S+/.test(email) ? '' : 'Enter a valid email');
    setFieldError('err-f-story', story ? '' : 'Please share your story');

    if (!valid) return;

    // Show loading state
    if (btnSubmit) {
      btnSubmit.textContent = 'Sending My Story…';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';
    }

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script execution
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'commission',
          name: name,
          email: email,
          type: type || 'Custom',
          story: story
        })
      });

      // Show success
      if (successEl) {
        successEl.textContent = `Thank you, ${name}! Your story has been sent successfully. I will review it and get in touch within 24 hours! 🎨`;
        successEl.style.display = 'block';
      }
      showToast();
      commissionForm.reset();

    } catch (err) {
      console.error('Error submitting form:', err.message);
      if (errorEl) {
        errorEl.textContent = 'Oops! Something went wrong. Please check your internet connection and try again.';
        errorEl.style.display = 'block';
      }
    } finally {
      // Restore button
      if (btnSubmit) {
        btnSubmit.textContent = 'Send My Story →';
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
      }
    }
  });
}




// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.about-inner, .artist-left, .artist-right, .process-step, .contact-inner, .gallery-header');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  io.observe(el);
});

// ── PREMIUM VIRTUAL CANVAS LIGHTBOX ────────────────────────────
function openLightbox(item) {
  const lightbox = document.getElementById('gallery-lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const tag = document.getElementById('lightbox-tag');

  if (!lightbox || !img) return;

  img.src = item.src;
  img.alt = item.title;
  if (title) title.textContent = item.title;
  if (desc) desc.textContent = item.desc || '';
  if (tag) tag.textContent = item.tag;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent main page scrolling
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore main page scrolling
}

// Lightbox event listeners
document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
document.getElementById('gallery-lightbox')?.addEventListener('click', (e) => {
  // Close only if clicking outside the wood frame container itself
  if (e.target.id === 'gallery-lightbox' || e.target.classList.contains('lightbox-content') || e.target.classList.contains('canvas-frame-container')) {
    closeLightbox();
  }
});
// Support Esc key to close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

