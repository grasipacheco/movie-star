import dbConnect from "@/db/connect";
import Movie from "@/db/model/Movie";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "PATCH") {
    const { movieId, isFavorite } = request.body;

    await Movie.findOneAndUpdate(
      { movieId },
      {
        isFavorite: !isFavorite,
      }
    );

    return response.status(200).json({ message: "Success" });
  } else {
    return response.status(404).json({ message: "Movie not found" });
  }
}
