import {cardTemplate, openImageModal} from './index.js'

// Функция создания карточки
const createCard = ({link, name}) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  cardElement.addEventListener("click", (event) => {
    deleteCard(event);
    toggleLikeStatus(event);
    openImageModal(event)
  });
  
  return cardElement;
};

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

export {createCard, deleteCard, toggleLikeStatus}