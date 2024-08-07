import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import Product from '../product/Product';
import { fetchProucts, setSearchQuery, setSortBy, setOrder } from '../../redux/productsSlice';
import banner from '../../images/prouduct-page/banner_trang_san_pham_38845897f6.webp';
import './products.scss';
import Pagination from 'react-js-pagination';

export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const { products, status, searchQuery, totalPage, sortBy, order } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProucts({ page: currentPage, limit: 12, searchQuery, sortBy, order }));
    }, [currentPage, searchQuery, sortBy, order, dispatch]); // Thay đổi: Thêm sortBy và order vào dependency array

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    // Thay đổi: Thêm hàm để xử lý thay đổi của menu chọn sắp xếp
    const handleSortChange = (e) => {
        const [sortField, sortOrder] = e.target.value.split('|');
        dispatch(setSortBy(sortField));
        dispatch(setOrder(sortOrder));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className='products-container'>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error loading products</p>}
            <h1>Sản phẩm</h1>
            <Row>
                <Col lg={3} md={9}>
                    <div>
                        <div className='search-products'>
                            <Input className='ip-ct' placeholder='Search'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className='select-div'>
                            <select className='sort-select sort-select-ct' onChange={handleSortChange} value={`${sortBy}|${order}`}>
                                <option value='default|asc'>Mặc định</option>
                                <option value='price|asc'>Giá: Tăng dần</option>  {/* Thay đổi: Thêm tùy chọn sắp xếp theo giá tăng dần */}
                                <option value='price|desc'>Giá: Giảm dần</option> {/* Thay đổi: Thêm tùy chọn sắp xếp theo giá giảm dần */}
                            </select>
                        </div>
                    </div>
                </Col>
                <Col lg={9} md={9} className='col-ct'>
                    <div>
                        <div className='img-ct'>
                            <img src={banner} />
                        </div>
                        <Row className='row-product'>
                            {products.map((item, index) => (
                                <Col lg={4} md={4} sm={6} xs={6} className='mt-4' key={index}>
                                    <Product product={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <Pagination
                        activePage={currentPage}
                        totalItemsCount={totalPage}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
}
