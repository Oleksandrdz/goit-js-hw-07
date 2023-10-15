import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');
let instance;

gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
gallery.addEventListener("click", onClick);

function createMarkup(arr) {
    return arr.map(({ preview, original, description }) =>
        `<li class = "gallery__item">
         <a class = "gallery__link" href = "${original}">
         <img class = "gallery__image"
            src = "${preview}"
            data-source = "${original}"
            alt = "${description}"/>
         </a>
     </li>`
    ).join('');
}

function onClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return;
    }

    const source = event.target.getAttribute("data-source");

    instance = basicLightbox.create(`
        <img src="${source}">
    `,);
    instance.show();

    document.addEventListener("keyup", closeModal);
}

function closeModal(event) {
    if (event.key === 'Escape' && instance) {
        instance.close();
    }

    document.removeEventListener("keyup", closeModal);
}