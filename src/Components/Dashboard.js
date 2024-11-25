import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Line, Pie } from 'react-chartjs-2';  // Import Pie chart component
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

// Register required components in Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

function Home() {

  const data = {
    labels: ['point 1', 'point 2', 'point 3'], // Pie chart labels
    datasets: [
      {
        label: 'My Pie Chart',
        data: [12, 19, 5],  // Data values
        backgroundColor: ['#4318FE', '#6BD2FF', '#EBF2F4'], // Slice colors
        borderColor: ['#4318FE', '#6BD2FF', '#EBF2F4'],   // Border colors
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,  // Make the chart responsive to screen size
    plugins: {
      legend: {
        position: 'top',  // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + ' units';  // Custom label format
          },
        },
      },
    },
  };

  // Data for the Line chart
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May'],  // X-axis labels
    datasets: [
      {
        label: 'Sales',  // Name of the dataset
        data: [65, 59, 80, 81, 56],  // Y-axis values
        fill: false,  // Set to true if you want to fill the area below the line
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color
        tension: 0.1,  // Line tension
      },
    ],
  };

  // Chart options
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Data',  // Title of the chart
      },
    },
  };

  const leadsData = [
    { id: 1, title: "Lead 1", description: "Description for lead 1" },
    { id: 2, title: "Lead 2", description: "Description for lead 2" },
    { id: 3, title: "Lead 3", description: "Description for lead 3" },
    { id: 3, title: "Lead 3", description: "Description for lead 3" },
    // Add more leads as needed
  ];

  return (
    <>
      <div className='secondary'>

        <div className='justifyContent d-flex'>
          <div className='mt-4 p-3 border border-Secondary rounded card' style={{ color: 'black', marginLeft: '1rem' }}>
            <h3>$444</h3>
            <p>Total Product</p>
            <hr />
            <div>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              Update On 2:15
            </div>
          </div>
          <div className='mt-4 p-3 border border-Secondary rounded card' style={{ color: 'black', marginLeft: '2rem' }}>
            <h3>$444</h3>
            <p>Expiry Product</p>
            <hr />
            <div>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              Update On 2:15
            </div>

          </div>
          <div className='mt-4 p-3 border border-Secondary rounded card' style={{ color: 'black', marginLeft: '2rem' }}>
            <h3>$444</h3>
            <p>Leads Count</p>
            <hr />
            <div>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              Update On 2:15
            </div>
          </div>
        </div>

        <Container fluid className='p-3'>

          <Row className='mt-4'>

            <Col xs={12} md={8} style={{ padding: '0', marginLeft: '1%' }} className="d-flex flex-column white p-4">
              <Line data={data1} options={options1} />
            </Col>


            <Col xs={12} md={3} style={{ padding: '0', marginLeft: '2%' }} className="d-flex flex-column white p-1">
              {/* <h5>Leads</h5> */}
              <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
                <Pie data={data} options={options} />
              </div>

            </Col>

          </Row>

          <Row className='mt-4'>

            <Col xs={12} md={3} style={{ padding: '0', marginLeft: '1%' }} className="d-flex flex-column white p-4">
              <h5>Leads</h5>
              <div className='leads'>
                {leadsData.map(lead => (
                  <div key={lead.id} className="d-flex align-items-center mb-1">
                    <div className="me-5">
                      <FontAwesomeIcon icon={faUsers} size="2x" />
                    </div>
                    <div className=''>
                      <h5>{lead.title}</h5>
                      <p>{lead.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            <Col xs={12} md={8} style={{ padding: '0', marginLeft: '2%' }} className="d-flex flex-column white p-4">

              <h5>Expired Products</h5>
              <Table hover responsive className='no-border'>
                <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th>Products</th>
                    <th>Agency</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Data 1.1</td>
                    <td>Data 1.2</td>
                    <td>Data 1.3</td>
                    <td>Data 1.3</td>
                  </tr>
                  <tr>
                    <td>Data 2.1</td>
                    <td>Data 2.2</td>
                    <td>Data 2.3</td>
                    <td>Data 2.3</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </Table>
            </Col>

          </Row>

        </Container>
      </div>
    </>
  )
}

export default Home