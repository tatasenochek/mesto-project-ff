import {
  cardTemplate,
  deleteCard,
  openDeleteModal,
  verificationDeleteCard,
  popupDeleteCard,
  popupDeleteButton,
  userId,
  openImageModal
} from "./index.js";
import { deleteMyCard, deleteLike, putLike, getInitialCards } from "./api.js";
import { openModal, closeModal } from "./modal.js";

// Функция создания карточки
export const createCard = (
  card,
  deleteCard,
  userData
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = card._id;

  cardElement.id = card._id
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
    toggleLikeState(cardId, likeButton, likeCounter);
  });
  
  toggleButtonState(card, likeButton, likeCounter);

  cardImage.addEventListener("click", (event) => {
    openImageModal(event);
  });

  return cardElement;
};

// Проверка статуса лайка и постановка класса
const toggleButtonState = (card, likeButton, likeCounter) => {
  const hasUserLiked = card.likes.some(like => (like._id ===  card.owner._id));

  if (hasUserLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Проверка статуса лайка и отправка запросов
const toggleLikeState = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    deleteLike(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.error('Ошибка при снятии лайка:', error);
      });
  } else {
    putLike(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.error('Ошибка при постановке лайка:', error);
      });
  }
}