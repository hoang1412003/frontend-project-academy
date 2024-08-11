import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const OrderForm = ({ formData, handleChange, handleSubmit, toggleModal }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="fullName">Họ và tên</Label>
                <Input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="city">Tỉnh/Thành phố</Label>
                <Input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="district">Quận/Huyện</Label>
                <Input type="text" name="district" id="district" value={formData.district} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="ward">Phường/Xã</Label>
                <Input type="text" name="ward" id="ward" value={formData.ward} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="address">Địa chỉ cụ thể</Label>
                <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
            </FormGroup>
            <Button type="submit" color="primary">Xác nhận</Button>
        </Form>
    );
};

export default OrderForm;
