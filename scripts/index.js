// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  cardElement.addEventListener('click', deleteCard);

  return cardElement;
};

// @todo: Вывести карточки на страницу
function addCards(initialCards, deleteCard) {
  initialCards.forEach(function(item) {
      const cardElement = createCard(item, deleteCard);

      placesList.append(cardElement);
  });
};

addCards(initialCards, deleteCard);

// @todo: Функция удаления карточки
function deleteCard(event) {
  if (event.target.className === "card__delete-button") {
    const parentNode = event.target.closest(".card");

    parentNode.remove();
  };
};