import React, { useState, useEffect } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import ChatBox from '../components/ChatBox'
import ZaloBox from '../components/ZaloBox'
import WelcomeModal from '../components/WelcomeModal'

const Home = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success) {
          setUsername(data.data.firstName);
          // Kiểm tra localStorage để xem modal đã được đóng chưa
          const isModalClosed = localStorage.getItem('welcomeModalClosed');
          if (!isModalClosed) {
            setShowWelcomeModal(true);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
    // Lưu trạng thái đã đóng modal vào localStorage
    localStorage.setItem('welcomeModalClosed', 'true');
  };

  return (
    <div>
      <CategoryList/>
      <BannerProduct />
      <ZaloBox />
      <ChatBox />

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

      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseModal}
        username={username}
      />
    </div>
  )
}

export default Home 