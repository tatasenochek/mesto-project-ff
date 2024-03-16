import '../pages/index.css';
import {initialCards} from '../scripts/cards.js'
import {cardTemplate, placesList, createCard, addCards, deleteCard} from '../scripts/index.js'


addCards(initialCards, deleteCard);