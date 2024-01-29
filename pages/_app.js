import GlobalStyle from "../styles";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default function App({ Component, pageProps }) {
  const [movieInfo, setMovieInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState([]);

  const { data: movies, isLoading } = useSWR(
    `/api/movies?search=${query || "Jack+Reacher"}`,

    fetcher
  );

  function handleAverageRating() {
    return setAverage((average) => [...average, rating])
     
    
    
  }
  const avrUserRating = average.reduce(
    (acc, cur, _, arr) => acc + cur / arr.length,
    0
  );

  function handleToggle(selectedId) {
    const selecetdMovie = movieInfo.find((movie) => movie.id === selectedId);
    if (selecetdMovie) {
      setMovieInfo(
        movieInfo.map((item) =>
          item.id === selectedId
            ? { id: selectedId, isFavorite: !item.isFavorite }
            : item
        )
      );
    } else {
      setMovieInfo([...movieInfo, { id: selectedId, isFavorite: true }]);
    }
  }

  function handleReview(selectedId, event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newData = { ...data, rating };

    if (!data.review.trim()) return;
    event.target.reset();
   setRating(0)
    const selectedMovie = movieInfo.find((movie) => movie.id === selectedId);

    if (selectedMovie) {
      setMovieInfo(
        movieInfo.map((item) =>
          item.id === selectedId
            ? item.reviews
              ? { ...item, reviews: [...item.reviews, newData] }
              : { ...item, reviews: [newData] }
            : item
        )
      );
    } else {
      setMovieInfo([
        ...movieInfo,
        { id: selectedId, isFavorite: false, reviews: [newData] },
       
      ]);
    }
  }
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          {...pageProps}
          onToggleFavorite={handleToggle}
          movieInfo={movieInfo}
          movies={movies}
          query={query}
          setQuery={setQuery}
          onSubmit={handleReview}
          rating={rating}
          setRating={setRating}
          handleAverageRating={handleAverageRating}
          avrUserRating={avrUserRating}
        />
      </Layout>
    </>
  );
}
