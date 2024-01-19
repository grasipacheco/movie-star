import MovieCard from "../MovieCard";
import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-bottom: 1.6rem;
`;

const MovieList = ({ movies, movieInfo, onToggleFavorite }) => {
  return (
    <>
      <Ul>
        {movies?.results?.map((movie) => (
          <Li key={movie.id}>
            <Link href={"./movies/" + movie.id} key={movie.id}>
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
    </>
  );
};

export default MovieList;
