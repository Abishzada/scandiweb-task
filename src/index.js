import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { createMemoryHistory } from 'history';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         product(id: "huarache-x-stussy-le") {
//           name
//           inStock
//           gallery
//           description
//           category
//           attributes {
//             id
//             name
//             type
//             items {
//               displayValue
//               value
//               id
//             }
//           }
//           prices {
//             currency {
//               label
//               symbol
//             }
//             amount
//           }
//           brand
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// const SCANDIWEB = gql`
//   query GetScandiweb {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;

const root = ReactDOM.createRoot(document.getElementById("root"));

const history = createMemoryHistory();
const route = "product";
history.push(route);

root.render(
  <BrowserRouter basename="/">
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
