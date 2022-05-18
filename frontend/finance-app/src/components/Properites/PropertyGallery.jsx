import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const PropertyGallery = (props) => {
    console.log('images inside', props.images)
  return (
    <ImageList sx={{ width: 600, height: 550 }} cols={2} rowHeight={304}>
      {props.images.map((item) => (
        <ImageListItem >
          <img
            src={item}
            srcSet={item}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default PropertyGallery;
