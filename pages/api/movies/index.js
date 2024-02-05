import { getMovieInfo } from "@/db/utils";

export default async function handler(request, response) {
  const { search } = request.query;
  const api_key = process.env.tmdbApiKey;

  if (request.method === "GET") {
    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?${new URLSearchParams({
        query: search,
        api_key,
      })}`
    );

    const movieData = await result.json();

    const dataPromises = movieData.results.map(async (movie) => {
      const dbData = await getMovieInfo(movie.id);
      return { ...movie, localData: dbData };
    });

    const data = await Promise.all(dataPromises);

    if (!data) {
      return response.status(404).json({ status: "404 Not Found" });
    }

    response.json(data);
  }
}
