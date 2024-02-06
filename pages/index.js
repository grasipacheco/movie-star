import styled from "styled-components";
import SearchForm from "@/components/SearchForm";

import MovieList from "@/components/MovieList";
import { useState } from "react";
import useSWR from "swr";
import PageTitle from "@/components/PageTitle";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const H2 = styled.h2`
  margin-bottom: 1.6rem;
  text-align: center;
`;

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
    <div>
      <PageTitle>MovieStar</PageTitle>
      <SearchForm onSubmit={handleQueryName} />
      {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
      <MovieList movies={movies} onToggleFavorite={handleToggle} />
    </div>
  );
}
