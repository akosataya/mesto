import "./index.css";

import {
    validationConfig,
    popupAddForm,
    formElementEdit,
    nameInput,
    jobInput,
    popupEdit,
    profileBtn,
    popupArea,
    popupAdd,
    modalAddBtn,
    popupConfirm,
    popupUpdateAvatar,
    modalUpdateBtn,
    popupUpdateForm
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";



/** API */
const api = new Api({
    URL: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '80ee6d55-5ae2-4752-be1d-625f4a4b319d',
        'Content-Type': 'application/json',
    }
})

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
        userId = user._id;
        userInfo.setUserInfo(user.name, user.about);
        userInfo.setUserAvatar(user.avatar);

        cardsSection.renderItems(cards);
    })
    .catch((err) => console.log(err));

/** Валидация */
const profileFormValidator = new FormValidator(validationConfig, formElementEdit);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, popupUpdateForm);
avatarFormValidator.enableValidation();

/** Создание карточек */
function createCard(cardData) {
    const card = new Card({
        data: cardData,
        userId: userId,
        templateSelector: '.gallery__photos',
        handleCardClick: (name, link) => {
            popupOpenedPhoto.open(name, link);
        },
        handleDeletion: (id) => {
            popupDeletePhoto.open();
            popupDeletePhoto.setDeletionSubmit(() => {
                api.deleteCard(id)
                    .then(() => {
                        card.handleCardDelete();
                        popupDeletePhoto.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        handleLike: (id) => {
            if(card.isCardLiked()) {
                api.removeLike(id)
                    .then((res) => {
                        card.setLikeCounter(res.likes);
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            } else {
                api.putLike(id)
                    .then((res) => {
                        card.setLikeCounter(res.likes);
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            }
        },
    });

    return card.generateCard();
}

const cardsSection = new Section({
        renderer: (item) => {
            cardsSection.addItem(createCard(item));
        },
    },
    '.gallery',
);


/** Экземпляр класса попапа изменения профиля пользователя */
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__pic-avatar'
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
    popupEditUserProfile.renderLoading(true);

    api.setNewUserInfo(data)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupEditUserProfile.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupEditUserProfile.renderLoading(false);
        })
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
    popupAddUserPhotos.renderLoading(true);

    api.addNewCard(data)
        .then((cardData) => {
            cardsSection.addItem(createCard(cardData));
            popupAddUserPhotos.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupAddUserPhotos.renderLoading(false);
        })
}

popupAddUserPhotos.setEventListeners();


/** Экземпляр класса попапа открытия фотокарточек */
const popupOpenedPhoto = new PopupWithImage(popupArea);
popupOpenedPhoto.setEventListeners();

/** Экземпляр класса попапа подтверждения удаления фотокарточки */
const popupDeletePhoto = new PopupWithConfirmation(popupConfirm);
popupDeletePhoto.setEventListeners();

/** Экземпляр класса попапа редактирования аватара */
const popupUpdatePhotoCard = new PopupWithForm(popupUpdateAvatar, handleAvatarFormSubmit);

modalUpdateBtn.addEventListener('click', () => {
    avatarFormValidator.makeDisabledBtn();
    avatarFormValidator.resetErrors();
    popupUpdatePhotoCard.open();
});

function handleAvatarFormSubmit(data) {
    popupUpdatePhotoCard.renderLoading(true);

    api.setUserAvatar(data)
        .then((avatar) => {
            userInfo.setUserAvatar(avatar);
            popupUpdatePhotoCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupUpdatePhotoCard.renderLoading(false);
        })
}

popupUpdatePhotoCard.setEventListeners();