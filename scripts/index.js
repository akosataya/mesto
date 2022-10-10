'use strict';

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

const photoCardsContainer = document.querySelector('.gallery');
const photoCardTemplate = document.querySelector('.gallery__photos').content;

const popupArea = document.querySelector('.popup_place-photo');
const popupPhoto = popupArea.querySelector('.popup__photo');
const popupCaption = popupArea.querySelector('.popup__photo-caption');



function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// ==============Работа с edit модальным окном
function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    openPopup(popupEdit);
}

function closeEditPopup() {
    closePopup(popupEdit);
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupEdit);
}

editBtn.addEventListener('click', openEditPopup);
closeEditBtn.addEventListener('click', closeEditPopup);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// ==============Создание карточек
function createCard(card) {
    const photoCardElement = photoCardTemplate.cloneNode(true);
    const photoPopup = photoCardElement.querySelector('.gallery__photo');

    photoPopup.src = card.link;
    photoPopup.alt = card.name;
    photoCardElement.querySelector('.gallery__title').textContent = card.name;

    setListeneresOnPhotoCard(photoCardElement);

    return photoCardElement;
}

// ==============Создание карточек из базы
initialCards.forEach(element => {photoCardsContainer.prepend(createCard(element));
});

// ==============Делегирование событий, для работы с лайками и удалением карточек
function setListeneresOnPhotoCard(element) {
    const deleteBtn = element.querySelector('.gallery__delete-button');
    deleteBtn.addEventListener('click', deleteCard);

    const likeBtn = element.querySelector('.gallery__like-button');
    likeBtn.addEventListener('click', handleLikeCard);

    element.querySelector('.gallery__photo').addEventListener('click', openPhoto);
}

// ==============Добавление функций лайков и мусорки
function deleteCard(e) {
    const trashItem = e.target.closest('.gallery__item');
    trashItem.remove();
}

function handleLikeCard(e) {
    e.target.classList.toggle('gallery__like-button_active');
}

// ==============Открытие фото по её нажатию
function openPhoto(e, name) {
    popupPhoto.src = e.target.src;
    popupPhoto.alt = e.target.alt;
    popupCaption.textContent = e.target.alt;
    openPopup(popupArea);
}

popupArea.addEventListener('click', (e) => {
    if(e.target && e.target.matches('.popup_place-photo') || e.target.matches('.popup__close-button')) {
        closePopup(popupArea);
    }
});


// ==============Работа с add модальным окном
modalAddBtn.addEventListener('click', (e) => {
    openPopup(popupAdd);
});

popupAdd.addEventListener('click', (e) => {
    if(e.target && e.target.matches('.popup_add') || e.target.matches('.popup__close-add')){
        closePopup(popupAdd);
    }
});

// ==============Работа с add form
popupAddForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addFormValue = {
        name: nameAddInput.value,
        link: linkAddInput.value,
    }

    photoCardsContainer.prepend(createCard(addFormValue));
    e.target.reset();

    closePopup(popupAdd);
});