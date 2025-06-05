import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-icon.png";
import user from "../../assets/user.png";
import vector from "../../assets/vector.png";
import GlobalStyle from "../Styles/Font";

import { ChangeEvent, FormEvent, useState } from "react";
import { logout } from "../../services/authenticate";
import { useSearch } from "../Ranking/SearchContext";
import {
  HeaderContainer,
  HeaderContent,
  LeftHeader,
  Logo,
  RightButtons,
  RightButtonsText,
  SearchBar,
  SearchIcon,
  SearchInput,
  StyledLink,
  UserIcon,
  VectorIcon,
} from "./Header.style";

const Header = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const { setSearchTerm } = useSearch();

  const handleLogout = async () => {
    await logout().catch((err) => {
      console.log(err);
      throw err;
    });

    localStorage.removeItem("token");

    navigate("/auth");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchText.trim()) {
      setSearchTerm(searchText);
      navigate(`/search?query=${searchText}`);
    }
  };
  return (
    <HeaderContainer>
      <GlobalStyle />
      <HeaderContent>
        <LeftHeader>
          <StyledLink to="/">
            <Logo src={logo} alt="logo" />
          </StyledLink>
          <StyledLink to="/">Filmes</StyledLink>
          <StyledLink to="/contact">Resenhas</StyledLink>
        </LeftHeader>
        <form onSubmit={handleSearchSubmit}>
          <SearchBar>
            <SearchInput
              className="search-input"
              type="text"
              placeholder="Buscar Primeira Fila"
              onChange={handleSearchChange}
            />
            <SearchIcon type="submit">
              <img src={search} alt="search" />
            </SearchIcon>
          </SearchBar>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RightButtons>
            <VectorIcon src={vector} alt="vector" />
            <StyledLink to="/minha-lista" className="ok">
              <RightButtonsText>Minha lista</RightButtonsText>
            </StyledLink>
          </RightButtons>
          <RightButtons>
            <UserIcon src={user} alt="user" />
            <StyledLink to="/user" className="ok">
              <RightButtonsText>Usuário</RightButtonsText>
            </StyledLink>
          </RightButtons>
          <RightButtons>
            <StyledLink to="/auth" onClick={handleLogout} className="logout">
              <RightButtonsText>Sair</RightButtonsText>
            </StyledLink>
          </RightButtons>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
