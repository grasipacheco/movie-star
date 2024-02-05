import styled from "styled-components";
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

const H2 = styled.h2`
  text-align: center;
`;

export default function HomePage({
  onToggleFavorite,
  movieInfo,
  movies,
  query,
  setQuery,
}) {
  function handleQueryName(data) {
    setQuery(data);
  }

  console.log(movies);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <PageTitle>MovieStar</PageTitle>
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
