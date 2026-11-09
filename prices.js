const prices = {
  "ESPRESSO": "300 DA",
  "AMERICANO": "280 DA",
  "TURKCOFFEE": "250 DA",
  "FLAT WHITE": "350 DA",
  "ICED COFFEE": "320 DA",
  "COLD BREW": "360 DA",
  "ICE MOCHA": "380 DA",
  "CARAMEL LATTE": "400 DA",
  "AFFOGATO": "450 DA",
  "MACARONS": "150 DA",
  "ECLAIR": "200 DA",
  "MILLE-FEUILLE": "300 DA",
  "CANELÉ": "220 DA",
  "TURKISH COFFEE": "250 DA"
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close-btn");
  const addToOrderBtn = document.getElementById("addToOrderBtn");

  cards.forEach(card => {
    const titleElement = card.querySelector(".headerLink a");
    if (!titleElement) return;

    const titleText = titleElement.textContent.trim().toUpperCase();
    const priceText = prices[titleText] || "250 DA";

    if (!card.querySelector(".price-tag")) {
      const priceElement = document.createElement("p");
      priceElement.className = "price-tag";
      priceElement.textContent = priceText;
      priceElement.style.fontWeight = "bold";
      priceElement.style.color = "#ffcb74";
      card.querySelector(".cardInfo").appendChild(priceElement);
    }

    titleElement.addEventListener("click", e => e.preventDefault());

    card.addEventListener("click", () => {
      if (modal) {
        modalImg.src = card.querySelector("img").src;
        modalTitle.textContent = titleText;
        modalPrice.textContent = priceText;
        modal.style.display = "flex";
      }
    });
  });

  if (addToOrderBtn) {
    addToOrderBtn.addEventListener("click", () => {
      const product = {
        title: modalTitle.textContent,
        price: modalPrice.textContent,
        image: modalImg.src
      };

      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(product);
      localStorage.setItem("orders", JSON.stringify(orders));

      modal.style.display = "none";
      alert("Item added to cart!");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.style.display = "none");
  }

  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
});