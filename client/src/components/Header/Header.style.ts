import { Link } from 'react-router-dom';
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  background-color: #080808;
  justify-content: space-around;
  align-items: center;
  height: 73px;
  max-width: 100vw;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  color: white;
  height: 39px;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const StyledLink = styled(Link)`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #c3c3c3;
  text-decoration: none;
  padding: 8px 10px;
  align-self: center;

  &:hover {
    color: #fff;
  }
`;

export const Logo = styled.img`
  height: 49px;
  width: 49px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #1b1b1b;
  border-radius: 10px;
  padding: 4px 18px;
`;

export const CategorySelect = styled.select`
  background-color: #1b1b1b;
  color: #c3c3c3;
  border: none;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;

  &:focus {
    outline: none;
  }
`;

export const SearchInput = styled.input.attrs({
  'data-testid': 'search-input'
})`
  flex: 1;
  background-color: #1b1b1b;
  color: #797979;
  border: none;
  padding: 8px;
  border-radius: 0;
  outline: none;
  font-family: "Roboto", sans-serif;
  text-align: left;
`;

export const SearchIcon = styled.button`
  background: none;
  padding-top: 5px;
  border: none;
  cursor: pointer;
  img{ 
    height: 24px;
    width: 24px;
  }
`;

export const RightButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
`;

export const VectorIcon = styled.img`
  height: 18px;
  width: 14px;
`;

export const UserIcon = styled.img`
  height: 22px;
  width: 22px;
`;

export const RightButtonsText = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #c3c3c3;
  text-decoration: none;
  padding-right: 10px;
  padding-top: 2.5px;
  padding-bottom: 2.5px;
  margin: 0px
`;