import { editPopup, profileName, profileJob, nameInput, jobInput, addPopup, addFormElement, placeInput, linkInput } from "./index.js"
import { showModal, hideModal } from "./modal";
import { displayCardStart } from "./cards.js";

// Function to open edit profile popup
export function handleEditFormOpen() {
  // Get current profile fields
  const name = profileName.textContent;
  const job = profileJob.textContent;

  // Set current input values
  nameInput.value = name;
  jobInput.value = job;

  // Show popup
  showModal(editPopup);
}

// Function to process profile changes
export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  // Get input values
  const name = nameInput.value;
  const job = jobInput.value;

  // Set new profile fields
  profileName.textContent = name;
  profileJob.textContent = job;

  // Hide popup
  hideModal(editPopup);
}

// Function to process new card insertion
export function handleAddFormSubmit(evt) {
  evt.preventDefault();
  // Display new card
  displayCardStart({name: placeInput.value, link: linkInput.value});

  // Reset form inputs
  addFormElement.reset();

  // Hide popup
  hideModal(addPopup);
}
