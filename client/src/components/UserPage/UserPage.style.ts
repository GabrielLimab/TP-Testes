import styled from "styled-components";

export const UserPageContainer = styled.div`
    background-color: #1A1A1A;
    display: grid;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 106px;
`

export const UserInfoContainer = styled.div`
    display: flex;
    gap: 82px;
    align-items: start;
    padding-top: 16px;
    padding-bottom: 65px;
    justify-content: space-between;
`

export const UserNameAndImage = styled.div`
    display: grid;
    align-items: start;
    gap: 24px;
`

export const UserName = styled.h1`
    font-size: 48px;
    color: #C3C3C3;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin: 0;
`

export const UserImage = styled.img`
    width: 268px;  /* ajuste o tamanho conforme necessário */
    height: 268px;  /* ajuste o tamanho conforme necessário */
    border-radius: 50%;
    object-fit: cover;
`
export const UserInfo = styled.div`
    display: grid;
    gap: 15px;
    justify-content: space-between;
    align-items: start;
    margin: 0px;
`

export const UserInfoCard = styled.div`
    display: grid;
    gap: 0px;
`

export const InfoTitle = styled.h2`
    font-size: 18px;
    color: #797979;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: normal;
    margin: 0;
`

export const InfoTagsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 9px;
`

export const InfoTag = styled.span`
    background-color: #A3A3A326;
    color: #C3C3C3;    
    padding: 8px 18px;
    border-radius: 45px;
    display: inline-block;
    font-size: 16px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
`

export const FollowButtonContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 304px;
`

export const ButtonContainer = styled.button`
    background-color: #A3A3A30D;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: none;
    width: 116px;
    height: 42px;

    img { 
        margin: 0;
    }

    a {
        color: #C3C3C3;
        font-family: "Roboto", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        margin: 0;
    }
`   

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    padding-bottom: 30px;

    h1 {
        font-size: 28px;
        color: #C3C3C3;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
        margin: 0;
    }
`

export const Reviews = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 19px;
    align-items: center;
`

export const ReviewCard = styled.div`
    display: grid;
    justify-content: space-between;
    gap: 14px;
    background-color: #A3A3A30D;
    border-radius: 15px;
    width: 600px;
    height: 432px;
`

export const ReviewContent = styled.div`
    display: grid;
    justify-content: space-between;
    gap: 14px;
    padding: 20px;
`

export const ReviewMark = styled.div`
    display: flex;
    align-items: center;
`

export const ReviewTitle = styled.span`
    color: #C3C3C3;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 20px;
    margin: 0px;
`

export const ReviewUserAndDate = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
`

export const ReviewUser = styled.span`
    color: #F3DD83;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    margin: 0px;
`
export const ReviewDate = styled.span`
    color: #C3C3C3;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    margin: 0px;
`

export const Dot = styled.span`
  display: inline-block;
  margin: 0px;
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
`;

export const ReviewText = styled.span`
    color: #C3C3C3;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 18px;
    margin: 0px;
`

export const ReviewButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    `