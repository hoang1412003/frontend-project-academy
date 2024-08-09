import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { fetchProductById } from '../../redux/productsSlice';
import { addItemToCart } from '../../redux/cartSlice'; // Thêm import
import './ProductDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

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
            Swal.fire({
                title: "Good job!",
                text: "Đã thêm vào giõ hàng!",
                icon: "success"
              });
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
            <div className='urls' data-aos="fade-right">
                <Link to={'/'}>Trang chủ</Link>
                <Link to={'/products'}><span>/</span>Sản phẩm</Link>
                <Link to={`/product-detail/${selectedProduct.id}`}><span>/</span>{selectedProduct.name}</Link>
            </div>
            <Row className="product-detail">
                <Col lg={6} md={6} sm={12} xs={12} data-aos="fade-down-right">
                    <div className="product-image">
                        <img src={require(`../../images/products/${selectedProduct.img}.webp`)} alt={selectedProduct.name} />
                    </div>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12} data-aos="fade-down-left">
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
            <Row className='row-legit'>
                <Col lg={4} md={4} sm={12} xs={12} data-aos="flip-left" className='mt-4'>
                    <div className='letgit'>
                        <div className='icon-div'>
                            <i class="fa-regular fa-circle-check"></i>
                        </div>
                        <div>
                            <p>Cam kết chính hãng</p>
                            <p>Kicksplanet cam kết tất cả sản phẩm bán ra đều là hàng chính hãng. Cam kết bồi thường gấp ba giá trị đơn hàng nếu vi phạm cam kết này.</p>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} data-aos="flip-up" className='mt-4'>
                    <div className='letgit'>
                        <div className='icon-div'>
                            <i class="fa-brands fa-searchengin"></i>
                        </div>
                        <div>
                            <p>Quy trình kiểm định sản phẩm</p>
                            <p>Kicksplanet kiểm định nghiêm ngặt tất cả sản phẩm trước khi vận chuyển đến người mua hàng theo các tiêu chí cụ thể.</p>
                        </div>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} data-aos="flip-right" className='mt-4'>
                    <div className='letgit'>
                        <div className='icon-div'>
                            <i class="fa-solid fa-money-bill"></i>
                        </div>
                        <div>
                            <p>Bán hàng trên Kicksplanet.vn</p>
                            <p>Bạn có thể tiếp cận hàng ngàn khách hàng chỉ với ba bước bán hàng đơn giản.</p>
                        </div>
                    </div>
                </Col>
            </Row>
            
        </Container>
    );
}
