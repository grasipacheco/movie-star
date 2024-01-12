import Image from "next/image";

const MovieCard = ({ title, director, image }) => {
  return (
    <div className="movie-card">
      <Image src={image} alt="Movie Poster" width={225} height={330} />
      <aside className="movie-card__info">
        <h2>{title}</h2>
        <h3>{director}</h3>
      </aside>
    </div>
  );
};

export default MovieCard;
