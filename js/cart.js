const cartOpenBtn = document.getElementById("cart-btn");
const cartUI = document.getElementById("cart-drawer");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartScrim = document.querySelector(".underlay");
const modal = document.getElementById("modal");

// F U N C T I O N S
// LOGIC FUNCTIONS
const calculatePrice = () => {
  const cart = getCart();
  return cart.reduce((prev, current) => {
    return prev + Number(current.price.slice(1)) * current.quantity;
  }, 0);
};
const calculateQuantity = () => {
  const cart = getCart();
  return cart.reduce((prev, current) => {
    return prev + Number(current.quantity);
  }, 0);
};
// add items to cart
const addToCart = id => {
  const item = flavours.find(flavour => flavour.id === id);
  item.quantity = 1;
  const cart = getCart();
  cart.push(item);
  setCart(cart);
  handleCartBadge();
  populateShop();
};
const handleQuantityIncrement = id => {
  const cart = getCart();
  const newCart = cart.map(item => {
    const newItem = item;
    if (item.id === id) {
      item.quantity += 1;
    }
    return newItem;
  });
  setCart(newCart);
  updateCartValues();
};
const handleQuantityDecrement = id => {
  const cart = getCart();
  const newCart = cart.map(item => {
    const newItem = item;
    if (item.id === id && item.quantity > 1) {
      item.quantity -= 1;
    }
    return newItem;
  });

  setCart(newCart);
  updateCartValues();
};
const clearCart = () => {
  setCart([]);
  updateCartValues();
};
const removeItemFromCart = id => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== id);
  setCart(newCart);
  updateCartValues();
};
const copyIDToClipboard = id => {};
const handleCheckout = details => {
  const modalElement = createModalElement(details);
  modal.appendChild(modalElement);
};
const closeModal = () => {
  const modalElement = document.querySelector(".feedback-modal");
  modal.removeChild(modalElement);
  clearCart();
  handleCartClose();
  location.reload();
};
// UI FUNCTIONS
// populating the cart
const populateCart = () => {
  const cartItems = document.querySelector(".cart-items");
  const cart = getCart();
  // clear children
  Array.from(cartItems.children).forEach(child => {
    cartItems.removeChild(child);
  });
  // populate
  if (cart.length) {
    cart.forEach(item => {
      const cartItem = createCartItem(item);
      cartItems.append(cartItem);
    });
    document.getElementById("paypal-btn").style.display = "block";
  } else {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.innerHTML = `
      <img src="${"../img/undraw_empty_cart_co35.svg"}" class="empty-img"/>
      <span>Cart is empty, added items to cart.</span>
    `;
    cartItems.appendChild(empty);
    document.getElementById("paypal-btn").style.display = "none";
  }
};
const createCartItem = item => {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.innerHTML = `
    <div class="item-details">
      <div class="item-img">
        <img src="${item.src}" alt="" />
      </div>
      <div class="item-name-price">
        <h4>${item.name}</h4>
        <span>${item.price}</span>
      </div>
    </div>
  <footer>
      <button class="remove-btn" onclick="removeItemFromCart(${item.id})">
      <i class="fas fa-trash-alt"></i>
      <span>Remove</span>
      </button>
    <div class="item-quantity">
      <button class="increment" onclick="handleQuantityIncrement(${item.id})">
      <i class="fas fa-plus"></i>
      </button>
      <div class="quantity">${item.quantity}</div>
      <button class="decrement" onclick="handleQuantityDecrement(${item.id})" ${
    item.quantity < 2 && "disabled"
  }>
      <i class="fas fa-minus"></i>
      </button>
    </div>
  </footer>
  <hr class="divider">`;
  return cartItem;
};
const handleCartBadge = () => {
  // remove previous badge(s)
  Array.from(cartOpenBtn.children).forEach(child => {
    if (child.classList.contains("cart-badge")) {
      cartOpenBtn.removeChild(child);
    }
  });
  const quantity = calculateQuantity();
  const badge = document.createElement("span");
  badge.className = "cart-badge";
  badge.id = "cart-badge";
  badge.textContent = quantity;
  cartOpenBtn.appendChild(badge);
  if (quantity > 0) {
    badge.classList.remove("d-none");
  } else {
    badge.classList.add("d-none");
  }
};
const setTotalPrice = () => {
  const cartPriceUI = document.getElementById("cart-price");
  cartPriceUI.textContent = calculatePrice() || 0;
};
const setTotalItemsQuantity = () => {
  const cartQuantityUI = document.getElementById("total-quantity");
  cartQuantityUI.textContent = calculateQuantity() || 0;
};
const updateCartValues = () => {
  populateCart();
  setTotalItemsQuantity();
  setTotalPrice();
  handleCartBadge();
};
const createModalElement = details => {
  const modalContainer = document.createElement("section");
  modalContainer.classList = "feedback-modal";
  modalContainer.innerHTML = `
  <div class="modal-scrim"></div>
        <div class="modal">
          <div class="modal-content">
            <div class="icon">
              <img src="${
                details?.status === "COMPLETED"
                  ? "./img/checked.png"
                  : "./img/failed.png"
              }" alt="checked" />
              <span class="status ${
                details?.status === "COMPLETED" ? "success" : "failed"
              }">${
    details?.status === "COMPLETED" ? "success" : "failed"
  }</span>
            </div>
            <div class="info-item">
              <div class="item-key">Quantity of item(s)</div>
              <div class="item-value">${calculateQuantity()}</div>
            </div>
            <div class="info-item">
              <div class="item-key">Price of item(s)</div>
              <div class="item-value">${calculatePrice()}</div>
            </div>
            <div class="info-item">
              <div class="item-key">Payer Name</div>
              <div class="item-value">${details?.payer?.name?.given_name} ${
    details?.payer?.name?.surname
  }</div>
            </div>
            <div class="info-item">
              <div class="item-key">Transaction ID</div>
              <button class="item-value copy-btn">
                <span>${details?.id}</span>
              </button>
            </div>
          </div>
          <footer>
            <button class="done-btn" onclick="closeModal()">done</button>
          </footer>
        </div>
  `;
  return modalContainer;
};

// handlers for cart operations
const handleCartOpen = () => {
  cartUI.classList.add("opened");
  updateCartValues();
};
const handleCartClose = () => {
  cartUI.classList.remove("opened");
};

// event listeners
[cartCloseBtn, cartScrim].forEach(element => {
  element.addEventListener("click", handleCartClose);
});
cartOpenBtn.addEventListener("click", handleCartOpen);
window.addEventListener("DOMContentLoaded", updateCartValues);
