import MovieCard from "@/components/MovieCard";
import useSWR from "swr";
import styled from "styled-components";
import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import MovieList from "@/components/MovieList";
import Link from "next/link";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1.2rem;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-bottom: 1.6rem;
`;

const H2 = styled.h2`
  margin-bottom: 1.6rem;
`;

export default function HomePage({
  onToggleFavorite,
  movieInfo,
  movies,
  query,
  setQuery,
}) {
  // const [query, setQuery] = useState("");

  // const { data: movies, isLoading } = useSWR(
  //   `/api/movies?search=${query || "Jack+Reacher"}`,

  //   fetcher
  // );

  function handleQueryName(data) {
    setQuery(data);
  }

  return (
    <div>
      <H1>MovieStar</H1>
      <Link href="/favorites">Favorites</Link>
      <SearchForm onSubmit={handleQueryName} />
      {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
      <MovieList
        movies={movies}
        movieInfo={movieInfo}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
