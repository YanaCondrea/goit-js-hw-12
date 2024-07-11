export function httpRequest(key, searchText) {
  return  fetch( `https://pixabay.com/api/?key=${key}&q=${searchText}&image_type=photo&orientation=horisontal&safesearch=true`)
}