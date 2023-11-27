import { Component } from 'react';

import { fetchImage } from 'api/fetchImage';
import Searchbar, { SearchbarState } from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';

export default class App extends Component<{}, AppState> {
  state: AppState = {
    imageQuery: '',
    pageNumber: 1,
    totalPages: 0,
    status: 'idle',
    images: [],
    error: '',
  };

  async componentDidUpdate(_: any, prevState: AppState) {
    const { imageQuery, pageNumber } = this.state;
    const { imageQuery: prevImageQuery, pageNumber: prevPageNumber } = prevState;
    if (imageQuery === prevImageQuery && pageNumber === prevPageNumber) return;

    this.setState({ status: 'pending' });
    fetchImage(imageQuery, pageNumber)
      .then(images => {
        if (images.hits.length === 0) {
          return Promise.reject(new Error(`Cannot find ${imageQuery}`));
        }
        const totalPages = Math.ceil(images.totalHits / 12);

        const requiredHits = images.hits.map(
          ({ id, webformatURL, largeImageURL, tags }: ImageResponse) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...requiredHits],
            totalPages,
            status: 'resolved',
            error: '',
          };
        });
      })
      .catch(({ ErrorMessage }) => {
        this.setState({ status: 'rejected', error: ErrorMessage });
      });
  }

  onSubmit = ({ search }: SearchbarState) => {
    this.setState({ imageQuery: search, pageNumber: 1, images: [] });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  render() {
    const { totalPages, pageNumber, images, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {!!images.length && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {totalPages > pageNumber && <Button onClick={this.onLoadMoreClick}>Load more</Button>}

        {status === 'rejected' && <ErrorMessage />}
      </>
    );
  }
}

export type AppState = {
  imageQuery: string;
  pageNumber: number;
  totalPages: number;
  status: 'idle' | 'pending' | 'rejected' | 'resolved';
  images: ImageResponse[];
  error: '';
};

export type ImageResponse = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};
