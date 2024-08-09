import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col } from 'reactstrap'
import './product.scss'

export default function Product(props) {
    const { product } = props
    return (

        <Link className='link-ct' to={`/product-detail/${product.id}`} data-aos="fade-down">
            <Card className='product'>
                <div>
                    <img style={{
                        width: '70%'
                    }}
                        alt="Sample"
                        src={require(`../../images/products/${product.img}.webp`)}
                    />
                </div>


                <CardBody>
                    <CardTitle tag="h5">
                        {product.name}
                    </CardTitle>
                    <CardSubtitle

                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        904764-102 | Giới tính: GS
                    </CardSubtitle>
                    <CardText className='price'>
                        {product.price} <span>₫</span>
                    </CardText>
                </CardBody>
            </Card>
        </Link>


    )
}
