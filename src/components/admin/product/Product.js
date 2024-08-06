import React from 'react'
import { Button } from 'reactstrap'
import './product.scss'
export default function Product(props) {
    const {product, handle_delete} = props 
    return (
        <tr>
            <th scope="row">
                {product.id}
            </th>
            <td>
                {product.name}
            </td>
            <td>
                {product.category}
            </td>
            <td>
                {product.price}
            </td>
            <td>
                <Button className='btn-delete' onClick={()=>handle_delete(product.id)}>Delete</Button>
            </td>
        </tr>
    )
}
