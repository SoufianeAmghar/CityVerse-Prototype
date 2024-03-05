import React from "react";

const UnityScene = () => {
  // const gitlabPagesURL = 'https://sustainabledevelopmentvr-guillaumecailhe-05f65f55681da3657133a5.gitlab.io/cfdc2f82-8b16-4c96-b4ec-895eba985914'; // Replace with your GitLab Pages URL
  const gitlabPagesURL = `${process.env.PUBLIC_URL}/src/3d_map/Build/index.html`;
  return (
    <iframe
      title="unity-webgl"
      src={gitlabPagesURL}
      width="100%"
      height="100vh"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
};

export default UnityScene;
