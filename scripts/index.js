import {initialCards} from './cards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';


const popupList = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_edit');
const formElementEdit = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector ('.profile__about');
const editBtn = document.querySelector('.profile__edit-button');
const closeEditBtn = document.querySelector('.popup__close-edit');

const modalAddBtn = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const popupAddForm = document.querySelector('.popup__add-form');
const nameAddInput = popupAddForm.querySelector('.popup__input_add_name');
const linkAddInput = popupAddForm.querySelector('.popup__input_add_link');
const closeAddBtn = document.querySelector('.popup__close-add');

const photoCardsContainer = document.querySelector('.gallery');
const photoCardsTemplate = document.querySelector('.gallery__photos').content;

const popupArea = document.querySelector('.popup_place-photo');
const popupPhoto = popupArea.querySelector('.popup__photo');
const popupCaption = popupArea.querySelector('.popup__photo-caption');
const closePhotoBtn = popupArea.querySelector('.popup__close-photo');



/** Открытие и закрытие попапов */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEscape);
}

popupList.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if(evt.target && evt.target.matches('.popup_opened') || evt.target.matches('.popup__close-button')) {
            closePopup(popup);
        }
    });
})

function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
}

/** Работа с edit модальным окном */
function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
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
function createCard(card) {
    const photoCardElement = photoCardsTemplate.querySelector('.gallery__item').cloneNode(true);
    const photoPopup = photoCardElement.querySelector('.gallery__photo');

    photoPopup.src = card.link;
    photoPopup.alt = card.name;
    photoCardElement.querySelector('.gallery__title').textContent = card.name;

    setListenersOnPhotoCard(photoCardElement);

    return photoCardElement;
}

/** Создание карточек из базы */
initialCards.forEach(element => {photoCardsContainer.prepend(createCard(element));
});

/** Делегирование событий, для работы с лайками, удалением карточек и открытием фотографий */
function setListenersOnPhotoCard(element) {
    const deleteBtn = element.querySelector('.gallery__delete-button');
    deleteBtn.addEventListener('click', deleteCard);

    const likeBtn = element.querySelector('.gallery__like-button');
    likeBtn.addEventListener('click', handleLikeCard);

    element.querySelector('.gallery__photo').addEventListener('click', openPhoto);
}

/** Добавление функций лайков и мусорки */
function deleteCard(evt) {
    const trashItem = evt.target.closest('.gallery__item');
    trashItem.remove();
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('gallery__like-button_active');
}

/** Открытие фото по её нажатию */
function openPhoto(evt) {
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
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

const submitBtnAddPopup = popupAdd.querySelector('.popup__save');
modalAddBtn.addEventListener('click', (evt) => {
    openPopup(popupAdd);
    makeDisabledBtn(submitBtnAddPopup);
    popupAddForm.reset();
});

/** Закрытие попапов */
closeEditBtn.addEventListener('click', evt => {
    closePopup(popupEdit);
});

closePhotoBtn.addEventListener('click', evt => {
    closePopup(popupArea);
});

closeAddBtn.addEventListener('click', evt => {
    closePopup(popupAdd);
});