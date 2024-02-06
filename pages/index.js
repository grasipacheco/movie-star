import styled from "styled-components";
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const H2 = styled.h2`
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`
export default function HomePage({}) {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    isLoading,
    mutate,
  } = useSWR(
    `/api/movies?search=${query || "Jack+Reacher"}`,

    fetcher
  );
  async function handleToggle(isFavorite, movieId) {
    await fetch(`/api/movies/toggleFavorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, isFavorite }),
    });
    mutate();
  }
  
  function handleQueryName(data) {
    setQuery(data);
  }

  return (
    <Wrapper>
      <PageTitle>MovieStar</PageTitle>
      <SearchForm onSubmit={handleQueryName} />
      {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
      <MovieList
        movies={movies}
        movieInfo={movieInfo}
        onToggleFavorite={onToggleFavorite}
      />
    </Wrapper>
  );
}
