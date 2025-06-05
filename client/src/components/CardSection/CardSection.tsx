import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { CardProps } from "../../types/CardProps";
import Card from "../Atoms/Card/Card";
import dot from "../../assets/dot.svg";
import "./CardSection.css";
import {
  getNowPlayingMovies,
  getRecommendedMovies,
  getTopRatedMovies,
} from "../../services/movie";

interface SectionProps {
  title: string;
  subtitle?: string;
  type: string;
}

function CardSection({ title, subtitle, type }: SectionProps) {
  const [numberOfVisibleCards, setNumberOfVisibleCards] = useState(1);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(cards.length / numberOfVisibleCards);

  useEffect(() => {
    const handleResize = () => {
      const MIN_WIDTH = 160;
      const MAX_WIDTH = 200;
      if (cardSectionRef.current) {
        const cardWidth =
          cardSectionRef.current.querySelector(".card")?.clientWidth ||
          MAX_WIDTH;
        const sectionWidth = cardSectionRef.current.offsetWidth;
        if (sectionWidth <= cardWidth) {
          setNumberOfVisibleCards(1);
        } else if (cardWidth === MIN_WIDTH) {
          setNumberOfVisibleCards(Math.floor(sectionWidth / MAX_WIDTH));
        } else {
          setNumberOfVisibleCards(Math.floor(sectionWidth / cardWidth));
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCards(type);
      setCards(fetchedCards);
    };

    fetchCards();
  }, []);

  async function getCards(type: string) {
    let cards: CardProps[] = [];
    switch (type) {
      case "for-you":
        cards = await getRecommendedMovies();
        break;
      case "top-rated":
        cards = await getTopRatedMovies();
        break;
      case "now-playing":
        cards = await getNowPlayingMovies();
        break;
    }

    return cards;
  }

  function renderCards(
    currentPage: number,
    numberOfVisibleCards: number,
    cards?: any
  ) {
    const startIndex = currentPage * numberOfVisibleCards;
    const endIndex = (currentPage + 1) * numberOfVisibleCards;

    let visibleCards = cards?.slice(startIndex, endIndex) || [];

    if (visibleCards.length < numberOfVisibleCards && currentPage > 0) {
      const remainingCardsNeeded = numberOfVisibleCards - visibleCards.length;
      const previousPageStartIndex = (currentPage - 1) * numberOfVisibleCards;
      const previousPageEndIndex = startIndex;

      const previousPageCards =
        cards?.slice(previousPageStartIndex, previousPageEndIndex) || [];
      visibleCards = previousPageCards
        .slice(-remainingCardsNeeded)
        .concat(visibleCards);
    }

    return visibleCards.map((card: CardProps, index: number) => (
      <Card
        key={index}
        movieId={card.id}
        title={card.title}
        poster_path={card.poster_path}
        rate={card.rating}
      />
    ));
  }

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  return (
    <div className="card-section-container">
      <div className="card-section-top">
        <div className="title-container">
          <Link className="section-title" to="#">
            {dot && <img src={dot} className="dot-icon" />}
            {title}
          </Link>
          <div className="section-subtitle">{subtitle}</div>
        </div>
        <div className="carousel-controls">
          <button
            className="prev"
            onClick={handlePrevClick}
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <button
            className="next"
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1 || totalPages === 1}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="cards" ref={cardSectionRef}>
        {renderCards(currentPage, numberOfVisibleCards, cards)}
      </div>
    </div>
  );
}

export default CardSection;
