// Открытие модального окна
export const openModal = (popupElement) => {
  popupElement.classList.add("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.add("popup_is-opened");
  }, 600);
  document.addEventListener("keydown", closeModalHandler);
};

// Закрытие модального окна
export const closeModal = (popupElement) => {
  popupElement.classList.remove("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.remove("popup_is-opened");
  }, 600);
  document.removeEventListener("keydown", closeModalHandler);
};

// Закрытие модального окна при нажатии на Esc
export const closeModalHandler = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

// Закрытие модального окна по клику вне области или на кнопку закрытия
export const closeModalButton = (modal, event) => {
  if (event.target === modal || event.target.classList.contains('popup__close')) {
    closeModal(modal);
  }
};
