/*==========================================================================================================================================================================*/
/* Разбивка на две колонки списка инфекций на странице "Инфекционные заболевания" */
if (document.querySelector(".spollers-therapy")) {
    let therapyContent = document.querySelector(".therapy__content");
    let spollersTherapy = document.querySelectorAll(".spollers-therapy__item");
    if (spollersTherapy.length > 1) {
        getTwoList(therapyContent, spollersTherapy);
    }


    function getTwoList(therapyContent, spollersTherapy) {
        let spollersList = document.createElement("ul");
        spollersList.setAttribute("class", "spollers-therapy");
        spollersList.setAttribute("data-spollers", "");
        for (let index = 0; index < spollersTherapy.length; index++) {
            const itemSpoller = spollersTherapy[index];
            if (index >= (spollersTherapy.length / 2)) {
                spollersList.append(itemSpoller);
            }
        }
        therapyContent.insertAdjacentElement("beforeend", spollersList);
    }
}