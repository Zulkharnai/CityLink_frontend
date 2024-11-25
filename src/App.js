import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './ShareComponents/Sidebar';
import NavbarComponent from './ShareComponents/NavbarComponent';
import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CategoryShow from './Components/Category.Show.js';
import CategoryEvent from './Components/Category.Event.js';
import Show from './Components/Show.js';
import Advertisement from './Components/Advertisement.js';
import Contest from './Components/Contest.js';
import Event from './Components/Event';
import DailyNewsReport from './Components/DailyNewsReport.js';
import ShowReport from './Components/ShowReport.js';
import EventReport from './Components/EventReport.js';
import ContestReport from './Components/ContestReport.js';
import Notification from './Components/Notification';
import Profile from './Components/Profile';
import DailyNews from './Components/DailyNews.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to handle login (you can enhance this with actual logic)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(()=>{

    let isLoggedin = localStorage.getItem('authorization')

    if(isLoggedin&&isLoggedin.length){

      setIsAuthenticated(true)

    }

  },[])

  return (
    <>

      <Container fluid style={{ height: '100vh', backgroundColor: '#F4F7FF' }}>
        <Row style={{ height: '100%' }}>
          {isAuthenticated && <Sidebar onLogout={handleLogout} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}

          <Col xs={12} md={isAuthenticated ? isSidebarOpen ? 10 : 11 : 12} style={{ padding: '0' }}>
            {isAuthenticated && <NavbarComponent onLogout={handleLogout} />}

            <div className='no-scroll' style={{
              overflowX: 'hidden',   // Hide horizontal scrollbar
              overflowY: 'auto',     // Enable vertical scrolling when necessary
              backgroundColor: '#F4F7FF',  // Background color
              // height: '660px'
            }}>
              <Routes>
                <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/Dashboard" />} />
                <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

                <Route path="/Category/Show" element={isAuthenticated ? <CategoryShow /> : <Navigate to="/" />} />
                <Route path="/Category/Event" element={isAuthenticated ? <CategoryEvent /> : <Navigate to="/" />} />
                <Route path="/DailyNews" element={isAuthenticated ? <DailyNews /> : <Navigate to="/" />} />
                <Route path="/Show" element={isAuthenticated ? <Show /> : <Navigate to="/" />} />
                <Route path="/Contest" element={isAuthenticated ? <Contest /> : <Navigate to="/" />} />
                <Route path="/Event" element={isAuthenticated ? <Event /> : <Navigate to="/" />} />
                <Route path="/Advertisement" element={isAuthenticated ? <Advertisement /> : <Navigate to="/" />} />
                <Route path="/Notification" element={isAuthenticated ? <Notification /> : <Navigate to="/" />} />
                <Route path="/Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />

                <Route path="/DailyNewsReport" element={isAuthenticated ? <DailyNewsReport /> : <Navigate to="/" />} />
                <Route path="/ShowReport" element={isAuthenticated ? <ShowReport /> : <Navigate to="/" />} />
                <Route path="/ContestReport" element={isAuthenticated ? <ContestReport /> : <Navigate to="/" />} />
                <Route path="/EventReport" element={isAuthenticated ? <EventReport /> : <Navigate to="/" />} />

              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
