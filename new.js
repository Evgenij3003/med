document.addEventListener("click", function(e) {
    // Если "клик" на кнопку "закрыть попап":
    if (e.target.closest("._popup-close")) {
        popupClose(e.target.closest("._popup"));				
        e.preventDefault();	
    }

    // Если "клик" на кнопку "закрыть попап" в попапе "Уведомление":
    if (e.target.closest("._popup-notification")) {
        setTimeout(() => {
            e.target.closest("._popup-notification").querySelector(".popup-content__main").innerHTML = "";
        }, 800);
    }

    // "Клик" на кнопку "записаться анонимно":
    if (e.target.closest("._popup .toggle-doctors") && e.target.type) {
        filterFormPopup(e.target);
    }
})



/*==========================================================================================================================================================================*/
/* Popup */
if (document.querySelector("._popup-link")) {
    const lockPadding = document.querySelectorAll(".lock-padding");	
    const popupLinks = document.querySelectorAll("._popup-link");																																	
    let unlock = true;
    let delay = 800;


    // Инициализация popup:
    function popupInit() {
        if (popupLinks.length > 0) {
            for (let index = 0; index < popupLinks.length; index++) {
                const popupLink = popupLinks[index];
                popupLink.addEventListener("click", function (e) {
                    const popupName = popupLink.getAttribute("href").replace("#", "");
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup, popupLink, popupName); 
                    e.preventDefault();
                });
            }
        }
    }
    popupInit();


    // Открытие popup:
    function popupOpen(currentPopup, popupLink, popupName) {									
        if (currentPopup && unlock) {							
            const popupActive = document.querySelector("._popup._open");
            if (popupActive) {														
                popupClose(popupActive, false);										
            } else {													
                bodyLock(unlock, lockPadding, delay);
            }
            currentPopup.classList.add("_open");
            let formReq = document.querySelectorAll("._req");
            formReq.forEach(input => {
                input.classList.remove("_error");
            });		
        }
    }


    // Закрытие popup:
    function popupClose(popupActive, doUnlock = true) {	
        if (popupActive.querySelector(".toggle-doctors__label")) {
            const togglePopup = popupActive.querySelector(".toggle-doctors__label");
            togglePopup.removeEventListener("click", filterFormPopup);					
        }
        if (unlock) {														
            popupActive.classList.remove("_open");	
            let formReq = popupActive.querySelectorAll("._req-popup");
            formReq.forEach(input => {
                input.classList.remove("_error");
            });									
            if (doUnlock) {															
                bodyUnLock(unlock, lockPadding, delay);													
            }
        }
    }

    
    // Закрытие popup с помощью клавиши "Esc" на клавиатуре:
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const popupActive = document.querySelector("._popup._open");
            popupClose(popupActive);
        }
    });


    // Создание элемента на основе переданных параметров:
    function createSelect(nameAttribute) {
        let select = document.createElement("select");
        select.setAttribute("name", nameAttribute);
        select.setAttribute("class", nameAttribute);
        return select;
    }


    function fillSelect(selectElem, options, attr) {
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            let optionItem = document.createElement("option");
            if (option.classList.contains("spollers-services__title")) {
                let optionPrice = option.closest(".spollers-services__service").querySelector(".info-services__price");
                optionItem.setAttribute("title", option.innerHTML);
                optionItem.setAttribute("data-price", optionPrice.innerHTML);
            }
            if (selectElem.classList.contains("date")) {
                optionItem.innerHTML = option.getAttribute(attr);
                optionItem.setAttribute("value", option.getAttribute(attr));
            } else {
                optionItem.innerHTML = option.innerHTML;
                optionItem.setAttribute("value", option.innerHTML);
            }
            selectElem.insertAdjacentElement("beforeend", optionItem);
        }
        return selectElem;
    }

    
    // Открытие попапа "Уведомление":
    function popupNotificationForm(button) {
        let closedPopup = button.closest("._popup");
        let currentPopup = document.querySelector("._popup-notification");
        let popupContent = currentPopup.querySelector(".popup-content__main");
        if (button.closest("._popup-doctor") || button.closest("._popup-service")) {
            let title = closedPopup.querySelector(".popup-content__title").innerHTML;
            let infoDoctor = closedPopup.querySelector(".info-popup").innerHTML;
            let date = closedPopup.querySelector(".select-form__item_date .select__value").innerHTML;
            let time = closedPopup.querySelector(".select-form__item_time .select__value").innerHTML;
            popupContent.insertAdjacentHTML("beforeend", `
                <div class="popup-content__title">${title}</div>
                <div class="popup-content__info info-popup">${infoDoctor}</div>
                <div class="popup-content__process notification-popup">
                    <div class="notification-popup__row">
                        <div class="notification-popup__check"></div>
                        <div class="notification-popup__info">
                            <div class="notification-popup__text-info">Вы записались на приём к врачу на</div>
                            <div class="notification-popup__text-data">
                                <span class="notification-popup__date">${date}</span><span>, </span> 
                                <span class="notification-popup__time">${time}</span>
                            </div>
                            <div class="notification-popup__text">
                                <p>Для подтверждения записи дождитесь звонка оператора или обратитесь к администратору клиники.</p>
                            </div>
                        </div>
                    </div>
                    <div class="notification-popup__button">
                        <button class="_popup-close _btn">Продолжить</button>
                    </div>
                </div>
            `);
        } 
        if (button.closest("._popup-review")) {
            let title = closedPopup.querySelector(".popup-content__title").innerHTML;
            popupContent.insertAdjacentHTML("beforeend", `
                <div class="popup-content__title">${title}</div>
                <div class="popup-content__process notification-popup">
                    <div class="notification-popup__row">
                        <div class="notification-popup__check"></div>
                        <div class="notification-popup__info">
                            <div class="notification-popup__text-info">Спасибо за Ваш отзыв!</div>
                            <div class="notification-popup__text">
                                <p>Отзыв появится на сайте после проверки модератором.</p>
                            </div>
                        </div>
                    </div>
                    <div class="notification-popup__button">
                        <button class="_popup-close _btn">Продолжить</button>
                    </div>
                </div>
            `);
        }
        if (button.closest(".application")) {
            popupContent.insertAdjacentHTML("beforeend", `
                <div class="popup-content__title">Заявка на выезд на дом</div>
                <div class="popup-content__process notification-popup">
                    <div class="notification-popup__row">
                        <div class="notification-popup__check"></div>
                        <div class="notification-popup__info">
                            <div class="notification-popup__text-info">Ваша заявка принята!</div>
                            <div class="notification-popup__text">
                                <p>Наш оператор свяжется с вами в ближайшее время.</p>
                            </div>
                        </div>
                    </div>
                    <div class="notification-popup__button">
                        <button class="_popup-close _btn">Продолжить</button>
                    </div>
                </div>
            `);
        }
        popupOpen(currentPopup);
    }
    

    // Filter Form:
    function filterFormPopup(activeToggle) {
        let formPopup = activeToggle.closest("._popup").querySelector(".form-popup");
        if (!activeToggle.classList.contains("_active")) {
            activeToggle.classList.add("_active");
            for (let i = 0; i < formPopup.children.length; i++) {
                const elemForm = formPopup.children[i];
                !elemForm.hasAttribute("data-anonim") ? elemForm.style.display = "none" : null; 
                if (elemForm.classList.contains("family-inputs")) {
                    let inputsFamily = elemForm.querySelectorAll(".family-inputs__item");
                    inputsFamily.forEach(input => {
                        !input.hasAttribute("data-anonim") ? input.style.display = "none" : null;
                    });
                }
            }
        } else {
            activeToggle.classList.remove("_active");
            for (let i = 0; i < formPopup.children.length; i++) {
                const elemForm = formPopup.children[i];
                formPopup.children[i].style.display = "flex"; 
                if (elemForm.classList.contains("family-inputs")) {
                    let inputsFamily = elemForm.querySelectorAll(".family-inputs__item");
                    inputsFamily.forEach(input => {
                        input.style.display = "flex";
                    });
                }
            }
        }	
    }
}