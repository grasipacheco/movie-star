import dbConnect from "@/components/db/connect";
import Movie from "@/components/db/model/Movie";
const { id } = request.query;
export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const movie = await Movie.findById(id).populate("reviews");
    if (!movie) {
      return response.status(404).json({ status: "Movie Not Found" });
    }
    response.status(200).json(movie);
  }

  if (request.method === "DELETE") {
    await Movie.findByIdAndDelete(id).populate("reviews");
    response.status(200).json({ status: `Review ${id} successfully deleted.` });
  }
}
