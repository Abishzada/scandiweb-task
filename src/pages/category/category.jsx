import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_CATEGORY = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const Category = () => {
  const [category, setCategory] = useState();

  const { loading, error, data } = useQuery(GET_CATEGORY);

  useEffect(() => {
    if (data) {
      const { categories } = data;
      setCategory(data);
    }
  }, [data]);

  return <h1>I am Category page</h1>;
};

export default Category;
