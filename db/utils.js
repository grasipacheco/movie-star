import dbConnect from "./connect";
import Movie from "./model/Movie";

export async function getMovieInfo(id) {
  await dbConnect();
  let dbData = await Movie.findOne({ movieId: id }).populate("reviews");

  if (!dbData) {
    dbData = await Movie.create({
      movieId: id,
      isFavorite: false,
      reviews: [],
    });
  }
  return dbData;
}
