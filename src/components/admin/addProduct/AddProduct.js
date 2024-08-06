import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import './addProduct.scss'
export default function AddProduct(props) {
    const {handle_add} = props 
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    return (
        <div className='add-product'>
            <div className='contain-ip'>
                <Row>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='ip-div'>
                            <Input className='input-ct' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='ip-div'>
                            <Input className='input-ct' placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)}/>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='ip-div'>
                            <Input className='input-ct' placeholder='price'  value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </div>
                    </Col>
                </Row>
            </div>

            <Button className='btn-ct' onClick={()=>{
                handle_add({name: name, category: category, price: price})
            }}>Add Product</Button>
        </div>
    )
}
