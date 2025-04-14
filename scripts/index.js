// Темплейт карточки
const template = document.querySelector('#card-template').content;

// DOM узлы
const cards = document.querySelector('.places__list');

// Функция создания карточки
function createCard(title, img, removeCard) {
  const card = template.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = img;
  card.querySelector('.card__description .card__title').textContent = title;
  card.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return card;
}

// Функция удаления карточки
removeCard = (evt) => evt.target.closest('.card').remove();

// Вывести карточки на страницу
initialCards.forEach(card => cards.append(createCard(card.name, card.link, removeCard)));