
const json = [
    './assets/01.jpg', './assets/02.jpg', './assets/03.jpg', './assets/04.jpg', './assets/05.jpg', './assets/06.jpg', './assets/01.jpg', './assets/02.jpg', './assets/03.jpg', './assets/04.jpg', './assets/05.jpg', './assets/06.jpg', './assets/01.jpg', './assets/02.jpg', './assets/03.jpg', './assets/04.jpg', './assets/05.jpg', './assets/06.jpg', './assets/01.jpg', './assets/02.jpg', './assets/03.jpg', './assets/04.jpg', './assets/05.jpg', './assets/06.jpg', './assets/01.jpg', './assets/02.jpg', './assets/03.jpg', './assets/04.jpg', './assets/05.jpg', './assets/06.jpg'
]
const gallery = document.querySelector('#gallery');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('#modal_img');
const btClose = document.querySelector('#bt_close');
const btNext = document.querySelector('#bt_next');
const btPrev = document.querySelector('#bt_prev');
const caption = document.querySelector('#gallery_caption');
let links;

const total = json.length;
let actual = 1;

function setSrc(index) {

    let srcVal = "";
    let img = links[index - 1].querySelector('img');
    caption.innerText = 'Image ' + index + '/' + total;
    srcVal = img.getAttribute('data-src');
    modalImg.setAttribute('src', srcVal);


}

function createImgItem(src) {
    let a = document.createElement('a');
    let img = document.createElement('img');
    img.className = 'small_img lazy';
    img.setAttribute('data-src', src)
    a.appendChild(img);
    gallery.appendChild(a);
}

function init() {
    json.forEach((item) => {
        this.createImgItem(item);
    });

    const imgs = document.querySelectorAll('[data-src]');
    imgs.forEach(img => {
        observer.observe(img);
    });
}

function setEvents() {
    btClose.onclick = () => {
        modal.classList.toggle('modal_active');
    };

    btNext.onclick = () => {
        if (actual === total) return;
        actual = actual + 1;

        setSrc(actual);


    };

    btPrev.onclick = () => {
        if (actual === 1) return;
        actual = actual - 1;
        setSrc(actual);
    };

    links = gallery.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = (e) => {
            e.preventDefault();
            actual = i + 1;
            setSrc(actual);
            modal.classList.toggle('modal_active');
        };

    };

}
const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
};

// register the config object with an instance
// of intersectionObserver
let observer = new IntersectionObserver(function (entries, self) {
    // iterate over each entry
    entries.forEach(entry => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if (entry.isIntersecting) {
            // custom function that copies the path to the img
            // from data-src to src
            preloadImage(entry.target);
            // the image is now in place, stop watching
            self.unobserve(entry.target);
        }
    });
}, config);

function preloadImage(el) {

    el.src = el.dataset.src;

}




init();
setEvents();
