import './pages/index.css';

import { initialCards } from './scripts/cards.js';
import { displayCardStart, displayCardEnd } from './scripts/card.js';
import { showModal, hideModal, addModalListners } from './scripts/modal.js';

// DOM nodes

// Cards
const cards = document.querySelector('.places__list');
// Card template
const template = document.querySelector('#card-template').content;

// Modal
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
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Edit profile form
const editFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

// Add card form
const addFormElement = document.forms['new-place'];
const placeInput = addFormElement.querySelector('.popup__input_type_card-name');
const linkInput = addFormElement.querySelector('.popup__input_type_url');

// Display cards on page
initialCards.forEach(card => displayCardEnd(cards, template, card, zoomCard));

// Binding open buttons to popups
editOpen.addEventListener('click', handleEditFormOpen);
addOpen.addEventListener('click', () => showModal(addPopup));

// Add smooth animation to all popups
document.querySelectorAll('.popup').forEach(el => el.classList.add('popup_is-animated'));

// Add listners to popups
addModalListners(editPopup);
addModalListners(addPopup);
addModalListners(placePopup);

// Add listners to forms
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

// Functions

// Popups functions
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
// Function to open edit profile popup
function handleEditFormOpen() {
  // Set current input values
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // Show popup
  showModal(editPopup);
}

// Function to process profile changes
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  // Set new profile fields
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  // Hide popup
  hideModal(editPopup);
}

// Function to process new card insertion
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  // Display new card
  displayCardStart(cards, template, {name: placeInput.value, link: linkInput.value}, zoomCard);

  // Reset form inputs
  addFormElement.reset();

  // Hide popup
  hideModal(addPopup);
}