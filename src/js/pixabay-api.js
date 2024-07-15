import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export async function httpRequest(key, searchText, perPage, page) {
  const res = await axios.get('/api/', {
    params: {
      key: (key = '44769616-4ffe0cee5617f53d3e1075857'),
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });

  return res.data;
}
