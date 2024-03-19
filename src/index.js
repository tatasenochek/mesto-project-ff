import '../pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLikeStatus } from './components/card.js';
import { openModal, closeModal, closeModalHandler } from './components/modal.js';
import { cardTemplate, placesList, addCards, modalEdit, modalAdd, modalImage, openImageModal } from './components/index.js';

addCards(initialCards, deleteCard);
modalEdit();
modalAdd();
modalImage()
toggleLikeStatus()