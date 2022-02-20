import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { Navbar, Homepage, Tracker } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route exact path='/tracker' element={<Tracker />} />
            </Routes>
          </div>
        </Layout>
      
      <div className='footer'>
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
              LoLTracker <br />
              All rights reserved
          </Typography.Title>
          <Space>
              <Link to="/">Home</Link>
              <Link to="/Tracker">Tracker</Link>
          </Space>

      </div>
      </div>
    </div>
  );
};

export default App;
