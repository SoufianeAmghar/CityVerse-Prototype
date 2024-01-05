import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ListImage({ itemData}) {
  return (
    <ImageList sx={{ width: "100%", height: '60%'  }} cols={2} rowHeight={150}>
      {itemData?.reverse()?.filter((it , index) => it?.type === "image")?.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}`}
            src={`${item.img}`}
            width={164}
            height={164}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

