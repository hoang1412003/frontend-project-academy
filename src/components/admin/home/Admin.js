import React, { useEffect, useState } from 'react';
import { Container, Input, Table } from 'reactstrap';
import { fetchProucts, addNewProduct, deleteProduct, setSearchQuery } from '../../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../product/Product';
import AddProduct from '../addProduct/AddProduct';
import Pagination from 'react-js-pagination';
import './admin.scss';

export default function Admin() {
    const { products, totalPage, searchQuery } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const handle_add = (product) => {
        dispatch(addNewProduct(product));
    };

    const handle_delete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(fetchProucts({ page: currentPage, limit: 10, searchQuery }));
    }, [currentPage, searchQuery, dispatch]);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <Container>
            <h1>Product Management</h1>
            <AddProduct handle_add={handle_add} />
            <Input className='search'
                placeholder="Search by name, category, or price"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <Product
                            key={index}
                            product={item}
                            handle_delete={handle_delete}
                        />
                    ))}
                </tbody>
            </Table>
            <Pagination
                activePage={currentPage}
                totalItemsCount={totalPage}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
            />
        </Container>
    );
}
