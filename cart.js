const cartItemsContainer = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

/* Render the cart items */
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalSpan.textContent = "Ksh 0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    itemEl.innerHTML = `
      <img src="${item.image}" alt="Cake image" />
      <div class="cart-item-details">
        <p><strong>Shape:</strong> ${item.shape}</p>
        <p><strong>Size:</strong> ${item.size}</p>
        <p><strong>Flavor:</strong> ${item.flavor}</p>
        <p><strong>Decorations:</strong> ${item.decorations.length > 0 ? item.decorations.join(", ") : "None"}</p>

        <div class="qty-control">
          <button aria-label="Decrease quantity" class="qty-minus" data-index="${index}">-</button>
          <span>${item.qty}</span>
          <button aria-label="Increase quantity" class="qty-plus" data-index="${index}">+</button>
        </div>

        <p><strong>Price:</strong> ${item.total}</p>
      </div>
      <button class="remove-btn" aria-label="Remove item" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  updateCartTotal();
}

/* Update cart total price */
function updateCartTotal() {
  let total = 0;
  cart.forEach((item) => {
    // Extract number from price string like "Ksh 3200"
    const priceNum = parseInt(item.total.replace(/[^\d]/g, ""), 10);
    total += priceNum;
  });

  cartTotalSpan.textContent = "Ksh " + total;
}

/* Change quantity */
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("qty-plus")) {
    const idx = e.target.dataset.index;
    cart[idx].qty++;
    // Update total price accordingly (simple recalculation)
    recalcItemPrice(idx);
    renderCart();
    saveCart();
  }

  if (e.target.classList.contains("qty-minus")) {
    const idx = e.target.dataset.index;
    if (cart[idx].qty > 1) {
      cart[idx].qty--;
      recalcItemPrice(idx);
      renderCart();
      saveCart();
    }
  }

  if (e.target.classList.contains("remove-btn")) {
    const idx = e.target.dataset.index;
    cart.splice(idx, 1);
    renderCart();
    saveCart();
  }
});

/* Recalculate item price based on quantity */
function recalcItemPrice(idx) {
  const item = cart[idx];

  // We stored total price for qty; get unit price by dividing:
  const totalPriceNum = parseInt(item.total.replace(/[^\d]/g, ""), 10);
  const unitPrice = totalPriceNum / item.qty;

  // Update total based on new qty
  const newTotal = unitPrice * item.qty;

  item.total = "Ksh " + Math.round(newTotal);
}

/* Save cart to localStorage */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Checkout Button - Just alert for now */
checkoutBtn.addEventListener("click", () => {
  alert("Checkout feature coming soon! Thanks for your order 🎂");
});

/* Initialize */
renderCart();
