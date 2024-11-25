import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { faBell, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function NavbarComponent({ onLogout }) {

    const logout = () => {
        onLogout()
    }

    const navigate = useNavigate();
    const NavigateToLink = (link) => {
        console.log(link)
        navigate(link)
      }

    return (
        <>
            <Navbar bg="white" className="border-bottom">
                <Container className='mt-2'>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Notifications Icon */}
                            <Nav.Link className="position-relative me-4" onClick={() => {NavigateToLink('/Notification')}} >
                                <FontAwesomeIcon icon={faBell} style={{border: '1px solid #EBF2F4', borderRadius: '70%', padding: '5px'}}/>
                                <Badge bg="danger" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>3</Badge>
                            </Nav.Link>

                            {/* Messages Icon
                            <Nav.Link href="#messages" className="position-relative">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <Badge bg="danger" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>5</Badge>
                            </Nav.Link> */}

                            <div>
                                {/* Profile Dropdown */}
                                <NavDropdown
                                    title={
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="https://via.placeholder.com/30"
                                                alt="Profile"
                                                className="rounded-circle"
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                            <span className="ms-3">Username</span>
                                        </div>
                                    }
                                    id="profile-dropdown"
                                    className="me-4 no-arrow-dropdown"
                                >
                                    <NavDropdown.Item onClick={() => {NavigateToLink('/Profile')}}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent