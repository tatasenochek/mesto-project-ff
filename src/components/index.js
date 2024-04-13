import { openModal, closeModal, closeModalButton } from "./modal";
import { createCard, toggleLikeState } from "./card.js";
import {
  clearValidation,
  validationConfig,
  enableValidation,
} from "./validation.js";
import {
  getInitialCards,
  getUserInfo,
  patchUserInfo,
  postNewCardData,
  putLike,
  deleteLike,
  deleteMyCard,
  userAvatarChanges,
} from "./api.js";

export let userId;

// Обработкa двух запросов
const getData = async () => {
  try {
    const responses = await Promise.all([getInitialCards(), getUserInfo()]);
    const [cardsResponse, userResponse] = responses;
    const cardsData = cardsResponse;
    const userData = userResponse;

    return { cardsData, userData };
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

// Вызов функции для получения данных
getData()
  .then(({ cardsData, userData }) => {
    userId = userData._id;
    addCards(cardsData, userData);
    userInfo(userData);
    userAvatar(userData);
  })
  .catch((error) => {
    console.error("Ошибка при работе с данными:", error);
  });

// ---------- Профиль ----------
// Элементы
const profileTitle = document.querySelector(".profile__title"); // Информация об имени
const profileDescription = document.querySelector(".profile__description"); // Информация о работе
const profileEditButton = document.querySelector(".profile__edit-button"); // Кнопка редактировать профиль

const popupTypeEdit = document.querySelector(".popup_type_edit"); // Модальное окно редактирования профиля
const popupFormEdit = popupTypeEdit.querySelector(".popup__form"); // Форма в модальном окне редактирования профиля
const popupButtonEdit = popupTypeEdit.querySelector(".popup__button"); // Кнопка в модальном окне редактирования профиля
const popupTitle = document.querySelector(".popup__input_type_name"); //Инпут в модальном окне для имени
const popupDescription = document.querySelector(
  ".popup__input_type_description"
); //Инпут в модальном окне для работы

const profileImage = document.querySelector(".profile__image"); // Аватар пользователя
const popupTypeAvatar = document.querySelector(".popup_type_avatar"); // Модально онкно редактирования аватара
const popupButtonAvatar = popupTypeAvatar.querySelector(".popup__button"); // Кнопка в модальном окне редактирования аватара
const popupFormAvatar = popupTypeAvatar.querySelector(".popup__form"); // Форма в модальном окне редактирования аватара
const popupLinkNewAvatar = popupFormAvatar.querySelector(
  ".popup__input_type_url"
); // Инпут для ссылки нового аватара пользователя

// Данные пользователя
export const userInfo = async (userInfo) => {
  await getUserInfo(userInfo);
  profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
  profileTitle.innerText = userInfo.name;
  profileDescription.innerText = userInfo.about;
};

// Открытие окна редактирования профиля и заполнение полей ввода
export const openEditModal = async (name, about) => {
  await getUserInfo(userInfo);
  openModal(popupTypeEdit);
  popupTitle.innerText = userInfo.name;
  popupDescription.innerText = userInfo.about;
  popupFormEdit.reset();
  clearValidation(popupFormEdit, validationConfig);
};

// Редактирование профиля и закрытие модального окна
export const saveFormTypeEdit = async (event) => {
  event.preventDefault();
  const name = popupTitle.value;
  const about = popupDescription.value;

  setSaveButtonLoading(popupButtonEdit, true);

  patchUserInfo(name, about)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setSaveButtonLoading(popupButtonEdit, false);
    });
};

// Аватар пользователя
export const userAvatar = async (userData) => {
  getUserInfo(userData)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Открытие окна редактирования аватара
export const openAvatarModal = () => {
  openModal(popupTypeAvatar);
  popupFormAvatar.reset();
  clearValidation(popupFormAvatar, validationConfig);
};

// Редактирование аватара и закрытие модального окна
export const saveFormTypeAvatar = async (event) => {
  event.preventDefault();
  const link = popupLinkNewAvatar.value;

  setSaveButtonLoading(popupButtonAvatar, true);

  userAvatarChanges(link)
    .then((userData) => {
      userAvatar(userData);
      closeModal(popupTypeAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupFormAvatar.reset();
      setSaveButtonLoading(popupButtonAvatar, false);
    });
};

// Обработчик события клика по кнопке редактирования аватара
profileImage.addEventListener("click", openAvatarModal);

// Обработчик события отправки формы редактирования ававтара
popupFormAvatar.addEventListener("submit", saveFormTypeAvatar);

// Обработчик события клика по кнопке редактирования профиля
profileEditButton.addEventListener("click", openEditModal);

// Обработчик события отправки формы редактирования профиля
popupFormEdit.addEventListener("submit", saveFormTypeEdit);

// ---------- Карточки ----------
// Элементы
export const cardTemplate = document.querySelector("#card-template").content; // Шаблон для создания карточек
const placesList = document.querySelector(".places__list"); // Элемент куда вставляются карточки

const profileAddButton = document.querySelector(".profile__add-button"); // Кнопка добавить новую карточку

const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // Модальное окно добавление новой карточки
const popupFormNewCard = popupTypeNewCard.querySelector(".popup__form"); // Форма в модальном окне добавление новой карточки
const popupButtonNewCard = popupFormNewCard.querySelector(".popup__button"); // Кнопка в модальном окне добавление новой карточки
const popupName = document.querySelector(".popup__input_type_card-name"); // Инпут для названия новой карточки
const popupLink = document.querySelector(".popup__input_type_url"); // Инпут для ссылки новой карточки

const popupTypeImage = document.querySelector(".popup_type_image"); // Модальное окно увеличивающее изображение карточки

export const popupDeleteCard = document.querySelector(".popup_delete-card"); // Модальное окно для подтверждения удаления карточки
export const popupDeleteButton = document.querySelector(
  ".popup__button-delete"
); // Кнопка удаления в модальном окне

// Вывести карточки на страницу
export const addCards = async (cardsData, deleteCard, openImageModal, userData) => {
  getInitialCards().then(() => {
    cardsData.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        openImageModal,
        userData,
        toggleLikeState
      );
      placesList.append(cardElement);
    });
  });
};

// Открытие окна добавления карточки
export const openAddModal = () => {
  openModal(popupTypeNewCard);
  popupFormNewCard.reset();
  clearValidation(popupFormNewCard, validationConfig);
};

// Создание новой карточки
export const saveFormTypeNewCard = (event) => {
  event.preventDefault();
  const nameCard = popupName.value;
  const linkCard = popupLink.value;

  setSaveButtonLoading(popupButtonNewCard, true);

  postNewCardData(nameCard, linkCard)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        cardTemplate,
        openImageModal,
        userId
      );
      placesList.prepend(cardElement);
      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupFormNewCard.reset();
      setSaveButtonLoading(popupButtonNewCard, false);
    });
};

// Открытие окна с увеличенным изображением карточки
export const openImageModal = (event) => {
  const cardImage = event.target;
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
};

// Открытие окна для подтвеждения удаления карточки
export const openDeleteModal = (cardId) => {
  openModal(popupDeleteCard);
  popupDeleteButton.addEventListener("click", () => {
    verificationDeleteCard(cardId);
  });
};

// Подтверждение удаления
export const verificationDeleteCard = (cardId) => {
  deleteCard(cardId);
  closeModal(popupDeleteCard);
};

// Удаление карточки
export const deleteCard = (cardId) => {
  deleteMyCard(cardId);
  document.getElementById(cardId).remove()
};


// Функция для изменения текста кнопки сохранения профиля
const setSaveButtonLoading = (saveButton, isLoading) => {
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
};

// Обработка закрытия модальных окон
document.addEventListener("click", (event) => {
  closeModalButton(popupTypeEdit, event);
  closeModalButton(popupTypeNewCard, event);
  closeModalButton(popupTypeImage, event);
  closeModalButton(popupTypeAvatar, event);
  closeModalButton(popupDeleteCard, event);
});

// Обработчик события клика по кнопке добавления карточки
profileAddButton.addEventListener("click", openAddModal);

// Обработчик события отправки формы добавления карточки
popupFormNewCard.addEventListener("submit", saveFormTypeNewCard);

enableValidation(validationConfig);
