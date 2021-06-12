// elements
const flavourCards = document.querySelectorAll(".flavour_card");
const sections = document.querySelectorAll(".observed-section");

// create a NEW OBSERVER
const observerOptions = {
  threshold: 0.8,
  rootMargin: "-80px 0px 10px 0px",
  root: null,
};
// for the card
const cardObserver = new IntersectionObserver((ents) => {
  ents.forEach((ent) => {
    if (ent.isIntersecting) {
      ent.target.classList.add("on_screen");
      // console.log(ent.target.id, "is now showing");
    } else {
      ent.target.classList.remove("on_screen");
    }
  });
}, observerOptions);

// for the sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    let activeSection;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection = entry.target.id;
      }
    });
    if (!activeSection) return;

    navLinks.forEach((link) => {
      if (link.href.split("#")[1] === activeSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },
  { ...observerOptions, threshold: 0.1, rootMargin: "-15% 0px -35% 0px" }
);

// observe
flavourCards.forEach((card) => cardObserver.observe(card));
sections.forEach((section) => sectionObserver.observe(section));
