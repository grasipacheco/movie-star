import MovieList from "@/components/MovieList";
import useSWR from "swr";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1.2rem;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 1.2rem;
`;
const Message = styled.p`
  font-size: 1.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

const FavoritePages = ({ onToggleFavorite }) => {
  const { data: favoriteMovies, isLoading } = useSWR(
    `/api/movies/favorites`,
    fetcher
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <H1>MovieStar</H1>
      <H2>Favorite Movies</H2>
      {favoriteMovies && favoriteMovies.length > 0 ? (
        <MovieList
          movies={favoriteMovies}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <Message>No favorite movies found</Message>
      )}
    </section>
  );
};

export default FavoritePages;
