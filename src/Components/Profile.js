import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function Profile() {

   // Example user data, you can replace it with dynamic data (API or state)
   const initialUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, City, Country"
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Simulate saving the data (you can replace it with API calls)
  const handleSave = () => {
    console.log('Saving user data:', userData);
    setIsEditing(false); // After saving, turn off editing
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={12}>
            <Card className="shadow-sm rounded-lg">
              <Card.Body>
                {/* Profile Image and Edit */}
                <div className="text-center mb-4">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h3>{userData.name}</h3>
                  <Button
                    variant="outline-secondary"
                    className="mt-2"
                    onClick={toggleEdit}
                  >
                    <FontAwesomeIcon icon={isEditing ? faSave : faEdit} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                {/* Profile Details */}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  {/* Save Button */}
                  {isEditing && (
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      className="w-100"
                    >
                      Save Changes
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile