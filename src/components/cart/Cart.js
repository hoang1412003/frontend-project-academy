import React, { useState } from 'react';
import { Col, Container, Row, Table, Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, incrementItemQuantity, decrementItemQuantity, toggleItemChecked } from '../../redux/cartSlice';
import OrderForm from '../orderForm/OrderForm'; 
import emailjs from 'emailjs-com'; 
import Swal from 'sweetalert2';
import './cart.scss';

export default function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);

    
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        address: ''
    });

    
    const handleCheckboxChange = (id, size) => {
        dispatch(toggleItemChecked({ id, size }));
    };

    
    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        items.forEach(item => {
            if (item.checked !== checked) {
                dispatch(toggleItemChecked({ id: item.id, size: item.size }));
            }
        });
    };

    
    const allChecked = items.length > 0 && items.every(item => item.checked);

    
    const totalPrice = items.reduce((total, item) => {
        if (item.checked) {
            return total + item.price * item.quantity;
        }
        return total;
    }, 0);

    
    const handleRemove = (id, size) => {
        dispatch(removeItemFromCart({ id, size }));
    };

    
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    
    const handleIncrement = (id, size) => {
        dispatch(incrementItemQuantity({ id, size }));
    };

    
    const handleDecrement = (id, size) => {
        dispatch(decrementItemQuantity({ id, size }));
    };

    
    const toggleModal = () => {
        setModal(!modal);
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const emailData = {
            ...formData,
            to_email: formData.email, 
            items: items.filter(item => item.checked) 
        };

        emailjs.send('service_eeqz6n8', 'template_5phw1aa', emailData, '6eiqz7Se7X7AHug_Y')
            .then((result) => {
                Swal.fire({
                    title: "Thành công!",
                    text: "Đơn hàng đã được đặt!",
                    icon: "success"
                });
                toggleModal(); 
                dispatch(clearCart()); 
            }, (error) => {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Có lỗi xảy ra với đơn hàng của bạn.",
                    icon: "error"
                });
            });
    };

    return (
        <Container className='container-cart' data-aos="zoom-in-down">
            <Table>
                <thead>
                    <tr>
                        <th>
                            
                            <Input
                                type="checkbox"
                                checked={allChecked}
                                onChange={handleCheckAll}
                            />
                        </th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                
                                <Input
                                    type="checkbox"
                                    checked={item.checked || false}
                                    onChange={() => handleCheckboxChange(item.id, item.size)}
                                />
                            </td>
                            <td>
                                <Row className='row-ct'>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className='img-div'>
                                            <img src={require(`../../images/products/${item.img}.webp`)} alt={item.name} />
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Kích cỡ: {item.size}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </td>
                            <td className='price'>{item.price} ₫</td>
                            <td>
                                <div className='quantity'>
                                    <Button className='btn-ct' onClick={() => handleDecrement(item.id, item.size)}>-</Button>
                                    <div className='number'>{item.quantity}</div>
                                    <Button className='btn-ct' onClick={() => handleIncrement(item.id, item.size)}>+</Button>
                                </div>
                            </td>
                            <td>
                                <Button color="danger" onClick={() => handleRemove(item.id, item.size)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            <h4>Tổng tiền: {totalPrice} ₫</h4>
            
            <Button className='delete-all' color="primary" onClick={handleClearCart}>Xóa tất cả</Button>
            <Button className='checkout' style={{marginLeft: '10px'}} color="success" onClick={toggleModal}>Thanh toán</Button>

            
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Thông tin đặt hàng</ModalHeader>
                <ModalBody>
                    <OrderForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        toggleModal={toggleModal}
                    />
                </ModalBody>
            </Modal>
        </Container>
    );
}
