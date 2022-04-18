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

const GET_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
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
`;

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

const Product = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });

  const [products, setProducts] = useState([]);
  console.log("products-", products);

  useEffect(() => {
    // debugger;
    if (data) {
      console.log("data--", data);
      const { product } = data;

      setProducts(product);
      // console.log("products-", products);
    }
  }, [data]);

  return (
    <>
      <div>
        <h1>I am Product component</h1>
        <h1>{products ? products.product : null}</h1>
      </div>
    </>
  );
};

export default Product;
