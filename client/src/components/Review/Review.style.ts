import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  padding: 20px;
  background-color: #1a1a1a;
  color: #fff;
`;

export const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  border-radius: 8px;
  gap: 2em;
  padding: 20px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const ReviewRating = styled.div`
  font-size: 1.2em;
`;

export const ReviewTitle = styled.p`
  font-size: 1.5em;
  margin: 0;
  padding: 0;
`;

export const ReviewUsername = styled.div`
  font-weight: bold;
`;

export const ReviewContent = styled.div`
  font-size: 1em;
`;

export const StarIcon = styled.span`
  color: gold;
  margin-right: 5px;
`;