import React, { useEffect, useState } from 'react'

import {Container, Row } from 'reactstrap'
import './productsHome.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProucts } from '../../redux/productsSlice'
import Product from '../product/Product'
export default function ProductsHome() {
    const [currentPage, setCurrentPage] = useState(1)
    const { products, totalPage } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProucts({page: currentPage,limit: 8}))
    }, [currentPage])

    return (
        <Container className='container-ct'>
            <h1>Jordan 1</h1>
            <Row>

                {
                    products.map((item, index) => (
                        <Product product ={item} key={index}/>
                    ))
                }
            </Row>
        </Container>
    )
}
