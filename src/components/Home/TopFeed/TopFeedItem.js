import React from "react";

const TopFeedItem = ({ imageURL, title, desc }) => {
  return (
    <div className="relative w-72 h-54 flex-shrink-0 rounded-lg">
      <img
        className="w-full h-full object-cover rounded-lg"
        src={
          imageURL == null || imageURL=="" ?
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png":imageURL
        }
        alt={title}
      />
      <div className="absolute w-full bottom-0 top-5 left-0 z-10 bg-gradient-to-t from-black px-2 py-1 flex flex-col rounded-b-lg justify-end">
        <span className="text-white text-lg font-bold">{title}</span>
        <span className="text-white text-sm">{desc}</span>
      </div>
    </div>
  );
};

export default TopFeedItem;
