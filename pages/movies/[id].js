import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import data from "../api/movies/movies.json";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MovieDetailsWrapper = styled.section`
  padding: 2.4rem;
  background-color: var(--color-background-500);
  border-radius: 9px;
`;

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher
  );

  if (!movie) {
    return;
  }

  return (
    <>
      <MovieDetailsWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Movie Poster"
          width={150}
          height={220}
        />
        <p>Title:{movie.title}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Duration: {movie.runtime} min</p>
        <p>Genre: {movie.genres[0].name}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>{movie.overview}</p>
        <Link href="/">Home</Link>
      </MovieDetailsWrapper>
    </>
  );
}
