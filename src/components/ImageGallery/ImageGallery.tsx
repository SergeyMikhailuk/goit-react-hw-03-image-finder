import { Component } from 'react';
import { ImageResponse } from 'components/App';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component<ImageGalleryProps, {}> {
  render() {
    const { images } = this.props;

    return (
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

type ImageGalleryProps = {
  images: ImageResponse[];
};
