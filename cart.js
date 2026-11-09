document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let total = 0;

  cartItemsContainer.innerHTML = "";

  if (orders.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align:center; padding: 20px;'>Your cart is currently empty.</p>";
    cartTotal.textContent = "Total: 0 DA";
    return;
  }

  orders.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
    total += numericPrice;

    itemElement.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <h3>${item.title}</h3>
          <p>${item.price}</p>
        </div>
      </div>
      <button class="btn-delete" onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(itemElement);
  });

  cartTotal.textContent = `Total: ${total} DA`;
}

function removeItem(index) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("orders");
  renderCart();
}

function confirmOrder() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (orders.length === 0) {
    alert("Your cart is empty. Please add items before confirming.");
    return;
  }

  alert("Thank you for your order! Enjoy your coffee!");
  localStorage.removeItem("orders");
  renderCart();
}