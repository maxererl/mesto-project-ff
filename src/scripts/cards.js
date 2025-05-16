import { template, cards, placePopup, popupImg, popupCaption } from './index.js';
import { showModal } from './modal.js';

// Функция создания карточки
export function createCard(cardData, removeCard, likeCard, zoomCard) {
  const card = template.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__description .card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => removeCard(card));
  card.querySelector('.card__like-button').addEventListener('click', () => likeCard(card));
  card.querySelector('.card__image').addEventListener('click', () => zoomCard(cardData));
  return card;
}

// Функция удаления карточки
export const removeCard = card => card.remove();

// Function to set or unset like on card
export const likeCard = card => card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

export const zoomCard = cardData => {
  // Set popup properties
  popupImg.src = cardData.link;
  popupCaption.textContent = cardData.name;

  // Show popup
  showModal(placePopup);
}

// Function to display card from the start
export function displayCardStart(cardData) { cards.prepend(createCard(cardData, removeCard, likeCard, zoomCard)) };

// Function to display card from the end
export function displayCardEnd(cardData) { cards.append(createCard(cardData, removeCard, likeCard, zoomCard)) };
