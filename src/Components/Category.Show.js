import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { PostCallWithErrorResponse, simpleGetCallWithToken, deleteWithAuthCall } from '../api/ApiServices';
import ApiConfig from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function CategoryShow() {

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showData, setShowData] = useState({
    showId: "",
    title: "",
    description: "",
  });
  const [dataList, setDataList] = useState([]);

  // Fetch the list of categories
  const handleList = async () => {
    simpleGetCallWithToken(ApiConfig.GET_SHOW_CATEGORY)
      .then((res) => {
        if (res.success === true) {
          setDataList(res.data);
        } else {
          ToastMsg("error", res.error.message ?? res.message);
        }
      })
      .catch((err) => {
        ToastMsg("error", err);
      });
  };

  // Submit the new category
  const handleSubmit = async () => {
    let url = showData.showId ? ApiConfig.UPDATE_SHOW_CATEGORY : ApiConfig.CREATE_SHOW_CATEGORY;
    PostCallWithErrorResponse(url, JSON.stringify({ ...showData }))
      .then((res) => {
        if (res.json.success === true) {
          ToastMsg("success", res.json.message);
          handleClose();
          handleList(); // Refresh the list
        } else {
          ToastMsg("error", res.json.error.message);
        }
      })
      .catch((err) => {
        ToastMsg("error", err);
      });
  };

  // Fetch the data for editing the category
  const handleEdit = async (data) => {
    setShowData({ showId: data.show_category_id ,title: data.show_category_title, description: data.show_category_description });
    handleShow();
  };

  // Delete category
  const handleDelete = async (id) => {
    deleteWithAuthCall(ApiConfig.DELETE_SHOW_CATEGORY + `?showId=${id}`)
      .then((res) => {
        if (res.success === true) {
          ToastMsg("success", "Category deleted successfully!");
          handleList(); // Refresh the list
        } else {
          ToastMsg("error", res.error.message ?? res.message);
        }
      })
      .catch((err) => {
        ToastMsg("error", err);
      });
  };

  // Modal handling
  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    handleList();
  }, []); // This effect runs once when the component mounts

  return (
    <>
      <div className='m-4 p-3 white'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Shows Category</h3>
          <Button
            variant="outline-secondary"
            className="border-2 px-4 py-2 rounded-3 shadow-sm"
            style={{
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.3s ease'
            }}
            onClick={() => {
              handleShow()
              setShowData({showId: "", title: "", description: ""})
            }}
          >
            Create Show
          </Button>
        </div>
        <hr />
        <Table hover responsive className='no-border'>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Show Title</th>
              <th>Show Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList && dataList.length ?
              dataList.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.show_category_title}</td>
                  <td>{data.show_category_description}</td>
                  <td>
                    {/* Edit Icon */}
                    <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />
                    
                    {/* Delete Icon */}
                    <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.show_category_id)} />
                  </td>
                </tr>
              )) :
              <tr><td colSpan="4">No data available</td></tr> // Optional fallback for empty data
            }
          </tbody>
        </Table>

        {/* Modal for Create Show Category */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Show Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formSliderTitle">
                <Form.Label>Show Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Show Title"
                  value={showData.title}
                  onChange={(e) => setShowData({ ...showData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSliderDescription">
                <Form.Label>Show Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Show Description"
                  value={showData.description}
                  onChange={(e) => setShowData({ ...showData, description: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={handleSubmit}>
                {showData.title ? "Update Show" : "Create Show"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default CategoryShow;
