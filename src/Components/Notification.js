import React from 'react'
import { Button, Table } from 'react-bootstrap'

function Notification() {
  return (
    <>
      <div className='m-4 p-3 white'>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Notifications</h3>
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

export default Notification