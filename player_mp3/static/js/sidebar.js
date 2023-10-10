function sidebar() {
  const buttonsDown = document.querySelectorAll("[data-bs-toggle]");

  buttonsDown.forEach(function (item) {
    item.addEventListener("click", function() {
      const target = item.dataset.bsTarget;
      const downBlock = document.querySelector(target);
      downBlock.classList.toggle("show");
    })
  })
}
sidebar();

