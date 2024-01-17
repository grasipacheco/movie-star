import MovieCard from "@/components/MovieCard";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

const fetcher = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1.2rem;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-bottom: 1.6rem;
`;

export default function HomePage() {
  const { data: movies, isLoading } = useSWR("/api/movies", fetcher);
  return (
    <div>
      <H1>MovieStar</H1>
      <Ul>
        {movies?.map((movie) => (
          <Link href={"./movies/" + movie.id} key={movie.id}>
            <MovieCard
              title={movie.title}
              director={movie.director}
              image={movie.image}
            />
          </Link>
        ))}
      </Ul>
    </div>
  );
}
