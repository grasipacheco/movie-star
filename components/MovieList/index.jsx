import MovieCard from "../MovieCard";

import styled from "styled-components";
import StyledLink from "../styledLink";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Li = styled.li``;

const MovieList = ({ movies, movieInfo, onToggleFavorite }) => {
  return (
    <>
      <Ul>
        {movies?.map((movie) => (
          <Li key={movie.id}>
            <StyledLink href={"./movies/" + movie.id}>
              <MovieCard
                title={movie.title}
                release={movie.release_date}
                image={movie.poster_path}
                onToggleFavorite={() => onToggleFavorite(movie.id)}
                movieInfo={movieInfo}
                id={movie.id}
              />
            </StyledLink>
          </Li>
        ))}
      </Ul>
    </>
  );
};

export default MovieList;
