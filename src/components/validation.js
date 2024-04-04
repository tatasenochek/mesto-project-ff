//Включение валидации всех форм
const enableValidation = (validationConfig) => {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validationConfig;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

//Показываем сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Скрываем сообщение об ошибке
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//Проверка валидности введенных данных
const isValid = (formElement, inputElement, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Установка обработчика событий всем полям ввода внутри формы
const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;
  
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

//Проверка наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Активация\дезактивация кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;
  
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Очистка ошибок валидации формы
const clearValidation = (formElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    inputElement.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-active'
};

export { enableValidation, validationConfig, clearValidation };
