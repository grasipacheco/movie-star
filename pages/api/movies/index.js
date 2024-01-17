export default async function handler(request, response) {
  const { search } = request.query;
  const api_KEY = process.env.tmdbApiKey;

  if (request.method === "GET") {
    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${api_KEY}`
    );
    const data = await result.json();

    response.json(data);
  }
}
