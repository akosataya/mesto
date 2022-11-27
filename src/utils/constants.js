export const initialCards = [
    {
        name: 'Байкал',
        link: "https://images.unsplash.com/photo-1614357932292-a38393b966a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
    },
    {
        name: 'Териберка',
        link: 'https://images.unsplash.com/photo-1606841599773-7307a2b5ce34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1306&q=80'
    },
    {
        name: 'Сулакский каньон, Дагестан',
        link: 'https://images.unsplash.com/photo-1617573543793-1b13d0a3f75c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        name: 'Халактырский пляж, Камчатка',
        link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80'
    },
    {
        name: 'Карелия',
        link: 'https://images.unsplash.com/photo-1638739948407-64ee2dc45e9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
    },
    {
        name: 'Эльбрус',
        link: 'https://images.unsplash.com/photo-1521311587563-6a3fb9fbaff7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    }
];

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__text-error_visible'
};

export const popupEdit = document.querySelector('.popup_edit');
export const formElementEdit = document.querySelector('.popup__edit-form');
export const nameInput = document.querySelector('.popup__input_edit_name');
export const jobInput = document.querySelector('.popup__input_edit_about');
export const profileBtn = document.querySelector('.profile__edit-button');

export const modalAddBtn = document.querySelector('.profile__add-button');
export const popupAdd = document.querySelector('.popup_add');
export const popupAddForm = document.querySelector('.popup__add-form');

export const popupArea = document.querySelector('.popup_place-photo');