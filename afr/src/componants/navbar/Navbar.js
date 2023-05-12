import React from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {DarkModeContext} from "../../context/darkModeContext"
import { useContext } from "react";
import './navbar.scss'
const Navbar = () => {
  const {darkMode, toggle} = useContext((DarkModeContext))
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Novasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src="https://media.istockphoto.com/id/1353767191/photo/portrait-of-positive-cheerful-fashionable-woman-in-casual-t-shirt-for-mock-up-isolated-on.jpg?s=612x612&w=0&k=20&c=im5xToG7dZvDZLAiwoWiFujNUlIVx2PTfp3w0ZcBhSI="/>
          <span>fozi yimam</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
