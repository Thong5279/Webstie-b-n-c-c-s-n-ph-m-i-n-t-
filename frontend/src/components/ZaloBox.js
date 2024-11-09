import React from "react";
import { Link } from "react-router-dom";

const ZaloBox = () => {
  return (
    <Link to={"/zalo-box"}>
      <div className="w-[50px] h-[50px] fixed bottom-24 right-4 hover:shadow-lg transform hover:scale-105 transition duration-300 z-50">
        <img
          src="https://cdn.divineshop.vn/static/9a3807bd0aeb1523d5088f182f8b69b6.svg"
          className="w-full h-full"
        />
      </div>
    </Link>
  );
};

export default ZaloBox;
