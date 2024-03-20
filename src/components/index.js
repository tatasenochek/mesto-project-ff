import { openModal, closeModal, closeModalButton } from "./modal";
import { initialCards } from "./cards.js";
import { createCard } from "./card.js";

// Элементы
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupFormEdit = popupTypeEdit.querySelector(".popup__form");
const popupTitle = document.querySelector(".popup__input_type_name");
const popupDescription = document.querySelector(".popup__input_type_description");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupFormNewCard = popupTypeNewCard.querySelector(".popup__form");
const popupName = document.querySelector(".popup__input_type_card-name");
const popupLink = document.querySelector(".popup__input_type_url");
const popupTypeImage = document.querySelector(".popup_type_image");

// Вывести карточки на страницу
const addCards = (initialCards, deleteCard) => {
  initialCards.forEach(function (item) {
    const cardElement = createCard(item, deleteCard);
    placesList.prepend(cardElement);

    imageClickHandler(cardElement)
  });
};

// Открытие окна редактирования профиля и заполнение полей ввода
const openEditModal = () => {
  openModal(popupTypeEdit);
  popupTitle.value = profileTitle.innerText;
  popupDescription.value = profileDescription.innerText;
};

// Редактирование профиля и закрытие модального окна
const handleFormSubmit = (event) => {
  event.preventDefault();
  profileTitle.innerText = popupTitle.value;
  profileDescription.innerText = popupDescription.value;
  closeModal(popupTypeEdit);
};

// Открытие окна добавления карточки
const openAddModal = () => {
  openModal(popupTypeNewCard);
  popupName.value = "";
  popupLink.value = "";
};

// Создание новой карточки
const saveForm = (event) => {
  event.preventDefault();
  const cardData = {
    name: popupName.value,
    link: popupLink.value,
  };
  initialCards.push(cardData);
  const cardElement = createCard(cardData);
  placesList.prepend(cardElement);
  closeModal(popupTypeNewCard);

  imageClickHandler(cardElement)
};

// Открытие окна с увеличенным изображением карточки
const openImageModal = (event) => {
  const cardImage = event.target;
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
};

// Обработка закрытия модальных окон
document.addEventListener("click", (event) => {
    closeModalButton(popupTypeEdit, event);
    closeModalButton(popupTypeNewCard, event);
    closeModalButton(popupTypeImage, event);
});

// Добавляем обработчик клика на каждое изображение карточки для открытия модального окна
const imageClickHandler = (cardElement) => {
    cardElement.querySelectorAll('.card__image').forEach((image) => {
      image.addEventListener('click', openImageModal);
});
}

// Обработчик события клика по кнопке добавления карточки
profileAddButton.addEventListener("click", openAddModal);

// Обработчик события отправки формы добавления карточки
popupFormNewCard.addEventListener("submit", saveForm);

// Обработчик события клика по кнопке редактирования профиля
profileEditButton.addEventListener("click", openEditModal);

// Обработчик события отправки формы редактирования профиля
popupFormEdit.addEventListener("submit", handleFormSubmit);

export { cardTemplate, addCards }