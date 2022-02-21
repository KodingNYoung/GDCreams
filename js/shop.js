// populating the products with state info
const populateShop = () => {
  let flavourString = "";
  flavours.forEach(flavour => {
    const cart = getCart();
    const isInCart = Boolean(cart.find(item => item.id === flavour.id));
    flavourString += `<div class="flavour_card" id=${flavour.id}>
            <div class="flavour_card__image">
              <img src="${flavour.src}" alt="" />
            </div>
            <div class="flavour_card__text">
              <h3>${flavour.name}</h3>
              <p>
                ${flavour.description}
              </p>
            </div>
            <div class="card-footer">
            <span class="footer-price">${flavour.price}</span>
            ${
              isInCart
                ? `<button class="add-to-card-btn" disabled>
                Added to cart
            </button>`
                : `<button class="add-to-card-btn" onclick="addToCart(${flavour.id})">
              <span class="fas fa-cart-plus"></span>
              <span>Add to cart</span>
            </button>`
            }
          </div>
          </div>`;
  });
  flavoursUI.innerHTML = flavourString;
};

// call functions on events
window.addEventListener("DOMContentLoaded", populateShop);
