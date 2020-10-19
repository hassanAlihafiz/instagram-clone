import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Model from "./components/Model";
import Stories from "./components/Stories";
import Create from "./components/Create";
import Post from "./components/Post";
import Sidebar from "./components/Sidebar";
import Context from "./Global/Context";
function App() {
  return (
    <Context>
      <Navbar />
      <div className="container">
        <Stories />
        <Create />
        <Post />
        <Sidebar />
      </div>
      <Model />
    </Context>
  );
}

export default App;
