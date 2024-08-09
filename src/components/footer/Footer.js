import React from 'react'
import './footer.scss'
import { Col, Row } from 'reactstrap'
import logo from '../../images/footer/logo-white-horizon.png'
export default function Footer() {
    return (
        <div className='footer' data-aos="fade-up">
            
                <Row className='row-footer'>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className='information'>
                            <div className='logo'>
                                <img src={logo} />
                            </div>
                            <p>Công ty TNHH Kicksplanet</p>
                            <p>Giấy ĐKKD Số: 3603900535 - Ngày cấp: 15/02/2023</p>
                            <p>Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở Kế hoạch và Đầu tư tỉnh Đồng Nai</p>
                            <p>Địa chỉ đăng ký kinh doanh: 69/48 Nguyễn Ái Quốc, Khu phố 8, Phường Tân Phong, Thành phố Biên Hòa, Tỉnh Đồng Nai.</p>
                            <div className='icon'>
                                <a href='https://www.instagram.com/kicksplanet.vn/' target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
                                <a href='https://www.facebook.com/kicksplanet.vn' target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a>
                                <a href='https://www.tiktok.com/@kicksplanet.vn' target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-tiktok"></i></a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className='information'>
                            <h6>HỖ TRỢ KHÁCH HÀNG</h6>
                            <p>Chăm sóc khách hàng / báo lỗi: support@kicksplanet.vn</p>
                            <p>Hướng dẫn đặt hàng</p>
                            <p>Phương thức vận chuyển</p>
                            <p>Chính sách đổi trả / hoàn tiền</p>
                            <p>Chính sách cam kết bồi thường</p>
                            <p>Câu hỏi thường gặp</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className='information'>
                            <h6>VỀ KICKSPLANET</h6>
                            <p>Giới thiệu</p>
                            <p>Kicksplanet Blog</p>
                            <p>Điều khoản sử dụng</p>
                            <p>Chính sách bảo mật</p>
                            <p>Chính sách giải quyết khiếu nại</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12} xs={12}>
                        <div className='information'>
                            <h6>BÁN HÀNG TRÊN KICKSPLANET</h6>
                            <p>Quy chế hoạt động sàn TMĐT Kicksplanet</p>
                            <p>Hướng dẫn bán hàng</p>
                            <p>Quy định đăng bán sản phẩm</p>
                            <p>Chính sách cấm/hạn chế sản phẩm</p>
                            <p>Quy định đóng gói sản phẩm</p>
                            <p>Quy định về tình trạng sản phẩm</p>
                        </div>
                    </Col>
                </Row>
                <p style={{marginTop:"20px", color:"#fff"}}>Copyright © 2024 Thân Văn Hoàng.</p>
        </div>
    )
}

