const cartOpenBtn = document.getElementById("cart-btn");
const cartUI = document.getElementById("cart-drawer");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartScrim = document.querySelector(".underlay");

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
  populateShop();
  handleCartBadge();
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
const removeItemFromCart = id => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== id);
  setCart(newCart);
  updateCartValues();
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
  cart.forEach(item => {
    const cartItem = createCartItem(item);
    cartItems.append(cartItem);
  });
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
  cartPriceUI.textContent = calculatePrice();
};
const setTotalItemsQuantity = () => {
  const cartQuantityUI = document.getElementById("total-quantity");
  cartQuantityUI.textContent = calculateQuantity();
};
const updateCartValues = () => {
  populateCart();
  setTotalItemsQuantity();
  setTotalPrice();
  handleCartBadge();
  populateShop();
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
