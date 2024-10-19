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

      <HorizontalCardProduct category={"smartwatch"}heading={"Smart watch nổi bật"}/>
      <HorizontalCardProduct category={"airpodes"}heading={"Tai nghe nổi bật"}/>
      

      <VerticalCardProduct category={"mobiles"}heading={"Điện Thoại"}/>
      <VerticalCardProduct category={"laptops"}heading={"Laptop"}/>
      <VerticalCardProduct category={"gameconsole"}heading={"Máy chơi game"}/>
      <VerticalCardProduct category={"keyboard"}heading={"Bàn phím"}/>
      <VerticalCardProduct category={"earphone"}heading={"Tai nghe"}/>
      <VerticalCardProduct category={"mouse"}heading={"Chuột"}/>
      <VerticalCardProduct category={"speakers"}heading={"Loa"}/>
      <VerticalCardProduct category={"màn hình"}heading={"Màn hình máy tính"}/>
      <VerticalCardProduct category={"televisions"}heading={"Màn hình tivi"}/>
      <VerticalCardProduct category={"watches"}heading={"Đồng hồ"}/>
      <VerticalCardProduct category={"accessories"}heading={"Phụ kiện điện thoại"}/>
      <VerticalCardProduct category={"processor"}heading={"CPU-bộ xử lý"}/>
      <VerticalCardProduct category={"camera"}heading={"Camera"}/>
      <VerticalCardProduct category={"printers"}heading={"Máy in"}/>

    </div>
  )
}

export default Home 