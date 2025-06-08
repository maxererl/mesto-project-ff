import './pages/index.css';

import { getInitialCards, getUserInfo, updateUserInfo, addCard, deleteCard, likeCardRequest, unlikeCardRequest, updateUserImage } from './scripts/api.js';
import { createCard, displayCardStart, displayCardEnd } from './scripts/card.js';
import { showModal, hideModal, addModalListners } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

// DOM nodes

// Cards
const cards = document.querySelector('.places__list');
// Card template
const template = document.querySelector('#card-template').content;

// Modal
// Edit profile image popup
const editImageOpen = document.querySelector('.profile__image')
const editImagePopup = document.querySelector('.popup_type_edit-image')

// Edit profile popup
const editOpen = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

// Add place popup
const addOpen = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

// Places popup
const placePopup = document.querySelector('.popup_type_image');
const popupImg = placePopup.querySelector('.popup__image');
const popupCaption = placePopup.querySelector('.popup__caption');

// Form
// Profile elements
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Edit profile picture form
const editImageFormElement = document.querySelector('.popup_type_edit-image .popup__form');
const imageLinkInput = editImageFormElement.querySelector('.popup__input_type_url');

// Edit profile form
const editFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

// Add card form
const addFormElement = document.forms['new-place'];
const placeInput = addFormElement.querySelector('.popup__input_type_card-name');
const linkInput = addFormElement.querySelector('.popup__input_type_url');

// Validation config
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const user = getUserInfo();
const initialCards = getInitialCards();
user.then(userData => {
  profileImage.style.backgroundImage = `url("${userData.avatar}")`;
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
})
  .catch(err => console.log(err));
// Display cards on page
Promise.all([user, initialCards]).then(arr => arr[1].forEach(card => {
  const cardNode = createCard(template, card, removeCard, likeCard, zoomCard);
  if (arr[0]._id !== card.owner._id) cardNode.querySelector('.card__delete-button').remove();
  if (card.likes.map(like => like._id).includes(arr[0]._id)) cardNode.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  displayCardEnd(cards, cardNode);
}));

// Binding open buttons to popups
editImageOpen.addEventListener('click', handleEditImageFormOpen);
editOpen.addEventListener('click', handleEditFormOpen);
addOpen.addEventListener('click', () => showModal(addPopup));

// Add smooth animation to all popups
document.querySelectorAll('.popup').forEach(el => el.classList.add('popup_is-animated'));

// Add listners to popups
addModalListners(editImagePopup);
addModalListners(editPopup);
addModalListners(addPopup);
addModalListners(placePopup);

// Add listners to forms
editImageFormElement.addEventListener('submit', handleEditImageFormSubmit);
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

// Enable form validation
enableValidation(validationConfig);

// Functions

// Popups functions
// Function to delete a card
const removeCard = cardData => deleteCard(cardData._id);

// Function to set or unset like on card
const likeCard = cardData => user.then(userData => {
  if (cardData.likes.map(like => like._id).includes(userData._id)) return unlikeCardRequest(cardData._id);
  else return likeCardRequest(cardData._id);
})
.catch(err => console.log(err));

// Function to open card popup
function zoomCard(cardData) {
  // Set popup properties
  popupImg.src = cardData.link;
  popupImg.alt = `Изображение места: ${cardData.name}`;
  popupCaption.textContent = cardData.name;

  // Show popup
  showModal(placePopup);
}

// Forms functions
// Function to open edit profile image popup
function handleEditImageFormOpen() {
  //Clear validation errors
  clearValidation(editImageFormElement, validationConfig);

  // Set current input value
  imageLinkInput.value = profileImage.style.backgroundImage.match(/(?<=").*(?=")/)[0];

  // Show popup
  showModal(editImagePopup);
}

// Function to open edit profile popup
function handleEditFormOpen() {
  //Clear validation errors
  clearValidation(editFormElement, validationConfig);

  // Set current input values
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // Show popup
  showModal(editPopup);
}

// Function to process profile image change
function handleEditImageFormSubmit(evt) {
  evt.preventDefault();
  //Clear validation errors
  clearValidation(editImageFormElement, validationConfig);
  renderLoading(editImageFormElement, true);
  updateUserImage(imageLinkInput.value).then(res => profileImage.style.backgroundImage = `url("${res.avatar}")`)
  .catch(err => console.log(err))
  .finally(() => renderLoading(editImageFormElement, false));

  // Hide popup
  hideModal(editImagePopup);
}

// Function to process profile changes
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  //Clear validation errors
  clearValidation(editFormElement, validationConfig);
  renderLoading(editFormElement, true);
  updateUserInfo(nameInput.value, jobInput.value)
  .then(user => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(editFormElement, false))
  
  // Hide popup
  hideModal(editPopup);
}

// Function to process new card insertion
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  //Clear validation errors
  clearValidation(addFormElement, validationConfig);
  renderLoading(addFormElement, true);
  addCard(placeInput.value, linkInput.value)
  .then(card => {
    const cardNode = createCard(template, card, removeCard, likeCard, zoomCard);
    displayCardStart(cards, cardNode);
  })
  .catch(err => console.log(err))
  .finally(() => renderLoading(addFormElement, false));
  
  // Reset form inputs
  addFormElement.reset();
  
  // Hide popup
  hideModal(addPopup);
}

function renderLoading(form, isLoading) {
  if (isLoading) {
    form.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    form.querySelector('.popup__button').textContent = 'Сохранить';
  }
}
