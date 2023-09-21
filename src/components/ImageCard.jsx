import React from "react";

const ImageCard = ({ data, index }) => {
  return (
    <div>
      <img
        className="h-72 w-full object-cover rounded-lg shadow-md"
        src={data.urls.small}
        alt={data.alt_description}
      />
    </div>
  );
};

export default ImageCard;
