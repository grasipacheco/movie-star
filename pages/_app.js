import GlobalStyle from "../styles";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { useState } from "react";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App({ Component, pageProps }) {
  const [movieInfo, setMovieInfo] = useState([]);
  console.log(movieInfo);

  function handleToggle(selectedId) {
    console.log(selectedId);
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
  return (
    <>
      <GlobalStyle />
      <Main>
        <Component
          {...pageProps}
          onToggleFavorite={handleToggle}
          movieInfo={movieInfo}
        />
      </Main>
      <Layout />
    </>
  );
}
