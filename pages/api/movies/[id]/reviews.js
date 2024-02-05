import dbConnect from "@/db/connect";
import Movie from "@/db/model/Movie";
import Review from "@/db/model/Review";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "POST") {
    try {
      const { review, rating } = request.body;
      const newReview = await Review.create({ review, rating });

      const movie = await Movie.findOne({ movieId: id });

      const reviewIds = movie.reviews;

      const updatedIds = [...reviewIds, newReview._id];

      await Movie.findOneAndUpdate({ movieId: id }, { reviews: updatedIds });

      response.status(201).json({ status: "Review created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const movie = await Movie.findOne({ movieId: id });
      const { reviewId } = request.body;

      const reviewIds = movie.reviews;

      const updatedReviewIds = reviewIds.filter(
        (review) => review.toString() !== reviewId
      );

      await Movie.findOneAndUpdate(
        { movieId: id },
        { reviews: updatedReviewIds }
      );

      await Review.findByIdAndDelete(reviewId);

      response.status(201).json({ status: "Review deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      const { review, rating, reviewId: _id } = request.body;

      await Review.findByIdAndUpdate(_id, {
        review,
        rating,
      });

      response.status(201).json({ status: "Review created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
