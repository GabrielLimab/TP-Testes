import emptyStar from "../../../assets/emptyStar.svg";
import filledStar from "../../../assets/filledStar.svg";
import play from "../../../assets/play.svg";
import info from "../../../assets/info.svg";
import bookmark from "../../../assets/bookmark.svg";
import "./Card.css";
import { Link } from "react-router-dom";

interface CardProps {
  movieId: number;
  title: string;
  poster_path: string;
  rate: number;
}

function Card({ movieId, title, poster_path, rate }: CardProps) {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <Link to={`/movies/${movieId}`} className="card">
      <div className="imageContainer">
        <img
          src={BASE_IMAGE_URL + poster_path}
          alt="card"
          className="movie-image"
        />
        {bookmark && <img src={bookmark} className="bookmark" />}
      </div>
      <div className="movie-details">
        <div className="movie-title">{title}</div>
        <div className="movie-rating">
          <div className="avg-rating">
            {filledStar && <img src={filledStar} className="star-icon" />}
            {rate}
          </div>
          <div className="user-rate">
            {emptyStar && <img src={emptyStar} className="star-icon" />}
            Rate
          </div>
          <div className="infoIcon">{info && <img src={info} />}</div>
        </div>
        <button className="card-reviews-button">
          {play && <img src={play} className="play-icon" />}
          Resenhas
        </button>
      </div>
    </Link>
  );
}

export default Card;
