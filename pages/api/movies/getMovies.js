export default async function handler(request, response) {
  const { ids } = request.query;
  const api_key = process.env.tmdbApiKey;

  if (request.method === "GET") {
    const idArray = ids.split(",").map((id) => parseInt(id));

    const moviePromises = idArray.map(async (id) => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
      );
      const data = await result.json();
      return data;
    });

    const movieData = await Promise.all(moviePromises);

    if (!movieData) {
      return response.status(404).json({ status: "404 Not Found" });
    }
    response.status(200).json(movieData);
  }
}
