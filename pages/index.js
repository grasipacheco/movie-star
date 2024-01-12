import MovieCard from "@/components/MovieCard";
import useSWR from "swr";

const fetcher = async (URL) => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default function HomePage() {
  const { data: movies, isLoading } = useSWR("/api/movies", fetcher);
  return (
    <div>
      <h1>MovieStar</h1>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              title={movie.title}
              director={movie.director}
              image={movie.image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
