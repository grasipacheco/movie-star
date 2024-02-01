import MovieCard from "../MovieCard";

import styled from "styled-components";
import StyledLink from "../styledLink";

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-bottom: 1.6rem;
`;

const MovieList = ({ movies }) => {
  return (
    <>
      <Ul>
        {movies?.map((movie) => (
          <Li key={movie.id}>
            <StyledLink href={"./movies/" + movie.id}>
              <MovieCard movie={movie} />
            </StyledLink>
          </Li>
        ))}
      </Ul>
    </>
  );
};

export default MovieList;
