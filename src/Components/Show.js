import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'

function Show() {

   // State to manage modal visibility
   const [showModal, setShowModal] = useState(false);

   // Toggle Modal Visibility
   const handleShow = () => setShowModal(true);
   const handleClose = () => setShowModal(false);

  return (
    <>
      <div className='m-4 p-3 white'>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Show</h3>
          <Button
            variant="outline-secondary"
            className="border-2 px-4 py-2 rounded-3 shadow-sm"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.3s ease'
            }}
            onClick={handleShow}
          >
            Create Show
          </Button>
        </div>

        <hr />

        <Table hover responsive className='no-border '>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Products</th>
              <th>Show</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Data 1.1</td>
              <td>Data 1.2</td>
              <td>Data 1.3</td>
              <td>Data 1.3</td>
              <td>Data 1.3</td>
            </tr>
            <tr>
              <td>Data 2.1</td>
              <td>Data 2.2</td>
              <td>Data 2.3</td>
              <td>Data 2.3</td>
              <td>Data 2.3</td>
            </tr>
            <tr>
              <td>Data 1.1</td>
              <td>Data 1.2</td>
              <td>Data 1.3</td>
              <td>Data 1.3</td>
              <td>Data 1.3</td>
            </tr>
            <tr>
              <td>Data 2.1</td>
              <td>Data 2.2</td>
              <td>Data 2.3</td>
              <td>Data 2.3</td>
              <td>Data 2.3</td>
            </tr>
          </tbody>
        </Table>


         {/* Modal for Create Slider */}
         <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Slider</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formSliderTitle">
                <Form.Label>Slider Title</Form.Label>
                <Form.Control type="text" placeholder="Enter slider title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSliderDescription">
                <Form.Label>Slider Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter slider description" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSliderImage">
                <Form.Label>Slider Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Create Slider
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Show