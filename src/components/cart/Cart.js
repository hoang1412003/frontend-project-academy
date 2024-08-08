import React from 'react';
import { Col, Container, Row, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart } from '../../redux/cartSlice'; // Thêm import
import './cart.scss';

export default function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);

    // Thay đổi: Hàm xử lý xóa sản phẩm khỏi giỏ hàng
    const handleRemove = (id, size) => {
        dispatch(removeItemFromCart({ id, size }));
    };

    // Thay đổi: Hàm xử lý xóa tất cả sản phẩm trong giỏ hàng
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <Container className='container-cart'>
            <Table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Price</th>
                        <th>Số lượng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Row>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className='img-div'>
                                            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </td>
                            <td>{item.price} ₫</td>
                            <td>{item.quantity}</td>
                            <td>
                                {/* Thay đổi: Nút xóa sản phẩm khỏi giỏ hàng */}
                                <Button color="danger" onClick={() => handleRemove(item.id, item.size)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Thay đổi: Nút xóa tất cả sản phẩm trong giỏ hàng */}
            <Button color="primary" onClick={handleClearCart}>Xóa tất cả</Button>
        </Container>
    );
}
