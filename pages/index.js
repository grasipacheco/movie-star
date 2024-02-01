import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1.2rem;
`;

const H2 = styled.h2`
  margin-bottom: 1.6rem;
  text-align: center;
`;

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const searchParam = query ? `?search=${query}` : "";
  const { data: movies, isLoading } = useSWR(
    `/api/movies${searchParam}`,
    fetcher
  );

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <H1>MovieStar</H1>
      <SearchForm onSubmit={(text) => setQuery(text)} />
      {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
      <MovieList movies={movies} />
    </div>
  );
}
