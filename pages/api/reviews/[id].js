import { v4 as uuidv4 } from "uuid";

const movies = {};

export default async function handler(request, response) {
  const { id } = request.query;
  const reviews = movies[id] ?? [];

  if (request.method === "GET") {
    response.json(reviews);
  }

  if (request.method === "POST") {
    const { rating, review } = request.body;

    if (!rating)
      return response.status(400).json({ message: "missing rating" });

    if (!review)
      return response.status(400).json({ message: "missing review" });

    reviews.push({ rating, review, id: uuidv4() });

    movies[id] = reviews;

    response.status(201).json(reviews);
  }

  if (request.method === "PUT") {
    const { reviewId, rating, review } = request.body;
    const index = reviews.findIndex((review) => review.id === reviewId);
    if (index < 0)
      return response.status(400).json({ message: "invalid review id" });

    reviews.splice(index, 1, { rating, review, id: reviewId });

    movies[id] = reviews;

    response.json(reviews);
  }

  if (request.method === "DELETE") {
    const { reviewId } = request.body;
    const index = reviews.findIndex((review) => review.id === reviewId);
    if (index < 0)
      return response.status(400).json({ message: "invalid review id" });

    reviews.splice(index, 1);

    movies[id] = reviews;

    response.json(reviews);
  }
}
