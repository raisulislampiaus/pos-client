import { Table, Button, Form, Input, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useHistory } from "react-router-dom";

function CartPage() {
    const [subTotal, setSubTotal] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let history = useHistory();

    const { cartProducts } = useSelector(state => state.indexReducers)
    const dispatch = useDispatch()
    const increment = (record) => {
        dispatch({ type: 'updateCart', payload: { ...record, quantity: record.quantity + 1 } })
    }
    const dicrement = (record) => {
        if (record.quantity >= 1) {
            dispatch({
                type: 'updateCart',
                payload: { ...record, quantity: record.quantity - 1 }
            })
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, item) => <img src={image} alt="" heigth='60' width='60' />
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Qty',
            dataIndex: '_id',
            render: (id, record) => <div>
                <PlusCircleOutlined className="mx-3" onClick={() => increment(record)} />
                <b>{record.quantity}</b>
                <MinusCircleOutlined className="mx-3" onClick={() => dicrement(record)} />
            </div>

        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => <DeleteOutlined onClick={() => dispatch({ type: 'deleteCart', payload: record })} />
        },

    ];

    useEffect(() => {
        let temp = 0;
        cartProducts.forEach((item) => {
            temp = temp + item.price * item.quantity;
        });

        setSubTotal(temp);
    }, [cartProducts]);


    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            cartProducts,
            tax: Number(((subTotal / 100) * 10).toFixed(2)),
            totalAmount: Number(
                subTotal + Number(((subTotal / 100) * 10).toFixed(2))
            ),

        }
        axios
            .post("https://pos-app-csk0.onrender.com/api/bills/charge-bill", reqObject)
            .then(() => {
                message.success("Bill Charged Successfully");
                history.push("/bills");
            })
            .catch(() => {
                message.success("Something went wrong");
            });
    };



    return (
        <div>
            <Table columns={columns} dataSource={cartProducts} bordered />
            <hr />
            <div className="d-flex justify-content-end flex-column align-items-end">
                <div className="subtotal">
                    <h3>
                        SUB TOTAL : <b>{subTotal} $/-</b>
                    </h3>
                </div>
                <Button type="primary" onClick={handleShow}>
                    CHARGE BILL
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item name="customerName" label="Customer Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="customerPhoneNumber" label="Phone Number">
                            <Input />
                        </Form.Item>

                        <Form.Item name="paymentMode" label="Payment Mode">
                            <select>
                                <option value=''>
                                    Choose one...
                                </option>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                            </select>
                        </Form.Item>

                        <div className="charge-bill-amount">
                            <h5>
                                SubTotal : <b>{subTotal}</b>
                            </h5>
                            <h5>
                                Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
                            </h5>
                            <hr />
                            <h2>
                                Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
                            </h2>
                        </div>

                        <div className="d-flex justify-content-end">
                            <Button htmlType="submit" type="primary">
                                GENERATE BILL
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>

    )
}

export default CartPage
