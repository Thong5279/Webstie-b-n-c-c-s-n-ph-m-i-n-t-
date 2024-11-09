import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import SummaryApi from "../common";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  // xử lý khi click vào trái tim
  const [likedItems, setLikedItems] = useState(() => {
    const savedLiked = localStorage.getItem("likedItems");
    return savedLiked ? JSON.parse(savedLiked) : {}; // Nếu có thì parse, nếu không thì trả về {}
  });
  const handleHeart = async (e, productId) => {
    e.preventDefault();

    // Cập nhật trạng thái yêu thích
    setLikedItems((prev) => {
      const newLikedItems = {
        ...prev,
        [productId]: !prev[productId],
      };

      // Lưu lại vào localStorage
      localStorage.setItem("likedItems", JSON.stringify(newLikedItems));

      return newLikedItems;
    });

    // Gửi yêu cầu POST lên API để thêm sản phẩm vào danh sách yêu thích
    await fetch(SummaryApi.favorites.url, {
      method: SummaryApi.favorites.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
  };

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };
  //
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block hover:bg-red-400 hover:text-white"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block hover:bg-red-400 hover:text-white"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] max-w-[320px] bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3 ">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                      {product?.price !== product?.sellingPrice && (
                        <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                      )}
                    </div>
                    <button className="text-sm text-white px-3 py-0.5 rounded-full bg-slate-200 py-2 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] max-w-[320px] bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3 ">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">
                      {product?.productName}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="capitalize text-slate-500">
                        {product?.category}
                      </p>
                      <div
                        className={`cursor-pointer ${
                          likedItems[product._id]
                            ? "text-red-500"
                            : "text-slate-300"
                        }`}
                        onClick={(e) => handleHeart(e, product._id)}
                      >
                        <FaHeart className="text-xl" />{" "}
                        {/** Đang xử bỏ attribute của thẻ link cha trong thẻ div con */}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayVNDCurrency(product?.sellingPrice)}
                      </p>
                      {product?.price !== product?.sellingPrice && (
                        <p className="text-slate-500 line-through">
                          {displayVNDCurrency(product?.price)}
                        </p>
                      )}
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
