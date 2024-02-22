// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(initialCards, deleteCard) {
  initialCards.forEach(function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;

    // @todo: Вывести карточки на страницу
    placesList.append(cardElement);
  });
}
createCard(initialCards, deleteCard);

// @todo: Функция удаления карточки
placesList.addEventListener('click', deleteCard);

function deleteCard(event) {
  if (event.target.className === 'card__delete-button') {
    const parentNode = event.target.closest('.card');
    parentNode.remove();
  }
};
