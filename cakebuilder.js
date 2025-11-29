const shape = document.getElementById("shape");
const size = document.getElementById("size");
const flavor = document.getElementById("flavor");
const decorations = document.querySelectorAll(".decor-item");

const qtySpan = document.getElementById("qty");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

const total = document.getElementById("total");
const cakeImage = document.getElementById("cakeImage");

let qty = 1;

/* Fade effect on image change */
function fadeChange(imgPath) {
  cakeImage.classList.add("fade");
  setTimeout(() => {
    cakeImage.src = imgPath;
    cakeImage.classList.remove("fade");
  }, 300);
}

/* Rotate animation */
function rotateCakeAnimation() {
  cakeImage.classList.add("rotate");
  setTimeout(() => cakeImage.classList.remove("rotate"), 800);
}

/* Calculate price based on selections and quantity */
function calculatePrice() {
  let basePrice =
    Number(size.selectedOptions[0].dataset.price) +
    Number(shape.selectedOptions[0].dataset.price) +
    Number(flavor.selectedOptions[0].dataset.price);

  decorations.forEach((d) => {
    if (d.checked) basePrice += Number(d.dataset.price);
  });

  total.textContent = "Ksh " + basePrice * qty;
}

/* Update preview image and price on shape change */
shape.addEventListener("change", () => {
  fadeChange("images/cakes/" + shape.value + ".png");
  rotateCakeAnimation();
  calculatePrice();
});

/* Update price on size or flavor change */
size.addEventListener("change", calculatePrice);
flavor.addEventListener("change", calculatePrice);

/* Update price on decorations change */
decorations.forEach((d) => d.addEventListener("change", calculatePrice));

/* Quantity buttons */
plus.onclick = () => {
  qty++;
  qtySpan.textContent = qty;
  calculatePrice();
};

minus.onclick = () => {
  if (qty > 1) {
    qty--;
    qtySpan.textContent = qty;
    calculatePrice();
  }
};

/* Save Cake to localStorage */
document.getElementById("saveCake").addEventListener("click", () => {
  const cakeData = {
    shape: shape.value,
    size: size.value,
    flavor: flavor.value,
    qty,
    total: total.textContent,
    decorations: Array.from(decorations)
      .filter((d) => d.checked)
      .map((d) => d.nextSibling.textContent.trim()),
  };

  localStorage.setItem("savedCake", JSON.stringify(cakeData));
  alert("Cake saved successfully! 🎂");
});

/* Load saved cake from localStorage on page load */
window.addEventListener("load", () => {
  const saved = localStorage.getItem("savedCake");
  if (saved) {
    const c = JSON.parse(saved);

    shape.value = c.shape || "round";
    size.value = c.size || "1kg";
    flavor.value = c.flavor || "vanilla";

    decorations.forEach((d) => {
      d.checked = c.decorations?.includes(d.nextSibling.textContent.trim()) || false;
    });

    qty = c.qty || 1;
    qtySpan.textContent = qty;

    fadeChange("images/cakes/" + shape.value + ".png");
    calculatePrice();
  }
});

/* Add to Cart button */
document.getElementById("addToCart").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Build cart item
  const item = {
    shape: shape.value,
    size: size.value,
    flavor: flavor.value,
    decorations: Array.from(decorations)
      .filter((d) => d.checked)
      .map((d) => d.nextSibling.textContent.trim()),
    qty,
    total: total.textContent,
    image: cakeImage.src,
  };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Cake added to cart! 🎉");
});
