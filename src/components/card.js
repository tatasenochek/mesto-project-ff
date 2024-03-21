import {cardTemplate, openImageModal} from './index.js'

// Функция удаления карточки
const deleteCard = (event) => {
  if (event.target.className === "card__delete-button") {
    const parentNode = event.target.closest(".card");

    parentNode.remove();
  }
};

// Поставить/снять лайк
const toggleLikeStatus = (event) => {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
};

// Функция создания карточки
const createCard = (item, deleteCard, toggleLikeStatus, openImageModal) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardElement.querySelector('.card__delete-button').addEventListener("click", (event) => {deleteCard(event)})
  cardElement.querySelector('.card__like-button').addEventListener("click", (event) => {toggleLikeStatus(event)})
  cardElement.querySelector('.card__image').addEventListener("click", (event) => {openImageModal(event)})

  return cardElement;
};

export {createCard, deleteCard, toggleLikeStatus}