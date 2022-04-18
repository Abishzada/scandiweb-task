import React, { Component } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
const cache = new InMemoryCache();
import Category from "../../pages/category/class";

const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/",
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

export default graphql(GET_CATEGORY)(Category);
