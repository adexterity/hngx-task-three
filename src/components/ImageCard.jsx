import React from "react";
import tag from "../assets/tag.svg";

const ImageCard = ({ data, index }) => {
  return (
    <div className="relative">
      <img
        className="h-72 w-full object-cover rounded-lg shadow-md"
        src={data.urls.small}
        alt={data.alt_description}
      />

      <div className="absolute bottom-0 left-0 ml-2 mb-2">
        {data.tags.map((item) => (
          <span
            className="text-[10px] ml-2 bg-slate-300 py-1 px-1 rounded"
            key={item.title}
          >
            <img className="h-3 inline mr-2" src={tag} alt={item.title} />
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
