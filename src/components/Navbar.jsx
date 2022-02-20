import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, FundOutlined } from "@ant-design/icons";
// import icons
//import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Typography.Title level={2} className='logo'>
          <Link to='/'>League Tracker</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark'>
        <Menu.Item icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to='/Tracker'>Tracker</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
