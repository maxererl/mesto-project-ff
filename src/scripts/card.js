// Function to create a card
export function createCard(template, cardData, removeCard, likeCard, zoomCard) {
  const card = template.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__description .card__title').textContent = cardData.name;

  const likeCounter = card.querySelector('.card__like-counter');
  likeCounter.textContent = cardData.likes.length;

  card.querySelector('.card__delete-button').addEventListener('click', () => {
    removeCard(cardData).then(() => card.remove()).catch(err => console.log(err));
  });

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCard(cardData).then(newData => {
      cardData = newData;
      likeCounter.textContent = newData.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.log(err));
  });
  cardImage.addEventListener('click', () => zoomCard(cardData));

  return card;
}

// Function to display card from the start
export function displayCardStart(cardList, card) {
  cardList.prepend(card)
};

// Function to display card from the end
export function displayCardEnd(cardList, card) {
  cardList.append(card)
};
