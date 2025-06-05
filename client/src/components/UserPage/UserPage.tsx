import {
  ButtonContainer,
  FollowButtonContainer,
  InfoTag,
  InfoTagsContainer,
  InfoTitle,
  ReviewButtons,
  ReviewCard,
  ReviewContent,
  ReviewHeader,
  ReviewMark,
  ReviewText,
  Reviews,
  UserImage,
  UserInfo,
  UserInfoCard,
  UserInfoContainer,
  UserName,
  UserNameAndImage,
  UserPageContainer,
} from "./UserPage.style";
import johnSnow from "../../assets/johnSnow.jpg";
import AddIcon from "../../assets/AddIcon.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "../../assets/StarIcon.png";
import LikeIcon from "../../assets/LikeIcon.svg";
import DislikeIcon from "../../assets/DislikeIcon.svg";
import { getReviewsByUser } from "../../services/movie";
import { useState, useEffect } from "react";

const UserPage = () => {
  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    const searchResult = async () => {
      try {
        const reviewsResponse = await getReviewsByUser();
        console.log(reviewsResponse);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    searchResult();
  }, []);

  return (
    <UserPageContainer>
      <div
        className="background"
        style={{
          background: "rgba(157, 139, 248, 0.498)",
          filter: "blur(18em)",
          borderRadius: "52px",
          position: "absolute",
          width: "100%",
          height: "20%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "0",
          top: "20%",
          left: "0",
          opacity: "0.5",
          pointerEvents: "none",
          justifyContent: "center",
        }}
      />
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#A3A3A3", // Mude a cor aqui
          margin: "20px 0",
        }}
      />
      <UserInfoContainer>
        <UserNameAndImage>
          <UserName>John Snow</UserName>
          <UserImage src={johnSnow} alt="userPhoto" />
        </UserNameAndImage>
        <UserInfo>
          <UserInfoCard>
            <InfoTitle>Gêneros favoritos</InfoTitle>
            <InfoTagsContainer>
              <InfoTag>Drama</InfoTag>
              <InfoTag>Aventura</InfoTag>
              <InfoTag>Comédia</InfoTag>
            </InfoTagsContainer>
          </UserInfoCard>
          <UserInfoCard>
            <InfoTitle>Número de resenhas</InfoTitle>
            <InfoTagsContainer>
              <InfoTag>77</InfoTag>
            </InfoTagsContainer>
          </UserInfoCard>
          <UserInfoCard>
            <InfoTitle>Filmes assistidos</InfoTitle>
            <InfoTagsContainer>
              <InfoTag>52</InfoTag>
            </InfoTagsContainer>
          </UserInfoCard>
          <UserInfoCard>
            <InfoTitle>Séries assistidas</InfoTitle>
            <InfoTagsContainer>
              <InfoTag>35</InfoTag>
            </InfoTagsContainer>
          </UserInfoCard>
        </UserInfo>
        <FollowButtonContainer>
          <ButtonContainer>
            <img src={AddIcon} alt="addIcon" width={24} height={24} />
            <a>Seguir</a>
          </ButtonContainer>
        </FollowButtonContainer>
      </UserInfoContainer>
      <ReviewHeader>
        <h1>Resenhas</h1>
        <ButtonContainer>
          <a>Ver todas</a>
          <ArrowForwardIosIcon
            style={{ color: "white" }}
            width={8}
            height={5}
          />
        </ButtonContainer>
      </ReviewHeader>
      <Reviews>
        {reviews
          .map((review: any) => (
            <ReviewCard>
              <ReviewContent>
                <ReviewMark>
                  <img src={StarIcon} alt="StarIcon" />
                  <span style={{ color: "yellow" }}>{review.rating}</span>
                  <span>/10</span>
                </ReviewMark>
                <ReviewText>{review.review}</ReviewText>
                <ReviewButtons>
                  <ButtonContainer>
                    <img src={LikeIcon} alt="LikeIcon" />
                  </ButtonContainer>
                  <ButtonContainer>
                    <img src={DislikeIcon} alt="DislikeIcon" />
                  </ButtonContainer>
                </ReviewButtons>
              </ReviewContent>
            </ReviewCard>
          ))
          .slice(0, 2)}
      </Reviews>
    </UserPageContainer>
  );
};

export default UserPage;
