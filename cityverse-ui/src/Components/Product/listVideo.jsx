import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardMedia from "@mui/material/CardMedia";

export default function ListVideo({ itemData }) {
  return (
    <ImageList sx={{ width: "100%", height: "60%" }} cols={1} rowHeight={200}>
      {itemData?.reverse()?.filter((item , index)  => item?.type === "video" )?.map((item) => (
        <ImageListItem key={item.img}>
          {/* <img
            srcSet={`${item.img}`}
            src={`${item.img}`}
            width={164}
            height={164}
            alt={item.title}
            loading="lazy"
          /> */}
          {/* <CardMedia
            width="auto"
            height="auto"
            component="video"
            image="https://www.youtube.com/embed/MkwdlpzeC1w?si=IdMG-yNqyf6iWXKJ"
            title="title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            controls
          /> */}
          <iframe
            width="100%"
            height="100%"
            src={`${item.img}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
