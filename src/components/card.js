import {
  cardTemplate,
  deleteCard,
  openImageModal,
  openDeleteModal,
  verificationDeleteCard,
  popupDeleteCard,
  popupDeleteButton,
  toggleLikeStatus,
  userId
} from "./index.js";
import { deleteMyCard } from "./api.js";
import { openModal, closeModal } from "./modal.js";

export const checkOwnership = (cardsData, userId) => {
  cardsData.forEach((card) => {
    return card.owner._id !== userId;
  });
};

// Функция создания карточки
export const createCard = (
  card,
  checkOwnership,
  deleteCard,
  openImageModal,
  userData
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-none");
  } else {
    cardDeleteButton.addEventListener("click", () => {
      openDeleteModal(cardId);
    });
  }

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (event) => {
      openImageModal(event);
    });

  return cardElement;
};
