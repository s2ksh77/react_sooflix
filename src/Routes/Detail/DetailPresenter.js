import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Collection from "../../Components/Collection";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const LinkButton = styled.span`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid #000000;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 12px;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  margin: 0 10px;
`;
const Link = styled.a`
  display: block;
`;

const DetailTabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 25px;
  margin-top: 25px;
  height: auto;
`;

const Youtube = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Countries = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CollectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 25px;
  margin-top: 25px;
  height: auto;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title> Loading | Sooflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Sooflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>∥</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} minute
            </Item>
            <Divider>∥</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <LinkButton>
              <Link
                href={
                  result.imdb_id
                    ? `https://www.imdb.com/title/${result.imdb_id}`
                    : `${result.homepage}`
                }
                target="_blank"
              >
                IMDB
              </Link>
            </LinkButton>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <DetailTabContainer>
            <Youtube bgUrl={require("../../assets/youtube-brands.png")}>
              <Link
                href={
                  result.videos
                    ? `https://www.youtube.com/watch?v=${result.videos.results[0].key}`
                    : `https://www.youtube.com/watch?v=${result.videos.results[0].key}`
                }
                target="_blank"
                style={{ height: "100%" }}
              />
            </Youtube>
            <Company style={{ lineHeight: "2" }}>
              {result.production_companies.length > 0
                ? result.production_companies.map((company) => company.name)
                : ""}
            </Company>
            <Countries>
              {result.production_countries
                ? result.production_countries[0].name
                : ""}
            </Countries>
          </DetailTabContainer>
          <CollectionContainer>
            {result.belongs_to_collection ? (
              <Collection
                key={result.belongs_to_collection.id}
                id={result.belongs_to_collection.id}
                title={result.belongs_to_collection.name}
                year={result.belongs_to_collection.release_date}
                imageUrl={result.belongs_to_collection.poster_path}
                isCollection={true}
              />
            ) : (
              result.seasons &&
              result.seasons.map((season) => (
                <Collection
                  key={season.id}
                  id={season.id}
                  title={season.name}
                  year={season.air_date}
                  imageUrl={season.poster_path}
                  isCollection={true}
                />
              ))
            )}
          </CollectionContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
