// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполнение карточки контентом
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  // @todo: Вывести карточки на страницу
  placesList.append(cardElement);

  // Обработчик удаления карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  if (event.target.className === 'card__delete-button') {
    const parentNode = event.target.closest('.card');
    parentNode.remove();
  }
};

// Создание карточки и добавление в список
initialCards.forEach(function(item) {
  placesList.append(createCard(item));
});

// Обработчик на список карточек
placesList.addEventListener('click', deleteCard);