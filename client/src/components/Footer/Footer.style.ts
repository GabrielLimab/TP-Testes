import styled from "styled-components";

export const FooterContainer = styled.div `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  display: grid;
  background-color: #080808;
  align-items: center;
  justify-content: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 63px;
  justify-content: center;

`

export const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  background-color: #F5C518;
  font-weight: 400;
  color: #121212; 
  border: none; 
  padding: 8px 18px;
  font-size: 16px; 
  border-radius: 10px;
  cursor: pointer; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  /* &:hover {
    background-color: #e0a800;
  } */
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 213px;
  padding-bottom: 106px;
`

export const TextLinks = styled.div`
  display: grid;
  justify-content: space-between;
  gap: 10px;
`

export const IconsAndPoweredBy = styled.div`
  display: grid;
  justify-content: space-between; 
  gap: 115px;

  
`
export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 27px;
`

