// Modern interactions: Swiper sliders, GSAP entrance animations, cake builder logic, simple booking demo

// === DATA: demo products (replace with your DB or API) ===
const PRODUCTS = [
  {id:1, title:'Vanilla Dream (6")', price:3500, img:'vanilla.jpg', desc:'Classic vanilla sponge with buttercream'},
  {id:2, title:'Choco Fudge (8")', price:4200, img:'chocolate.jpg', desc:'Dark chocolate layers with ganache'},
  {id:3, title:'Red Velvet (6")', price:3800, img:'redvelvet.jpg', desc:'Velvety red sponge with cream cheese'},
  {id:4, title:'Lemon Delight (8")', price:3400, img:'lemon.jpg', desc:'Zesty lemon curd and vanilla sponge'}
];

// ---- Populate product slides for Swiper ----
function populateProducts(){
  const wrapper = document.querySelector('#productSlides');
  if(!wrapper) return;
  wrapper.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="product-card" role="group" aria-label="${p.title}">
        <div class="product-media"><img src="${p.img}" alt="${p.title}" /></div>
        <div class="product-info">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          <div class="product-price">Ksh ${p.price.toLocaleString()}</div>
          <div style="margin-top:10px;">
            <button class="btn-primary small build-from-product" data-id="${p.id}">Customize</button>
            <button class="btn-ghost small" data-id="${p.id}">Order</button>
          </div>
        </div>
      </div>
    `;
    wrapper.appendChild(slide);
  });
}

// ---- Initialize Swiper instances ----
function initSwipers(){
  // product slider
  new Swiper('.mySwiper', {
    slidesPerView: 1.15,
    spaceBetween: 18,
    centeredSlides: false,
    loop: false,
    breakpoints: {
      700: { slidesPerView: 2.05 },
      1100: { slidesPerView: 3.05 }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: { el: '.swiper-pagination', clickable: true }
  });

  // testimonials
  new Swiper('.testimonySwiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 4500 },
    pagination: { el: '.testimonySwiper .swiper-pagination', clickable: true }
  });
}

// ---- GSAP entrance animations ----
function initAnimations(){
  if(typeof gsap === 'undefined') return;
  gsap.from('.anim', { y: 18, opacity:0, duration:0.7, stagger:0.12, ease:'power3.out' });
  gsap.from('.anim-delay', { y: 18, opacity:0, duration:0.8, delay:0.18 });
  gsap.from('.anim-delay-2', { y: 18, opacity:0, duration:0.8, delay:0.32 });
  gsap.from('.card', { y: 12, opacity:0, duration:0.9, stagger:0.1, ease:'power2.out', scrollTrigger:{trigger:'.cards-grid', start:'top 80%'} });
}

// ---- Modal / Cake Builder logic ----
function setupBuilder(){
  const open = document.getElementById('openBuilder');
  const modal = document.getElementById('builderModal');
  const close = document.getElementById('closeBuilder');
  const bSize = document.getElementById('bSize');
  const bQty = document.getElementById('bQty');
  const extras = document.querySelectorAll('.extraItem');
  const priceEl = document.getElementById('bPrice');

  // base prices mapping for demo (size -> extra cost)
  const base = { '6': 3500, '8': 4300, '10': 5700 };

  function calc(){
    let total = base[bSize.value] || 3500;
    extras.forEach(e=>{ if(e.checked) total += Number(e.value); });
    const qty = Math.max(1, Number(bQty.value)||1);
    const display = 'Ksh ' + (total * qty).toLocaleString();
    priceEl.textContent = display;
    return total * qty;
  }

  if(open) open.addEventListener('click', ()=> {
    modal.setAttribute('aria-hidden','false');
    modal.style.opacity = '1';
    // small gsap pop
    if(window.gsap) gsap.from('.modal-panel', { scale:0.96, opacity:0, duration:0.28 });
    calc();
  });

  if(close) close.addEventListener('click', ()=> {
    modal.setAttribute('aria-hidden','true');
  });

  [bSize, bQty, ...extras].forEach(el => {
    if(el) el.addEventListener('change', calc);
  });

  // open builder from product customize buttons
  document.body.addEventListener('click', e=>{
    if(e.target.matches('.build-from-product')){
      const id = Number(e.target.dataset.id);
      const p = PRODUCTS.find(x=>x.id===id);
      if(p){
        // try to set a matching size/price (demo)
        bSize.value = (p.price > 4000) ? '8' : '6';
        modal.setAttribute('aria-hidden','false');
        calc();
      }
    }
  });

  // Add to cart demo
  const atc = document.getElementById('addToCart');
  if(atc) atc.addEventListener('click', ()=> {
    alert('Demo: item added to cart. Connect to backend to persist orders.');
  });
}

// ---- Booking form demo (replace with real server request) ----
function setupBooking(){
  const form = document.getElementById('bookingForm');
  const msg = document.getElementById('bookingMsg');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    msg.hidden = false;
    msg.textContent = `Thanks ${data.get('name') || ''}! We received your request — we'll contact you within 24 hours.`;
    form.reset();
  });

  document.getElementById('phoneCall').addEventListener('click', ()=> {
    window.location.href = 'tel:+254700000000';
  });
}

// ---- Mobile menu toggle ----
function setupMenu(){
  const btn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');
  btn && btn.addEventListener('click', ()=> {
    if(!nav) return;
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });
}

// ---- Init everything ----
document.addEventListener('DOMContentLoaded', ()=>{
  populateProducts();
  initSwipers();
  initAnimations();
  setupBuilder();
  setupBooking();
  setupMenu();
});
