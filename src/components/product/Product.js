import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col } from 'reactstrap'
import './product.scss'
export default function Product(props) {
    const { product } = props
    return (
        <Col lg={3} md={4} sm={6} xs={6} className='mt-4'>
            <Link className='link-ct' to={'/product-detail'}>
                <Card className='product'>

                    <img style={{
                        width: '70%'
                    }}
                        alt="Sample"
                        src="https://kicksplanet.vn/_v2/_next/image?url=https%3A%2F%2Fs3.ap-southeast-1.amazonaws.com%2Fkicksplanet-public%2Ff8a480c8-9305-4182-a4cb-1bbb603a4876_md.webp&w=256&q=75"
                    />

                    <CardBody>
                        <CardTitle tag="h5">
                            {product.name}
                        </CardTitle>
                        <CardSubtitle

                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            DC0774-101 | Giới tính: Nữ
                        </CardSubtitle>
                        <CardText>
                            {product.price}
                        </CardText>
                    </CardBody>
                </Card>
            </Link>

        </Col>
    )
}
