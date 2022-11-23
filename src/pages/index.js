import { initialCards, validationConfig, popupAddForm, formElementEdit, nameInput, jobInput, profileName, profileAbout, popupEdit, editBtn, photoCardsContainer, popupArea, popupAdd, modalAddBtn, nameAddInput, linkAddInput } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";


/** Валидация */
const editValidator = new FormValidator(validationConfig, formElementEdit);
editValidator.enableValidation();

const addValidator = new FormValidator(validationConfig, popupAddForm);
addValidator.enableValidation();

// /** Открытие и закрытие попапов */
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closeOnEscape);
// }
//
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeOnEscape);
// }

// popupList.forEach(popup => {
//     popup.addEventListener('click', (evt) => {
//         if(evt.target && evt.target.matches('.popup_opened') || evt.target.matches('.popup__close-button')) {
//             closePopup(popup);
//         }
//     });
// })

// function closeOnEscape(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     };
// }

/** Работа с edit модальным окном */
function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    editValidator.makeDisabledBtn();
    editValidator.resetErrors();
    openPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupEdit);
}

editBtn.addEventListener('click', openEditPopup);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

/** Создание карточек */
function createCard(data) {
    const card = new Card(data, '.gallery__photos', openPhoto);
    return card.generateCard();
}

/** Создание карточек из базы */
initialCards.forEach((element) => {
    photoCardsContainer.prepend(createCard(element));
});

/** Открытие фото по её нажатию */
function openPhoto(name, link) {
    photo.src = link;
    photo.alt = name;
    caption.textContent = name;
    openPopup(popupArea);
}

/** Работа с add -form и -модальным окном */
popupAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const addFormValue = {
        name: nameAddInput.value,
        link: linkAddInput.value,
    }

    photoCardsContainer.prepend(createCard(addFormValue));
    evt.target.reset();

    closePopup(popupAdd);
});

modalAddBtn.addEventListener('click', (evt) => {
    openPopup(popupAdd);
    addValidator.makeDisabledBtn();
    addValidator.resetErrors();
    popupAddForm.reset();
});