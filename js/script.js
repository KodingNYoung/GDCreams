// ELEMENTS
const burger = document.querySelector(".navbar__burger");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
const contactForm = document.getElementById("contact-form");

// FUNCTIONS
const setCart = newCart => {
  cart = newCart;
  localStorage.setItem("cart", JSON.stringify(newCart));
};
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};
// handler for burger click
const handleBurgerClick = () => {
  navbar.classList.toggle("expanded");
};

const closeMenu = () => {
  navbar.classList.remove("expanded");
};

// handler for the scroll event
const handlePageScroll = () => {
  // getting the percentage scroll
  const scroll = window.scrollY;
  const docHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollPercentage = (scroll * 100) / (docHeight - windowHeight);

  // toggling the visibility wrt to percentage scroll
  const contactIcon = document.getElementById("contact-icon");
  if (scrollPercentage > 90) {
    contactIcon.classList.add("invisible");
  } else {
    contactIcon.classList.remove("invisible");
  }
};

// handler for contact form submission
const handleContactFormSubmit = e => {
  e.preventDefault();
  const emailUI = e.target.querySelector("input");
  const messageUI = e.target.querySelector("textarea");
  const buttonUI = e.target.querySelector("button");
  if (!(emailUI.value && messageUI.value)) return;

  buttonUI.textContent = "Sending...";
  buttonUI.disabled = true;

  setTimeout(() => {
    buttonUI.textContent = "Send message";
    buttonUI.disabled = false;

    const toast = createToast("Sent!", "success");

    e.target.insertBefore(toast, emailUI);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }, 2000);
};

const createToast = (text, status) => {
  const toastDiv = document.createElement("div");
  toastDiv.className = `toast ${status}`;

  const toastSpan = document.createElement("span");
  toastSpan.textContent = text;

  toastDiv.appendChild(toastSpan);

  return toastDiv;
};

// EVENTLISTENERS
// for the burger click
burger.addEventListener("click", handleBurgerClick);
// for any scroll event on the page
window.addEventListener("scroll", handlePageScroll);
// if any navlinks is clicked
navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});
contactForm.addEventListener("submit", handleContactFormSubmit);
window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  AOS.init();
});
