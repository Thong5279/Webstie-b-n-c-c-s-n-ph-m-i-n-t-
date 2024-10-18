import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct />

      <HorizontalCardProduct category={"smartwatch"}heading={"Điện thoại nổi bật"}/>
      <HorizontalCardProduct category={"airpodes"}heading={"Tai nghe nổi bật"}/>
      

      <VerticalCardProduct category={"mobiles"}heading={"Điện Thoại"}/>

    </div>
  )
}

export default Home 