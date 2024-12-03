import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSlidersH, faUsers, faBuilding, faCreditCard, faBox, faHandHoldingHeart, faStar, faChartBar, faCog, faSignOutAlt, faUserPlus, faUserEdit, faChevronLeft, faChevronRight, faChevronDown, faNewspaper, faListAlt, faTrophy, faCalendarAlt, faBullhorn, faFilm, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

function Sidebar({ onLogout, toggleSidebar, isSidebarOpen }) {
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  // Get current URL path

  const toggleCustomerMenu = () => {
    setIsCustomerOpen((prev) => !prev);
  };

  const toggleReportMenu = () => {
    setIsReportOpen((prev) => !prev);
  };

  // Logout function
  const logout = () => {
    localStorage.clear(); // Clear localStorage
    onLogout(); // Call the onLogout function passed via props
    navigate('/'); // Navigate to login page
  };

  const navigateToLink = (link) => {
    navigate(link);
  };

  // Check if the current URL matches the given link
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <Col xs={isSidebarOpen ? 12 : 3} md={isSidebarOpen ? 2 : 1} style={{ backgroundColor: '#fff', color: '#adb5bd', padding: '0.5rem', height: '100vh', overflowY: 'auto', transition: 'width 0.3s' }} className="no-scroll">
      {isSidebarOpen ? (
        <>
          {/* Logo Section */}
          <div style={{ borderBottom: '2px solid', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, textAlign: 'center' }}>
              <img src={logo} alt="LOGO" height="65px" width="100px" />
            </h2>
          </div>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faChevronLeft} onClick={toggleSidebar} />
            </div>

            <li className={`sidebar-item ${isActive('/Dashboard')}`} onClick={() => navigateToLink('/Dashboard')}>
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> <span>Dashboard</span>
            </li>

            <li className="sidebar-item" onClick={toggleCustomerMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faListAlt} /> <span style={{ marginLeft: '10px' }}>Categories</span>
              </div>
              <FontAwesomeIcon icon={isCustomerOpen ? faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
            </li>
            {isCustomerOpen && (
              <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li className={`sidebar-sub-item ${isActive('/Category/Show')}`} onClick={() => navigateToLink('/Category/Show')}>
                  <FontAwesomeIcon icon={faBuilding} /> <span>Show</span>
                </li>
                <li className={`sidebar-sub-item ${isActive('/Category/Event')}`} onClick={() => navigateToLink('/Category/Event')}>
                  <FontAwesomeIcon icon={faCalendarAlt} /> <span>Event</span>
                </li>
              </ul>
            )}

            <li className={`sidebar-item ${isActive('/DailyNews')}`} onClick={() => navigateToLink('/DailyNews')}>
              <FontAwesomeIcon icon={faNewspaper} className="icon" /> <span>Daily News</span>
            </li>

            <li className={`sidebar-item ${isActive('/Show')}`} onClick={() => navigateToLink('/Show')}>
              <FontAwesomeIcon icon={faBuilding} className="icon" /> <span>Show</span>
            </li>

            <li className={`sidebar-item ${isActive('/Contest')}`} onClick={() => navigateToLink('/Contest')}>
              <FontAwesomeIcon icon={faTrophy} className="icon" /> <span>Contest</span>
            </li>

            <li className={`sidebar-item ${isActive('/Event')}`} onClick={() => navigateToLink('/Event')}>
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <span>Event</span>
            </li>

            <li className={`sidebar-item ${isActive('/Advertisement')}`} onClick={() => navigateToLink('/Advertisement')}>
              <FontAwesomeIcon icon={faBullhorn} className="icon" /> <span>Advertisement</span>
            </li>

            <li className={`sidebar-item ${isActive('/Ticket')}`} onClick={() => navigateToLink('/Ticket')}>
              <FontAwesomeIcon icon={faTicket} className="icon" /> <span>Ticket</span>
            </li>

            <li className="sidebar-item" onClick={toggleReportMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faChartBar} className="icon" /> <span style={{ marginLeft: '10px' }}>Reports</span>
              </div>
              <FontAwesomeIcon icon={isReportOpen ? faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
            </li>
            {isReportOpen && (
              <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li className={`sidebar-sub-item ${isActive('/DailyNewsReport')}`} onClick={() => navigateToLink('/DailyNewsReport')} style={{ marginBottom: '1rem' }}>
                  <FontAwesomeIcon icon={faNewspaper} className="icon" /> <span>Daily News Report</span>
                </li>
                <li className={`sidebar-sub-item ${isActive('/ShowReport')}`} onClick={() => navigateToLink('/ShowReport')} style={{ marginBottom: '1rem' }}>
                  <FontAwesomeIcon icon={faFilm} className="icon" /> <span>Shows Report</span>
                </li>
                <li className={`sidebar-sub-item ${isActive('/ContestReport')}`} onClick={() => navigateToLink('/ContestReport')} style={{ marginBottom: '1rem' }}>
                  <FontAwesomeIcon icon={faTrophy} className="icon" /> <span>Contest Report</span>
                </li>
                <li className={`sidebar-sub-item ${isActive('/EventReport')}`} onClick={() => navigateToLink('/EventReport')} style={{ marginBottom: '1rem' }}>
                  <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <span>Event Report</span>
                </li>
              </ul>
            )}

            <li className="sidebar-item" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> <span>Logout</span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', borderBottom: '2px solid' }}>
          <img src={logo} alt="LOGO" height="65px" width="100px" />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faChevronLeft} onClick={toggleSidebar} />
              </div>

              <li className={`sidebar-item ${isActive('/Dashboard')}`} onClick={() => navigateToLink('/Dashboard')}>
                <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              </li>

              <li className="sidebar-item" onClick={toggleCustomerMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faListAlt} />
                </div>
                <FontAwesomeIcon icon={isCustomerOpen ? faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
              </li>
              {isCustomerOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li className={`sidebar-sub-item ${isActive('/Category/Show')}`} onClick={() => navigateToLink('/Category/Show')}>
                    <FontAwesomeIcon icon={faBuilding} />
                  </li>
                  <li className={`sidebar-sub-item ${isActive('/Category/Event')}`} onClick={() => navigateToLink('/Category/Event')}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </li>
                </ul>
              )}

              <li className={`sidebar-item ${isActive('/DailyNews')}`} onClick={() => navigateToLink('/DailyNews')}>
                <FontAwesomeIcon icon={faNewspaper} className="icon" />
              </li>

              <li className={`sidebar-item ${isActive('/Show')}`} onClick={() => navigateToLink('/Show')}>
                <FontAwesomeIcon icon={faBuilding} className="icon" />
              </li>

              <li className={`sidebar-item ${isActive('/Contest')}`} onClick={() => navigateToLink('/Contest')}>
                <FontAwesomeIcon icon={faTrophy} className="icon" />
              </li>

              <li className={`sidebar-item ${isActive('/Event')}`} onClick={() => navigateToLink('/Event')}>
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              </li>

              <li className={`sidebar-item ${isActive('/Advertisement')}`} onClick={() => navigateToLink('/Advertisement')}>
                <FontAwesomeIcon icon={faBullhorn} className="icon" />
              </li>

              <li className={`sidebar-item ${isActive('/Ticket')}`} onClick={() => navigateToLink('/Ticket')}>
                <FontAwesomeIcon icon={faTicket} className="icon" />
              </li>

              <li className="sidebar-item" onClick={toggleReportMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faChartBar} className="icon" />
                </div>
                <FontAwesomeIcon icon={isReportOpen ? faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
              </li>
              {isReportOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li className={`sidebar-sub-item ${isActive('/DailyNewsReport')}`} onClick={() => navigateToLink('/DailyNewsReport')} style={{ marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                  </li>
                  <li className={`sidebar-sub-item ${isActive('/ShowReport')}`} onClick={() => navigateToLink('/ShowReport')} style={{ marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={faFilm} className="icon" />
                  </li>
                  <li className={`sidebar-sub-item ${isActive('/ContestReport')}`} onClick={() => navigateToLink('/ContestReport')} style={{ marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={faTrophy} className="icon" />
                  </li>
                  <li className={`sidebar-sub-item ${isActive('/EventReport')}`} onClick={() => navigateToLink('/EventReport')} style={{ marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                  </li>
                </ul>
              )}

              <li className="sidebar-item" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              </li>
            </ul>
          </div>
        </>
      )}
    </Col>
  );
}

export default Sidebar;
