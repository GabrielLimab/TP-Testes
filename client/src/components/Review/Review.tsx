import GlobalStyle from "../Styles/Font";
import {
  ReviewCard,
  ReviewContent,
  ReviewHeader,
  ReviewRating,
  ReviewTitle,
  ReviewUsername,
  ReviewsContainer,
  StarIcon,
} from "./Review.style.ts";

interface ReviewProps {
  rating?: number;
  movieName: string;
  name: string;
  content: string;
}

const Review = ({ rating, movieName, name, content }: ReviewProps) => {
  return (
    <ReviewsContainer>
      <GlobalStyle />
      <ReviewCard>
        <ReviewHeader>
          <ReviewTitle>{movieName}</ReviewTitle>
          <ReviewRating>
            <StarIcon>⭐</StarIcon> {rating ? rating : "- "}/ 10
          </ReviewRating>
          <ReviewUsername>{name}</ReviewUsername>
        </ReviewHeader>
        <ReviewContent>{content}</ReviewContent>
      </ReviewCard>
    </ReviewsContainer>
  );
};

export default Review;
