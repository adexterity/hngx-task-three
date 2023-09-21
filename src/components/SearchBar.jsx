import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const { VITE_APP_ACCESS_KEY } = import.meta.env;
const SearchBar = ({ getSearchImages }) => {
  const [searchValue, setSearchValue] = useState("");
  let { isLoading } = useAuth0();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  //   api request
  const handleButtonSearch = () => {
    const fetchImages = async () => {
      try {
        isLoading = true;
        const resp = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${VITE_APP_ACCESS_KEY}`
        );
        getSearchImages(resp.data.results);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        isLoading = false;
      }
    };
    fetchImages();
    setSearchValue("");
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      //make request
      handleButtonSearch();
    }
  };

  return (
    <div className="h-[20px] inline text-md">
      <input
        type="seach"
        value={searchValue}
        placeholder="Search Anything..."
        onChange={handleInputChange}
        onKeyDown={handleEnterSearch}
        className="text-[20px] p-1"
      />
      <button
        onClick={handleButtonSearch}
        disabled={!searchValue}
        className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border-4 text-white py-[1px] px-2 rounded text-[25px]"
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
