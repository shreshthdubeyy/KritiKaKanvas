// ============================================================
//  HOW TO ADD TO THE GALLERY
//  Each item needs: { title, tag, type, src }
//
//  TYPE 1 — Local image (drop file in images/ folder):
//    { title: 'My Painting', tag: 'portrait', type: 'image', src: 'images/my-painting.jpg' }
//
//  TYPE 2 — Local video (drop .mp4 in images/ folder):
//    { title: 'Speed Paint', tag: 'custom', type: 'video', src: 'images/speedpaint.mp4' }
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
  // ── Replace / add your items below ──────────────────────────
  { title: 'Custom Sneakers', tag: 'custom', type: 'instagram', src: 'https://www.instagram.com/p/DWY_hsQj-gA/' },
  { title: 'Floral Mandala', tag: 'mandala', type: 'placeholder', color: '#1a1a35', emoji: '🌸' },
  { title: 'Couple Portrait', tag: 'portrait', type: 'placeholder', color: '#1f2d3d', emoji: '💑' },
  { title: 'Pet Portrait', tag: 'portrait', type: 'placeholder', color: '#0d1b2a', emoji: '🐾' },
  { title: 'Boho Mandala', tag: 'mandala', type: 'placeholder', color: '#2d1b00', emoji: '✨' },
  { title: 'Custom Artwork', tag: 'custom', type: 'placeholder', color: '#1a2d1a', emoji: '🎬' },
  // ── Example — uncomment and edit to use: ────────────────────
  // { title: 'My Art', tag: 'portrait', type: 'image',     src: 'images/my-art.jpg' },
  // { title: 'Reel',   tag: 'custom',   type: 'instagram', src: 'https://www.instagram.com/reel/XXXXX/' },
];

// ── Render gallery ───────────────────────────────────────────
const grid = document.getElementById('gallery-grid');

function buildCard(item) {
  const card = document.createElement('div');
  card.className = 'g-card';
  card.setAttribute('data-tag', item.tag);

  let mediaHTML = '';

  if (item.type === 'image') {
    mediaHTML = `<img src="${item.src}" alt="${item.title}" class="g-card-img" loading="lazy" />`;

  } else if (item.type === 'video') {
    mediaHTML = `
      <video class="g-card-img" src="${item.src}" muted playsinline loop
        onmouseenter="this.play()" onmouseleave="this.pause();this.currentTime=0">
      </video>`;

  } else if (item.type === 'instagram') {
    // Clean branded card — no iframe, no overlays
    mediaHTML = `
      <a href="${item.src}" target="_blank" rel="noopener" class="g-card-insta-link" aria-label="View ${item.title} on Instagram">
        <div class="g-card-insta-bg">
          <svg class="insta-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <radialGradient id="ig-c" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543f"/>
              <stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/>
              <stop offset=".841" stop-color="#c837ab"/>
            </radialGradient>
            <path fill="url(#ig-c)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20c.005 4.401-3.592 8.004-7.992 8.008z"/>
            <path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm6.5-3c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm1.5-6H16c-3.309 0-6 2.691-6 6v16c0 3.309 2.691 6 6 6h16c3.309 0 6-2.691 6-6V16c0-3.309-2.691-6-6-6zm4 22c0 2.206-1.794 4-4 4H16c-2.206 0-4-1.794-4-4V16c0-2.206 1.794-4 4-4h16c2.206 0 4 1.794 4 4v16z"/>
          </svg>
          <span class="insta-cta">View on Instagram ↗</span>
        </div>
      </a>`;

  } else if (item.type === 'youtube') {
    // Clean branded card — opens the YouTube video in a new tab
    mediaHTML = `
      <a href="${item.src}" target="_blank" rel="noopener" class="g-card-yt-link" aria-label="Watch ${item.title} on YouTube">
        <div class="g-card-yt-bg">
          <svg class="yt-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FF3D00" d="M43.2 33.9c-.4 2.1-2.1 3.7-4.2 4-3.3.5-8.8 1.1-15 1.1-6.1 0-11.6-.6-15-1.1-2.1-.3-3.8-1.9-4.2-4-.4-2.3-.8-5.7-.8-9.9s.4-7.6.8-9.9c.4-2.1 2.1-3.7 4.2-4C12.3 9.6 17.8 9 24 9c6.2 0 11.6.6 15 1.1 2.1.3 3.8 1.9 4.2 4 .4 2.3.8 5.7.8 9.9s-.4 7.6-.8 9.9z"/>
            <path fill="#fff" d="M20 31.4V16.6L32 24z"/>
          </svg>
          <span class="yt-cta">Watch on YouTube ↗</span>
        </div>
      </a>`;

  } else {
    // Placeholder — more polished gradient look
    mediaHTML = `
      <div class="g-card-placeholder" style="background: linear-gradient(135deg, ${item.color}cc, ${item.color}44)">
        <span class="placeholder-emoji">${item.emoji}</span>
        <span class="placeholder-label">Coming Soon</span>
      </div>`;
  }

  card.innerHTML = `
    ${mediaHTML}
    <div class="g-card-info">
      <span class="g-card-title">${item.title}</span>
      <span class="g-card-tag">${item.tag}</span>
    </div>
  `;
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

// ── Mobile hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ── Auto-fill Formspree _replyto with the email the user types ──
const emailInput = document.getElementById('f-email');
const replyTo = document.querySelector('input[name="_replyto"]');
if (emailInput && replyTo) {
  emailInput.addEventListener('input', () => replyTo.value = emailInput.value);
}

// ── Toast on successful Formspree submission ──────────────────
const toast = document.getElementById('toast');
const commissionForm = document.getElementById('commission-form');

function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

if (commissionForm && toast) {
  commissionForm.addEventListener('submit', () => {
    let attempts = 0;
    // Poll every 200ms (max 10s) until Formspree shows the success element
    const poll = setInterval(() => {
      const el = document.getElementById('fs-success');
      if (el && el.textContent.trim() !== '' && el.offsetHeight > 0) {
        showToast();
        clearInterval(poll);
        return;
      }
      if (++attempts > 50) clearInterval(poll);
    }, 200);
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
