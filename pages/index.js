import MovieCard from "@/components/MovieCard";
import useSWR from "swr";
import styled from "styled-components";
import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import Link from "next/link";
import { linkStyle } from "./movies/[id]";

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
  text-align: center;
`;

export default function HomePage({ onToggleFavorite, movieInfo }) {
  const [query, setQuery] = useState("");

  const { data: movies, isLoading } = useSWR(
    `/api/movies?search=${query || "Jack+Reacher"}`,

    fetcher
  );

  function handleQueryName(data) {
    setQuery(data);
  }

  return (
    <div>
      <H1>MovieStar</H1>
      <SearchForm onSubmit={handleQueryName} />
      {query ? <H2>Search Results: {query}</H2> : <H2>Movies</H2>}
      <Ul>
        {movies?.results?.map((movie) => (
          <Li key={movie.id}>
            <Link
              href={"./movies/" + movie.id}
              key={movie.id}
              style={linkStyle}
            >
              <MovieCard
                title={movie.title}
                release={movie.release_date}
                image={movie.poster_path}
                onToggleFavorite={() => onToggleFavorite(movie.id)}
                movieInfo={movieInfo}
                id={movie.id}
              />
            </Link>
          </Li>
        ))}
      </Ul>
    </div>
  );
}
