// Function to create a card
export function createCard(template, userId, cardData, removeCard, likeCard, zoomCard) {
  const cardNode = template.querySelector('.card').cloneNode(true);
  const cardImage = cardNode.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardNode.querySelector('.card__description .card__title').textContent = cardData.name;
  const likeCounter = cardNode.querySelector('.card__like-counter');
  likeCounter.textContent = cardData.likes.length;

  const deleteButton = cardNode.querySelector('.card__delete-button');
  if (userId !== cardData.owner._id) deleteButton.remove();
  else deleteButton.addEventListener('click', () => {
    removeCard(cardData).then(() => cardNode.remove()).catch(err => console.log(err));
  });

  const likeButton = cardNode.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCard(cardData, userId).then(newData => {
      cardData = newData;
      likeCounter.textContent = newData.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.log(err));
  });
  if (isLiked(cardData, userId)) likeButton.classList.add('card__like-button_is-active');

  cardImage.addEventListener('click', () => zoomCard(cardData));

  return cardNode;
}

export const isLiked = (cardData, userId) => cardData.likes.map(like => like._id).includes(userId);