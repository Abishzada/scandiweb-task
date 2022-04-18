import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Product from "./pages/products/[id]/[id]";
// import Category from "./pages/category/category";
import Category from "./pages/category/class";

function App() {
  // const a = useParams()
  // console.log('a--',a);
  return (
    <div>
      <h1>Hello</h1>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/categories" element={<Category />}></Route>
        {/* <Route path="/product" exact element={<Category />}></Route> */}
        <Route path="product/:id" element={<Product />}></Route>
      </Routes>
    </div>
  );
}

export default App;
