import React from 'react'
import Header from '../../components/header/Header'
import Slide from '../../components/slide/Slide'
import ProductsHome from '../../components/products/ProductsHome'
import Footer from '../../components/footer/Footer'

export default function Home() {
  return (
    <div>
        <Header/>
        <Slide/>
        <ProductsHome/>
        <Footer/>
    </div>
  )
}
