import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import data from "../api/movies/movies.json";

const MovieDetailsWrapper = styled.section`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
`;

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log({ id });
  const currentMovie = data.find((movie) => movie.id === id);

  if (!currentMovie) {
    return "Loading";
  }
  // const { data, error, isLoading } = useSWR("/api/movies", fetcher);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Something bad happened</div>;

  return (
    <>
      <MovieDetailsWrapper>
        <Image
          src={currentMovie.image}
          alt="Movie Poster"
          width={150}
          height={220}
        />
        <p>{currentMovie.title}</p>
        <p>Release Date: {currentMovie.releaseDate}</p>
        <p>Duration: {currentMovie.duration}</p>
        <p>Genre: {currentMovie.genre}</p>
        <p>Rating: {currentMovie.rating}</p>
        <Link href="/">Home</Link>
      </MovieDetailsWrapper>
    </>
  );
}
