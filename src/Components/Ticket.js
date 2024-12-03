import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Pagination } from 'react-bootstrap';
import { simpleGetCallWithToken, deleteWithAuthCall, multipartPostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig, { IMAGE_URL } from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Ticket() {
    // State to manage modal visibility and form data
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState({
        ticket_id: '',
        ticket_title: '',
        ticket_description: '',
        premium_charge: '',
        gold_charge: '',
        platinum_charge: '',
        duration: '',
        is_active: true,
        image: null,
    });

    // State for pagination
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0); // Total count of items

    // Fetch the list of tickets with pagination
    const handleList = async (page = 1, limit = 10) => {
        simpleGetCallWithToken(`${ApiConfig.GET_TICKETS}?page=${page}&limit=${limit}`)
            .then((res) => {
                if (res.success === true) {
                    setDataList(res.data); // Data for the current page
                    setTotalPages(res.total_pages); // Total pages to handle pagination
                    setTotalCount(res.total_count); // Total items
                    setCurrentPage(page); // Set the current page
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    // Submit the new ticket
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ticket_title', showData.ticket_title);
        formData.append('ticket_description', showData.ticket_description);
        formData.append('premium_charge', showData.premium_charge);
        formData.append('gold_charge', showData.gold_charge);
        formData.append('platinum_charge', showData.platinum_charge);
        formData.append('duration', showData.duration);
        formData.append('is_active', showData.is_active);
        if (showData.image) formData.append('ticket_image', showData.image);
        if (showData.ticket_id) formData.append('ticket_id', showData.ticket_id);

        let url = showData.ticket_id ? ApiConfig.UPDATE_TICKET : ApiConfig.CREATE_TICKET;

        // Make the POST request
        const res = await multipartPostCallWithErrorResponse(url, formData);
        if (res.json.success === true) {
            ToastMsg("success", res.json.message);
            handleClose();  // Close the modal
            handleList(currentPage);   // Refresh the list for the current page
        } else {
            ToastMsg("error", res.json.message);
        }
    };

    // Fetch the data for editing the ticket
    const handleEdit = async (data) => {
        setShowData({
            ticket_id: data.ticket_id,
            ticket_title: data.ticket_title,
            ticket_description: data.ticket_description,
            premium_charge: data.premium_charge,
            gold_charge: data.gold_charge,
            platinum_charge: data.platinum_charge,
            duration: data.duration,
            is_active: data.is_active,
            image: data.ticket_image, // Show the current image
        });
        handleShow();  // Open the modal
    };

    // Delete ticket
    const handleDelete = async (id) => {
        deleteWithAuthCall(ApiConfig.DELETE_TICKET + `?id=${id}`)
            .then((res) => {
                if (res.success === true) {
                    ToastMsg("success", res.message);
                    handleList(currentPage); // Refresh the list for the current page
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

    // Handle file change for image upload
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setShowData({ ...showData, [type]: file });
    };

    const handleShowCreate = () => {
        setShowData({
            ticket_id: '',
            ticket_title: '',
            ticket_description: '',
            premium_charge: '',
            gold_charge: '',
            platinum_charge: '',
            duration: '',
            is_active: true,
            image: null,
        });
        handleShow();  // Open the modal
    };
    

    // Handle page click
    const handlePageClick = (page) => {
        setCurrentPage(page);
        handleList(page); // Fetch data for the selected page
    };

    useEffect(() => {
        handleList();  // Initial fetch
    }, []); // This effect runs once when the component mounts

    return (
        <div className='m-4 p-3 white'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Manage Tickets</h3>
                <Button
                    variant="outline-secondary"
                    className="border-2 px-4 py-2 rounded-3 shadow-sm"
                    onClick={handleShowCreate} // Use the new handleShowCreate
                >
                    Create Ticket
                </Button>
            </div>
            <hr />
            <Table hover responsive className='no-border'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Ticket Title</th>
                        <th>Description</th>
                        <th>Premium Charge</th>
                        <th>Gold Charge</th>
                        <th>Platinum Charge</th>
                        <th>Duration</th>
                        <th>Active</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.length ?
                        dataList.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.ticket_title}</td>
                                <td>{data.ticket_description}</td>
                                <td>{data.premium_charge}</td>
                                <td>{data.gold_charge}</td>
                                <td>{data.platinum_charge}</td>
                                <td>{data.duration}</td>
                                <td>{data.is_active ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <img 
                                        src={IMAGE_URL + data.ticket_image} 
                                        alt="Ticket Image" 
                                        style={{ height: '50px', borderRadius: '8px' }} 
                                    />
                                </td>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} 
                                        className="icon edit-icon" 
                                        onClick={() => handleEdit(data)} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={faTrash} 
                                        className="icon delete-icon" 
                                        onClick={() => handleDelete(data.ticket_id)} 
                                    />
                                </td>
                            </tr>
                        )) :
                        <tr><td colSpan="10">No data available</td></tr>
                    }
                </tbody>
            </Table>

            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal for Create or Edit Ticket */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showData.ticket_id ? 'Edit Ticket' : 'Create Ticket'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="ticketTitle">
                            <Form.Label>Ticket Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Ticket Title"
                                value={showData.ticket_title}
                                onChange={(e) => setShowData({ ...showData, ticket_title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ticketDescription">
                            <Form.Label>Ticket Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Ticket Description"
                                value={showData.ticket_description}
                                onChange={(e) => setShowData({ ...showData, ticket_description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="premiumCharge">
                            <Form.Label>Premium Charge</Form.Label>
                            <Form.Control
                                type="number"
                                value={showData.premium_charge}
                                onChange={(e) => setShowData({ ...showData, premium_charge: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="goldCharge">
                            <Form.Label>Gold Charge</Form.Label>
                            <Form.Control
                                type="number"
                                value={showData.gold_charge}
                                onChange={(e) => setShowData({ ...showData, gold_charge: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="platinumCharge">
                            <Form.Label>Platinum Charge</Form.Label>
                            <Form.Control
                                type="number"
                                value={showData.platinum_charge}
                                onChange={(e) => setShowData({ ...showData, platinum_charge: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="duration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                value={showData.duration}
                                onChange={(e) => setShowData({ ...showData, duration: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ticketImage">
                            <Form.Label>Ticket Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'image')}
                            />
                        </Form.Group>

                        <Button variant="primary" className="w-100" onClick={handleSubmit}>
                            {showData.ticket_id ? "Update Ticket" : "Create Ticket"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Ticket;
