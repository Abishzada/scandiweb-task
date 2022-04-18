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
// import { graphql } from "@apollo/client/react/hoc";

const cache = new InMemoryCache();

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

export default class Category extends Component {
  constructor(props) {
    super(props);
    // console.log("props-", props);
    this.state = {
      categories: [],
    };
    console.log("this state--", this.state);
  }
  componentDidMount = async () => {
    // this.getCategoryData();
    const result = await client
      .query({ query: GET_CATEGORY })
      .then((result) => result.data)
      .then((response) => console.log("----", response))
      .catch((error) => console.log(error));
    // this.setState({ categories: response });
  };
  // getCategoryData = () => {
  //   client
  //     .query({ query: GET_CATEGORY })
  //     .then((result) => console.log(result.data))
  //     .catch((error) => console.log(error));
  // };

  render() {
    return <div>CategoryClass</div>;
  }
}

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   cache: cache,
//   uri: "http://localhost:4000/",
// });
// const GET_CATEGORY = gql`
//   query {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         description
//         category
//         attributes {
//           id
//           name
//           type
//           items {
//             displayValue
//             value
//             id
//           }
//         }
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//         brand
//       }
//     }
//   }
// `;

// client.query(GET_CATEGORY).then((result) => console.log(result));

// graphql(GET_CATEGORY)(Category);
