import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Modal, Table, Pagination } from 'react-bootstrap';
import { simpleGetCallWithToken, deleteWithAuthCall, multipartPostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Show() {
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState({
        contentId: '',
        content_title: '',
        content_description: '',
        video: null,
        image: null,
        show_category_id: null,
    });
    const [dataList, setDataList] = useState([]);
    const [showList, setShowList] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;  // Define the items per page

    // Fetch the list of categories with pagination
    const handleList = useCallback(async (page = 1, limit = itemsPerPage) => {
        try {
            const res = await simpleGetCallWithToken(`${ApiConfig.GET_CONTENT}?category_id=1&page=${page}&limit=${limit}`);
            if (res.success === true) {
                setDataList(res.data);
                setTotalPages(res.total_pages);
                setTotalCount(res.total_count);
                setCurrentPage(page);
            } else {
                ToastMsg("error", res.error.message ?? res.message);
            }
        } catch (err) {
            ToastMsg("error", err);
        }
    }, []);  // Added useCallback to avoid unnecessary re-renders

    // Fetch the Show list of categories
    const handleShowList = async () => {
        try {
            const res = await simpleGetCallWithToken(ApiConfig.GET_SHOW_CATEGORY);
            if (res.success === true) {
                setShowList(res.data);
            } else {
                ToastMsg("error", res.error.message ?? res.message);
            }
        } catch (err) {
            ToastMsg("error", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content_title', showData.content_title);
        formData.append('content_description', showData.content_description);
        if (showData.video) formData.append('content_video_path', showData.video);
        if (showData.image) formData.append('content_image_path', showData.image);
        if (showData.contentId) formData.append('content_id', showData.contentId);
        if (showData.show_category_id) formData.append('show_category_id', showData.show_category_id);
        formData.append('content_category_id', 1);

        let url = showData.contentId ? ApiConfig.UPDATE_CONTENT : ApiConfig.CREATE_CONTENT;

        const res = await multipartPostCallWithErrorResponse(url, formData);
        if (res.json.success === true) {
            ToastMsg("success", res.json.message);
            handleClose();
            handleList(currentPage);
        } else {
            ToastMsg("error", res.json.message);
        }
    };

    const handleEdit = async (data) => {
        setShowData({ contentId: data.content_id, content_title: data.content_title, content_description: data.content_description, show_category_id: data.show_category_id, ...data });
        handleShow();
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteWithAuthCall(ApiConfig.DELETE_CONTENT + `?id=${id}`);
            if (res.success === true) {
                ToastMsg("success", res.message);
                handleList(currentPage);
            } else {
                ToastMsg("error", res.error.message ?? res.message);
            }
        } catch (err) {
            ToastMsg("error", err);
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setShowData({
            contentId: '',
            content_title: '',
            content_description: '',
            video: null,
            image: null,
            show_category_id: null,
        });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setShowData({ ...showData, [type]: file });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        handleList(currentPage);  // Ensure `currentPage` is used properly here
        handleShowList();
    }, [currentPage, handleList]);  // Add handleList to the dependency array to avoid unnecessary re-renders

    return (
        <div className='m-4 p-3 white'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Shows</h3>
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
                            contentId: '',
                            content_title: '',
                            content_description: '',
                            video: null,
                            image: null,
                        });
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
                        <th>Show</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList && dataList.length ? 
                        dataList.map((data, index) => (
                            <tr key={data.content_id}>
                                <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                                <td>{data.content_title}</td>
                                <td>{data.content_description}</td>
                                <td>{data.show_category_title ?? '-'}</td>
                                <td>
                                    <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />
                                    <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.content_id)} />
                                </td>
                            </tr>
                        )) : 
                        <tr><td colSpan="5">No data available</td></tr>
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
                    <Modal.Title>Show</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSliderTitle">
                            <Form.Label>Content Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Show Title"
                                value={showData.content_title}
                                onChange={(e) => setShowData({ ...showData, content_title: e.target.value })}
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
                            <Form.Label>Select Show</Form.Label>
                            <Form.Control
                                as="select"
                                value={showData.show_category_id}
                                onChange={(e) => setShowData({ ...showData, show_category_id: e.target.value })}
                            >
                                <option value="">Select Show Category</option>
                                {showList.map((show) => (
                                    <option key={show.show_category_id} value={show.show_category_id}>
                                        {show.show_category_title}
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

                        <Button variant="primary" className="w-100" onClick={handleSubmit}>
                            {showData.contentId ? "Update Show" : "Create Show"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Show;
