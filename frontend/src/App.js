import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/layout/Home/Home.js";


function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])


  return (
    <Router>
      <Header />
      <Routes>
        <Route extact path="/" Component={Home} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
