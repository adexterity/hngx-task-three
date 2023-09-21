import React, { useContext, useState } from "react";
import { ImageContext } from "../App";

const SearchField = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchData, setSearchImage } = useContext(ImageContext);
  const API_KEY = "2WdufyRjAR5M1D3EMjDQnInSEExi0FjxwVaSodeGfUo";

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  //   api request
  const handleButtonSearch = () => {
    fetchData(`search/photos?page=1&query=${searchValue}&client_id=${API_KEY}`);
    setSearchValue("");
    setSearchImage(searchValue);
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      //make request
      fetchData(
        `search/photos?page=1&query=${searchValue}&client_id=${API_KEY}`
      );
      setSearchValue("");
      setSearchImage(searchValue);
    }
  };

  return (
    <div className="flex">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full index-2 p-2.5 outline-none  rounded-tl rounded-bl"
        type="search"
        placeholder="Search Anything..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterSearch}
      />
      <button
        onClick={handleButtonSearch}
        disabled={!searchValue}
        className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;
