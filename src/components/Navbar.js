import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import "../App.css";
import { ContextProvider } from "../Global/Context";
const Navbar = () => {
  const { model, openModel, user, loader, logoutUser } = React.useContext(
    ContextProvider
  );

  const openForms = () => {
    openModel();
  };
  const logout = () => {
    logoutUser();
  };
  const checkUserLogin = () => {
    return !loader && user ? (
      <li>
        {user.displayName}/<span onClick={logout}>Logout</span>
      </li>
    ) : (
      <li onClick={() => openForms()}>Register/Login</li>
    );
  };
  return (
    <div className="navbar">
      <div className="navbar__first">
        <div className="navbar__first-logo">
          <img src={require("../images/instagramLogo.png")} alt="" />
        </div>
      </div>
      <div className="navbar__middle">
        <div className="navbar__middle-search">
          <input type="text" className="navbar__search" placeholder="Search" />
          <SearchIcon className="searchIcon" />
        </div>
      </div>
      <div className="navbar__last">
        <li>
          <HomeIcon className="navbar__icons" />
        </li>
        <li>
          <PostAddIcon className="navbar__icons" />
        </li>
        <li>
          <AddAlertIcon className="navbar__icons" />
        </li>
        <li>
          <FavoriteIcon className="navbar__icons" />
        </li>
        {checkUserLogin()}
      </div>
    </div>
  );
};
export default Navbar;
