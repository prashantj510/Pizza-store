//App.js

import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";



import Home from "./Components/Home";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Signup from "./Components/SignUp";

const App = () => {
  return (
      <div className="app">
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart"
                      element={<Cart />} />
                  <Route path="/Login"
                      element={<Login />} />
                  <Route path="/signup"
                      element={<Signup />} />
              </Routes>
          </Router>
      </div>
  )
}

export default App;
