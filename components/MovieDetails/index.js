import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const MovieDetailsWrapper = styled.section`
  border: 1px solid black;
  background-color: var(--color-background-500);
`;

const MovieDetails = ({ data }) => {
  const currentMovie = data.find((movie) => movie.id === id);

  return (
    <>
      <MovieDetailsWrapper>
        <Image
          src={currentMovie.image}
          alt="Movie Poster"
          width={150}
          height={220}
        />
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
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
