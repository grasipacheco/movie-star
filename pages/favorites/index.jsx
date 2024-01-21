import MovieList from "@/components/MovieList";

const FavoritePages = ({ onToggleFavorite, movieInfo, movies }) => {
  const favorites = movies?.results?.filter((movie) =>
    movieInfo.find((item) => item.id === movie.id && item.isFavorite)
  );

  return (
    <>
      <h1>MovieStar</h1>
      <h2>Favorite Movies</h2>
      <MovieList
        movies={favorites}
        movieInfo={movieInfo}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default FavoritePages;
