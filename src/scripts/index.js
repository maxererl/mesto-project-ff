import { displayCardEnd } from "./cards";
import { showModal, addModalListners } from "./modal";
import { handleEditFormOpen, handleEditFormSubmit, handleAddFormSubmit } from "./form";

// Initial cards
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// DOM узлы

// Cards
export const cards = document.querySelector('.places__list');
// Темплейт карточки
export const template = document.querySelector('#card-template').content;

// Modal
// Edit profile popup
const editOpen = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.popup_type_edit');

// Add place popup
const addOpen = document.querySelector('.profile__add-button');
export const addPopup = document.querySelector('.popup_type_new-card');

// Places popup
export const placePopup = document.querySelector('.popup_type_image');
export const popupImg = placePopup.querySelector('.popup__image');
export const popupCaption = placePopup.querySelector('.popup__caption');

// Form
// Profile elements
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');

// Edit profile form
const editFormElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = editFormElement.querySelector('.popup__input_type_name');
export const jobInput = editFormElement.querySelector('.popup__input_type_description');

// Add card form
export const addFormElement = document.forms['new-place'];
export const placeInput = addFormElement.querySelector('.popup__input_type_card-name');
export const linkInput = addFormElement.querySelector('.popup__input_type_url');

// Вывести карточки на страницу
initialCards.forEach(displayCardEnd);

// Binding open buttons to popups
editOpen.addEventListener('click', handleEditFormOpen);
addOpen.addEventListener('click', () => showModal(addPopup));

// Add listners to popups
addModalListners(editPopup);
addModalListners(addPopup);
addModalListners(placePopup);

editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
