import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  //   api request
  const handleButtonSearch = () => {
    const fetchImages = async () => {
      const resp = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${
          import.meta.env.VITE_APP_ACCESS_KEY
        }`
      );
      fetchImages(searchValue);
      setImages(resp.data.results);
    };
    setSearchValue("");
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      //make request
      const fetchImages = async () => {
        const resp = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${
            import.meta.env.VITE_APP_ACCESS_KEY
          }`
        );
        fetchImages(searchValue);
        setImages(resp.data.results);
        setSearchValue("");
      };
    }

    return (
      <div>
        <input
          type="seach"
          value={searchValue}
          placeholder="Search Anything..."
          onChange={handleInputChange}
          onKeyDown={handleEnterSearch}
        />
        <button
          onClick={handleButtonSearch}
          disabled={!searchValue}
          className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border-4 text-white py-2 px-2 rounded"
        >
          Search
        </button>
      </div>
    );
  };
};
export default SearchBar;
