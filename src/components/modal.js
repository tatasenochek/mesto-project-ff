// Открытие модального окна
const openModal = (popupElement) => {
  popupElement.classList.add("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.add("popup_is-opened");
  }, 600);
  document.addEventListener("keydown", closeModalHandler);
};

// Закрытие модального окна
const closeModal = (popupElement) => {
  popupElement.classList.remove("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.remove("popup_is-opened");
  }, 600);
  document.removeEventListener("keydown", closeModalHandler);
};

// Закрытие модального окна при нажатии на Esc
const closeModalHandler = (event) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && event.key === "Escape") {
    closeModal(openedPopup);
  }
};


// Закрытие модального окна по клику вне области или на кнопку закрытия
const closeModalButton = (modal, event) => {
  if (
    modal.classList.contains("popup") &&
    (event.target === modal || event.target.closest(".popup__close"))
  ) {
    closeModal(modal);
  }
};

export { openModal, closeModal, closeModalHandler, closeModalButton };