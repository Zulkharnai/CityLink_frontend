import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSlidersH, faUsers, faBuilding, faCreditCard, faBox, faHandHoldingHeart, faStar, faChartBar, faCog, faSignOutAlt, faUserPlus, faUserEdit, faChevronLeft, faChevronRight, faChevronDown, faUser, faNewspaper, faListAlt, faTrophy, faCalendarAlt, faBullhorn, faBell, faFilm } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onLogout, toggleSidebar, isSidebarOpen }) {

  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleCustomerMenu = () => {
    setIsCustomerOpen(prev => !prev);
  };

  const toggleBillMenu = () => {
    setIsBillOpen(prev => !prev);
  };

  const toggleReportMenu = () => {
    setIsReportOpen(prev => !prev);
  };

  const navigate = useNavigate();

  const logout = () => {
    onLogout();
  }

  const NavigateToLink = (link) => {
    console.log(link)
    navigate(link)
  }

  return (
    <>
      {/* Sidebar Column */}

      <Col xs={isSidebarOpen ? 12 : 3} md={isSidebarOpen ? 2 : 1} style={{ backgroundColor: '#fff', color: '#adb5bd', padding: '0.5rem', height: '100vh', overflowY: 'auto', transition: 'width 0.3s' }} className='no-scroll'>
        {
          isSidebarOpen ? <>

            {/* Logo Section */}
            <div style={{  padding: '0.8rem', borderBottom: '2px solid ',marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, textAlign: 'center' }}>MyLogo</h2>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faChevronLeft} onClick={toggleSidebar} />
              </div>

              <li className='sidebar-item active' onClick={() => NavigateToLink('/Dashboard')}>
                <FontAwesomeIcon icon={faTachometerAlt} className='icon' /> <span>Dashboard</span>
              </li>

              <li className='sidebar-item' onClick={toggleCustomerMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faListAlt} /> <span style={{ marginLeft: '10px' }}>Categories</span>
                </div>
                <FontAwesomeIcon icon={isCustomerOpen ? faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
              </li>
              {isCustomerOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li className='sidebar-sub-item' style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => { NavigateToLink('/Category/Show') }}>
                    <FontAwesomeIcon icon={faBuilding} /> <span>Show</span>
                  </li>
                  <li className='sidebar-sub-item' style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => { NavigateToLink('/Category/Event') }}>
                    <FontAwesomeIcon icon={faCalendarAlt} /> <span>Event</span>
                  </li>
                </ul>
              )}


              <li className='sidebar-item ' onClick={() => NavigateToLink('/DailyNews')}>
                <FontAwesomeIcon icon={faNewspaper} className='icon' /> <span>Daily News</span>
              </li>

              <li className='sidebar-item' onClick={() => { NavigateToLink('/Show') }}>
                <FontAwesomeIcon icon={faBuilding} className='icon' /> <span>Show</span>
              </li>

              <li className='sidebar-item' onClick={() => { NavigateToLink('/Contest') }}>
                <FontAwesomeIcon icon={faTrophy} className='icon' /> <span>Contest</span>
              </li>

              <li className='sidebar-item' onClick={() => { NavigateToLink('/Event') }}>
                <FontAwesomeIcon icon={faCalendarAlt} className='icon' /> <span>Event</span>
              </li>

              <li className='sidebar-item' onClick={() => { NavigateToLink('/Advertisement') }}>
                <FontAwesomeIcon icon={faBullhorn} className='icon' /> <span>Advertisement</span>
              </li>

              <li className='sidebar-item' onClick={() => { NavigateToLink('/Notification') }}>
                <FontAwesomeIcon icon={faBell} className='icon' /> <span>Notification</span>
              </li>

              <li className='sidebar-item' onClick={toggleReportMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faChartBar} className='icon' /> <span style={{ marginLeft: '10px' }}>Reports</span>
                </div>
                <FontAwesomeIcon icon={isReportOpen ?  faChevronDown : faChevronRight} style={{ marginLeft: '15px' }} />
              </li>
              {isReportOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li className='sidebar-sub-item' onClick={() => { NavigateToLink('/DailyNewsReport') }} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faNewspaper} className='icon' /> <span>Daily News Report</span>
                  </li>
                  <li className='sidebar-sub-item' onClick={() => { NavigateToLink('/ShowReport') }} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faFilm} className='icon' /> <span>Shows Report</span>
                  </li>
                  <li className='sidebar-sub-item' onClick={() => { NavigateToLink('/ContestReport') }} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faTrophy} className='icon' /> <span>Contest Report</span>
                  </li>
                  <li className='sidebar-sub-item' onClick={() => { NavigateToLink('/EventReport') }} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faCalendarAlt} className='icon' /> <span>Event Report</span>
                  </li>
                </ul>
              )}


              {/* <li className='sidebar-item'>
                <FontAwesomeIcon icon={faCog} className='icon' /> <span>Settings</span>
              </li> */}


              <li className='sidebar-item' onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} className='icon' /> <span>Logout</span>
              </li>


            </ul>

          </> :
            <>

              {/* Logo Section */}
              <div style={{ backgroundColor: 'rgb(67, 72, 77)', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, textAlign: 'center' }}>Logo</h3>
              </div>

              <div className='d-flex justify-content-center align-items-center'>
                <ul style={{ listStyle: 'none', padding: 0 }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faChevronRight} className='icon' onClick={toggleSidebar} size="1.5x" />
                  </div>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faTachometerAlt} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faSlidersH} className='icon' size="1.5x" />
                  </li>

                  {/* Customer Menu with Submenu */}
                  <li className='sidebar-item' onClick={toggleCustomerMenu}>
                    <FontAwesomeIcon icon={faUsers} className='icon' size="1.5x" />
                  </li>
                  {isCustomerOpen && (
                    <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                      <li className='sidebar-sub-item' style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faUserPlus} className='icon' size="1.5x" />
                      </li>
                      <li className='sidebar-sub-item' style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faUserEdit} className='icon' size="1.5x" />
                      </li>
                    </ul>
                  )}


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faBuilding} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faCreditCard} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faBox} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faHandHoldingHeart} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faStar} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faChartBar} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faCog} className='icon' size="1.5x" />
                  </li>


                  <li className='sidebar-item'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='icon' size="1.5x" />
                  </li>

                </ul>
              </div>

            </>
        }
      </Col>
    </>
  )
}

export default Sidebar