import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Pagination } from 'react-bootstrap';
import { simpleGetCallWithToken, deleteWithAuthCall, PostCallWithErrorResponse } from '../api/ApiServices';
import ApiConfig from '../api/ApiConfig';
import ToastMsg from '../ToastMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

function Contest() {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [dataList, setDataList] = useState([]); // Full data list
    const [paginatedData, setPaginatedData] = useState([]); // Data for current page
    const [quizData, setQuizData] = useState({
        content_title: '',
        content_description: '',
        questions: [{ question: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '', quiz_id: '' }],
        content_id: ''
    });

    const [viewQuizData, setViewQuizData] = useState({
        content_title: '',
        content_description: '',
        questions: []
    });

    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [lastPage, setLastPage] = useState(1); // Total pages from API response

    const handleList = async (page = 1) => {
        simpleGetCallWithToken(ApiConfig.GET_CONTENT + `?category_id=3&page=${page}`)
            .then((res) => {
                if (res.success) {
                    setDataList(res.data); // All the data
                    setLastPage(res.last_page); // Total pages
                    setPaginatedData(res.data); // Display current page data
                    setCurrentPage(res.page); // Update current page
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = quizData.content_id ? ApiConfig.UPDATE_CONTENT : ApiConfig.CREATE_CONTENT;
        PostCallWithErrorResponse(url, JSON.stringify({ ...quizData, content_category_id: 3 }))
            .then((res) => {
                if (res.json.success) {
                    ToastMsg("success", res.json.message);
                    handleClose();
                    handleList(currentPage); // Reload the current page
                } else {
                    ToastMsg("error", res.json.error.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    const handleEdit = async (data) => {
        setQuizData({
            content_id: data.content_id,
            content_title: data.content_title,
            content_description: data.content_description,
            questions: data.questions || [{ question: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '', quiz_id: '' }],
        });
        handleShow();
    };

    const handleDelete = async (id) => {
        deleteWithAuthCall(ApiConfig.DELETE_CONTENT + `?id=${id}`)
            .then((res) => {
                if (res.success) {
                    ToastMsg("success", res.message);
                    handleList(currentPage); // Reload the current page
                } else {
                    ToastMsg("error", res.error.message ?? res.message);
                }
            })
            .catch((err) => {
                ToastMsg("error", err);
            });
    };

    const handleView = (data) => {
        setViewQuizData(data);
        setShowViewModal(true); // Show the View Modal
    };

    const handleClose = () => {
        setShowModal(false);
        setShowViewModal(false); // Close both modals
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index][name] = value;
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const handleAddQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                { question: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '' }
            ]
        });
    };

    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        handleList(pageNumber); // Load data for the new page
    };

    // Modal handling
    const handleShow = () => setShowModal(true)

    useEffect(() => {
        handleList(currentPage);
    }, []);

    return (
        <div className='m-4 p-3 white'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Contest</h3>
                <Button
                    variant="outline-secondary"
                    className="border-2 px-4 py-2 rounded-3 shadow-sm"
                    onClick={() => setShowModal(true)}
                >
                    Create New
                </Button>
            </div>
            <hr />
            <Table hover responsive className='no-border'>
                <thead>
                    <tr>
                        <th>Sr.no</th>
                        <th>Contest Title</th>
                        <th>Contest Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length ? 
                        paginatedData.map((data, index) => (
                            <tr key={data.content_id}>
                                <td>{(currentPage - 1) * 5 + (index + 1)}</td>
                                <td>{data.content_title}</td>
                                <td>{data.content_description}</td>
                                <td>
                                    <FontAwesomeIcon icon={faEye} className="icon view-icon" onClick={() => handleView(data)} />
                                    <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={() => handleEdit(data)} />
                                    <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={() => handleDelete(data.content_id)} />
                                </td>
                            </tr>
                        )) :
                        <tr><td colSpan="4">No data available</td></tr>
                    }
                </tbody>
            </Table>

            {/* Pagination Controls */}
            <Pagination>
                {[...Array(lastPage)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePaginationChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal for Create or Edit Quiz */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{quizData.content_id ? 'Edit Quiz' : 'Create Quiz'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Quiz Title"
                                value={quizData.content_title}
                                onChange={(e) => setQuizData({ ...quizData, content_title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Quiz Description"
                                value={quizData.content_description}
                                onChange={(e) => setQuizData({ ...quizData, content_description: e.target.value })}
                            />
                        </Form.Group>

                        {quizData.questions.map((questionData, index) => (
                            <div key={index}>
                                <h5>Question {index + 1}</h5>

                                <Form.Group className="mb-3">
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="question"
                                        placeholder="Enter Question"
                                        value={questionData.question}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Option 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="option1"
                                        placeholder="Enter Option 1"
                                        value={questionData.option1}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Option 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="option2"
                                        placeholder="Enter Option 2"
                                        value={questionData.option2}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Option 3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="option3"
                                        placeholder="Enter Option 3"
                                        value={questionData.option3}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Option 4</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="option4"
                                        placeholder="Enter Option 4"
                                        value={questionData.option4}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Correct Answer</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="correctAnswer"
                                        value={questionData.correctAnswer}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                    >
                                        <option value="">Select the correct answer</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </Form.Control>
                                </Form.Group>

                                {quizData.questions.length > 1 && (
                                    <Button variant="danger" onClick={() => handleRemoveQuestion(index)} className="mb-3">
                                        Remove Question
                                    </Button>
                                )}
                            </div>
                        ))}

                        <Button variant="secondary" onClick={handleAddQuestion} className="mb-3">
                            Add New Question
                        </Button>

                        <Button variant="primary" className="w-100" onClick={handleSubmit}>
                            {quizData.content_id ? 'Update Quiz' : 'Create Quiz'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal for View Quiz */}
            <Modal show={showViewModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{viewQuizData.content_title}</h4>
                    <p>{viewQuizData.content_description}</p>
                    {viewQuizData.questions.map((q, index) => (
                        <div key={index}>
                            <h5>Question {index + 1}</h5>
                            <p>{q.question}</p>
                            <ul>
                                <li>{q.option1}</li>
                                <li>{q.option2}</li>
                                <li>{q.option3}</li>
                                <li>{q.option4}</li>
                            </ul>
                            <p><strong>Correct Answer: </strong>{`Option ${q.correctAnswer}`}</p>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Contest;
