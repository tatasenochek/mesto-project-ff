import './pages/index.css';
import { openModal, closeModal, closeModalButton } from "./components/modal.js";
import { createCard, toggleLikeState } from "./components/card.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  patchUserInfo,
  postNewCardData,
  deleteMyCard,
  userAvatarChanges
} from "./components/api.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-active'
};

let userId = {};

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    // ID пользователя
    userId = userData._id

    // Аватар пользователя
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    
    // Данные пользователя
    profileTitle.innerText = userData.name;
    profileDescription.innerText = userData.about;

    // Вывод карточек на страницу
    cardsData.forEach((card) => {
      placesList.append(
        createCard(
          card,
          userId,
          openDeleteModal,
          openImageModal,
          toggleLikeState
        )
      );
    })
  })
  .catch((error) => {
    console.error("Ошибка при загрузке данных:", error);
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

// Открытие окна редактирования профиля и заполнение полей ввода
const openEditModal = () => {
  popupTitle.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  clearValidation(popupFormEdit, validationConfig);
};

// Редактирование профиля и закрытие модального окна
const saveFormTypeEdit = async (event) => {
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
      console.log("Ошибка при отправке данных профиля", error);
    })
    .finally(() => {
      setSaveButtonLoading(popupButtonEdit, false);
    });
};

// Открытие окна редактирования аватара
const openAvatarModal = () => {
  openModal(popupTypeAvatar);
  popupFormAvatar.reset();
  clearValidation(popupFormAvatar, validationConfig);
};

// Редактирование аватара и закрытие модального окна
const saveFormTypeAvatar = async (event) => {
  event.preventDefault();
  const link = popupLinkNewAvatar.value;

  setSaveButtonLoading(popupButtonAvatar, true);

  userAvatarChanges(link)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(popupTypeAvatar);
    })
    .catch((error) => {
      console.log("Ошибка при отправке данных аватара", error);
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
const placesList = document.querySelector(".places__list"); // Элемент куда вставляются карточки

const profileAddButton = document.querySelector(".profile__add-button"); // Кнопка добавить новую карточку

const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // Модальное окно добавление новой карточки
const popupFormNewCard = popupTypeNewCard.querySelector(".popup__form"); // Форма в модальном окне добавление новой карточки
const popupButtonNewCard = popupFormNewCard.querySelector(".popup__button"); // Кнопка в модальном окне добавление новой карточки
const popupName = document.querySelector(".popup__input_type_card-name"); // Инпут для названия новой карточки
const popupLink = document.querySelector(".popup__input_type_url"); // Инпут для ссылки новой карточки

const popupTypeImage = document.querySelector(".popup_type_image"); // Модальное окно увеличивающее изображение карточки

const popupDeleteCard = document.querySelector(".popup_delete-card"); // Модальное окно для подтверждения удаления карточки
const popupDeleteButton = popupDeleteCard.querySelector(
  ".popup__button-delete"
); // Кнопка удаления в модальном окне

// Открытие окна добавления карточки
const openAddModal = () => {
  openModal(popupTypeNewCard);
  popupFormNewCard.reset();
  clearValidation(popupFormNewCard, validationConfig);
};

// Создание новой карточки
const saveFormTypeNewCard = (event) => {
  event.preventDefault();
  const nameCard = popupName.value;
  const linkCard = popupLink.value;

  setSaveButtonLoading(popupButtonNewCard, true);

  postNewCardData(nameCard, linkCard)
    .then((card) => {
      const newCard = createCard(
        card,
        userId,
        openDeleteModal,
        openImageModal,
        toggleLikeState
      );
      placesList.prepend(newCard);
      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.log("Ошибка при отправке данных карточки", error);
    })
    .finally(() => {
      popupFormNewCard.reset();
      setSaveButtonLoading(popupButtonNewCard, false);
    });
};

// Открытие окна с увеличенным изображением карточки
const openImageModal = (event) => {
  const cardImage = event.target;
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
};

let card = {}

// Открытие окна для подтвеждения удаления карточки
const openDeleteModal = ({cardId, cardElement}) => {
  card.cardId = cardId;
  card.cardElement = cardElement;

  openModal(popupDeleteCard);
};

// Обработчик события на кнопке подтверждения удаления карточки
popupDeleteButton.addEventListener("click", () => {
  deleteMyCard(card.cardId)
    .then(() => {
      card.cardElement.remove();
      closeModal(popupDeleteCard);
      card = {}
    })
    .catch((error) => {
      console.log("Ошибка при отправке данных", error);
    })
});

// Функция для изменения текста кнопки сохранения профиля
const setSaveButtonLoading = (saveButton, isLoading) => {
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
};

// Обработка закрытия модальных окон
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    closeModalButton(popup, event);
  });
});

// Обработчик события клика по кнопке добавления карточки
profileAddButton.addEventListener("click", openAddModal);

// Обработчик события отправки формы добавления карточки
popupFormNewCard.addEventListener("submit", saveFormTypeNewCard);

enableValidation(validationConfig);
