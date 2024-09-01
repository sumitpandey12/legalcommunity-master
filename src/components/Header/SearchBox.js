import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="rounded-full border border-gray-300 px-4 py-2 w-1/2 flex items-center gap-2">
      <FiSearch size={20} />
      <input
        type="text"
        className="border-0 outline-0 w-full"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBox;
