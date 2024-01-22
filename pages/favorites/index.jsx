import MovieList from "@/components/MovieList";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FavoritePages = ({ onToggleFavorite, movieInfo }) => {
  const favoritesIds = movieInfo
    .filter((item) => item.isFavorite)
    .map((movie) => movie.id);

  const { data: favoriteMovies, isLoading } = useSWR(
    favoritesIds.length > 0
      ? `/api/movies/getMovies?ids=${favoritesIds.join(",")}`
      : null,
    fetcher
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>MovieStar</h1>
      <h2>Favorite Movies</h2>
      {favoriteMovies && favoriteMovies.length > 0 ? (
        <MovieList
          movies={favoriteMovies}
          movieInfo={movieInfo}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <p>No favorite movies found</p>
      )}
    </>
  );
};

export default FavoritePages;
