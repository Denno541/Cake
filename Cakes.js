// Filtering Cakes
const filterButtons = document.querySelectorAll(".filter-btn");
const cakeCards = document.querySelectorAll(".cake-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    cakeCards.forEach(card => {
      card.style.display =
        category === "all" || card.getAttribute("data-category") === category
          ? "block"
          : "none";
    });
  });
});

// Modal View
const modal = document.getElementById("cakeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalClose = document.getElementById("modalClose");

cakeCards.forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalPrice.textContent = card.querySelector("p").textContent;
  });
});

modalClose.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
