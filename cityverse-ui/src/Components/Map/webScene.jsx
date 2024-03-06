import React from "react";

const UnityScene = () => {
  // const gitlabPagesURL = 'https://141.94.19.177/3d_map/index.html'; // Replace with your GitLab Pages URL
  const gitlabPagesURL = `${process.env.PUBLIC_URL}/3d_map/index.html`;
  return (
    <iframe
      title="unity-webgl"
      src={gitlabPagesURL}
      width="100%"
      height="650px"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
};

export default UnityScene;
