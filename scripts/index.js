let formElement = document.querySelector('#popup__form');
let nameInput = document.querySelector('#popup__name-input');
let jobInput = document.querySelector('#popup__job-input');

let profileName = document.querySelector('#profile__name');
let profileAbout = document.querySelector ('#profile__about');

let popup = document.querySelector('#popup');
let editButton = document.querySelector('#profile__edit-button');
let closeButton = document.querySelector('#popup__close-button');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popupCloseButton();
}

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

function  popupCloseButton() {
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', popupCloseButton);