import { httpRequest } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import  error  from "./img/error.svg";
import { createMurkup } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const key = '44769616-4ffe0cee5617f53d3e1075857';



const elements = {
    form: document.querySelector('.search-form'),
    list: document.querySelector('.list'),
    input: document.querySelector('.search-input'),
}


elements.form.addEventListener('submit', searchQuery);


function searchQuery(evt) {

    evt.preventDefault();

    elements.list.innerHTML = '';
    
    const searchText = evt.target.elements.input.value.trim();
    
    if (searchText !== "") {

        elements.form.insertAdjacentHTML("afterend", ' <span class="loader"></span>');
        const loader = document.querySelector('.loader')

        httpRequest(key, searchText)
    .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
          })
    .then((data) => {
        const image = data.hits;
         if (image.length !== 0) {
                 
    elements.list.insertAdjacentHTML("beforeend", createMurkup(image));
     let lightbox = new SimpleLightbox('.list a', {
	captions: true,
	captionType: 'attr',
	captionsData: 'alt',
	captionPosition: 'bottom',
	captionDelay: 250
     }); 
     lightbox.refresh();
    } else {
            iziToast.show({
            backgroundColor: '#ef4040',
            close: false,
            closeOnClick: true,
            progressBarColor: 'white',
            title: 'Error',
            titleColor: 'white',
            iconUrl: error,
            position: 'topRight',
            icon: 'icon-error.svg',
            messageColor: 'white',
            messageSize: '16px',
            message: '"Sorry, there are no images matching your search query. Please try again!"'
        }); 
             }
         })
            .catch((err) => console.error("Fetch Error:", err))
           .finally(() => (loader.style.display = 'none'));
    elements.form.reset();
        
    } else {
        iziToast.show({
            backgroundColor: '#ef4040',
            close: false,
            closeOnClick: true,
            progressBarColor: 'white',
            title: 'Error',
            titleColor: 'white',
            iconUrl: error,
            position: 'topRight',
            icon: 'icon-error.svg',
            messageColor: 'white',
            messageSize: '16px',
            message: 'Form field must be filled in'
        });
      
    }   
    
  
}

