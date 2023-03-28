/*==========================================================================================================================================================================*/
/* Проверка устройства, на котором открыта страница */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
    document.querySelector("body").classList.add("_touch");
}
if (isMobile.iOS()) {
    if (document.querySelector("._page-diagnostics") || document.querySelector(".doctors")) {
        document.querySelector(".tabs-doctors__navigation span").style.display = "none";
        if ((window.innerWidth / 16) <= 64) {
            document.querySelector(".tabs-doctors__buttons").style.paddingBottom = "1.5rem";
        }
    }
}


function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});


let sourceUserAgent = navigator.userAgent;
if (sourceUserAgent.indexOf("Firefox") > -1) {
    if (document.querySelector("._page-diagnostics") || document.querySelector(".doctors")) {
        document.querySelector(".tabs-doctors__navigation span").style.display = "none";
        if ((window.innerWidth / 16) <= 64) {
            document.querySelector(".tabs-doctors__buttons").style.paddingBottom = "1.5rem";
        }
    }
}



/*==========================================================================================================================================================================*/
/* Menu Burger & Search */
let unlock = true;


if (document.querySelector("._menu-icon") || document.querySelector("._search-icon")) {
    if (document.querySelector("._menu-icon")) {
        let iconMenu = document.querySelector("._menu-icon");
        let menuBody = document.querySelector(".menu-header");
        openElem(iconMenu, menuBody);
    }
    if (document.querySelector("._search-icon")) {
        let iconSearch = document.querySelector("._search-icon");
        let searchBody = document.querySelector(".search-header");
        openElem(iconSearch, searchBody);
    }
}


function openElem(icon, elem) {
    icon.addEventListener("click", function(e) {
        if (unlock) {
            bodyLock();
            elem.classList.add("_active");
            icon.classList.contains("_menu-icon") ? document.documentElement.classList.add("_menu-open") : document.documentElement.classList.add("_search-open");
            closeElem(icon, elem);
        }
    });
}


function closeElem(icon, elemBody) {
    let iconClose;
    if (icon.classList.contains("_menu-icon")) {
        iconClose = document.querySelector("._menu-close");
    } else {
        iconClose = document.querySelector("._search-close");
    }
    iconClose.addEventListener("click", function(e) {
        elemBody.classList.remove("_active");
        icon.classList.contains("_menu-icon") ? document.documentElement.classList.remove("_menu-open") : document.documentElement.classList.remove("_search-open");
        bodyUnLock();
    });
}



/*==========================================================================================================================================================================*/
/* Search */
let searchButton = document.querySelector(".form-search__button");
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
});



/*==========================================================================================================================================================================*/
/* Открытие submenu по "клику" на устройствах с touch-экранами */
document.addEventListener("click", actionSubmenu);


function actionSubmenu(e) {
    const targetElement = e.target;
    if ((window.innerWidth > 1024 && isMobile.any()) && !targetElement.classList.contains("cart__clear-all")) {
        if (targetElement.parentElement.classList.contains("_menu-parent")) {
            if (targetElement.parentElement.classList.contains("menu-header__item") && !targetElement.parentElement.classList.contains("_active")) {
                removeClasses(document.querySelectorAll("._menu-parent"), "_active");
            }
            if (targetElement.closest(".submenu__list") && !targetElement.parentElement.classList.contains("_active")) {
                const submenuList = targetElement.closest(".submenu__list");
                removeClasses(submenuList.querySelectorAll("._menu-parent"), "_active");
            }
            targetElement.parentElement.classList.toggle("_active");
        };
        if (!targetElement.closest("._menu-parent") && document.querySelectorAll("._menu-parent._active").length > 0) {
            removeClasses(document.querySelectorAll("._menu-parent"), "_active");
        }
    }
}


function removeClasses(array, className) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}



/*==========================================================================================================================================================================*/
/* Скрытие, блокировка и разблокировка скролла */
function bodyLock(unlock, lockPadding, delay = 500) {																												
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	document.body.style.paddingRight = lockPaddingValue;									
	document.body.classList.add("_lock");													
	unlock = false;															
	setTimeout(function () {				
		unlock = true;														
	}, delay);																
}


function bodyUnLock(unlock, lockPadding, delay = 500) {														
	setTimeout(function () {													
		document.body.style.paddingRight = "0px";									
		document.body.classList.remove("_lock");										
	}, delay);															
	unlock = false;														
	setTimeout(function () {												
		unlock = true;														
	}, delay);															
}



/*==========================================================================================================================================================================*/
/* Slider Swiper */
window.onload = function () {
    function bildSliders() {
        let sliders = document.querySelectorAll('[class*="__wrapper"]:not(.swiper-wrapper)');
        if (sliders) {
            sliders.forEach(slider => {
                slider.parentElement.classList.add("swiper");
                slider.classList.add("swiper-wrapper");
                for (const slide of slider.children) {
                    slide.classList.add("swiper-slide");
                }
            });
        }
    }
    bildSliders();


    function initSliders() {
        // Slider. Main:
        if (document.querySelector(".slider-main")) {
            new Swiper(".slider-main", {
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                centeredSlides: true,
                speed: 1000,
                loop: true,
                loopAdditionalSlides: 3,
                effect: "fade",
                simulateTouch: false,												
                fadeEffect: {
                    crossFade: true
                },
                keyboard: {
                    enabled: true,                                                            
                    onlyInViewport: true,														
                    pageUpDown: true,
                },	
                pagination: {
                    el: ".slider-main__bullets",
                    type: "bullets",
                    clickable: true,
                    renderBullet: function (index, className) {				
                        return `<div class="${className}"><span></span></div>`;
                    },
                },
            });
        }
        
        // Slider. News:
        if (document.querySelector(".thumbs-news")) {
            // Thumbs:
            const thumbsNewsSwiper = new Swiper(".thumbs-news", {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 8,
                spaceBetween: 23,
                speed: 800,
                breakpoints: {
                    1280: {
                        slidesPerView: 8,
                    },
                    1024: {
                        spaceBetween: 23,
                        slidesPerView: 6,
                    },
                    768: {
                        slidesPerView: 6,
                    },
                    320: {
                        slidesPerView: "auto",
                        spaceBetween: 16,
                    },
                },
            });

            new Swiper(".slider-news", {
                thumbs: {
                    swiper: thumbsNewsSwiper
                },
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: ".page-news .swiper-arrow_next",
                    prevEl: ".page-news .swiper-arrow_prev"
                },
            });
        }
    }
    initSliders();



    /*==========================================================================================================================================================================*/
    /* Плавная прокрутка к блоку */
    const menuLinks = document.querySelectorAll("[data-goto]");
    if (menuLinks) {
        menuLinks.forEach(elem => {
            elem.addEventListener("click", function(e) {
                gotoBlock(e);
            });
        });
    } 


    function gotoBlock(e) {
        const targetBlock = e.target.getAttribute("data-goto");
        const targetBlockElement = document.querySelector(targetBlock);
        removeActiveClasses(menuLinks, "_active");
        e.target.classList.add("_active");
        if (targetBlockElement) {
            // Закрытие открытого меню:
            document.documentElement.classList.contains("_menu-open") ? menuClose() : null;
            
            
            // Прокрутка:
            window.scrollTo({
                top: targetBlockElement.getBoundingClientRect().top + window.scrollY,
                behavior: "smooth",
            });
            e.preventDefault();  
        } else {
            console.log(`[gotoBlock]: Такого блока нет на странице: ${targetBlock}`);
        }
    };


    function removeActiveClasses(array, className) {
        for (let i = 0; i < array.length; i++) {
            array[i].classList.remove(className);
        }
    }



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
                const togglesPopup = document.querySelectorAll(".toggle-doctors__label");
                togglesPopup.forEach(toggle => {
                    toggle.addEventListener("click", function(e) {
                        const activeToggle = e.target;
                        filterFormPopup(activeToggle);
                    })
                });
                if (document.querySelector("._page-doctor")) formationPopupElements(); 
                for (let index = 0; index < popupLinks.length; index++) {
                    const popupLink = popupLinks[index];
                    popupLink.addEventListener("click", function (e) {
                        const popupName = popupLink.getAttribute("href").replace("#", "");
                        const currentPopup = document.getElementById(popupName);
                        popupName === "doctor-popup" || popupName === "service-popup" || popupName === "diagnostic-popup" ? popupOpen(currentPopup, popupLink, popupName) : popupOpen(currentPopup); 
                        e.preventDefault();
                    });
                }
            }


            const popupCloseIcon = document.querySelectorAll("._popup-close");
            if (popupCloseIcon.length > 0) {												
                for (let index = 0; index < popupCloseIcon.length; index++) {
                    const el = popupCloseIcon[index];								
                    el.addEventListener("click", function (e) {							
                        popupClose(el.closest("._popup"));
                        if (el.closest("._popup-notification")) {
                            setTimeout(() => {
                                el.closest("._popup-notification").querySelector(".popup-content__main").innerHTML = "";
                            }, 800);
                        }	
                        if (el.closest("._page-catalog-doctors")) {
                            setTimeout(() => {
                                el.closest("._page-catalog-doctors").querySelector("._popup-doctor .select-form__item_date").innerHTML = "";
                                el.closest("._page-catalog-doctors").querySelector("._popup-doctor .select-form__item_time").innerHTML = "";
                            }, 800);
                        }					
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
                popupName === "doctor-popup" || popupName === "service-popup" || popupName === "diagnostic-popup" ? formationPopupContent(currentPopup, popupLink, popupName) : null;
                currentPopup.addEventListener("click", function (e) {				
                    if (!e.target.closest("._popup-body")) {						
                        popupClose(e.target.closest("._popup"));				
                    }
                });
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


        // Формирование элементов select попапов "Запись к врачу" и "Запись на услугу":
        function formationPopupElements() {
            const popupDoctor = document.querySelector("._popup-doctor");
            const popupService = document.querySelector("._popup-service");


            // Формирование select "Оказываемая услуга":
            if (document.querySelector("._page-doctor")) {
                const services = document.querySelectorAll(".spollers-services__title");
                const selectServices = document.querySelector(".service");
                let doctorPricePrimary = document.querySelector(".info-doctor__price-primary span").innerHTML;
                let doctorPriceRepeat = document.querySelector(".info-doctor__price-repeat span").innerHTML;
                selectServices.querySelector(".service-item_primary").setAttribute("data-price", doctorPricePrimary);
                selectServices.querySelector(".service-item_repeat").setAttribute("data-price", doctorPriceRepeat);
                if (document.querySelector(".info-doctor__price-home")) {
                    let doctorPriceHome = document.querySelector(".info-doctor__price-home span:nth-child(2)").innerHTML;
                    selectServices.querySelector(".service-item_home").setAttribute("data-price", doctorPriceHome);
                }
                let selectServicesFilled = fillSelect(selectServices, services);
            }


            // Формирование select "Дата приема":
            const selectDate = document.querySelector(".appointment .date");
            const cloneSelectDatesDoctor = selectDate.cloneNode(true);
            const cloneSelectDatesService = selectDate.cloneNode(true);
            popupDoctor.querySelector(".select-form__item_date").insertAdjacentElement("beforeend", cloneSelectDatesDoctor);
            popupService.querySelector(".select-form__item_date").insertAdjacentElement("beforeend", cloneSelectDatesService);


            // Формирование select "Время приема":
            let selectTime = createSelect("time");
            if (document.querySelector("._page-doctor")) {
                let times = document.querySelector(".time-appointment__grid").children;
                let selectTimesFilled = fillSelect(selectTime, times);
                selectTimeClone = selectTimesFilled.cloneNode(true);
                popupDoctor.querySelector(".select-form__item_time").insertAdjacentElement("beforeend", selectTimesFilled);
                popupService.querySelector(".select-form__item_time").insertAdjacentElement("beforeend", selectTimeClone);
            }
        }


        // Обработка "кликов" по ссылкам на попапы "Запись к врачу" и "Запись на услугу":
        function formationPopupContent(currentPopup, popupLink, popupName) {
            let doctorImage, doctorTitle, doctorProfession, doctorPrice;
            const doctorInfoBlock = currentPopup.querySelector(".info-popup");
            doctorInfoBlock.innerHTML = "";
            let doctorInfo = document.createElement("div");
            doctorInfo.setAttribute("class", "info-popup__body");


            // Формирование контента попапов на странице "Доктор":
            if (document.querySelector("._page-doctor")) {
                const pageDoctor = document.querySelector("._page-doctor");
                doctorImage = pageDoctor.querySelector(".info-doctor__image img").getAttribute("src");
                doctorTitle = pageDoctor.querySelector(".info-doctor__name").innerHTML;
                doctorProfession = pageDoctor.querySelector("._profession").innerHTML;
                doctorPrice = pageDoctor.querySelector(".info-doctor__price-primary span").innerHTML;
                const selectedDate = pageDoctor.querySelector(".time-appointment .select__value span").innerHTML;
                currentPopup.querySelector(".select_date .select__value span").innerHTML = selectedDate;


                // Если открывается попап "Запись к врачу":
                if (popupName === "doctor-popup") {
                    if (popupLink.classList.contains("time-schedule__item")) {
                        const selectedTime = popupLink.innerHTML;
                        currentPopup.querySelector(".select_time .select__value span").innerHTML = selectedTime;
                    }
                    doctorInfo.innerHTML = `
                        <div class="info-popup__row">
                            <div class="info-popup__image">
                                <img src=${doctorImage} alt=${doctorTitle}>
                            </div>
                            <div class="info-popup__main">
                                <div class="info-popup__title">${doctorTitle}</div>
                                <div class="info-popup__profession">${doctorProfession}</div>
                                <div class="info-popup__price">Стоимость приёма: <span>${doctorPrice}</span></div>
                            </div>
                        </div>
                    `;	
                    doctorInfoBlock.insertAdjacentElement("beforeend", doctorInfo);
                }


                // Если открывается попап "Запись на услугу":
                if (popupName === "service-popup") {
                    const serviceTitle = popupLink.closest(".spollers-services__service").querySelector(".spollers-services__title").innerHTML;
                    const servicePrice = popupLink.closest(".spollers-services__service").querySelector(".info-services__price").innerHTML;
                    const servicesInfoBlock = currentPopup.querySelector(".service-popup"); 
                    servicesInfoBlock.innerHTML = "";
                    doctorInfo.innerHTML = `
                        <div class="info-popup__row">
                            <div class="info-popup__image">
                                <img src=${doctorImage} alt=${doctorTitle}>
                            </div>
                            <div class="info-popup__main">
                                <div class="info-popup__title">${doctorTitle}</div>
                                <div class="info-popup__profession">${doctorProfession}</div>
                            </div>
                        </div>
                    `;	
                    doctorInfoBlock.insertAdjacentElement("beforeend", doctorInfo);
                    let servicesInfo = document.createElement("div");
                    servicesInfo.setAttribute("class", "service-popup__body");
                    servicesInfo.innerHTML = `
                        <div class="service-popup__item">
                            <div class="service-popup__label">Название услуги</div>
                            <div class="service-popup__text">${serviceTitle}</div>
                        </div>
                        <div class="service-popup__item">
                            <div class="service-popup__label">Стоимость услуги</div>
                            <div class="service-popup__text">${servicePrice}</div>
                        </div>
                    `;
                    servicesInfoBlock.insertAdjacentElement("beforeend", servicesInfo);
                }
            }


            // Формирование контента попапа "Запись к врачу" на странице "Каталог врачей":
            if (document.querySelector("._page-catalog-doctors")) {
                doctorImage = popupLink.closest(".doctor-catalog").querySelector(".doctor-catalog__image img").getAttribute("src");
                doctorTitle = popupLink.closest(".doctor-catalog").querySelector(".doctor-catalog__name a").innerHTML;
                doctorProfession = popupLink.closest(".doctor-catalog").querySelector("._profession").innerHTML;
                doctorPrice = popupLink.closest(".doctor-catalog").querySelector(".doctor-catalog__price span").innerHTML;
                const day = popupLink.closest(".doctor-catalog").querySelector(".schedule-doctor__button._tab-active").getAttribute("data-day");
                const time = popupLink.innerHTML;
                const currentSchedules = popupLink.closest(".time-schedule__grid");
                const gridsSchedules = Array.from(popupLink.closest(".time-schedule").querySelectorAll(".time-schedule__grid"));
                const indexDate = gridsSchedules.indexOf(currentSchedules);
                doctorInfo.innerHTML = `
                    <div class="info-popup__row">
                        <div class="info-popup__image">
                            <img src=${doctorImage} alt=${doctorTitle}>
                        </div>
                        <div class="info-popup__main">
                            <div class="info-popup__title">${doctorTitle}</div>
                            <div class="info-popup__profession">${doctorProfession}</div>
                            <div class="info-popup__price">Стоимость приёма: <span>${doctorPrice}</span></div>
                        </div>
                    </div>
                `;	
                doctorInfoBlock.insertAdjacentElement("beforeend", doctorInfo);
                
                
                // Формирование селекта "Дата приёма":
                const selectDate = createSelect("date");		
                let optionDates = popupLink.closest(".doctor-catalog").querySelectorAll(".schedule-doctor__button");
                let selectDatesFilled = fillSelect(selectDate, optionDates, "data-day");
                currentPopup.querySelector(".select-form__item_date").insertAdjacentElement("beforeend", selectDatesFilled);
                const selectPopupDate = currentPopup.querySelector(".date");
                select_init(selectPopupDate);
                currentPopup.querySelector(".select-form__item_date .select__value span").innerHTML = day;


                // Формирование селекта "Время приёма":
                let times = popupLink.closest("._page-catalog-doctors").querySelectorAll(".times-appointment__day")[indexDate].children;
                const selectTime = createSelect("time");
                let selectTimesFilled = fillSelect(selectTime, times);
                currentPopup.querySelector(".select-form__item_time").insertAdjacentElement("beforeend", selectTimesFilled);
                const selectPopupTime = currentPopup.querySelector(".time");
                select_init(selectPopupTime);
                currentPopup.querySelector(".select-form__item_time .select__value span").innerHTML = time;
            }
        }


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
                let date = closedPopup.querySelector(".select_date .select__value span").innerHTML;
                let time = closedPopup.querySelector(".select_time .select__value span").innerHTML;
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
                        <div class="notification-popup__button _popup-close">
                            <button class="_btn">Продолжить</button>
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
                            <button class="_btn">Продолжить</button>
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
                            <button class="_btn">Продолжить</button>
                        </div>
                    </div>
                `);
            }
            popupOpen(currentPopup);
            const popupCloseButton = document.querySelector(".notification-popup__button");
            popupCloseButton.addEventListener("click", function(e) {
                popupClose(currentPopup);
                if (popupCloseButton.closest("._popup-notification")) {
                    setTimeout(() => {
                        currentPopup.querySelector(".popup-content__main").innerHTML = "";
                    }, 800);
                }
            });
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



    /*==========================================================================================================================================================================*/
    /* Select */
    let selects = document.getElementsByTagName("select");
    let timeout = 150;
    if (selects.length > 0) {
        selects_init(selects);
    }


    function selects_init(selects) {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        document.addEventListener("click", function (e) {
            selects_close(e);
        });
        document.addEventListener("keydown", function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }


    function selects_close(e) {
        const selects = document.querySelectorAll(".select");
        if (!e.target.closest(".select")) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector(".select__body");
                select.classList.remove("_active");
                _slideUp(select_body_options, timeout);
            }
        }
    }


    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute("class");
        const select_selected_option = select.querySelector("option:checked");
        select.setAttribute("data-default", select_selected_option.value);
        select.style.display = "none";
        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
        let new_select = select.parentElement.querySelector(".select");
        new_select.appendChild(select);
        select_item(select);
    }


    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector(".select__item");
        const select_options = select.querySelectorAll("option");
        const select_selected_option = select.querySelector("option:checked");
        const select_selected_text = select_selected_option.text;
        const select_type = select.getAttribute("data-type");
        if (select_items) {
            select_items.remove();
        }
        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
        }
        selectGetOptions(select, select_parent, select_options, select_type_content);
    }


    function select_actions(original, select) {
        const select_item = select.querySelector(".select__item");
        const select_body_options = select.querySelector(".select__body");
        const select_options = select.querySelectorAll(".select__option");
        const select_type = original.getAttribute("data-type");
        const select_input = select.querySelector(".select__input");
        select_item.addEventListener("click", function () {
            let selects = document.querySelectorAll(".select");
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector(".select__body");
                if (select != select_item.closest(".select")) {
                    select.classList.remove("_active");
                    _slideUp(select_body_options, timeout);
                }
            }
            _slideToggle(select_body_options, timeout);
            select.classList.toggle("_active");
        });
        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute("data-value");
            const select_option_text = select_option.innerHTML;
            if (select_type == "input") {
                select_input.addEventListener("keyup", select_search);
            } else {
                if (select_option.getAttribute("data-value") == original.value) {
                    select_option.style.display = "none";
                }
            }
            select_option.addEventListener("click", function (e) {
                const targetElement = e.target;
                const selectOptions = Array.from(select_option.closest(".select__options").querySelectorAll(".select__option"));
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = "block";
                }
                if (select_option.closest(".select-form__item_service")) {
                    if (select_option.classList.contains("service-item_home")) {
                        popupClose(select_option.closest("._popup-doctor"));
                        const applicationBlock = document.querySelector(".application");
                        window.scrollTo({
                            top: applicationBlock.getBoundingClientRect().top + window.scrollY,
                            behavior: "smooth",
                        });
                    }
                    const optionPrice = select_option.getAttribute("data-price");
                    if (document.querySelector("._popup-doctor._open")) {
                        let popupDoctor = document.querySelector("._popup-doctor");
                        popupDoctor.querySelector(".info-popup__price span").innerHTML = optionPrice;
                    }
                }
                if (document.querySelector("._page-catalog-doctors") && select_option.closest(".select-form__item_date")) {
                    let currentPopup = select_option.closest("._popup-doctor");
                    let indexDate = selectOptions.indexOf(targetElement);
                    let times = select_option.closest("._page-catalog-doctors").querySelectorAll(".times-appointment__day")[indexDate].children;
                    const selectTime = createSelect("time");
                    let selectTimesFilled = fillSelect(selectTime, times);
                    let selectBlockTime = document.querySelector(".select_time");
                    selectBlockTime.remove();
                    currentPopup.querySelector(".select-form__item_time").insertAdjacentElement("beforeend", selectTimesFilled);
                    const selectPopupTime = currentPopup.querySelector(".time");
                    select_init(selectPopupTime);
                }
                if (select_type == "input") {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    if (select_option.getAttribute("title")) {
                        const optionTitle = select_option.getAttribute("title");
                        select.querySelector(".select__value").innerHTML = "<span>" + select_option_text + "</span>";
                        select.querySelector(".select__value").setAttribute("title", optionTitle);
                    } else {
                        select.querySelector(".select__value").innerHTML = "<span>" + select_option_text + "</span>";
                    }
                    original.value = select_option_value;
                    select_option.style.display = "none";
                }
            });
        }
    }


    function selectGetOptions(select, selectParent, selectOptions, selectTypeContent) {
        if (selectOptions) {
            let selectOptionsContent = document.createElement("div");
            selectOptionsContent.setAttribute("class", "select__options");
            selectParent.insertAdjacentHTML("beforeend", 
            `<div class="select__item">
                    <div class="select__title">${selectTypeContent}</div>
                    <div class="select__body"></div>
                </div>`);
            selectParent.querySelector(".select__body").appendChild(selectOptionsContent);
            for (let index = 0; index < selectOptions.length; index++) {
                const selectOption = selectOptions[index];
                const selectOptionClone = selectOption.cloneNode(true);
                selectOptionClone.classList.add("select__option");
                selectOptionsContent.insertAdjacentElement("beforeend", selectOptionClone);
            }
            select_actions(select, selectParent);
        }
    }


//     function selects_update_all() {
//         let selects = document.querySelectorAll("select");
//         if (selects) {
//             for (let index = 0; index < selects.length; index++) {
//                 const select = selects[index];
//                 select_item(select);
//             }
//         }
//     }


//     let selectsForms = document.querySelectorAll(".select-application");
//     selectsForms.forEach(select => {
//         select.querySelector(".select__value span").style.opacity = 0;
//         select.addEventListener("click", function(e) {
//             if (e.target.classList.contains("select__option")) {
//                 select.querySelector("select").classList.add("_valid");
//                 select.querySelector(".select-application__label").style.opacity = 0
//             }
//         });
//     });



    /*==========================================================================================================================================================================*/
    /* Споллеры */
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });	
        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular);
        }
        const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
            return item.dataset.spollers.split(",")[0];
        });


        // Инициализация спойлеров с медиа-запросами:
        if (spollersMedia.length > 0) {
            const breakpointsArray = [];
            spollersMedia.forEach(item => {
                const params = item.dataset.spollers;
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            });


            // Получение уникальных брейкпоинтов:
            let mediaQueries = breakpointsArray.map(function (item) {
                return "(" + item.type + "-width: " + item.value + "rem)," + item.value + "," + item.type;
            });
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index;
            });


            // Работа с брейкпоинтами:
            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                const spollersArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                matchMedia.addListener(function () {
                    initSpollers(spollersArray, matchMedia);
                });
                initSpollers(spollersArray, matchMedia);
            });
        }


        // Инициализация спойлера:
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add("_init");
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove("_init");
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            });
        }


        // Работа с контентной частью:
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerTitle.classList.contains("_active")) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }


        // Управление спойлерами:
        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
                const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]");
                const spollersBlock = spollerTitle.closest("[data-spollers]");
                const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
                if (!spollersBlock.querySelectorAll("._slide").length) {
                    if (oneSpoller && !spollerTitle.classList.contains("_active")) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle("_active");
                    _slideToggle(spollerTitle.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }


        // Скрытие контента "неактивных" спойлеров:
        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active");
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove("_active");
                _slideUp(spollerActiveTitle.nextElementSibling, 500);
            }
        }
    }



    /*==========================================================================================================================================================================*/
    /* Табы */
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");


        if (tabs.length > 0) {
            tabs.forEach((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                initTabs(tabsBlock);
            });
        }


        // Работа с контентом:
        function initTabs(tabsBlock) {
            const tabsTitles = tabsBlock.querySelector("[data-tabs-titles]");
            const tabsContent = tabsBlock.querySelector("[data-tabs-body]");
            const tabsTitleItems = Array.from(tabsTitles.children);
            const tabsContentItems = Array.from(tabsContent.children);
            tabsContentItems.forEach((tabsContentItem, index) => {
                tabsContentItem.setAttribute("data-tabs-item", "");
                index == 0 ? null : tabsContentItem.setAttribute("hidden", "");
                if (tabsTitleItems[index]) {
                    const tabsTitle = tabsTitleItems[index];
                    tabsTitle.setAttribute("data-tabs-title", "");
                    index == 0 ? tabsTitle.classList.add("_tab-active") : null;
                    tabsTitle.addEventListener("click", function(e) {
                        setTabsAction(e);
                    });
                }
            });
        }


        function setTabsStatus(tabsBlock) {
            const tabsTitles = tabsBlock.querySelector("[data-tabs-titles]");
            const tabsContent = tabsBlock.querySelector("[data-tabs-body]");
            const tabsTitleItems = Array.from(tabsTitles.children);
            const tabsContentItems = Array.from(tabsContent.children);
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (tabsTitleItems[index]) {
                    if (tabsTitleItems[index].classList.contains("_tab-active")) {
                        tabsContentItem.removeAttribute("hidden");
                    } else {
                        tabsContentItem.setAttribute("hidden", "");
                    }
                }
            });
        }


        function setTabsAction(e) {
            const targetElement = e.target;
            const tabTitle = targetElement.closest("[data-tabs-title]");
            const tabsBlock = targetElement.closest("[data-tabs]");
            if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelectorAll("._slide").length) {
                const tabActiveTitle = tabsBlock.querySelector("[data-tabs-title]._tab-active");
                if (tabActiveTitle) {
                    tabActiveTitle.classList.remove("_tab-active");
                }
                tabTitle.classList.add("_tab-active");
                setTabsStatus(tabsBlock);
            }
            e.preventDefault();
        }
    }
    tabs();



    /*==========================================================================================================================================================================*/
    /* Функции Анимации */
    let _slideUp = (target, duration = 500) => {
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = target.offsetHeight + "px";
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = "none";
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }


    let _slideDown = (target, duration = 500) => {
        target.style.removeProperty("display");
        let display = window.getComputedStyle(target).display;
        if (display === "none")
            display = "block";
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
        }, duration);
    }


    let _slideToggle = (target, duration = 500) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            if (window.getComputedStyle(target).display === "none") {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }



    /*==========================================================================================================================================================================*/
    /* Динамический Адаптив */
    function dynamicAdapt(type) {
        this.type = type;
    }


    // Функция адаптива:
    dynamicAdapt.prototype.init = function () {
        const _this = this;		
        this.оbjects = [];																				// Массив объектов.
        this.daClassname = "_dynamic_adapt_";	
        this.nodes = document.querySelectorAll("[data-da]");											// Массив DOM-элементов.
        for (let i = 0; i < this.nodes.length; i++) {													// Наполнение оbjects объектами.
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {					// Массив уникальных медиа-запросов.
            return '(' + this.type + "-width: " + item.breakpoint + "rem)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });
        for (let i = 0; i < this.mediaQueries.length; i++) {											// Навешивание слушателя на медиа-запрос и вызов обработчика 
            const media = this.mediaQueries[i];															// при первом запуске.
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];			
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {			// Массив объектов с подходящим брейкпоинтом.
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };


    // Функция перемещения:
    dynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };


    // Функция перемещения:
    dynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }


    // Функция возврата:
    dynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }


    // Функция получения индекса внутри родителя:
    dynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };


    // Функция сортировки массива по breakpoint и place по возрастанию для this.type = min по убыванию для this.type = max:
    dynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }	
                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }
                    return a.place - b.place;
                }	
                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }	
                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }
                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }
                    return b.place - a.place;
                }	
                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };
    const da = new dynamicAdapt("max");
    da.init();



    /*==========================================================================================================================================================================*/
    /* Кнопка "Showmore" */
    // Услуги:
    if (document.querySelector(".services__more")) {
        showMoreColumns();
        window.addEventListener("resize", showMoreColumns);
        
        function showMoreColumns() {
            if ((window.innerWidth / 16) < 42.5) {
                const columnsServices = document.querySelectorAll(".column-services");
                for (let i = 0; i < columnsServices.length; i++) {
                    const columnServices = columnsServices[i];
                    columnServices.style.display = "block";
                    if (i === 5) {
                        break;
                    }
                }
                let showMoreButton = document.querySelector(".services__more");
                showMoreButton.addEventListener("click", () => {                          
                    columnsServices.forEach(column => column.style.display = "block");                     
                    showMoreButton.style.display = "none";
                });
            }
        };
    }


    // Расписание приема:
    if (document.querySelector(".time-schedule")) {
        showMoreSchedules();
        
        function showMoreSchedules() {
            let gridsSchedules = document.querySelectorAll(".time-schedule__grid");
            gridsSchedules.forEach(gridElem => {
                const buttonScheduleShowmore = gridElem.querySelector(".time-schedule__more");
                if (gridElem.children.length > 9) {
                    let columnsShedules = gridElem.querySelectorAll(".time-schedule__item");
                    for (let i = 0; i < columnsShedules.length; i++) {
                        const columnShedule = columnsShedules[i];
                        i >= 9 ? columnShedule.style.display = "none" : null; 
                    }
                    buttonScheduleShowmore.style.display = "flex";
                    buttonScheduleShowmore.addEventListener("click", function(e) {
                        let hiddenColumns = this.closest(".time-schedule__grid").querySelectorAll(".time-schedule__item");
                        hiddenColumns.forEach(column => {
                            column.style.display = "flex";
                        });
                        buttonScheduleShowmore.style.display = "none";
                    });
                }
            });
        };
    }


    // Отзывы:
    if (document.querySelector(".review-item")) {
        showMoreReviews();
        
        function showMoreReviews() {
            let reviewsCatalog = document.querySelector(".items-reviews");
            let visibleItems = 5;
            const columnsReviews = document.querySelectorAll(".review-item");
            for (let i = 0; i < columnsReviews.length; i++) {
                const columnReview = columnsReviews[i];
                i >= 5 ? columnReview.style.display = "none" : null; 
            }
            let showMoreButton = document.querySelector(".action-review__more");
            showMoreButton.addEventListener("click", () => {
                visibleItems += 5;
                const columns = Array.from(reviewsCatalog.children);
                const visibleColumns = columns.slice(0, visibleItems);                           
                visibleColumns.forEach(column => column.style.display = "flex");
                if ((visibleColumns.length === columnsReviews.length) || (visibleColumns.length > columnsReviews.length)) {                        
                    showMoreButton.style.display = "none";
                }
            });
        }
    }


    // Каталог врачей:
    if (document.querySelector("._page-catalog-doctors")) {
        showMoreDoctors();

        function showMoreDoctors() {
            let doctorsCatalog = document.querySelector(".catalog__doctors");
            let visibleItems = 8;
            const columnsDoctors = document.querySelectorAll(".doctor-catalog");
            for (let i = 0; i < columnsDoctors.length; i++) {
                const columnDoctor = columnsDoctors[i];
                i >= 8 ? columnDoctor.style.display = "none" : null; 
            }
            let showMoreButton = document.querySelector(".doctors-catalog__more");
            showMoreButton.addEventListener("click", () => {
                visibleItems += 8;
                const columns = Array.from(doctorsCatalog.children);
                const visibleColumns = columns.slice(0, visibleItems);                           
                visibleColumns.forEach(column => column.style.display = "block");
                if ((visibleColumns.length === columnsDoctors.length) || (visibleColumns.length > columnsDoctors.length)) {                        
                    showMoreButton.parentElement.style.display = "none";
                }
            });
        };
    }


    // Карточки услуг на "странице исследования":
    if (document.querySelector("._page-service")) {
        // Комплексные услуги:
        if (document.querySelector(".comprehensive-services__item")) {
            let cards = document.querySelectorAll(".comprehensive-services__item");
            let showMoreButton = document.querySelector(".comprehensive-services__more");
            showMore(cards, showMoreButton, 3, 6);
        }

        // Популярные услуги:
        if (document.querySelector(".popular-services__item")) {
            let cards = document.querySelectorAll(".popular-services__item");
            let showMoreButton = document.querySelector(".popular-services__more");
            showMore(cards, showMoreButton, 3, 6);
        }
    }


    // Категории услуг на странице "Каталог услуг":
    if (document.querySelector("._page-catalog-services")) {
        let cards = document.querySelectorAll(".category-service");
        let showMoreButton = document.querySelector(".service-catalog__more");
        showMore(cards, showMoreButton, 4, 4);
    }


    // Категории исследований на странице "Каталог исследований":
    if (document.querySelector("._page-catalog-diagnostics")) {
        let cards = document.querySelectorAll(".category-diagnostic");
        let showMoreButton = document.querySelector(".diagnostics-catalog__more");
        showMore(cards, showMoreButton, 4, 4);
    }


    // Акции на странице "Каталог акций":
    if (document.querySelector("._page-promotions")) {
        let cards = document.querySelectorAll(".item-promotion");
        let showMoreButton = document.querySelector(".promotions__more");
        showMore(cards, showMoreButton, 8, 8);
    }


    // Новости на странице "Каталог новостей":
    if (document.querySelector("._page-catalog-news")) {
        let cards = document.querySelectorAll(".item-news");
        let showMoreButton = document.querySelector(".catalog-news__more");
        showMore(cards, showMoreButton, 8, 8);
    }


    // Функция "показать еще":
    function showMore(cards, showMoreButton, visibleCards, cardsOpen) {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            i >= visibleCards ? card.style.display = "none" : null; 
        }
        showMoreButton.addEventListener("click", () => {
            visibleCards += cardsOpen;
            const columns = Array.from(cards);
            const visibleColumns = columns.slice(0, visibleCards);                           
            if (showMoreButton.closest(".services-catalog") || showMoreButton.closest(".diagnostics-catalog")) {
                visibleColumns.forEach(column => column.style.display = "grid");
            } else if (showMoreButton.closest(".promotions")) {
                visibleColumns.forEach(column => column.style.display = "flex");
                showMoreButton.closest(".promotions").querySelector(".promotions__items").style.marginBottom = "0";
            } else {
                visibleColumns.forEach(column => column.style.display = "block");
            } 
            if ((visibleColumns.length === cards.length) || (visibleColumns.length > cards.length)) {  
                if (showMoreButton.closest(".services-catalog") || showMoreButton.closest(".diagnostics-catalog") || showMoreButton.closest(".catalog-news")) {
                    showMoreButton.parentElement.style.display = "none";
                    if (showMoreButton.closest(".services-catalog")) {
                        showMoreButton.closest(".services-catalog").classList.add("_open-all");
                    }
                } else {
                    showMoreButton.style.display = "none";
                    if (showMoreButton.classList.contains("comprehensive-services__more") || showMoreButton.classList.contains("popular-services__more")) {
                        showMoreButton.parentElement.style.marginTop = "0";
                    }
                    if (showMoreButton.closest(".promotions")) {
                        showMoreButton.closest(".promotions").querySelector(".promotions__items").style.marginBottom = "0";
                    }
                }
            }
        });
    }


    // Кнопки "показать еще" в категориях услуг на странице "Каталог услуг":
    if (document.querySelector("._page-catalog-services")) {
        let categoriesService = document.querySelectorAll(".category-service");
        let visibleCards = 5;
        categoriesService.forEach(categoryService => {
            const buttonShowmore = categoryService.querySelector(".category-service__more");
            const cardsService = categoryService.querySelector(".category-service__items").children;
            for (let i = 0; i < cardsService.length; i++) {
                const cardService = cardsService[i];
                i >= visibleCards ? cardService.style.display = "none" : null; 
            }
            buttonShowmore.addEventListener("click", function(e) {
                e.preventDefault();
                const services = buttonShowmore.closest(".category-service").querySelectorAll(".item-research");
                services.forEach(service => {
                    service.style.display = "block";
                });
                buttonShowmore.style.display = "none";
            });
        });
    }


    // Кнопки "показать еще" в категориях исследований на странице "Каталог исследований":
    if (document.querySelector("._page-catalog-diagnostics")) {
        let categoriesDiagnostic = document.querySelectorAll(".category-diagnostic");
        let visibleCards = 5;
        categoriesDiagnostic.forEach(categoryDiagnostic => {
            const buttonShowmore = categoryDiagnostic.querySelector(".category-diagnostic__more");
            const cardsDiagnostic = categoryDiagnostic.querySelector(".category-diagnostic__items").children;
            for (let i = 0; i < cardsDiagnostic.length; i++) {
                const cardDiagnostic = cardsDiagnostic[i];
                i >= visibleCards ? cardDiagnostic.style.display = "none" : null; 
            }
            buttonShowmore.addEventListener("click", function(e) {
                e.preventDefault();
                const diagnostics = buttonShowmore.closest(".category-diagnostic").querySelectorAll(".item-research");
                diagnostics.forEach(diagnostic => {
                    diagnostic.style.display = "block";
                });
                buttonShowmore.style.display = "none";
            });
        });
    }



    /*==========================================================================================================================================================================*/
    /* Quantity */
    if (document.querySelector("._page-doctor")) {
        let quantityReviews = document.querySelector(".reviews__quantity");
        let reviews = document.querySelectorAll(".review-item");
        quantityReviews.innerHTML = reviews.length;
    }


    if (document.querySelector("._page-catalog-doctors")) {
        let quantityDoctors = document.querySelector(".quantity__doctors");
        let doctors = document.querySelectorAll(".doctor-catalog");
        quantityDoctors.innerHTML = doctors.length;
    }



    /*==========================================================================================================================================================================*/
    /* Yandex Карта */
    if (document.querySelector("#map")) {
        ymaps.ready(function() {
            let center = [55.743274, 37.641000];
            let mapAddress = new ymaps.Map("map", {												
                center: center,															
                zoom: 14
                }														
            );


            let placemarkOne = new ymaps.Placemark(center, {									
                balloonContentBody: "Космодамианская набережная, д. 22",
                balloonOffset: [-50, -50],											
                balloonCloseButton: false,
                openBalloonOnClick: true,																		
            }, {
                iconLayout: "default#image",
                iconImageHref: "img/map-marker.png",				
                iconImageSize: [40, 40],										
                iconImageOffset: [-21, -38],				
                hideIconOnBalloonOpen: false,
                balloonPanelMaxMapArea: 0,													
            });
            mapAddress.geoObjects.add(placemarkOne);
            mapAddress.behaviors.disable(["scrollZoom"]);																																																		
        });
    }



    /*==========================================================================================================================================================================*/
    /* Filter Doctors */
    if (document.querySelector("[data-home]")) {
        let toggleButton = document.querySelector(".toggle-doctors__label");
        let navigationItems = document.querySelectorAll(".tabs-doctors__button");
        let doctors = document.querySelectorAll(".tabs-doctors__doctor");
        let navigationBlock = document.querySelector(".tabs-doctors__buttons");
        toggleButton.addEventListener("click", function(e) {
            if (!toggleButton.classList.contains("_active")) {
                getDoctorsFilter(toggleButton);
            } else {
                clearDoctorsFilter(toggleButton);
            }
        });


        function getDoctorsFilter(toggleButton) {
            toggleButton.classList.add("_active");
            let activeNavigationItem = document.querySelector(".tabs-doctors__button._tab-active"); 
            let activeContentItem = document.querySelector(".tabs-doctors__doctor:not([hidden])");
            if (!activeNavigationItem.hasAttribute("data-home")) {
                for (let i = 0; i < navigationItems.length; i++) {
                    const item = navigationItems[i];
                    if (item.hasAttribute("data-home")) {
                        item.classList.add("_tab-active");
                        doctors[i].removeAttribute("hidden");
                        break;
                    }
                }
                activeNavigationItem.classList.remove("_tab-active");
                activeContentItem.setAttribute("hidden", "");
                navigationBlock.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
            navigationItems.forEach((item, index) => {
                !item.hasAttribute("data-home") ? item.style.display = "none" : null;
            });
            let widthNavigationBlock = navigationBlock.clientWidth;
            if ((window.innerWidth / 16) <= 64) {
                if ((widthNavigationBlock / 16) < (window.innerWidth / 16 - 2)) {
                    document.querySelector(".tabs-doctors__navigation > span").style.display = "none";
                }
            }
        }


        function clearDoctorsFilter(toggleButton) {
            toggleButton.classList.remove("_active");
            navigationItems.forEach(item => {
                !item.hasAttribute("data-home") ? item.style.display = "block" : null;
            });
            let activeNavigationItem = document.querySelector(".tabs-doctors__button._tab-active");
            let coordScroll = activeNavigationItem.offsetTop;
            navigationBlock.scrollTo({
                top: coordScroll,
                behavior: "smooth",
            });
            if ((window.innerWidth / 16) <= 64) {
                document.querySelector(".tabs-doctors__navigation > span").style.display = "block";
            }
        }
    }



    /*==========================================================================================================================================================================*/
    /* Добавление товаров в корзину и ее редактирование */
    if (document.querySelector(".item-research")) {
        let recoveryData = localStorage.getItem("cartList");
        let cartList = JSON.parse(recoveryData);
        if (cartList && !cartList.length == 0) {
            document.querySelector(".cart-header__icon").classList.add("_active");
            document.querySelector(".cart-header__icon span").innerHTML = cartList.length;
            let productsTitles = document.querySelectorAll(".item-research__title");
            cartList.forEach(product => {
                productsTitles.forEach(title => {
                    if (product.name === title.innerHTML) {
                        title.closest(".item-research").querySelector(".info-research__cart").classList.add("_await");
                    }
                });
            });
        }
        recoveryCartList(cartList);
    }


    function recoveryCartList(cartList) {
        let productButtons = document.querySelectorAll(".info-research__cart");
        let purchase;
        cartList ? purchase = cartList : purchase = [];
        productButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                if (!button.classList.contains("_await")) {
                    button.classList.add("_await");
                    updateCart();
                    updateShoppingCart(button, purchase);
                } else {
                    button.classList.remove("_await");
                    updateCart(false);
                    updateShoppingCart(button, purchase, false);
                }
            });
        });
    }


    // Функция формирования и обновления корзины товаров:
    function updateCart(addProduct = true) {
        let cart = document.querySelector(".cart-header__icon");
        let cartQuantity = cart.querySelector("span");
        if (addProduct) {
            cartQuantity.innerHTML == "" || cartQuantity.innerHTML == 0 ? cart.classList.add("_active") : null;
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        } else {
            const cartQuantityValue = --cartQuantity.innerHTML;
            if (cartQuantityValue) {
                cartQuantity.innerHTML = cartQuantityValue;
            } else {
                cart.classList.remove("_active");
            }
        }
    }


    // Функция формирования и обновления объекта покупок и сохранение в localStorage:
    function updateShoppingCart(button, purchase, addProduct = true) {
        let productName = button.closest(".item-research").querySelector(".item-research__title").innerHTML;
        let productCode = button.closest(".item-research").querySelector(".info-research__code span").innerHTML;
        let productTime = button.closest(".item-research").querySelector(".info-research__time span").innerHTML;
        let productPrice = button.closest(".item-research").querySelector(".info-research__price").innerHTML;
        if (addProduct) {
            let newProduct = {
                name: productName,
                code: productCode,
                time: productTime,
                price: productPrice,
            }
            purchase.push(newProduct);
            localStorage.setItem("cartList", JSON.stringify(purchase));
        } else {
            purchase.forEach((item, index) => {
                item.name == productName ? purchase.splice(index, 1) : null;
            });
            localStorage.setItem("cartList", JSON.stringify(purchase));
        }
    }



    /*==========================================================================================================================================================================*/
    /* Star Rating */
    window.addEventListener("DOMContentLoaded", () => {
        if (document.querySelector("._page-doctor")) {
            const starRating = new StarRating(".rating-popup");
        }
    });


    class StarRating {
        constructor(element) {
            this.ratings = [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5}
            ];
            this.element = document.querySelector(element);
            this.stars = this.element.querySelectorAll(".rating-popup__label");
            this.rating = null;
            this.init();
        }


        init() {
            this.stars.forEach(star => {
                star.addEventListener("click", this.updateRating.bind(this));
            });
        }


        updateRating(e) {
            Array.from(this.element.querySelectorAll(`[for*="rating"]`)).forEach(element => {
                element.className = "rating-popup__label";
            });
            let delay = 0;
            let targetAttribute = e.target.getAttribute("for");
            const ratingObject = this.ratings.find(rating => rating.id === +targetAttribute.slice(-1));
            const prevRatingID = this.rating?.id || 0;
            this.rating = ratingObject;
            this.ratings.forEach(rating => {
                const { id } = rating;
                const ratingLabel = this.element.querySelector(`[for="rating-${id}"]`);
                if (id > prevRatingID + 1 && id <= this.rating.id) {
                    ++delay;
                    ratingLabel.classList.add(`_delay-${delay}`);
                }
            });
        }
    }


    // Функция отправки выбранного значения на сервер:
    async function setRatingValue(value, rating) {																	
        let response = await fetch("rating.json", {							
            method: "GET",
            //body: JSON.stringify({
            //	userRating: value
            //}),
            //headers: {
            //	'content-type': 'application/json'
            //}
        });
        if (response.ok) {															
            const result = await response.json();
            const newRating = result.newRating;						
        } else {																		
            alert("Ошибка");														
        }
    }



    /*==========================================================================================================================================================================*/
    /* Показ оценки отзыва доктора */
    if (document.querySelector("[data-star]")) {
        let reviews = document.querySelectorAll("[data-star]");
        reviews.forEach(review => {
            let starratingItem = parseInt(review.getAttribute("data-star"));
            let starsBlock = review.querySelector(".rating-review__images");
            for (let i = 0; i < 5; i++) {
                let image = document.createElement("img");
                image.setAttribute("alt", "звезда");
                starratingItem <= i ? image.setAttribute("src", "img/icons/star-grey.svg") : image.setAttribute("src", "img/icons/star.svg");
                starsBlock.insertAdjacentElement("beforeend", image);
            }
        });
    }



    /*==========================================================================================================================================================================*/
    /* Маска телефона */
    function validatePhone() {
        let phoneInputs = document.querySelectorAll("._tel");
        [].forEach.call(document.querySelectorAll("._tel"), function (input) {
            let keyCode;


            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___ ____";
                let i = 0;
                let def = matrix.replace(/\D/g, "");
                let val = this.value.replace(/\D/g, "");
                let new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i);
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = "";
            }

            
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false);
        });
    };
    validatePhone();



    /*==========================================================================================================================================================================*/
    /* Маска даты */
    function inputDateMask() {
        if (document.querySelector("._date")) {
            let inputsDate = document.querySelectorAll("._date");
            inputsDate.forEach(inputDate => { 
                inputDate.addEventListener("keyup", function (e) {
                    this.value = this.value.replace(/[^0-9][.]/g, "");
                    if (e.keyCode < 47 || e.keyCode > 57) {
                        e.preventDefault();
                    }
                    if (inputDate.value.length !== 1 || inputDate.value.length !== 3) {
                        if (e.keyCode == 47) {
                            e.preventDefault();
                        }
                    }
                    if (inputDate.value.length === 2 || inputDate.value.length === 5) {
                        if (e.keyCode !== 8 && e.keyCode !== 46) {
                            this.value = this.value + ".";
                        }
                    }
                    if (inputDate.value.length === 11) {
                        this.value = this.value.replace(-1, "");
                    }
                });
            });
        }
    };
    inputDateMask();



    /*==========================================================================================================================================================================*/
    /* Валидация Формы */
    let forms = document.querySelectorAll("._form");
    let form;
    let formData = {};
    for (let i = 0; i < forms.length; i++) {
        form = forms[i];                 
        form.addEventListener("submit", formSend);
    }  


    // Функция проверки и обработки результатов валидации формы:
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        // if (error === 0) {
        //     inputRemoveError();
        //     let response = await fetch("captcha.php", {
        //         method: "POST",
        //         body: formData
        //     });
        //     if (response.ok) {
        //         let result = await response.json();
        //         formPreview.innerHTML = "";
        //         form.reset();
                    if (e.target.querySelector("[data-popup]")) {
                        popupNotificationForm(e.target);
                    }
        //     } else {
        //         if (form.classList.contains("form-contact__body")) {
        //             document.querySelector(".form-contact__input").classList.remove("_error");
        //             document.querySelector(".form-contact__checkbox._req").classList.remove("_error");
        //         } else {
        //             document.querySelector(".form-popup__input").classList.remove("_error");
        //             document.querySelector(".form-popup__checkbox").classList.remove("_error");
        //         }
        //         alert("Ошибка отправки");
        //     }
        // } else {
        //    alert("Заполните обязательные поля")
        // }
    }
        
        
    // Функция валидации формы:
    function formValidate(form) {
        let error = 0;
        if (document.querySelector("#doctor-popup").classList.contains("_open") 
        || document.querySelector("#service-popup").classList.contains("_open") 
        || document.querySelector("#review-popup").classList.contains("_open")) {
            let popupActive = document.querySelector("._popup._open");
            formReq = popupActive.querySelectorAll("._req-popup");
        } else {
            formReq = document.querySelectorAll("._req");
        }
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.value === "") {
                formAddError(input);
                error++;
            }
            if (input.classList.contains("_tel")) {
                if (input.value.length !== 17) {
                    formAddError(input);
                    error++;
                }
            } 
            if (input.classList.contains("_date")) {
                if (input.value.length !== 10) {
                    formAddError(input);
                    error++;
                }
            }
            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            }
            if (input.tagName === "SELECT" && !input.classList.contains("_valid")) {
                formAddError(input);
                error++;
            }
        }
        return error;
    }


    function validateDate(date) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        return regex.test(date);
    }
        
        
    // Функция добавления полю ввода и его родителю класса "_error" (ошибка):
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
        
            
    // Функция удаления у поля ввода и его родителя класса "_error" (ошибка):
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }


    function inputRemoveError() {
        let inputsCases = document.querySelectorAll("._req");
        for (let i = 0; i < inputsCases.length; i++) {
            const inputCases = inputsCases[i];
            inputCases.classList.remove("_error");
        }
        let inputsPopup = document.querySelectorAll("._req-popup");
        for (let i = 0; i < inputsPopup.length; i++) {
            const inputPopup = inputsPopup[i];
            inputPopup.classList.remove("_error");
        }
    }
                
                
    // Функция проверки email-адреса:
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }



    /*==========================================================================================================================================================================*/
    /* Calendar №1 */
    // Календарь на странице "Доктор":
    if (document.querySelector("._page-doctor")) {
        const calendarOne = document.querySelector("input[name='calendar-application']");
        const datepickerOne = new Datepicker(calendarOne, {                                   
            format: "dd.mm.yyyy",                                                           
            language: "ru",                                                                                                                                                                                                                                            
        });
    }

    // Календарь на странице "Обратная связь":
    if (document.querySelector("._page-feedback")) {
        const calendarTwo = document.querySelector("input[name='calendar-feedback']");
        const datepickerTwo = new Datepicker(calendarTwo, {                                   
            format: "dd.mm.yyyy",                                                           
            language: "ru",                                                                                                                                                                                                                                            
        });
    }



    /*==========================================================================================================================================================================*/
    /* Catalog Diagnostics */
    if (document.querySelector("._page-catalog-services")) {
        let researchItems = document.querySelectorAll(".item-research");
        researchItems.forEach(research => {
            if (research.hasAttribute("data-research-comprehensive") || research.hasAttribute("data-research-home") || research.hasAttribute("data-research-urgent")) {
                let typeBlock = document.createElement("div");
                typeBlock.classList.add("type-research");
                let researchBody = research.querySelector(".item-research__body");
                researchBody.insertAdjacentElement("afterbegin", typeBlock);
                if (research.hasAttribute("data-research-comprehensive")) {
                    typeBlock.insertAdjacentHTML("beforeend", `
                        <div class="type-research__comprehensive comprehensive-type">
                            <div class="comprehensive-type__item">Комплекс</div>
                        </div>
                    `);
                }
                if (research.hasAttribute("data-research-home")) {
                    typeBlock.insertAdjacentHTML("beforeend", `
                        <div class="type-research__home">
                            <img src="img/icons/home.svg" alt="Можно сдать на дому">
                        </div>
                    `);
                }
                if (research.hasAttribute("data-research-urgent")) {
                    typeBlock.insertAdjacentHTML("beforeend", `
                        <div class="type-research__urgently">
                            <img src="img/icons/urgently.svg" alt="Срочное исследование">
                        </div>
                    `);
                }
                if (!typeBlock.classList.contains(".comprehensive-type")) {
                    typeBlock.style.justifyContent = "flex-end";
                }
            }
        });
    }



    /*==========================================================================================================================================================================*/
    /* Корзина */
    if (document.querySelector("._page-cart")) {
        // Очистка корзины при отсутствии товаров:
        let itemsCart = document.querySelectorAll(".item-cart");
        itemsCart.length < 1 ? clearCart() : countingTotalPrice();


        // Удаление выбранного товара в корзине:
        const cartProductButtons = document.querySelectorAll(".item-cart__icon");
        cartProductButtons.forEach(cartButton => {
            cartButton.addEventListener("click", function(e) {
                cartButton.closest(".item-cart").remove();
                itemsCart = document.querySelectorAll(".item-cart");
                itemsCart.length < 1 ? clearCart() : countingTotalPrice();
            });
        });


        // Удаление всех товаров в корзине:
        let clearAllButton = document.querySelector(".cart__clear-all");
        clearAllButton.addEventListener("click", function(e) {
            itemsCart = document.querySelectorAll(".item-cart");
            itemsCart.forEach(itemCart => {
                itemCart.remove();
            });
            clearCart();
        });


        // Функция очистки корзины при отсутствии товаров:
        function clearCart() {
            document.querySelector(".add-cart").remove();
            document.querySelector(".total-cart").remove();
            document.querySelector(".cart__alert").remove();
            document.querySelector(".cart__clear-all").remove();
            document.querySelector(".cart__title h1").innerHTML = "Корзина пуста";
        };


        // Обработка изменения состояния чекбоксов:
        if (document.querySelector(".add-cart__item")) {
            const addCartCheckboxes = document.querySelectorAll(".add-cart__item input");
            addCartCheckboxes.forEach(addCartCheckbox => {
                addCartCheckbox.addEventListener("change", function(e) {
                    countingTotalPrice();
                });
            });
        }


        // Функция расчета итоговой суммы заказа:
        function countingTotalPrice() {
            const totalPriceCart = document.querySelector(".total-sum");
            const pricesItems = document.querySelectorAll(".item-cart__price");
            const addPricesItems = document.querySelectorAll(".add-cart__item");
            let totalPriceItems = [];
            pricesItems.forEach(priceItem => {
                const priceValue = Number(priceItem.innerHTML.replace(/\D/g, ""));
                totalPriceItems.push(priceValue);
            });
            addPricesItems.forEach(addPrice => {
                if (addPrice.querySelector("input").checked) {
                    const addPriceValue = Number(addPrice.querySelector(".add-cart__price").innerHTML.replace(/\D/g, ""));
                    totalPriceItems.push(addPriceValue);
                }
            });
            totalPrice = totalPriceItems.reduce((a , b) => a + b);
            totalPriceCart.innerHTML = `${totalPrice} ₽`;
        }
    }



    /*==========================================================================================================================================================================*/
    /* Вывод подсказок на мобильных устройствах */
    if (document.body.classList.contains("_touch") && document.querySelector(".item-action-service__help")) {
        document.body.addEventListener("click", function(e) {
            if (!e.target.closest(".item-action-service__help") || !e.target.classList.contains("item-action-service__help")) {
                const helpButtonsActive = document.querySelectorAll(".item-action-service__message._active");
                if (helpButtonsActive) {
                    helpButtonsActive.forEach(button => {
                        button.classList.remove("_active");
                    });
                }
            }
        });

        const helpButtons = document.querySelectorAll(".item-action-service__help");
        helpButtons.forEach(button => {
            button.addEventListener("click", function(e) {
                e.preventDefault();
                let helpMessage = button.querySelector(".item-action-service__message");
                helpMessage.classList.contains("_active") ? helpMessage.classList.remove("_active") : helpMessage.classList.add("_active");
            });
        });
    }
}



/*==========================================================================================================================================================================*/
/* Полифилы */
function polyfil() {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }


    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
};
polyfil();
