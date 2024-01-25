
export default async function handler(request, response) {
  const { ids } = request.query;
  const api_key = process.env.tmdbApiKey;
  console.log(ids);

  if (request.method === "GET") {
    const idArray = ids.split(",").map((id) => parseInt(id));

    console.log(idArray);

    const moviePromises = idArray.map(async (id) => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
      );
      const data = await result.json();
      return data;
    });

    console.log(moviePromises);

    const movieData = await Promise.all(moviePromises);

    console.log(movieData);

    if (movieData.length === 0) {
      return response.status(404).json({ status: "404 Not Found" });
    }
    response.status(200).json(movieData);
  }
}
