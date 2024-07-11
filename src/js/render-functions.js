
export function createMurkup(array) {

    return array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        
  `<li class="list-item">
  <a class="list-item-link" href="${largeImageURL}">
    <img
      class="list-item-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  <ul class="wrap-in-list-item">
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Likes</h3>
              <p class="item-in-wrap-text">${likes}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Views</h3>
              <p class="item-in-wrap-text">${views}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Comments</h3>
              <p class="item-in-wrap-text">${comments}</p>
            </li>
            <li item-in-wrap>
              <h3 class="item-in-wrap-title">Downloads</h3>
              <p class="item-in-wrap-text">${downloads}</p>
            </li>
          </ul>
  
</li>`).join(""); 
}