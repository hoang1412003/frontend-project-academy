import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { fetchProductById } from '../../redux/productsSlice';
import { addItemToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import OrderForm from '../orderForm/OrderForm';

import './ProductDetail.scss';

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, status } = useSelector(state => state.products);
    const [activeSize, setActiveSize] = useState(null);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        address: ''
    });

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    const handleSizeClick = (size) => {
        setActiveSize(size);
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

    const handleBuyNow = (e) => {
        e.preventDefault();
    
        const emailData = {
            ...formData,
            to_email: formData.email,
        };
    
        emailjs.send('service_eeqz6n8', 'template_5phw1aa', emailData, '6eiqz7Se7X7AHug_Y')
            .then((result) => {
                Swal.fire({
                    title: "Thành công!",
                    text: "Đơn hàng đã được đặt!",
                    icon: "success"
                });
                toggleModal();
            }, (error) => {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Có lỗi xảy ra với đơn hàng của bạn.",
                    icon: "error"
                });
            });
    };

    const handleAddToCart = () => {
        if (activeSize) {
            Swal.fire({
                title: "Thành công!",
                text: "Đã thêm vào giỏ hàng!",
                icon: "success"
            });
            dispatch(addItemToCart({ product: selectedProduct, size: activeSize, quantity: 1 }));
        } else {
            alert("Vui lòng chọn size");
        }
    };

    if (status === "loading") {
        return <Container className='container-ct'><p>Đang tải...</p></Container>;
    }

    if (status === "failed") {
        return <Container className='container-ct'><p>Lỗi tải sản phẩm</p></Container>;
    }

    if (!selectedProduct) {
        return <Container className='container-ct'><p>Không tìm thấy sản phẩm</p></Container>;
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
                            <Button className='buy' onClick={toggleModal}>Mua ngay</Button>
                            <Button className='add-cart' onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='row-legit'>
                <Col lg={4} md={4} sm={12} xs={12} data-aos="flip-left" className='mt-4'>
                    <div className='letgit'>
                        <div className='icon-div'>
                            <i className="fa-regular fa-circle-check"></i>
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
                            <i className="fa-brands fa-searchengin"></i>
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
                            <i className="fa-solid fa-money-bill"></i>
                        </div>
                        <div>
                            <p>Bán hàng trên Kicksplanet.vn</p>
                            <p>Bạn có thể tiếp cận hàng ngàn khách hàng chỉ với ba bước bán hàng đơn giản.</p>
                        </div>
                    </div>
                </Col>
            </Row>

            
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Thông tin đặt hàng</ModalHeader>
                <ModalBody>
                    <OrderForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleBuyNow}
                        toggleModal={toggleModal}
                    />
                </ModalBody>
            </Modal>
        </Container>
    );
}
