// Темплейт карточки
const template = document.querySelector('#card-template').content;

// DOM узлы
const cards = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, removeCard) {
  const card = template.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__description .card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return card;
}

// Функция удаления карточки
const removeCard = (evt) => evt.target.closest('.card').remove();

// Вывести карточки на страницу
initialCards.forEach(card => cards.append(createCard(card, removeCard)));