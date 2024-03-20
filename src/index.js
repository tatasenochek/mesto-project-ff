import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLikeStatus } from './components/card.js';
import { openModal, closeModal, closeModalHandler, closeModalButton } from './components/modal.js';
import { cardTemplate, addCards } from './components/index.js';

addCards(initialCards, deleteCard);
