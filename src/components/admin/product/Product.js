import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import './product.scss'
export default function Product(props) {
    const {product, handle_delete, handle_update} = props

    const [editName, setEditName] = useState(product.name)
    const [flagName, setFlagName] = useState(false)

    const [editCategory,  setEditCategory] = useState(product.category)
    const [flagCategory, setFlagCategory] = useState(false)

    const [editPrice, setEditPrice] = useState(product.price)
    const [flagPrice, setFlagPrice] = useState(false)

    const [editImg, setEditImg] = useState();
    const [flagImg, setFlagImg] = useState()
    return (
        <tr>
            <th scope="row">
                {product.id}
            </th>
            <td onDoubleClick={()=>setFlagName(true)} onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                    handle_update({id: product.id, name: editName})
                    setFlagName(false)
                }
            }}>
                {flagName? <Input className='input-ct' value={editName} onChange={(e)=>setEditName(e.target.value)}/>: product.name}
            </td>
            <td onDoubleClick={()=>setFlagCategory(true)} onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                    handle_update({id: product.id, category: editCategory})
                    setFlagCategory(false)
                }
            }}>
                {flagCategory? <Input className='input-ct' value={editCategory} onChange={(e)=>setEditCategory(e.target.value)}/>: product.category}
            </td>
            <td onDoubleClick={()=>setFlagPrice(true)} onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                    handle_update({id: product.id, price: editPrice})
                    setFlagPrice(false)
                }
            }}>
            {flagPrice? <Input className='input-ct' value={editPrice} onChange={(e)=>setEditPrice(e.target.value)}/>: product.price}
            </td>
            
            <td onDoubleClick={()=>setFlagImg(true)} onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                    handle_update({id: product.id, img: editImg})
                    setFlagImg(false)
                }
            }}>
            {flagImg? <Input className='input-ct' value={editImg} onChange={(e)=>setEditImg(e.target.value)}/>: product.img}
            </td>

            <td>
                <Button className='btn-delete' onClick={()=>handle_delete(product.id)}>Delete</Button>
            </td>
        </tr>
    )
}
