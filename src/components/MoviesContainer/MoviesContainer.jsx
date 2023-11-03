import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getGenres, getMovies } from "../../redux/actions";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import ErrorSearch404 from "../ErrorSearch404/ErrorSearch404";

function MoviesContainer() {
  const [loading, setLoading] = useState(true);
  const allMovies = useSelector((state) => state.allMovies);

  const moviesActive = allMovies.filter(
    (active) => active.activeMovie === true
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (allMovies.length === 0) {
        try {
          await dispatch(getMovies());
          await dispatch(getGenres());
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full lg:w-10/12 mt-8">
          <div className="w-10/12 mx-auto  flex flex-col xl:flex-row  items-center">
            <Filter />
            <SearchBar />
          </div>
          <div className="w-full grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center my-4 md:px-10">
            {moviesActive.length ? (
              moviesActive.map(
                ({
                  id,
                  title,
                  image,
                  genres,
                  clasification,
                  duration,
                  ratings,
                }) => (
                  <MovieCard
                    key={id}
                    id={id}
                    title={title}
                    genres={genres}
                    clasification={clasification}
                    duration={duration}
                    image={image}
                    ratings={ratings}
                  />
                )
              )
            ) : (
              <ErrorSearch404 />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MoviesContainer;
