import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { simpleGetCallWithToken, deleteWithAuthCall, multipartPostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig, { IMAGE_URL } from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Advertisement() {

    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState({
        advertisement_id: '',
        advertisement_title: '',
        advertisement_description: '',
        advertisement_client: '',
        advertisement_image: null,
    });
    const [dataList, setDataList] = useState([]);

    // Fetch the list of advertisements
    const handleList = async () => {
        simpleGetCallWithToken(ApiConfig.GET_ADVERTISEMENT)
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

    // Submit the new advertisement
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('advertisement_title', showData.advertisement_title);
        formData.append('advertisement_description', showData.advertisement_description);
        formData.append('advertisement_client', showData.advertisement_client);

        // Add image for advertisement if it exists
        if (showData.advertisement_image) formData.append('advertisement_image', showData.advertisement_image);

        // If updating an existing advertisement, add the advertisement_id
        if (showData.advertisement_id) formData.append('advertisement_id', showData.advertisement_id);

        // Set the correct API URL depending on whether it's creating or updating
        let url = showData.advertisement_id ? ApiConfig.UPDATE_ADVERTISEMENT : ApiConfig.CREATE_ADVERTISEMENT;

        try {
            // Make the POST request with the form data
            const res = await multipartPostCallWithErrorResponse(url, formData);
            
            if (res.json.success) {
                ToastMsg("success", res.json.message);
                handleClose();  // Close the modal after successful submission
                handleList();   // Refresh the list (or any action after successful submission)
            } else {
                ToastMsg("error", res.json.message);
            }
        } catch (error) {
            ToastMsg("error", "An error occurred while processing the request.");
        }
    };

    // Fetch the data for editing the advertisement
    const handleEdit = async (data) => {
        setShowData({
            advertisement_id: data.advertisement_id,
            advertisement_title: data.advertisement_title,
            advertisement_description: data.advertisement_description,
            advertisement_client: data.advertisement_client,
            advertisement_image: data.advertisement_image, // Include the image path if available
        });
        handleShow();  // Show the modal with the current advertisement data
    };

    // Delete advertisement
    const handleDelete = async (id) => {
        deleteWithAuthCall(ApiConfig.DELETE_ADVERTISEMENT + `?id=${id}`)
            .then((res) => {
                if (res.success === true) {
                    ToastMsg("success", res.message);
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
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Handle file change for image
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setShowData({ ...showData, [type]: file });
    };

    useEffect(() => {
        handleList();
    }, []); // This effect runs once when the component mounts

    return (
        <>
            <div className='m-4 p-3 white'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Advertisement</h3>
                    <Button
                        variant="outline-secondary"
                        className="border-2 px-4 py-2 rounded-3 shadow-sm"
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            transition: 'background-color 0.3s ease'
                        }}
                        onClick={() => {
                            handleShow();
                            setShowData({
                                advertisement_id: '',
                                advertisement_title: '',
                                advertisement_description: '',
                                advertisement_client: '',
                                advertisement_image: null,
                            });
                        }}
                    >
                        Create New
                    </Button>
                </div>
                <hr />
                <Table hover responsive className='no-border'>
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Advertisement Title</th>
                            <th>Advertisement Description</th>
                            <th>Client</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.length ?
                            dataList.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.advertisement_title}</td>
                                    <td>{data.advertisement_description}</td>
                                    <td>{data.advertisement_client ?? '-'}</td>
                                    <td><img src={IMAGE_URL + data.advertisement_image} alt="Advertisement" style={{ height: '50px', borderRadius: '8px' }} /></td>
                                    <td>
                                        {/* Edit Icon */}
                                        <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />

                                        {/* Delete Icon */}
                                        <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.advertisement_id)} />
                                    </td>
                                </tr>
                            )) :
                            <tr><td colSpan="6">No data available</td></tr>
                        }
                    </tbody>
                </Table>

                {/* Modal for Create/Update Advertisement */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Advertisement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formAdvertisementTitle">
                                <Form.Label>Advertisement Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Advertisement Title"
                                    value={showData.advertisement_title}
                                    onChange={(e) => setShowData({ ...showData, advertisement_title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAdvertisementDescription">
                                <Form.Label>Advertisement Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Advertisement Description"
                                    value={showData.advertisement_description}
                                    onChange={(e) => setShowData({ ...showData, advertisement_description: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAdvertisementClient">
                                <Form.Label>Advertisement Client</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Advertisement Client"
                                    value={showData.advertisement_client}
                                    onChange={(e) => setShowData({ ...showData, advertisement_client: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAdvertisementImage">
                                <Form.Label>Advertisement Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'advertisement_image')}
                                />
                            </Form.Group>

                            <Button variant="primary" className="w-100" onClick={handleSubmit}>
                                {showData.advertisement_id ? "Update Advertisement" : "Create Advertisement"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Advertisement;
