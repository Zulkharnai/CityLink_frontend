import React from 'react'
import { Button, Table } from 'react-bootstrap'

function ShowReport() {
    return (
        <>
            <div className='m-4 p-3 white'>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Show Report</h3>
                    <Button
                        variant="info"
                        className="border-0 px-4 py-2 rounded-3 shadow-sm"
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            backgroundColor: '#6c757d',
                            borderColor: '#6c757d',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={e => e.target.style.backgroundColor = '#5a6268'} // Darken on hover
                        onMouseOut={e => e.target.style.backgroundColor = '#6c757d'} // Reset color
                    >
                        Creat Bill
                    </Button>
                </div>

                <hr />

                <Table hover responsive className='no-border '>
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Products</th>
                            <th>Agency</th>
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
            </div>
        </>
    )
}

export default ShowReport