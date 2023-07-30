import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";

import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import { Table, Modal } from 'react-bootstrap';




function Bills() {
  const [billsData, setBillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const handleRowClick = (item) => {
    setShowModal(true);
    setSelectedItem(item);
  };


  const getAllBills = () => {

    axios
      .get("https://pos-app-csk0.onrender.com/api/bills/get-all-bills")
      .then((response) => {

        const data = response.data
        data.reverse()
        setBillsData(data);
      })
      .catch((error) => {

        console.log(error);
      });
  };







  useEffect(() => {
    getAllBills();
  }, []);
  return (
    <div>


      <div className='d-flex justify-content-between'>
        <h4>Bills</h4>

      </div>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Id</th>
            <th>Customer</th>
            <th>SubTotal</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            billsData && billsData.map((item, record) => (
              <tr key={item.id}>

                <td>{item._id}</td>
                <td>{item.customerName}</td>
                <td>{item.subTotal}</td>
                <td>{item.tax}</td>
                <td>{item.totalAmount}</td>

                <td>
                  <div className='d-flex'>
                    <a>
                      <EyeOutlined className='mx-2'
                        onClick={() => {
                          handleRowClick(item)
                          handleShow()
                        }}

                      />
                    </a>


                  </div>

                </td>
              </tr>
            ))}

        </tbody>
      </Table>




      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bill-customer-details my-2">
            <p>
              <b>Name</b> : {selectedItem.customerName}
            </p>
            <p>
                <b>Phone Number</b> : {selectedItem.customerPhoneNumber}
              </p>
              <p>
                <b>Date</b> :{" "}
                {selectedItem.createdAt.toString().substring(0, 10)}
              </p>
          </div>

        </Modal.Body>

      </Modal>



    </div>
  )
}

export default Bills
