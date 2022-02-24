// elements
const sections = document.querySelectorAll(".observed-section");
const flavoursUI = document.querySelector(".flavours");

// populating the products with state info
const populatingFlavours = () => {
  let flavourString = "";
  flavours.splice(0, 3).forEach((flavour, index) => {
    flavourString += `<div class="flavour_card" data-aos="fade-left" data-aos-delay="${
      100 * index
    }">
            <div class="flavour_card__image">
              <img src="${flavour.src}" alt="" />
            </div>
            <div class="flavour_card__text">
              <h3>${flavour.name}</h3>
              <p>
                ${flavour.description}
              </p>
            </div>
          </div>`;
  });
  flavoursUI.innerHTML = flavourString;
};

// create a NEW OBSERVER
const observerOptions = {
  threshold: 0.8,
  rootMargin: "-80px 0px 10px 0px",
  root: null
};

// for the sections
const sectionObserver = new IntersectionObserver(
  entries => {
    let activeSection;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection = entry.target.id;
      }
    });
    if (!activeSection) return;

    navLinks.forEach(link => {
      if (link.href.split("#")[1] === activeSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },
  { ...observerOptions, threshold: 0.1, rootMargin: "-15% 0px -35% 0px" }
);

// observer and eventlisteners
sections.forEach(section => sectionObserver.observe(section));
window.addEventListener("DOMContentLoaded", populatingFlavours);
