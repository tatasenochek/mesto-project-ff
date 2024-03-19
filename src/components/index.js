import {openModal, closeModal} from './modal'
import {initialCards} from './cards.js'
import { createCard } from './card.js';

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Вывести карточки на страницу
const addCards = (initialCards, deleteCard) => {
    initialCards.forEach(function (item) {
      const cardElement = createCard(item, deleteCard);
  
      placesList.prepend(cardElement);
    });
  };

// Функция для закрытия модального окна редактирования профиля
const closeEditModal = (popupTypeEdit) => {
    closeModal(popupTypeEdit);
};
  
// Открытие окна редактирования профиля
const modalEdit = () => {
    const profileEditButton = document.querySelector(".profile__edit-button");
    const popupTypeEdit = document.querySelector(".popup_type_edit");
    
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const popupForm = popupTypeEdit.querySelector(".popup__form");
    const popupTitle = document.querySelector(".popup__input_type_name");
    const popupDescription = document.querySelector(".popup__input_type_description");
    
    const openEditModal = () => {
      openModal(popupTypeEdit);
      popupTitle.value = profileTitle.innerText;
      popupDescription.value = profileDescription.innerText;
    };
  
    profileEditButton.addEventListener("click", openEditModal);
  
    popupTypeEdit.addEventListener("click", (event) => {
      if (
        event.target === popupTypeEdit ||
        event.target.closest(".popup__close")
      ) {
        closeEditModal(popupTypeEdit);
      }
    });
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      profileTitle.innerText = popupTitle.value;
      profileDescription.innerText = popupDescription.value;
      closeEditModal(popupTypeEdit);
    };
  
    popupForm.addEventListener("submit", handleFormSubmit);
};
     
// Открытие окна добавления карточки
const modalAdd = () => {
    const profileAddButton = document.querySelector(".profile__add-button");
    const popupTypeNewCard = document.querySelector(".popup_type_new-card");
  
    const popupForm = popupTypeNewCard.querySelector(".popup__form");
    const popupName = popupForm.querySelector(".popup__input_type_card-name");
    const popupLink = popupForm.querySelector(".popup__input_type_url");
  
    const openAddModal = () => {
      openModal(popupTypeNewCard);
      popupName.value = "";
      popupLink.value = "";
    };
  
    profileAddButton.addEventListener("click", openAddModal);
  
    popupTypeNewCard.addEventListener("click", (event) => {
      if (
        event.target === popupTypeNewCard ||
        event.target.closest(".popup__close")
      ) {
        closeModal(popupTypeNewCard);
      }
    });
  
    popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const cardData = {
        name: popupName.value,
        link: popupLink.value,
      };
      initialCards.push(cardData);
      const cardElement = createCard(cardData);
      placesList.prepend(cardElement);
      closeModal(popupTypeNewCard);
    });
};
  
// Открытие окна увеличение изображения карточки
const modalImage = () => {
    const cardsImages = document.querySelectorAll(".card__image");
    const popupTypeImage = document.querySelector(".popup_type_image");
  
    const openImageModal = (event) => {
      const cardImage = event.target;
      const popupImage = document.querySelector(".popup__image");
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      openModal(popupTypeImage);
    };
  
    cardsImages.forEach((cardImage) => {
      cardImage.addEventListener("click", openImageModal);
    });
  
    popupTypeImage.addEventListener("click", (event) => {
      if (
        event.target === popupTypeImage ||
        event.target.closest(".popup__close")
      ) {
        closeModal(popupTypeImage);
      }
    });
};

  export {cardTemplate, placesList, addCards, modalEdit, modalAdd, modalImage}