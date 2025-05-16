// Function to create a card
export function createCard(template, cardData, removeCard, likeCard, zoomCard) {
  const card = template.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__description .card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => removeCard(card));
  card.querySelector('.card__like-button').addEventListener('click', () => likeCard(card));
  cardImage.addEventListener('click', () => zoomCard(cardData));
  return card;
}

// Function to delete a card
export const removeCard = card => card.remove();

// Function to set or unset like on card
export const likeCard = card => card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');

// Function to display card from the start
export function displayCardStart(cardList, template, cardData, zoomCard) {
  cardList.prepend(createCard(template, cardData, removeCard, likeCard, zoomCard))
};

// Function to display card from the end
export function displayCardEnd(cardList, template, cardData, zoomCard) {
  cardList.append(createCard(template, cardData, removeCard, likeCard, zoomCard))
};
