import React, { useEffect, useState } from "react";
import axios from "axios";
import GalleryPage from "./GalleryPage";
import LoginButton from "./Login";
import LogoutButton from "./LogOut";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const HomePage = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  const [images, setImages] = useState([]);

  const getSearchImages = (images) => {
    setImages(images);
  };
  useEffect(() => {
    const fetchImages = async () => {
      const resp = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=cats&client_id=${
          import.meta.env.VITE_APP_ACCESS_KEY
        }`
      );

      setImages(resp.data.results);
    };
    fetchImages();
  }, []);

  return (
    <div>
      {error && <p>Authentication error</p>}
      {!error && isLoading && <Spinner />}
      {!error && !isLoading && (
        <>
          <div>
            <LoginButton />
            <LogoutButton />
          </div>
          {isAuthenticated && (
            <div className="text-center mt-5">
              <SearchBar getSearchImages={getSearchImages} />
            </div>
          )}
          {isAuthenticated && <GalleryPage images={images} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
