let menuAppear = document.getElementById(`main-menu`);
let hiddenMenu = document.querySelector(`nav`);
let modal = document.getElementById(`modal-menu`);
let hiddenModal = document.querySelector(`div`);

menuAppear.addEventListener (`click`, () => {
    if ((hiddenMenu.classList.contains(`hide`))) {
        hiddenMenu.classList.remove(`hide`);
    }
    else {
        hiddenMenu.classList.add(`hide`);
    }});

modal.addEventListener (`click`, () => {
    if ((hiddenModal.classList.contains(`hidden`))) {
        hiddenModal.classList.remove(`hidden`);
    }
    else {
        hiddenModal.classList.add(`hidden`);
    }});

document.addEventListener (`keydown`, (e) => {
    if (e.key === `Escape` & (!(hiddenModal.classList.contains(`hidden`)))) {
        modal.click();
    }});
