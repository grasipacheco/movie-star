import mongoose from "mongoose";
import Review from "./Review";

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    movieId: String,
    isFavorite: Boolean,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    collection: "movies",
  }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
