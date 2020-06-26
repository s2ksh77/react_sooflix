import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { collectionApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isCollection: pathname.includes("/collection/"),
    };
  }
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isCollection } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isCollection) {
        ({ data: result } = await collectionApi.collectionDetail(parsedId));
      } else {
      }
    } catch {
      this.setState({ error: "can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return (
      <CollectionPresenter
        result={result}
        loading={loading}
        error={error}
      ></CollectionPresenter>
    );
  }
}
