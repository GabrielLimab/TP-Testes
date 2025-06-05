import styled from "styled-components";

export const SearchPageContainer = styled.div`
    display: grid;
    justify-content: center;
    gap: 54px;
    align-items: center;
    background-color: #1A1A1A;
`

export const SearchHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 800px;
    padding-top: 38px;
`

export const HeaderTitle = styled.div`
    display: grid;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
`
export const FirstTitle = styled.span`
    color: #C3C3C3;
    font-size: 18px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
`

export const MainTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;

    span {
        color: #C3C3C3;
        font-size: 28px;
        font-style: normal;
        font-family: "Roboto", sans-serif;
    }
`

export const Dot = styled.span`
  display: inline-block;
  margin: 0px;
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
`;

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

export const SearchContentContainer = styled.div`
    display: flex;
    justify-content: start;
    gap: 34px;
    align-items: center;
    padding-top: 0px;
    padding-bottom: 54px;
`

export const Filters = styled.div`
    display: grid;
    justify-content: start;
    gap: 24px;
    align-items: center;
`

export const SearchContent = styled.div`
    display: grid;
    align-items: center;
    justify-content: start;
    gap: 27px;
`

export const SearchContentButton = styled.div`
    display: flex;
    justify-content: space-between;
    // gap: 24px;
    align-items: center;
`
export const SearchItems = styled.div`
    display: grid;
    justify-content: start;
    gap: 37px;
    align-items: center;
`

export const SearchItemsCard = styled.div`
    background-color: #A3A3A30D;
    border-radius: 15px;
    width: 1137px;
    // height: 355px;
    :hover {
        background-color: #A3A3A30D;
        border-radius: 15px;
    }
`

export const InnerContent = styled.div`
    position: relative;
    pointer-events: all;
`;

export const NoPointerEventsWrapper = styled.div`
    pointer-events: none;
`;

export const SearchItemsContent = styled.div`
    display: flex;
    justify-content: start;
    gap: 19px;
    align-items: center;
    padding: 20px;

    img {
        margin: 0;
    }
`

export const SearchItemsInfo = styled.div`
    display: grid;
    justify-content: start;
    align-items: center;
    gap: 14px;
`
export const ItemTitleAndIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* gap: 730px; */
`

export const ItemTitle = styled.span`
    color: #C3C3C3;
    font-size: 18px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    margin: 0;
    max-width: 800px;
` 

export const ReviewMark = styled.div`
    display: flex;
    align-items: center;
`

export const ItemYearDuration = styled.div`
    display: flex;
    justify-content: start;
    gap: 10px;
    align-items: center;
`

export const ItemYear = styled.span`
    color: #C3C3C3;
    font-size: 16px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    margin: 0;
`

export const ItemTags = styled.div`
    display: flex;
    justify-content: start;
    gap: 10px;
    align-items: center;
`

export const ItemTag = styled.span`
    background-color: #A3A3A326;
    color: #C3C3C3;    
    padding: 3.5px 18px;
    border-radius: 45px;
    display: inline-block;
    font-size: 16px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
`

export const ItemDescription = styled.span`
    color: #C3C3C3;
    font-size: 16px;
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    margin: 0;
    width: 952px;
`

export const ItemOtherInformation = styled.div`
    display: flex;
    justify-content: start;
    gap: 10px;
    align-items: center;
`

export const ItemOtherInformationTitle = styled.span`
    color: #C3C3C3;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    margin: 0;
`

export const ItemOtherInformationContent = styled.span`
    color: #D8C882;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
    margin: 0;
`
