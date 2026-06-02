/* =============================================================
   KritiKaKanvas.Shop — shop.js
   Product catalogue, cart logic, filters, localStorage
   ============================================================= */

// ── PRODUCT CATALOGUE ────────────────────────────────────────
// To add a product: copy any object below, give it a new id,
// fill in name/desc/price/tag and drop the image in images/shop/.
// tag options: 'prints' | 'originals' | 'custom' | 'kits'
// badge options: 'Bestseller' | 'New' | 'Limited' | 'Original' |
//                'Made to Order' | 'Fan Fave' | null
// ─────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: 'Folk Medallion Print',
    desc: 'A stunning archival A3 print of our intricate hand-painted folk medallion. Features elegant geometric symmetry, warm golden hues, and deep terracotta borders on heavy-grain cotton rag paper.',
    price: 899,
    originalPrice: 1200,
    tag: 'prints',
    badge: 'Bestseller',
    emoji: '🌸',
    img: 'images/shop/folk-medallion.png',
  },
  {
    id: 2,
    name: 'Blue Kalamkari Panel',
    desc: 'An authentic, original hand-painted Kalamkari folk panel on canvas. Detailed with traditional indigo blue pigments, fine black ink outlines, and floral patterns. Hand-signed and dated by the artist.',
    price: 2499,
    originalPrice: null,
    tag: 'originals',
    badge: 'Original',
    emoji: '🎋',
    img: 'images/shop/folk-panel-blue.png',
  },
  {
    id: 3,
    name: 'Crimson Kalamkari Panel',
    desc: 'An original, hand-painted Kalamkari panel. Crafted with rich crimson and terracotta dyes, depicting organic flowing creepers and traditional geometric framing. Signed and ready for framing.',
    price: 2499,
    originalPrice: null,
    tag: 'originals',
    badge: null,
    emoji: '🌺',
    img: 'images/shop/folk-panel-red.png',
  },
  {
    id: 4,
    name: 'Mandala Art Print',
    desc: 'An A4-size print of our sacred geometry mandala. Intricately drawn lines representing cosmic harmony, peace, and spiritual focus, printed on premium acid-free cotton rag paper.',
    price: 599,
    originalPrice: 799,
    tag: 'prints',
    badge: 'New',
    emoji: '✨',
    img: 'images/shop/product-mandala.png',
  },
  {
    id: 5,
    name: 'Custom Pet Portrait',
    desc: 'A personalized, custom oil-on-canvas painting of your beloved pet! Immortalize your furry friend\'s unique expression and personality. 2–3 weeks delivery from photo reference.',
    price: 2999,
    originalPrice: null,
    tag: 'custom',
    badge: 'Made to Order',
    emoji: '🐾',
    img: 'images/gallery/cat-portrait.png',
  },
  {
    id: 6,
    name: 'Folk Art Kit',
    desc: 'The ultimate DIY starter kit! Includes 5 professional folk pigment jars, 3 fine camel-hair brushes, 4 custom hand-carved wooden block stamps, a canvas board, and a detailed reference guidebook.',
    price: 1299,
    originalPrice: 1699,
    tag: 'kits',
    badge: 'Limited',
    emoji: '🎨',
    img: 'images/shop/product-artkit.png',
  },
  {
    id: 7,
    name: 'Custom Sneakers',
    desc: 'Step out in style with custom hand-painted sneakers! We paint authentic Indian folk motifs, florals, or mandalas directly on your shoes using water-resistant acrylic leather paints.',
    price: 3999,
    originalPrice: null,
    tag: 'custom',
    badge: 'Fan Fave',
    emoji: '👟',
    img: 'images/shop/product-sneakers.png',
  },
  {
    id: 8,
    name: 'Couple Portrait',
    desc: 'A custom, hand-painted couple portrait capturing a tender embrace in a warm, romantic impressionist style on stretched linen canvas. An unforgettable keepsake of you and your partner.',
    price: 3499,
    originalPrice: null,
    tag: 'custom',
    badge: null,
    emoji: '💑',
    img: 'images/gallery/red-white-hearts.jpeg',
  },
];

// ── CART STATE ────────────────────────────────────────────────
const CART_KEY = 'kkc-cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast(`${product.name} added to cart!`);

  // Bump badge animation
  const badge = document.getElementById('cart-badge');
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

// ── CART UI ───────────────────────────────────────────────────
function updateCartBadge() {
  const count = getCartCount();
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = count;
}

function renderCartItems() {
  const list   = document.getElementById('cart-items-list');
  const empty  = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-drawer-footer');
  const count  = document.getElementById('cart-item-count');

  if (!list) return;

  const total = getCartTotal();
  const itemCount = getCartCount();

  // Toggle empty / filled states
  if (cart.length === 0) {
    empty.classList.add('visible');
    list.style.display = 'none';
    if (footer) footer.style.display = 'none';
  } else {
    empty.classList.remove('visible');
    list.style.display = 'block';
    if (footer) footer.style.display = 'block';
  }

  if (count) count.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  // Render items
  list.innerHTML = cart.map(item => {
    const imgHTML = item.img
      ? `<img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const phHTML = `<div class="cart-item-img-placeholder" ${item.img ? 'style="display:none"' : ''}>${item.emoji || '🎨'}</div>`;

    return `
      <div class="cart-item" data-id="${item.id}">
        <div style="position:relative">
          ${imgHTML}
          ${phHTML}
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">Remove</button>
        </div>
      </div>`;
  }).join('');

  // Update totals
  const subtotalEl = document.getElementById('cart-subtotal');
  const grandEl    = document.getElementById('cart-grand');
  if (subtotalEl) subtotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (grandEl)    grandEl.textContent    = `₹${total.toLocaleString('en-IN')}`;
}

// ── CART DRAWER ───────────────────────────────────────────────
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-overlay').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-overlay').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('open-cart')?.addEventListener('click', openCart);
document.getElementById('close-cart')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
document.getElementById('cart-continue')?.addEventListener('click', closeCart);
document.getElementById('cart-continue-empty')?.addEventListener('click', () => {
  closeCart();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('shop-toast');
  const msg   = document.getElementById('toast-msg');
  if (!toast) return;
  if (msg) msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── PRODUCT GRID RENDER ───────────────────────────────────────
function badgeClass(badge) {
  const map = {
    'Bestseller':     'badge-bestseller',
    'New':            'badge-new',
    'Limited':        'badge-limited',
    'Original':       'badge-original',
    'Made to Order':  'badge-order',
    'Fan Fave':       'badge-fave',
  };
  return map[badge] || 'badge-bestseller';
}

function buildProductCard(product, index) {
  const imgHTML = product.img
    ? `<img src="${product.img}" alt="${product.name}" class="g-card-img" loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';

  const phHTML = `
    <div class="g-card-placeholder" style="${product.img ? 'display:none' : ''}">
      <span class="placeholder-emoji">${product.emoji || '🎨'}</span>
      <span class="placeholder-label">Coming Soon</span>
    </div>`;

  const cardBackHTML = `
    <div class="g-card-back-content">
      <h4 class="product-back-story-title">Artwork Details</h4>
      <p class="product-back-story-body">${product.desc}</p>
      <button class="g-card-back-cta btn-view-framed" aria-label="View Framed Canvas">View Framed ➔</button>
    </div>`;

  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-tag', product.tag);
  card.style.animationDelay = `${index * 0.07}s`;

  card.innerHTML = `
    <div class="g-card">
      <div class="g-card-inner">
        <div class="g-card-front">
          ${imgHTML}
          ${phHTML}
        </div>
        <div class="g-card-back">
          ${cardBackHTML}
        </div>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <div class="product-price-row">
        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
        <button class="btn-add-cart-uiverse" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
          <div class="cat-avatar"></div>
          <span class="now">now!</span>
          <span class="play">Add to Cart</span>
        </button>
      </div>
    </div>`;

  // Attach virtual framed lightbox click handler to the 3D card
  const gCard = card.querySelector('.g-card');
  if (gCard) {
    gCard.addEventListener('click', () => {
      if (product.img) {
        openLightbox({
          src: product.img,
          title: product.name,
          desc: product.desc,
          tag: product.tag
        });
      }
    });
  }

  return card;
}

function placeholderColor(index) {
  const colors = ['#1a1a35', '#1f2d3d', '#0d1b2a', '#2d1b00', '#1a2d1a', '#2d1040'];
  return colors[index % colors.length];
}

function renderProducts(filter) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const list = filter === 'all'
    ? products
    : products.filter(p => p.tag === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:#666;text-align:center;grid-column:1/-1;padding:3rem;font-style:italic;">
      No products in this category yet. Check back soon! ✨</p>`;
    return;
  }

  list.forEach((product, index) => {
    grid.appendChild(buildProductCard(product, index));
  });
}

// ── FILTER BUTTONS ────────────────────────────────────────────
document.querySelectorAll('.products-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.products-filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ── NAV SCROLL ────────────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE HAMBURGER ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => navLinks?.classList.toggle('open'));

// ── INIT ──────────────────────────────────────────────────────
renderProducts('all');
renderCartItems();
updateCartBadge();

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

