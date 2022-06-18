import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createMemoryHistory } from "history";
import ApiContextData from "./context/api.context";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const history = createMemoryHistory();
const route = "product";
history.push(route);

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      {/* <React.StrictMode> */}
        <ApiContextData>
            <App />
        </ApiContextData>
      {/* </React.StrictMode> */}
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
