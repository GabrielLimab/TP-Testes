import { Outlet } from "react-router-dom";
import CardSection from "../CardSection/CardSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="mainContainer">
      <div className="background"></div>
      <div className="foreground">
        <div className="card-sections">
          <CardSection
            title={"Principais escolhas pra você"}
            subtitle={"Séries e filmes que você vai gostar"}
            type={"for-you"}
          />
          <CardSection
            title={"Melhores filmes"}
            subtitle={"Os filmes mais bem avaliados de todos os tempos"}
            type={"top-rated"}
          />
          <CardSection
            title={"Em cartaz"}
            subtitle={"Filmes que estão em cartaz nos cinemas"}
            type={"now-playing"}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
