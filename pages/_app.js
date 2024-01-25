import GlobalStyle from "../styles";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

  function handleReview(selectedId, event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (data.review.trim().length === 0) return;
    event.target.reset();

    const selectedMovie = movieInfo.find((movie) => movie.id === selectedId);

    if (selectedMovie) {
      setMovieInfo(
        movieInfo.map((item) =>
          item.id === selectedId
            ? item.reviews
              ? { ...item, reviews: [...item.reviews, data.review] }
              : { ...item, reviews: [data.review] }
            : item
        )
      );
    } else {
      setMovieInfo([
        ...movieInfo,
        { id: selectedId, isFavorite: false, reviews: [data.review] },
      ]);
    }
  }
  return (
    <>
      <GlobalStyle />
      <Main>
        <Component
          {...pageProps}
          onToggleFavorite={handleToggle}
          movieInfo={movieInfo}
          movies={movies}
          query={query}
          setQuery={setQuery}
          onSubmit={handleReview}
        />
      </Main>
    </>
  );
}
