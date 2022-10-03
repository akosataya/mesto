const initialCards = [
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
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_place_photo');

const formElementEdit = document.querySelector('.popup__edit_form');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector ('.profile__about');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.popup__close-edit');

const formElementAdd = document.querySelector('.popup__add-form');
const cardNameInput = document.querySelector('.popup__input_add_name');
const cardLinkInput = document.querySelector('.popup__input_add_link');
const cardPhoto = document.querySelector('.gallery__photo');
const cardName = document.querySelector('.gallery__title');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-add');

const closePhotoButton = document.querySelector('.popup__close-photo');

const initialCardsTemplate = document.querySelector('.template').content;
const cardsTable = document.querySelector('.gallery__photos');



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

editButton.addEventListener('click', openEditPopup);
closeEditButton.addEventListener('click', closeEditPopup);
formElementEdit.addEventListener('submit', formSubmitProfile);



function openAddPopup() {
    openPopup(popupAdd);
}

function formSubmitCards(evt) {
    evt.preventDefault();
    displayCards(cardNameInput.value, cardLinkInput.value);
    cardNameInput.value = '';
    cardLinkInput.value = '';
    closePopup(popupAdd);
}

addButton.addEventListener('click', openAddPopup);
closeAddButton.addEventListener('click', () => closePopup(popupAdd));
formElementAdd.addEventListener('submit', formSubmitCards);



const photo = popupPhoto.querySelector('.popup__photo');
const photoCaption = popupPhoto.querySelector('.popup__photo-caption');

function openPhoto(photo, caption) {
    photo.src = photo;
    photo.alt = caption;
    photoCaption.textContent = caption;
    openPopup(popupPhoto);
}

function closePhotoPopup() {
    closePopup(popupPhoto)
}

closePhotoButton.addEventListener('click', closePhotoPopup)



function addNewCard(name, link) {
    const cardItem = initialCardsTemplate.querySelector('.gallery__item').cloneNode(true);
    const cardPhotoItem = initialCardsTemplate.querySelector('.gallery__photo');
    cardItem.querySelector('.gallery__title').textContent = name;
    cardPhotoItem.src = link;
    cardPhotoItem.alt = name;

    const deleteButton = cardPhotoItem.querySelector('.gallery__delete-button');
    const likeButton = cardPhotoItem.querySelector('.gallery__like-button');

    deleteButton.addEventListener('click', () => cardItem.remove());
    likeButton.addEventListener('click', () => likeButton.classList.toggle('gallery__like-button_active'));
    cardPhotoItem.addEventListener('click', () => openPhoto(link, name));

    return cardItem;
}



function displayCards(name, link) {
    const cardItem = addNewCard(name, link);
    cardsTable.prepend(cardItem);
}

initialCards.forEach((item) => displayCards(item.name, item.link));
