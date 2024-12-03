import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table, Pagination } from 'react-bootstrap'
import { simpleGetCallWithToken, deleteWithAuthCall, multipartPostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig, { IMAGE_URL } from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function DailyNews() {

    // State to manage modal visibility and form data
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState({
        contentId: '',
        content_title: '',
        content_description: '',
        video: null,
        image: null,
    });

    // State for pagination
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0); // Total count of items

    // Fetch the list of categories with pagination
    const handleList = async (page = 1, limit = 10) => {
        simpleGetCallWithToken(`${ApiConfig.GET_CONTENT}?category_id=2&page=${page}&limit=${limit}`)
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

    // Submit the new category
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content_title', showData.content_title);
        formData.append('content_description', showData.content_description);
        if (showData.video) formData.append('content_video_path', showData.video);
        if (showData.image) formData.append('content_image_path', showData.image);
        if (showData.content_id) formData.append('content_id', showData.content_id);
        formData.append('content_category_id', 2);

        let url = showData.content_id ? ApiConfig.UPDATE_CONTENT : ApiConfig.CREATE_CONTENT;

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

    // Fetch the data for editing the category
    const handleEdit = async (data) => {
        setShowData({ contentId: data.content_id, content_title: data.content_title, content_description: data.content_description, ...showData, ...data });
        handleShow();
    };

    // Delete category
    const handleDelete = async (id) => {
        deleteWithAuthCall(ApiConfig.DELETE_CONTENT + `?id=${id}`)
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
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false);

    // Handle file change for video and image
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setShowData({ ...showData, [type]: file });
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
                <h3>Daily News</h3>
                <Button
                    variant="outline-secondary"
                    className="border-2 px-4 py-2 rounded-3 shadow-sm"
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
                    Create News
                </Button>
            </div>
            <hr />
            <Table hover responsive className='no-border'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Daily News Title</th>
                        <th>Daily News Description</th>
                        <th>Daily Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.length ? 
                        dataList.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.content_title}</td>
                                <td>{data.content_description}</td>
                                <td><img src={IMAGE_URL + data.image_path} alt="img" style={{ height: '50px', borderRadius: '8px' }} /></td>
                                <td>
                                    {/* Edit Icon */}
                                    <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />

                                    {/* Delete Icon */}
                                    <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.content_id)} />
                                </td>
                            </tr>
                        )) :
                        <tr><td colSpan="5">No data available</td></tr>
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

            {/* Modal for Create News */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Daily News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSliderTitle">
                            <Form.Label>Content Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Show Title"
                                value={showData.content_title}
                                onChange={(e) => { setShowData({ ...showData, content_title: e.target.value }) }}
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
                            {showData.content_id ? "Update News" : "Create News"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DailyNews;
