import dunaBanner from "../../assets/duna-banner.png";
import dunaTrailer from "../../assets/duna-trailer.png";
import checkBox from "../../assets/check-box.svg";
import checkedBox from "../../assets/checked-box.svg";
import star from "../../assets/star.svg";
import rateStar from "../../assets/rate-star.svg";
import yellowStar from "../../assets/yellow-star.svg";
import add from "../../assets/add.svg";
import "./Movie.css";
import {
  getReviews,
  getWatchedMovie,
  getMovieRating,
  getMovieAverageRating,
  getMovieDetails,
  createRating,
  watchedMovie,
  createReview,
} from "../../services/movie";
import { getLoggedUser } from "../../services/user";
import { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../Review/Review";

function Movie() {
  const { id } = useParams() as { id: string };

  const [movie, setMovie] = useState({} as any);
  const [watched, setWatched] = useState(false);
  const [rate, setRate] = useState(-1);
  const [voteCount, setVoteCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingButtons, setShowRatingButtons] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [user, setUser] = useState({} as any);
  const [reviews, setReviews] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [fetchReviews, setFetchReviews] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    const getWatched = async () => {
      try {
        const response = await getWatchedMovie(id);
        setWatched(response.data.watched);
      } catch (error) {
        console.error("Error fetching watched data:", error);
      }
    };

    const getRating = async () => {
      try {
        const response = await getMovieRating(id);
        setRate(response.data);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    const getUser = async () => {
      try {
        const response = await getLoggedUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getMovie();
    getWatched();
    getRating();
    getUser();
  }, [id]);

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await getReviews(id);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    getReview();
  }, [fetchReviews]);

  useEffect(() => {
    const getAverageRating = async () => {
      try {
        const response = await getMovieAverageRating(id);
        setAverageRating(response.data.average);
        setVoteCount(response.data.count);
      } catch (error) {
        console.error("Error fetching average rating data:", error);
      }
    };

    getAverageRating();
  }, [rate]);

  function renderRatingButtons() {
    const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return ratings.map((rating, index) => {
      return (
        <button
          key={index}
          className="rating-button"
          onClick={() => handleRatingClick(rating)}
        >
          {rating}
        </button>
      );
    });
  }

  function renderGenreButtons() {
    if (loading) {
      return;
    }

    const genres = movie.genres;

    return genres.map((genre, index) => {
      return (
        <button key={index} className="genre-button">
          {genre}
        </button>
      );
    });
  }

  function renderPlot() {
    if (loading) {
      return;
    }

    const plot = movie.plot;

    return (
      <div className="plot-text">
        <p>{plot}</p>
      </div>
    );
  }

  function renderDirector() {
    if (loading) {
      return;
    }

    const director = movie.director;

    return (
      <div className="director-text">
        <p>{director}</p>
      </div>
    );
  }

  function renderNames(names: any) {
    return names.map((name: any, index: number) => {
      return (
        <>
          <p key={index}>{name}</p>
          {index < names.length - 1 && (
            <div key={index + names.length} className="ellipse"></div>
          )}
        </>
      );
    });
  }

  function renderMovieImages() {
    const posterPath = movie.poster;
    const backdropPath = movie.backdrop;

    const poster = `https://image.tmdb.org/t/p/original${posterPath}`;
    const backdrop = `https://image.tmdb.org/t/p/original${backdropPath}`;
    return (
      <>
        {posterPath && <img className="movie-banner" src={poster}></img>}
        {backdropPath && <img className="movie-backdrop" src={backdrop}></img>}
      </>
    );
  }

  function getDuration() {
    if (loading) {
      return;
    }

    const runtime = movie.runtime;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}min`;
  }

  function handleWatchedClick() {
    watchedMovie(id, !watched);
    setWatched(!watched);
  }

  function handleRateClick() {
    setShowRatingButtons(!showRatingButtons);
  }

  function handleRatingClick(rating: number) {
    createRating(id, rating);
    setRate(rating);
    setShowRatingButtons(!showRatingButtons);
  }

  function handleReviewClick() {
    setShowReviewInput(!showReviewInput);
  }

  async function handleReviewSubmit() {
    const reviewText = (
      document.getElementById("input-review") as HTMLInputElement
    ).value;
    await createReview(id, reviewText);
    const userReview = reviews.filter((review) => {
      return review.user.id === user.id;
    });
    if (userReview.length === 0) {
      setReviews([...reviews, { review: reviewText, user: user }]);
    }
    setFetchReviews(!fetchReviews);
    setShowReviewInput(!showReviewInput);
  }

  function renderReviews() {
    if (loading) {
      return;
    }

    return reviews.map((review, index) => {
      return (
        <Review
          key={index}
          movieName={movie.title}
          rating={review.rating}
          name={review.user.name}
          content={review.review}
        ></Review>
      );
    });
  }

  return (
    <div className="movie-page">
      <div className="movie-container">
        <h1>{!loading && movie.title}</h1>
        <div className="small-info">
          <div className="info-container">
            <p>{!loading && new Date(movie.releaseDate).getFullYear()}</p>
            <div className="ellipse"></div>
            <p>{getDuration()}</p>
          </div>
          <div className="right-side">
            <div className="buttons-container">
              <button className="watched" onClick={() => handleWatchedClick()}>
                <img src={watched ? checkedBox : checkBox}></img>
                <p>Assistido</p>
              </button>
              <button className="rate" onClick={() => handleRateClick()}>
                <img src={rate === -1 ? star : yellowStar}></img>
                <p>{rate === -1 ? "Avaliar" : rate}</p>
              </button>
              <button className="rating">
                <img src={rateStar}></img>
                <p>
                  {!loading && averageRating.toPrecision(2)}/10 ({voteCount})
                </p>
              </button>
            </div>
            {showRatingButtons && (
              <div className="rating-buttons">{renderRatingButtons()}</div>
            )}
          </div>
        </div>
        <div className="movie-images">{renderMovieImages()}</div>
        <div className="movie-info">
          <div className="genre">
            <div className="h5-container">
              <h5>Gênero</h5>
            </div>
            <div className="genre-buttons">{renderGenreButtons()}</div>
          </div>
          <div className="plot">
            <div className="h5-container">
              <h5>Enredo</h5>
            </div>
            {renderPlot()}
          </div>
          <div className="director">
            <div className="h5-container">
              <h5>Direção</h5>
            </div>
            {renderDirector()}
          </div>
          <div className="writers">
            <div className="h5-container">
              <h5>Roteiro</h5>
            </div>
            {movie.writers && (
              <div className="names-text">
                {!loading && renderNames(movie.writers)}
              </div>
            )}
          </div>
          <div className="stars">
            <div className="h5-container">
              <h5>Elenco</h5>
            </div>
            {movie.stars && (
              <div className="names-text">
                {!loading && renderNames(movie.stars)}
              </div>
            )}
          </div>
          <div className="awards">
            {movie.providers && (
              <div className="h5-container">
                <h5>Onde Assistir?</h5>
                <div className="names-text">
                  {!loading && renderNames(movie.providers)}
                </div>
              </div>
            )}
          </div>
          <div className="review-button">
            <button className='add-review' onClick={() => handleReviewClick()}>
              <p>Review</p>
              <img src={add}></img>
            </button>
          </div>
        </div>
        {showReviewInput && (
          <div className="review-input">
            <textarea
              id="input-review"
              className="input-review"
              placeholder="Write your review here"
            ></textarea>
            <div className="submit-review">
              <button onClick={() => handleReviewSubmit()}>Submit</button>
            </div>
          </div>
        )}
        {reviews.length > 0 && (
          <div className="reviews-container">
            <h2>Resenhas dos usuários</h2>
            {renderReviews()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
