import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Collection from "../../Components/Collection";

const Container = styled.div`
  padding: 20px 20px 0px 20px;
`;

const CollectionPresenter = ({ result, loading, error }) => (
  <>
    <Helmet>
      <title> Collection | Sooflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {result && (
          <Section title="Collection List">
            {result.parts.map((result1) => (
              <Collection
                key={result1.id}
                id={result1.id}
                title={result1.original_title}
                imageUrl={result1.poster_path}
                year={
                  result1.release_date && result1.release_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

CollectionPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CollectionPresenter;
