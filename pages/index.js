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

  return (
    <div>
      <H1>MovieStar</H1>
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
