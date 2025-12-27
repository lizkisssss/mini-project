// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// план
// 1. обробити submit форми.
// 2. зробити запит за ключовим словом.
// 3. зробити функцію для рендеру розмітки.
// 4. зробити завантаження картинок (нескінченний скролл за допомогою IntersectionObserver).
// 5. відкрити модальне вікно по кліку на картинку (бібліотека SimpleLightbox, BasicLightbox).
// 6. додати повідомлення користувачу (бібліотека Notifix, easyToast).

const BASE_URL =  "https://pixabay.com/api";
const API_KEY = '53683004-162f3f85862c4972e586e2d2d';
const IMAGES_PER_PAGE = 12;
const gallery = document.querySelector(".gallery")
const form = document.querySelector("#search-form")
const options = {
  threshold: 1.0,
};
const observer = new IntersectionObserver(callback, options);

let simpleLightbox;
let page = 1;
let query = "";


const createMarkup = (pictures) => {
  const markup = pictures.map(img => {
    return `<div class="photo-card">
        <a href=${img.largeImageURL} class="gallery-link"><img src=${img.webformatURL} alt="" class="gallery-image" /></a>
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${img.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${img.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>
            ${img.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${img.downloads}
          </p>
        </div>
      </div>`
  }).join("")
  gallery.insertAdjacentHTML("beforeend", markup)
}

async function fetchImages(q) {
  try {
    const response = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${q}&page=${page}&per_page=${IMAGES_PER_PAGE}`);
    const images = await response.json();
    return images    
  } catch (error) {
    console.log(error);
  }
} 

async function onSubmitForm(e){
  e.preventDefault();


  const form = e.target
  query = form.elements.query.value.trim()
  if(!query) { 
      iziToast.error({
      title: 'Error',
      message: 'Enter valid value',
      position: 'topRight'
    });
    return
  }
  try {
    gallery.innerHTML = "";
    page = 1;
    const data = await fetchImages(query)
    console.log(data);
    createMarkup(data.hits);
    simpleLightbox = new SimpleLightbox('.gallery a', { /* options */ });
    const pictureTarget = document.querySelector(".photo-card:last-child");
    observer.observe(pictureTarget);
  } catch (error) {
      iziToast.error({
      title: 'Error',
      message: 'Enter valid value',
      position: 'topRight'
    });    
  }
  form.reset();
}

async function loadMorePictures() {
  try {
    const data = await fetchImages(query);
    console.log(query);
    console.log(data.hits);
    createMarkup(data.hits);
    simpleLightbox.refresh();
    const pictureTarget = document.querySelector(".photo-card:last-child");
    observer.observe(pictureTarget);
  } catch (error) {
      iziToast.error({
      title: 'Error',
      message: 'Enter valid value',
      position: 'topRight'
    });
    return    
  }
}

form.addEventListener("submit", onSubmitForm);

function callback(entries, observer) {
  entries.forEach((entry) => {
    console.log(entry.isIntersecting, entry.target);
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      page += 1;
      loadMorePictures();
    }
  });
};