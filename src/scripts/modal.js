// Close on escape handler
const escapeHandler = evt => {if (evt.key === 'Escape') hideModal(document.querySelector('.popup_is-opened'))};

// Function to show popup
export function showModal(popup) {
  popup.classList.add('popup_is-opened');
  // Hide popup if escape pressed
  document.addEventListener('keydown', escapeHandler);
}

// Function to hide popup
export function hideModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

// Function to add listners to popup
export function addModalListners(popup) {
  // Add listner for closing popup
  popup.addEventListener('mousedown', evt => {
    const targetClasses = evt.target.classList;
    // Hide the popup when click on the close button or beyond the popup
    if (targetClasses.contains('popup__close') || targetClasses.contains('popup_is-opened')) hideModal(popup);
  });

  // Add listner for setting pointer cursor
  popup.addEventListener('mouseover', evt => {
    // Set pointer cursor when it on the popup overlay
    if (evt.target.classList.contains('popup_is-opened')) popup.style.cursor = 'pointer';
  });

  // Add listner for removing pointer cursor
  popup.addEventListener('mouseout', evt => {
    // Set auto cursor when it moves out of the popup overlay
    if (evt.target.classList.contains('popup_is-opened')) popup.style.cursor = 'auto';
  });
}
