import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Pagination, Table } from 'react-bootstrap';
import { simpleGetCallWithToken, deleteWithAuthCall, multipartPostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Event() {

    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState({
        contentId: '',
        content_title: '',
        content_description: '',
        event_category_id: '',
        video: null,
        image: null,
    });
    const [dataList, setDataList] = useState([]);
    const [eventList, setEventList] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;  // Define the items per page

    // Fetch the list of categories
    const handleList = async (page = 1, limit = itemsPerPage) => {
        simpleGetCallWithToken(ApiConfig.GET_CONTENT + `?category_id=4&page=${page}&limit=${limit}`)
            .then((res) => {
                if (res.success === true) {
                    setDataList(res.data);
                    setTotalPages(res.total_pages);
                    setTotalCount(res.total_count);
                    setCurrentPage(page);
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    // Fetch the Event list of categories
    const handleEventList = async () => {
        simpleGetCallWithToken(ApiConfig.GET_EVENT_CATEGORY)
            .then((res) => {
                if (res.success === true) {
                    setEventList(res.data);
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    // Submit the new category
    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('content_title', showData.content_title);
        formData.append('content_description', showData.content_description);
        if (showData.video) formData.append('content_video_path', showData.video);
        if (showData.image) formData.append('content_image_path', showData.image);
        if (showData.content_id) formData.append('content_id', showData.content_id);
        if (showData.event_category_id) formData.append('event_category_id', showData.event_category_id);
        formData.append('content_category_id', 4);

        let url = showData.content_id ? ApiConfig.UPDATE_CONTENT : ApiConfig.CREATE_CONTENT;

        // Make the POST request
        const res = await multipartPostCallWithErrorResponse(url, formData);
        console.log(res)
        if (res.json.success === true) {
            ToastMsg("success", res.json.message);
            handleClose();  // Close the modal or perform any cleanup
            handleList(currentPage);   // Refresh the list (or any action after successful submission)
        } else {
            ToastMsg("error", res.json.message);
        }
    };

    // Fetch the data for editing the category
    const handleEdit = async (data) => {
        setShowData({ contentId: data.content_id, content_title: data.content_title, content_description: data.content_description, event_category_id: data.event_category_id, ...showData, ...data });
        console.log(showData, data);
        handleShow();
    };

    // Delete category
    const handleDelete = async (id) => {
        deleteWithAuthCall(ApiConfig.DELETE_CONTENT + `?id=${id}`)
            .then((res) => {
                if (res.success === true) {
                    ToastMsg("success", res.message);
                    handleList(currentPage); // Refresh the list
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Modal handling
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false);

    // Handle file change for video and image
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setShowData({ ...showData, [type]: file });
    };

    useEffect(() => {
        handleList(currentPage);
        handleEventList();
    }, [currentPage]); // This effect runs once when the component mounts

    return (
        <>
            <div className='m-4 p-3 white'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Events</h3>
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
                            setShowData({
                                contentId: '',
                                content_title: '',
                                content_description: '',
                                video: null,
                                image: null,
                            })
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
                            <th>Event Title</th>
                            <th>Event Description</th>
                            <th>Event</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.length ?
                            dataList.map((data, index) => (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                                    <td>{data.content_title}</td>
                                    <td>{data.content_description}</td>
                                    <td>{data.event_category_title ?? '-'}</td>
                                    {/* <td><img src={IMAGE_URL+data.image_path} alt="img" style={{height:'50px', borderRadius: '8px'}} /></td> */}
                                    <td>
                                        {/* Edit Icon */}
                                        <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />

                                        {/* Delete Icon */}
                                        <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.content_id)} />
                                    </td>
                                </tr>
                            )) :
                            <tr><td colSpan="4">No data available</td></tr>
                        }
                    </tbody>
                </Table>

                {/* Pagination */}
                <Pagination>
                    {[...Array(totalPages).keys()].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

                {/* Modal for Create Show Category */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formSliderTitle">
                                <Form.Label>Content Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Show Title"
                                    value={showData.content_title}
                                    onChange={(e) => { setShowData({ ...showData, content_title: e.target.value }); console.log("showData ============ >>> ", showData) }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSliderDescription">
                                <Form.Label>Content Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Show Description"
                                    value={showData.content_description}
                                    onChange={(e) => setShowData({ ...showData, content_description: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formShowSelect">
                                <Form.Label>Select Event</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={showData.event_category_id} // Assuming you have a state to track the selected show
                                    onChange={(e) => setShowData({ ...showData, event_category_id: e.target.value })}
                                >
                                    <option value="">Select Show Category</option>
                                    {eventList.map((show) => (
                                        <option key={show.event_category_id} value={show.event_category_id}>
                                            {show.event_category_title}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSliderVideo">
                                <Form.Label>Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleFileChange(e, 'video')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSliderImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'image')}
                                />
                            </Form.Group>

                            <Button variant="primary" className="w-100" onClick={handleSubmit}>
                                {showData.content_id ? "Update Show" : "Create Show"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Event