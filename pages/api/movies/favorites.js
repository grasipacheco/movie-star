import { getMovieInfo } from "@/components/db/utils";
import Movie from "@/components/db/model/Movie";
import dbConnect from "@/components/db/connect";

export default async function handler(request, response) {
  dbConnect();
  const api_key = process.env.tmdbApiKey;

  if (request.method === "GET") {
    const favoriteMovies = await Movie.find({ isFavorite: true });

    const moviePromises = favoriteMovies.map(async (movie) => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${api_key}`
      );
      const movieData = await result.json();

      const data = { ...movieData, localData: movie };

      return data;
    });

    const movieData = await Promise.all(moviePromises);

    if (movieData.length === 0) {
      return response.status(404).json({ status: "404 Not Found" });
    }
    response.status(200).json(movieData);
  }
}
