import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './productsHome.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProucts } from '../../redux/productsSlice';
import Product from '../product/Product';

export default function ProductsHome() {
    const [currentPage, setCurrentPage] = useState(1);
    const { groupedProducts, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProucts({ page: currentPage }));
    }, [currentPage, dispatch]);

    
    const categories = [
        'jordan1',
        'airforce1',
        'dunk',
        'yeezy',
        'samba',
        'asicscourt'
    ];

    return (
        <Container className='container-ct'>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error loading products</p>}
            {categories.map(category => (
                groupedProducts[category] && groupedProducts[category].length > 0 && (
                    <div key={category}>
                        <h1 className='title-h1'>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                        <Row className='row-product'>
                            {groupedProducts[category].map((item, index) => (
                                <Col lg={3} md={4} sm={6} xs={6} className='mt-4 col-product' >
                                    <Product key={index} product={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                )
            ))}
        </Container>
    );
}
