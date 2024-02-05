import { useRouter } from "next/router";

import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import StyledLink from "@/components/styledLink";
import ReviewForm from "@/components/ReviewForm";
import Reviews from "../Reviews";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MovieDetailsWrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--color-primary);
  border-radius: 9px;
  position: relative;
  z-index: 0;
  padding: 0 20px;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: justify;
  margin: 1.5rem auto;
`;

const Ul = styled.ul`
  display: inline-grid;
  justify-content: flex-end;
  float: right;
  align-content: stretch;
`;

const List = styled.li`
  font-size: 12px;
  list-style: none;
  text-align: justify;
  display: flex;
`;

const Title = styled.li`
  font-size: 15px;
  list-style: none;
  display: flex;
`;

function MovieDetails({ onSubmit, movieInfo }) {
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
          padding={"20px"}
        />
        <Ul>
          <Title>{movie.title}</Title>
          <List>{movie.release_date}</List>
          <List>{movie.runtime} min</List>
          <List>{movie.genres[0].name}</List>
          <List>{movie.vote_average}</List>
        </Ul>
        <Text>{movie.overview}</Text>
        <ReviewForm onSubmit={onSubmit} />
      </MovieDetailsWrapper>
    </>
  );
}

export default MovieDetails;
