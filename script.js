// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// план
// 1. обробити submit форми.
// 2. зробити запит за ключовим словом.
// 3. зробити функцію для рендеру розмітки.
// 4. зробити завантаження картинок (нескінченний скролл за допомогою IntersectionObserver).
// 5. відкрити модальне вікно по кліку на картинку (бібліотека SimpleLightbox, BasicLightbox).
// 6. додати повідомлення користувачу (бібліотека Notifix, easyToast).

const API_KEY = '53683004-162f3f85862c4972e586e2d2d';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;
const form = document.querySelector('#search-form')

let PAGE = 1;
let query = "";

const fetchImages = async () => {
    const response = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`)
};

function onSubmitForm(e){
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

}


form.addEventListener("submit", onSubmitForm)