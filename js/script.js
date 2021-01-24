const burger = document.querySelector(".navbar__burger");

burger.addEventListener('click', e => {
  // get the the dropdown
  const navbar = e.target.closest('button').parentElement.parentElement;

  navbar.classList.toggle('expanded');
});