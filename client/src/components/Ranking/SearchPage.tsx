import { useEffect, useState } from "react";
import StarIcon from "../../assets/StarIcon.png";
import { getMovieByName } from "../../services/movie";
import { MovieProps } from "../../types/MovieProps";
import { Dot, InfoTag } from "../UserPage/UserPage.style";
import { useSearch } from "./SearchContext";
import {
  ButtonContainer,
  FirstTitle,
  HeaderTitle,
  InnerContent,
  ItemDescription,
  ItemOtherInformation,
  ItemOtherInformationContent,
  ItemOtherInformationTitle,
  ItemTags,
  ItemTitle,
  ItemTitleAndIcons,
  ItemYear,
  ItemYearDuration,
  MainTitle,
  NoPointerEventsWrapper,
  ReviewMark,
  SearchContent,
  SearchContentContainer,
  SearchHeader,
  SearchItems,
  SearchItemsCard,
  SearchItemsContent,
  SearchItemsInfo,
  SearchPageContainer,
} from "./SearchPage.style";
import { Link } from "react-router-dom";

async function getMovie(movieName: string) {
  const response = await getMovieByName(movieName);
  return response;
}

const SearchPage = () => {
  const { searchTerm } = useSearch();
  const [movies, setMovies] = useState<MovieProps[]>([]);
  console.log("Rendenizou");
  useEffect(() => {
    console.log("UseEffect");
    const searchResult = async () => {
      try {
        const moviesResponse = await getMovie(searchTerm);
        setMovies(moviesResponse.data);
        console.log("Resposta da API:", moviesResponse);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    searchResult();
  }, [searchTerm]);

  if (movies.length === 0) {
    setMovies([
      {
        title: "Game of Thrones",
        overview:
          "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        release_date: "2011-04-17",
        vote_average: 8.4,
        vote_count: 14000,
        popularity: 1000,
        poster_path:
          "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      },
      {
        title: "The Imitation Game",
        overview:
          "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians.",
        release_date: "2014-11-14",
        vote_average: 8,
        vote_count: 10000,
        popularity: 900,
        poster_path:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bwWCFjhwrs5my4FUoeWdTa2GYlB.jpg",
      },
      {
        title: "Geralds Game",
        overview:
          "A woman accidentally kills her husband during a kinky game. Handcuffed to her bed with no hope of rescue, she begins hearing voices and seeing strange visions.",
        release_date: "2017-09-29",
        vote_average: 6.6,
        vote_count: 5000,
        popularity: 800,
        poster_path:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kYFyeWz6AfKq9e3PEY2GREZ39Ay.jpg",
      },
      {
        title: "The Game",
        overview:
          "After a wealthy banker is given an opportunity to participate in a mysterious game, his life is turned upside down when he becomes unable to distinguish between the game and reality.",
        release_date: "1997-09-12",
        vote_average: 7.8,
        vote_count: 8000,
        popularity: 700,
        poster_path:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/99SiLFwUfYObbUtgKWOKpAg4LlY.jpg",
      },
    ]);
  }

  return (
    <SearchPageContainer>
      <SearchHeader>
        <HeaderTitle>
          <FirstTitle>Filmes</FirstTitle>
          <MainTitle>
            <Dot />
            <span>Busca por {searchTerm}</span>
          </MainTitle>
        </HeaderTitle>
        <ButtonContainer>
          <a>Compartilhar</a>
          {/* <img src={}/> */}
        </ButtonContainer>
      </SearchHeader>
      <SearchContentContainer>
        {/* <Filters>

                </Filters> */}
        <SearchContent>
          {/* <SearchContentButton>
                        <ButtonContainer>
                            <a>Ordenar por </a>
                            <img src={}/>
                        </ButtonContainer>
                    </SearchContentButton> */}
          <SearchItems>
            {movies.map((movie: MovieProps) => (
              <Link to={`/movies/${movie.id}`}>
                <SearchItemsCard>
                  <InnerContent>
                    <NoPointerEventsWrapper>
                      <SearchItemsContent>
                        <img
                          src={movie.poster_path}
                          alt="moviePoster"
                          height={194}
                          width={126}
                        />
                        <SearchItemsInfo>
                          <ItemTitleAndIcons>
                            <ItemTitle>{movie.title}</ItemTitle>
                            <ReviewMark>
                              <img
                                src={StarIcon}
                                alt="StarIcon"
                                width={24}
                                height={24}
                                style={{ paddingBottom: 3 }}
                              />
                              <span style={{ color: "yellow" }}>
                                {movie.vote_average.toFixed(1)}
                              </span>
                              <span>/10</span>
                            </ReviewMark>
                          </ItemTitleAndIcons>
                          <ItemYearDuration>
                            <ItemYear>
                              {movie.release_date.slice(0, 4)}
                            </ItemYear>
                          </ItemYearDuration>
                          <ItemTags>
                            <InfoTag>Drama</InfoTag>
                            <InfoTag>Aventura</InfoTag>
                            <InfoTag>Fantasia</InfoTag>
                          </ItemTags>
                          <ItemDescription>{movie.overview}</ItemDescription>
                          <ItemOtherInformation>
                            <ItemOtherInformationTitle>
                              Votes:
                            </ItemOtherInformationTitle>
                            <ItemOtherInformationContent>
                              {movie.vote_count}
                            </ItemOtherInformationContent>
                          </ItemOtherInformation>
                        </SearchItemsInfo>
                      </SearchItemsContent>
                    </NoPointerEventsWrapper>
                  </InnerContent>
                </SearchItemsCard>
              </Link>
            ))}
          </SearchItems>
        </SearchContent>
      </SearchContentContainer>
    </SearchPageContainer>
  );
};

export default SearchPage;
