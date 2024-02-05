import styled from "styled-components";
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

const H2 = styled.h2`
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

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
