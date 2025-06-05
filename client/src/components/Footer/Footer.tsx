// import { useState } from "react";
import { Link } from "react-router-dom";
import fbIcon from "../../assets/fbIcon.png";
import instaIcon from "../../assets/instaIcon.png";
import tiktokIcon from "../../assets/tiktokIcon.png";
import xIcon from "../../assets/xIcon.png";
import ytbIcon from "../../assets/ytbIcon.png";
import GlobalStyle from "../Styles/Font";
import { Button, ButtonContainer, FooterContainer, Icons, IconsAndPoweredBy, Links, TextLinks } from "./Footer.style";

const Footer = () => {
  return (
    <FooterContainer>
      <GlobalStyle />
      <ButtonContainer>
        <Button>Inscreva-se para uma experiência completa</Button>
      </ButtonContainer>
      <Links>
        <TextLinks>
          <a>Baixe o app Primeira Fila</a>
          <a>Termos e condições</a>
          <a>Política de Privacidade</a>
          <a>Sua escolha de privacidade em anúncios</a>
        </TextLinks>
        <IconsAndPoweredBy>
          <Icons>
            <Link to="/">
              <img src={tiktokIcon} height={30} width={26} alt="tiktokIcon"/>
            </Link>
            <Link to="/">
              <img src={xIcon} height={25} width={25} alt="xIcon"/>
            </Link>
            <Link to="/">
              <img src={ytbIcon} height={25} width={36} alt="ytbIcon"/>
            </Link>
            <Link to="/">
              <img src={instaIcon} height={29} width={29} alt="instaIcon"/>
            </Link>
            <Link to="/">
              <img src={fbIcon} height={30} width={30} alt="fbIcon"/>
            </Link>
          </Icons>
          <a>© Powered by Limagram.</a>
        </IconsAndPoweredBy>
      </Links>
    </FooterContainer>
  )
}

export default Footer;