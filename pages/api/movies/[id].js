export default async function handler(request, response) {
  const { id } = request.query;
  const api_key = process.env.tmdbApiKey;

  if (request.method === "GET") {
    const result = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
    );
    const data = await result.json();

    if (!data) {
      return response.status(404).json({ status: "404 Not Found" });
    }
    response.status(200).json(data);
  }
}
