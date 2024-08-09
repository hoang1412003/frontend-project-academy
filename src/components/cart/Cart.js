import React from 'react';
import { Col, Container, Row, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, incrementItemQuantity, decrementItemQuantity } from '../../redux/cartSlice';
import './cart.scss';

export default function Cart() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);

    const handleRemove = (id, size) => {
        // Xử lý xóa sản phẩm khỏi giỏ hàng
        dispatch(removeItemFromCart({ id, size }));
    };

    const handleClearCart = () => {
        // Xử lý xóa tất cả sản phẩm trong giỏ hàng
        dispatch(clearCart());
    };

    const handleIncrement = (id, size) => {
        // Xử lý tăng số lượng sản phẩm
        dispatch(incrementItemQuantity({ id, size }));
    };

    const handleDecrement = (id, size) => {
        // Xử lý giảm số lượng sản phẩm
        dispatch(decrementItemQuantity({ id, size }));
    };

    return (
        <Container className='container-cart' data-aos="zoom-in-down">
            <Table>
                <thead>
                    <tr>
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
                                {/* Nút giảm số lượng */}
                                <div className='quantity'>
                                    <Button className='btn-ct' onClick={() => handleDecrement(item.id, item.size)}>-</Button>
                                    <div className='number'>{item.quantity}</div>

                                    {/* Nút tăng số lượng */}
                                    <Button className='btn-ct' onClick={() => handleIncrement(item.id, item.size)}>+</Button>
                                </div>

                            </td>
                            <td>
                                {/* Nút xóa sản phẩm khỏi giỏ hàng */}
                                <Button color="danger" onClick={() => handleRemove(item.id, item.size)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Nút xóa tất cả sản phẩm trong giỏ hàng */}
            <Button className='delete-all' color="primary" onClick={handleClearCart}>Xóa tất cả</Button>
        </Container>
    );
}
