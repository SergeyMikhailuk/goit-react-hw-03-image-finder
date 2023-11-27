import React, { Component, MouseEvent } from 'react';
import Modal from 'components/Modal';
import { ImageResponse } from 'components/App';

class ImageGalleryItem extends Component<ImageGalleryItemProps, {}> {
  state = { showModal: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleBackdropClick = (e: MouseEvent) => {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  };
  currentImgClickHandler = () => {
    this.setState({ showModal: true });
  };

  render() {
    const {
      image: { webformatURL, tags, id, largeImageURL },
    } = this.props;
    const { showModal } = this.state;

    return (
      <li className={'ImageGalleryItem'}>
        <img
          className={'ImageGalleryItem-image'}
          src={webformatURL}
          alt={tags}
          id={String(id)}
          onClick={this.currentImgClickHandler}
        />
        {showModal && (
          <Modal
            handleBackdropClick={this.handleBackdropClick}
            imageUrl={largeImageURL}
            alt={tags}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

type ImageGalleryItemProps = {
  image: ImageResponse;
};
