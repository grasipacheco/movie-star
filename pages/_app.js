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

  const { data: movies, isLoading } = useSWR(
    `/api/movies?search=${query || "Jack+Reacher"}`,

    fetcher
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

  function handleReview(newData, selectedId) {
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
        />
      </Layout>
    </>
  );
}
