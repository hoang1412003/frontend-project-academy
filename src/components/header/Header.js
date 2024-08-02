import React, { useEffect, useState } from 'react';
import logoDefault from "../../images/logo/logo-black-horizon.webp";
import logoSmall from "../../images/logo/k-icon-black.webp";
import "./header.scss";
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import MenuTH from '../menu/MenuTH';

function Header() {
  const [logoSrc, setLogoSrc] = useState(logoDefault);
  const [activeLink, setActiveLink] = useState('/'); // Đặt đường dẫn mặc định là '/'
  const [showMenuTH, setShowMenuTH] = useState(false);
  
  const handleResize = () => {
    if (window.innerWidth < 576) {
      setLogoSrc(logoSmall);
    } else {
      setLogoSrc(logoDefault);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path); // Cập nhật đường dẫn liên kết đang được chọn
  };

  return (
    <Container className='contain-header'>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} className='col-hd1'>
          <Link to={`/`} className='logo-img'>
            <img src={logoSrc} alt="Logo" />
          </Link>
          <div>
            <button className='icon-ct'><i className="fa-solid fa-magnifying-glass"></i></button>
            <button className='icon-ct'><i className="fa-solid fa-cart-shopping"></i></button>
            {
              window.innerWidth < 576 && <button className='icon-ct'><i className="fa-solid fa-bars"></i></button>
            }
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} >
          <ul className='menu'>
            <li>
              <Link
                className={`link-hd2 ${activeLink === '/' ? 'active' : ''}`}
                to={'/'}
                onClick={() => handleLinkClick('/')}
              >
                Trang chủ
              </Link>
            </li>
            <li className='li-th'
            onMouseEnter={() => setShowMenuTH(true)}
            onMouseLeave={() => setShowMenuTH(false)}
            >
              <p className={`link-hd2 ${activeLink === '/trending' ? 'active' : ''}`} onClick={() => handleLinkClick('/trending')}>
                Top thịnh hành
              </p>
              {showMenuTH && <MenuTH />}
            </li>
            <li>
              <Link
                className={`link-hd2 ${activeLink === '/products' ? 'active' : ''}`}
                to={'/products'}
                onClick={() => handleLinkClick('/products')}
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                className={`link-hd2 ${activeLink === '/news' ? 'active' : ''}`}
                to={'/news'}
                onClick={() => handleLinkClick('/news')}
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                className={`link-hd2 ${activeLink === '/about' ? 'active' : ''}`}
                to={'/about'}
                onClick={() => handleLinkClick('/about')}
              >
                Về Kicksplanet
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
