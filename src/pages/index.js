import "./index.css";

import {
    initialCards,
    validationConfig,
    popupAddForm,
    formElementEdit,
    nameInput,
    jobInput,
    popupEdit,
    profileBtn,
    popupArea,
    popupAdd,
    modalAddBtn
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


/** Валидация */
const profileFormValidator = new FormValidator(validationConfig, formElementEdit);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
cardFormValidator.enableValidation();

/** Создание карточек */
function createCard(cardData) {
    const card = new Card({
        data: cardData,
        templateSelector: '.gallery__photos',
        handleCardClick: (name, link) => {
            popupOpenedPhoto.open(name, link);
        }
    });

    return card.generateCard();
}

const cardsSection = new Section({
        items: initialCards,
        renderer: (item) => {
            cardsSection.addItem(createCard(item));
        },
    },
    '.gallery',
);

cardsSection.renderItems(initialCards);


/** Экземпляр класса попапа изменения профиля пользователя */
const userInfo = new UserInfo({
    name: '.profile__name',
    about: '.profile__about',
})

const popupEditUserProfile = new PopupWithForm(popupEdit, handleProfileFormSubmit);

profileBtn.addEventListener('click', () => {
    const input = userInfo.getUserInfo();
    nameInput.value = input.name;
    jobInput.value = input.about;

    profileFormValidator.resetErrors();
    popupEditUserProfile.open();
})

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data.name, data.about);
    popupEditUserProfile.close();
}

popupEditUserProfile.setEventListeners();


/** Экземпляр класса попапа добавления фотокарточек */
const popupAddUserPhotos = new PopupWithForm(popupAdd, handleCardFormSubmit);

modalAddBtn.addEventListener('click', () => {
    cardFormValidator.makeDisabledBtn();
    cardFormValidator.resetErrors();
    popupAddUserPhotos.open();
});

function handleCardFormSubmit(data) {
    const ProfileFormValue = {
        name: data.placeName,
        link: data.placeLink,
    };
    cardsSection.addItem(createCard(ProfileFormValue));
    popupAddUserPhotos.close();
}

popupAddUserPhotos.setEventListeners();


/** Экземпляр класса попапа открытия фотокарточек */
const popupOpenedPhoto = new PopupWithImage(popupArea);
popupOpenedPhoto.setEventListeners();