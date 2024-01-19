import MovieList from "@/components/MovieList";
import useSWR from "swr";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const FavoritePages = ({ onToggleFavorite, movieInfo, movies }) => {
  //   const { data: movies, isLoading } = useSWR(
  //     `/api/movies?search=${query || "Jack+Reacher"}`,

  //     fetcher
  //   );

  const favorites = movies?.results?.filter((movie) =>
    movieInfo.find((item) => item.id === movie.id && item.isFavorite)
  );
  console.log(favorites);
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
