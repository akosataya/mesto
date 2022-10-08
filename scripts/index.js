'use strict';

const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    }
];

const popupEdit = document.querySelector('.popup_edit');
const formElementEdit = document.querySelector('.popup__edit_form');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector ('.profile__about');
const editBtn = document.querySelector('.profile__edit-button');
const closeEditBtn = document.querySelector('.popup__close-edit');

const gallery = document.querySelector('.gallery__photos');
const modalAddBtn = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const popupForm = document.querySelector('.popup__add-form');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openEditPopup() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

function closeEditPopup() {
    closePopup(popupEdit);
}

function formSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupEdit);
}

editBtn.addEventListener('click', openEditPopup);
closeEditBtn.addEventListener('click', closeEditPopup);
formElementEdit.addEventListener('submit', formSubmitProfile);


function createItem(parent, elemTag, name, link) {
    const item = document.createElement(elemTag);
    item.classList.add('gallery__item');
    item.innerHTML = `<img src="${link}" alt="${name}" class="gallery__photo" loading="lazy">
                        <div class="gallery__description">
                            <h2 class="gallery__title">${name}</h2>
                            <button class="gallery__like-button" type="button" aria-label="Лайк"></button>
                            <button class="gallery__delete-button" type="button" aria-label="Мусорка"></button>
                        </div>`;
    parent.prepend(item);
}

function closeModal(modalClass) {
    popupAdd.classList.remove(modalClass);
}

function addLike(item) {
    if(item.style.backgroundImage){
        item.style.backgroundImage = "";
        return;
    }
    item.style.backgroundImage = "url(./images/like-button_active.svg)";
}

function deleteCard(item) {
    item.parentNode.parentNode.remove();
}

// ==============Создание карточек из базы

for(let i = 0; i < initialCards.length; i++){
    const {name, link} = initialCards[i];
    createItem(gallery, 'li', name, link);
}

// ==============Работа с модальным окном
modalAddBtn.addEventListener('click', (e) => {
    popupAdd.classList.add('popup_opened');
});

popupAdd.addEventListener('click', (e) => {
    if(e.target && e.target.matches('.popup_add') || e.target.matches('.popup__close-add')){
        closeModal('popup_opened');
    }
});

// ==============Работа с form
popupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = popupForm.querySelector('.popup__input_add_name');
    const link = popupForm.querySelector('.popup__input_add_link');

    createItem(gallery, 'li', name.value, link.value);
    closeModal('popup_opened');

    name.value = '';
    link.value = '';
});

// ==============Делегирование событий, для работы с лайками и удалением карточек

gallery.addEventListener('click', (e) => {
    let likeBtn = document.querySelectorAll('.gallery__like-button');
    if(e.target && e.target.parentNode.parentNode.matches('.gallery__item')){
        likeBtn.forEach(item => {
            if(item === e.target){
                addLike(item);
            }
        })
    }
})

gallery.addEventListener('click', (e) => {
    let deleteBtn = document.querySelectorAll('.gallery__delete-button');
    if(e.target && e.target.parentNode.parentNode.matches('.gallery__item')){
        deleteBtn.forEach(item => {
            if(item === e.target){
                deleteCard(item);
            }
        })
    }
})






