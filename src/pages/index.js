import "./index.css";

import { initialCards,
    validationConfig,
    popupAddForm,
    formElementEdit,
    nameInput,
    jobInput,
    popupEdit,
    editBtn,
    popupArea,
    popupAdd,
    modalAddBtn } from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


/** Валидация */
const editValidator = new FormValidator(validationConfig, formElementEdit);
editValidator.enableValidation();

const addValidator = new FormValidator(validationConfig, popupAddForm);
addValidator.enableValidation();

/** Создание карточек */
function createCard(items) {
    const card = new Card({
        data: items,
        templateSelector: '.gallery__photos',
        handleCardClick: (name, link) => {
            popupOpenedPhoto.open(name, link);
        }
    });

    return card.generateCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
        },
    },
    '.gallery',
);

cardList.renderItems(initialCards);


/** Экземпляр класса попапа изменения профиля пользователя */
const userInfo = new UserInfo({
    name: '.profile__name',
    about: '.profile__about',
})

const popupEditUserProfile = new PopupWithForm(popupEdit, submitEditPopup);

editBtn.addEventListener('click', () => {
    const input = userInfo.getUserInfo();
    nameInput.value = input.name;
    jobInput.value = input.about;

    editValidator.resetErrors();
    editValidator.makeDisabledBtn();
    popupEditUserProfile.open();
})

function submitEditPopup(data) {
    userInfo.setUserInfo(data.name, data.about);
    popupEditUserProfile.close();
}

popupEditUserProfile.setEventListeners();


/** Экземпляр класса попапа добавления фотокарточек */
const popupAddUserPhotos = new PopupWithForm(popupAdd, submitAddPopup);

modalAddBtn.addEventListener('click', () => {
    addValidator.makeDisabledBtn();
    addValidator.resetErrors();
    // popupAddUserPhotos.reset();
    popupAddUserPhotos.open();
});

function submitAddPopup(data) {
    const addFormValue = {
        name: data.placeName,
        link: data.placeLink,
    };
    cardList.addItem(createCard(addFormValue));
    popupAddUserPhotos.close();
}

popupAddUserPhotos.setEventListeners();


/** Экземпляр класса попапа открытия фотокарточек */
const popupOpenedPhoto = new PopupWithImage(popupArea);
popupOpenedPhoto.setEventListeners();