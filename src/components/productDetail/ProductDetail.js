import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { fetchProductById } from '../../redux/productsSlice';
import { addItemToCart } from '../../redux/cartSlice'; // Thêm import
import './ProductDetail.scss';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, status } = useSelector(state => state.products);
    const [activeSize, setActiveSize] = useState(null);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    const handleSizeClick = (size) => {
        setActiveSize(size);
    };

    // Thay đổi: Thêm hàm xử lý thêm sản phẩm vào giỏ hàng
    const handleAddToCart = () => {
        if (activeSize) {
            dispatch(addItemToCart({ product: selectedProduct, size: activeSize, quantity: 1 }));
        } else {
            alert("Vui lòng chọn size");
        }
    };

    if (status === "loading") {
        return <Container className='container-ct'><p>Loading...</p></Container>;
    }

    if (status === "failed") {
        return <Container className='container-ct'><p>Error loading product</p></Container>;
    }

    if (!selectedProduct) {
        return <Container className='container-ct'><p>Product not found</p></Container>;
    }

    return (
        <Container className='container-detail'>
            <div className='urls'>
                <Link to={'/'}>Trang chủ</Link>
                <Link to={'/products'}><span>/</span>Sản phẩm</Link>
                <Link to={`/product-detail/${selectedProduct.id}`}><span>/</span>{selectedProduct.name}</Link>
            </div>
            <Row className="product-detail">
                <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="product-image">
                        <img src='https://kicksplanet.vn/_v2/_next/image?url=https%3A%2F%2Fs3.ap-southeast-1.amazonaws.com%2Fkicksplanet-public%2Ff8a480c8-9305-4182-a4cb-1bbb603a4876_md.webp&w=256&q=75' alt={selectedProduct.name} />
                    </div>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="product-info">
                        <div className="product-title">
                            <h3>{selectedProduct.name}</h3>
                            <p>904764-102 | Giới tính: GS</p>
                            <p className='price'>{selectedProduct.price} ₫</p>
                        </div>
                        <div className="product-size">
                            <h5>Chọn size:</h5>
                            <Row>
                                {selectedProduct.size.map((item, index) => (
                                    <Col lg={3} md={3} sm={4} xs={4} className='mt-2' key={index}>
                                        <div
                                            className={`size-option ${activeSize === item ? 'active' : ''}`}
                                            onClick={() => handleSizeClick(item)}
                                        >
                                            {item}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className="product-actions">
                            <Button className='buy'>Mua ngay</Button>
                            {/* Thay đổi: Thêm sự kiện cho nút Thêm vào giỏ hàng */}
                            <Button className='add-cart' onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
