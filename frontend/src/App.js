import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";





function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
  }, [])


  return (
    <Router>
      <Header />
      {
        isAuthenticated && <UserOptions user={user} />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        {/* <ProtectedRoute path="/account" element={<Profile />} /> */}
        <Route path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="/me/update"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
