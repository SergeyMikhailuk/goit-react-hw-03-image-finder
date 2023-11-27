import axios from 'axios';

const KEY = '19199017-0109ef76b5c2e4dd98ebacd3c';
const url = new window.URL('https://pixabay.com/api/');
url.searchParams.append('key', KEY);
url.searchParams.append('image_type', 'photo');
url.searchParams.append('orientation', 'horizontal');
url.searchParams.append('per_page', '12');

export async function fetchImage(query: string, pageNumber: number) {
  const fetchImageUrl = new window.URL(url);
  fetchImageUrl.searchParams.append('q', query);
  fetchImageUrl.searchParams.append('page', String(pageNumber));

  try {
    const response = await axios.get(fetchImageUrl.toString());
    return response.data;
  } catch (error) {
    throw error;
  }
}
