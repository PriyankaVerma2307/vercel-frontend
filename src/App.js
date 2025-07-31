import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import DataEntry from "./components/Data/DataEntry";
import BhajanList from "./components/Bhjan/BhajanList";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="data-entry" element={<DataEntry />} />
          <Route path="bhajan-list" element={<BhajanList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
