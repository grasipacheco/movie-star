import Image from "next/image";
import styled from "styled-components";


const MovieDetailsWrapper = styled.section`
  border: 1px solid black;
  background-color: var(--color-background-500);
`;

const MovieDetails = ({ movieInfo }) => {
  const currentMovie = movieInfo?.find((item) => item.id === id);

  return (
    <>
      <MovieDetailsWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/original${currentMovie.image}`}
          alt="Movie Poster"
          width={150}
          height={220}
        />
        <p>{currentMovie.title}</p>
        <p>{currentMovie.releaseDate}</p>
        <p>{currentMovie.duration}</p>
        <p>{currentMovie.genre}</p>
        <p>{currentMovie.rating}</p>
      </MovieDetailsWrapper>
    </>
  );
};

export default MovieDetails;
