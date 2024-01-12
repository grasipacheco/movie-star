import movies from "./movies.json";

export default function handler(request, response) {
  if (request.method === "GET") {
    response.json(movies);
  }
}
