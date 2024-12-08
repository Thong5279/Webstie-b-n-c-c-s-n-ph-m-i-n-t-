import React from 'react';
import { IoClose } from "react-icons/io5";
import welcomeGif from '../img/Ecommerce web page.gif';

const WelcomeModal = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IoClose size={32} />
        </button>
        
        <div className="text-center">
          <img 
            src={welcomeGif}
            alt="Welcome"
            className="w-full h-auto mb-6 rounded-lg"
            style={{ maxHeight: '70vh' }}
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Chào mừng {username} đã quay trở lại!
          </h2>
          <p className="text-xl text-gray-600">
            Chúc bạn có trải nghiệm mua sắm tuyệt vời tại Mobile Store
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 