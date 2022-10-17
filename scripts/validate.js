// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationFormList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__text-error_active'
};

const enableValidation = (validationFormList) => {
    const formList = Array.from(document.querySelectorAll(validationFormList.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        });
        setEventListeners(form, validationFormList);
    });
}

const setEventListeners = (form, validationFormList) => {
    const inputList = Array.from(form.querySelectorAll(validationFormList.inputSelector));
    const submitBtn = form.querySelector(validationFormList.submitButtonSelector);

    toggleBtnState(inputList, submitBtn, validationFormList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            isValid(form, inputElement, enableValidation);
            toggleBtnState(inputList, submitBtn, validationFormList);
        });
    });
}

