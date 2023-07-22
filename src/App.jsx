import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import TradeData from "./Components/TradeData";
import { UserStorage } from "./UserContext";
import "./App.css";
import "./CalendarCustom.css";

const App = () => {
  return (
    <HashRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/trading-archives/" element={<Home />} />
          <Route
            path="/trading-archives/trade-data"
            element={<TradeData />}
          ></Route>
        </Routes>
      </UserStorage>
    </HashRouter>
  );
};

export default App;
