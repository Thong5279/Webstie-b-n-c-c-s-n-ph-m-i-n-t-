import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayVNDCurrency from "../helpers/displayCurrency";
import { FaTrash } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa6";
import { ImQrcode } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CheckoutPage from "../components/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [userInfo, setUserInfo] = useState({
    phone: "",
    address: "",
    name: "",
  });
  const [selectedVoucher, setSelectedVoucher] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [showShippingFee, setShowShippingFee] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({
    icon: <FaMoneyBillWave className="text-red-500" />,
    text: "Thanh toán khi nhận hàng",
  });
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isShopVoucherDisabled, setIsShopVoucherDisabled] = useState(false);

  const [isVoucherValid, setIsVoucherValid] = useState(false);

  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [disabledInputVoucher, setDisabledVoucherInput] = useState(false); //Vo hieu hoa o nhap voucher khi chon voucher shop

  //Hàm nhận discountAmount(mã giảm giá khi có voucher) từ API bên component con
  const [disCountAmountVoucher, setDisCountAmountVoucher] = useState(0);

  const handleDiscountAmountChange = (totalDiscountAmount, disCountAmount) => {
    setTotalDiscountAmount(totalDiscountAmount);
    setDisCountAmountVoucher(disCountAmount);
  };

  // Ham CallBack de nhan trang thai tu component con

  const handleVoucherStatusChange = (status) => {
    setIsShopVoucherDisabled(status);
  };

  const paymentOptions = [
    {
      icon: <FaMoneyBillWave className="text-red-500" />,
      text: "Thanh toán khi nhận hàng",
    },
    {
      icon: <FaCreditCard className="text-purple-500" />,
      text: "Thẻ tín dụng/ghi nợ",
      
    },
    {
      icon: <ImQrcode className="text-green-500" />,
      text: "QR Pay",
    },
    {
      icon: <FaPaypal className="text-blue-500" />,
      text: "PayPal",
    },
  ];

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDropdown(false);
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    fetchUserInfo();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
      method: SummaryApi.updateAddToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantityCart: qty + 1,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
        method: SummaryApi.updateAddToCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantityCart: qty - 1,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
      method: SummaryApi.deleteAddToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePayment = async () => {
    const selectedItems = data.filter(
      (product) => selectedProducts[product._id]
    );

    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }

    if (!isShippingSelected) {
      toast.error("Vui lòng chọn đơn vị vận chuyển trước khi đặt hàng");
      return;
    }

    if (selectedPayment.text === "PayPal" || selectedPayment.text === "Thẻ tín dụng/ghi nợ") {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );

      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: selectedItems,
          totalAmount: finalTotalAmount,
        }),
      });

      const responseData = await response.json();

      if (responseData?.id) {
        stripePromise.redirectToCheckout({ sessionId: responseData.id });
      }
    } else if (selectedPayment.text === "Thanh toán khi nhận hàng") {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmOrder = () => {
    setShowConfirmModal(false);
    navigate("/success");
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) =>
      selectedProducts[currentValue._id]
        ? previousValue + currentValue.quantityCart
        : previousValue,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) =>
      selectedProducts[curr._id]
        ? preve + curr.quantityCart * curr?.productId?.sellingPrice
        : preve,
    0
  );

  const discountAmount = totalPrice * selectedVoucher;
  const finalPrice = totalPrice - discountAmount;

  const fetchUserInfo = async () => {
    try {
      console.log("Đang gọi API lấy thông tin user...");
      const response = await fetch(SummaryApi.current_user.url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("Dữ liệu user nhận được:", responseData);

      if (responseData.success) {
        setUserInfo({
          phone: responseData.data.phone || "",
          address: responseData.data.address || "",
          name: responseData.data.name || "",
        });
        console.log("Đã cập nhật userInfo:", {
          phone: responseData.data.phone,
          address: responseData.data.address,
          name: responseData.data.name,
        });
      } else {
        console.error("Lỗi khi lấy thông tin:", responseData.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleVoucherChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "Giảm tối đa 5%":
        setSelectedVoucher(0.05);
        setDisabledVoucherInput(true);
        break;
      case "Giảm tối đa 10%":
        setSelectedVoucher(0.1);
        setDisabledVoucherInput(true);
        break;
      case "Giảm tối đa 15%":
        setSelectedVoucher(0.15);
        setDisabledVoucherInput(true);
        break;
      default:
        setSelectedVoucher(0);
        setDisabledVoucherInput(false);
    }
  };

  const handleShippingChange = (e) => {
    const value = e.target.value;
    setShowShippingFee(true);

    if (value === "Chọn đơn vị vận chuyển") {
      setIsShippingSelected(false);
      setShippingFee(30000);
      setShowShippingFee(false);
      return;
    }

    setIsShippingSelected(true);

    if (finalPrice >= 5000000) {
      setShippingFee(0);
      return;
    }

    switch (value) {
      case "Giao hàng nhanh":
        setShippingFee(45000);
        break;
      case "NinJa Van":
        setShippingFee(35000);
        break;
      case "Giao hàng tiết kiệm":
        setShippingFee(25000);
        break;
      default:
        setShippingFee(30000);
        setShowShippingFee(false);
    }
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Reset selectAllChecked when data changes
  useEffect(() => {
    setSelectAllChecked(false);
  }, [data]);

  const handleSelectAll = () => {
    const newSelectAllState = !selectAllChecked;
    setSelectAllChecked(newSelectAllState);

    // Cập nhật trạng thái chọn cho tất cả sản phẩm dựa trên newSelectAllState
    const updatedSelectedProducts = {};
    data.forEach((product) => {
      updatedSelectedProducts[product._id] = newSelectAllState;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const [isShippingSelected, setIsShippingSelected] = useState(false);

  const [finalTotalAmount, setFinalTotalAmount] = useState(0);

  const calculateFinalTotal = () => {
    let total = 0;

    if (totalDiscountAmount > 0) {
      total =
        totalDiscountAmount +
        (totalDiscountAmount >= 5000000 ? 0 : shippingFee);
    } else {
      total = finalPrice + (finalPrice >= 5000000 ? 0 : shippingFee);
    }

    setFinalTotalAmount(total);
    return total;
  };

  useEffect(() => {
    calculateFinalTotal();
  }, [totalDiscountAmount, finalPrice, shippingFee]);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="animate-bounce mb-6">
              <FaShoppingCart className="text-8xl text-red-500" />
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 animate-pulse">
              Ồ! Giỏ hàng của bạn đang trống
            </h2>

            <p className="text-gray-600 mb-8 max-w-md">
              Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Hãy khám
              phá những sản phẩm tuyệt vời của chúng tôi!
            </p>

            <Link
              to="/"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span>Mua sắm ngay</span>
              <FaArrowRight className="animate-pulse" />
            </Link>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  Sản phẩm chất lượng
                </h3>
                <p className="text-gray-600">Đảm bảo chính hãng 100%</p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  Giao hàng nhanh
                </h3>
                <p className="text-gray-600">Nhận hàng trong 24h</p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  Ưu đãi hấp dẫn
                </h3>
                <p className="text-gray-600">Giảm giá đến 50%</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className=" my-12 px-4">
        {/* Checkbox Chọn Tất Cả */}
        {data.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-red-600"
              checked={selectAllChecked}
              onChange={handleSelectAll}
            />
            <label className="text-lg font-medium">Chọn tất cả sản phẩm</label>
          </div>
        )}

        {
          // Kiem tra neu khong có đơn hàng nào trong giỏ hàng thì ẩn phần thanh toán
          data.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
              <div className="w-full max-w-3xl">
                {loading
                  ? loadingCart.map((el, index) => {
                      return (
                        <div
                          key={el + "Add to cart loading" + index}
                          className="w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded"
                        ></div>
                      );
                    })
                  : data.map((product, index) => {
                      return (
                        <div className="flex" key={product?._id}>
                          <input
                            type="checkbox"
                            className="w-5 mx-4 cursor-pointer accent-red-600"
                            checked={selectedProducts[product._id] || false}
                            onChange={() => handleCheckboxChange(product._id)}
                          />
                          <div className="w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]">
                            <div className="w-32 h-full bg-slate-200">
                              <img
                                src={product?.productId?.productImage[0]}
                                className="h-full object-cover"
                                alt="product"
                              />
                            </div>
                            <div className="px-4 relative">
                              <div
                                className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition duration-300"
                                onClick={() => deleteProduct(product?._id)}
                              >
                                <FaTrash />
                              </div>
                              <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                                {product?.productId?.productName}
                              </h2>
                              <p className="capitalize text-slate-500">
                                {product?.productId?.category}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-red-600 font-medium text-lg">
                                  {displayVNDCurrency(
                                    product?.productId?.sellingPrice
                                  )}
                                </p>
                                <p className="text-slate-500 font-medium text-lg line-through">
                                  {displayVNDCurrency(
                                    product?.productId?.price
                                  )}
                                </p>
                                <p className="text-slate-600 font-semibold text-lg">
                                  {displayVNDCurrency(
                                    product?.productId?.sellingPrice *
                                      product?.quantityCart
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  className="border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center transform hover:scale-110 transition duration-300 shadow-md"
                                  onClick={() =>
                                    decreaseQty(
                                      product?._id,
                                      product?.quantityCart
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span>{product?.quantityCart}</span>
                                <button
                                  className="border border-red-500 rounded-full hover:bg-red-500 hover:text-white w-6 h-6 flex items-center justify-center transform hover:scale-110 transition duration-300 shadow-md"
                                  onClick={() =>
                                    increaseQty(
                                      product?._id,
                                      product?.quantityCart
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              {/* Thanh toán */}
              {data[0] && (
                <div className="mt-5 lg:mt-0 w-full max-w-full">
                  {loading ? (
                    <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                  ) : (
                    <>
                      <div className="min-h-36 bg-white rounded-lg shadow-lg">
                        <h2 className="text-white bg-gradient-to-r from-red-600 to-red-400 px-6 py-3 rounded-t-lg text-xl font-bold flex items-center gap-3">
                          <FaShoppingBag className="text-2xl" /> Đơn Hàng Của
                          Bạn
                        </h2>
                        <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                          <p className="flex items-center gap-2">
                            <FaBox className="text-red-500 text-xl" /> Số Lượng
                            Sản Phẩm:
                          </p>
                          <p className="text-xl font-semibold">{totalQty}</p>
                        </div>
                        <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                          <p className="flex items-center gap-2">
                            <FaUser className="text-red-500 text-xl" /> Thông
                            tin người nhận:
                          </p>
                          <p className="text-lg font-medium">{userInfo.name}</p>
                        </div>
                        <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                          <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-red-500 text-xl" /> Số
                            điện thoại:
                          </p>
                          <p className="text-lg font-medium">
                            {userInfo.phone}
                          </p>
                        </div>
                        <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                          <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500 text-xl" />{" "}
                            Địa chỉ nhận hàng:
                          </p>
                          <p className="text-lg font-medium">
                            {userInfo.address}
                          </p>
                        </div>
                        <div className="px-6 py-4 font-medium text-slate-600 border-b ">
                          {/* <p className='pb-2 text-left flex items-center gap-2'><FaGift className="text-red-500 text-xl"/> Mã Giảm Giá:</p> */}
                          {/* <input placeholder='Nhập mã giảm giá' className='outline-none border border-solid p-3 w-[270px] focus:border-red-500 transition duration-300 rounded-lg' /> */}
                          <CheckoutPage
                            totalAmount={finalPrice}
                            onVoucherStatusChange={handleVoucherStatusChange}
                            onDiscountAmountChange={handleDiscountAmountChange}
                            disabledInputVoucher={disabledInputVoucher}
                            setIsVoucherValid={setIsVoucherValid}
                            isVoucherValid={isVoucherValid}
                            className="w-full"
                          />
                        </div>

                        <div className="px-6 flex items-center justify-between border-b py-4">
                          <label className="text-slate-600 font-medium text-lg flex items-center gap-2">
                            <FaPercent className="text-red-500 text-xl" />{" "}
                            Voucher Của Shop:
                          </label>
                          <select
                            className="ml-3 border border-solid hover:border-red-500 outline-none p-3 cursor-pointer w-[270px] transition duration-300 rounded-lg"
                            onChange={handleVoucherChange}
                            disabled={isShopVoucherDisabled}
                          >
                            <option>Chọn Voucher</option>
                            {totalPrice >= 1000000 && (
                              <option>Giảm tối đa 5%</option>
                            )}
                            {totalPrice >= 3000000 && (
                              <option>Giảm tối đa 10%</option>
                            )}
                            {totalPrice >= 5000000 && (
                              <option>Giảm tối đa 15%</option>
                            )}
                          </select>
                        </div>

                        <div className="px-6 flex items-center justify-between border-b py-4">
                          <label className="text-slate-600 font-medium text-lg flex items-center gap-2">
                            <FaShippingFast className="text-red-500 text-xl" />{" "}
                            Đơn vị vận chuyển:{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            className={`ml-3 border border-solid outline-none p-3 cursor-pointer w-[270px] transition duration-300 rounded-lg ${
                              !isShippingSelected
                                ? "border-red-500"
                                : "hover:border-red-500"
                            }`}
                            onChange={handleShippingChange}
                          >
                            <option>Chọn đơn vị vận chuyển</option>
                            <option>Giao hàng nhanh</option>
                            <option>NinJa Van</option>
                            <option>Giao hàng tiết kiệm</option>
                          </select>
                        </div>
                        {showShippingFee && (
                          <div className="flex justify-between items-center px-6 py-4 border-b">
                            <p className="flex text-slate-600 font-medium text-lg items-center gap-2">
                              <FaTruck className="text-red-500 text-xl" /> Phí
                              vận chuyển:
                            </p>
                            <p className="text-slate-600 font-semibold text-lg flex items-center gap-2">
                              {finalPrice >= 5000000 ? (
                                <>
                                  <FaGift className="text-green-500 text-xl" />{" "}
                                  Miễn phí
                                </>
                              ) : (
                                <>
                                  <FaMoneyBillWave className="text-red-500 text-xl" />{" "}
                                  {displayVNDCurrency(shippingFee)}
                                </>
                              )}
                            </p>
                          </div>
                        )}

                        <div className="px-6 flex items-center justify-between border-b py-4">
                          <label className="text-slate-600 font-medium text-lg flex items-center gap-2">
                            <FaMoneyBillWave className="text-red-500 text-xl" />{" "}
                            Phương Thức Thanh Toán:
                          </label>
                          <div className="relative">
                            <div
                              className="ml-3 border border-solid hover:border-red-500 outline-none p-3 cursor-pointer w-[270px] transition duration-300 rounded-lg flex items-center justify-between"
                              onClick={() =>
                                setShowPaymentDropdown(!showPaymentDropdown)
                              }
                            >
                              <div className="flex items-center gap-2">
                                {selectedPayment.icon}
                                <span>{selectedPayment.text}</span>
                              </div>
                              <FaAngleDown
                                className={`transition-transform duration-300 ${
                                  showPaymentDropdown ? "rotate-180" : ""
                                }`}
                              />
                            </div>

                            {showPaymentDropdown && (
                              <ul className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full">
                                {paymentOptions.map((option, index) => (
                                  <li
                                    key={index}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                                    onClick={() => handlePaymentSelect(option)}
                                  >
                                    {option.icon}
                                    <span>{option.text}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* {totalDiscountAmount > 0 ? (
                          <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                            <p className="flex items-center gap-2">
                              <FaTicketAlt className="text-red-500 text-xl" />
                              Số tiền được giảm:
                            </p>
                            <p className="text-red-500 text-xl font-bold">
                              -{displayVNDCurrency(totalDiscountAmount)}
                            </p>
                          </div>
                        ) : (
                          selectedVoucher > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                              <p className="flex items-center gap-2">
                                <FaTicketAlt className="text-red-500 text-xl" />
                                Số tiền được giảm:
                              </p>
                              <p className="text-red-500 text-xl font-bold">
                                -{displayVNDCurrency(discountAmount)}
                              </p>
                            </div>
                          )
                        )} */}
                        {totalDiscountAmount > 0 ? (
                          <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                            <p className="flex items-center gap-2">
                              <FaTicketAlt className="text-red-500 text-xl" />
                              Số tiền được giảm:
                            </p>
                            {isVoucherValid && disCountAmountVoucher > 0 && (
                              <p className="text-red-500 text-xl font-bold">
                                -{displayVNDCurrency(disCountAmountVoucher)}
                              </p>
                            )}
                          </div>
                        ) : (
                          selectedVoucher > 0 &&
                          discountAmount > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-lg text-slate-600 border-b">
                              <p className="flex items-center gap-2">
                                <FaTicketAlt className="text-red-500 text-xl" />
                                Số tiền được giảm:
                              </p>
                              <p className="text-red-500 text-xl font-bold">
                                -{displayVNDCurrency(discountAmount)}
                              </p>
                            </div>
                          )
                        )}

                        <div className="flex items-center justify-between px-6 py-4 font-medium gap-2 text-xl border-b">
                          <p className="flex items-center gap-2">
                            <BiSolidCoinStack className="text-red-500 text-2xl" />{" "}
                            Tổng Thanh Toán:
                          </p>
                          <p className="text-red-600 font-bold text-2xl">
                            {displayVNDCurrency(
                              totalDiscountAmount > 0
                                ? totalDiscountAmount +
                                    (totalDiscountAmount >= 5000000
                                      ? 0
                                      : shippingFee)
                                : finalPrice +
                                    (finalPrice >= 5000000 ? 0 : shippingFee)
                            )}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          {/* Đặt hàng */}
                          <button
                            className={`bg-gradient-to-r from-red-600 to-red-400 w-[95%] text-white p-4 my-4 hover:from-red-400 hover:to-red-600 rounded-lg font-bold text-xl transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                              totalQty === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={handlePayment}
                            disabled={totalQty === 0}
                          >
                            <FaShoppingCart className="text-2xl" /> Đặt Hàng
                            Ngay
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        }
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl shadow-2xl p-6 transform transition-all animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBag className="text-3xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Xác nhận đặt hàng
              </h3>
              <p className="text-gray-600">
                Bạn có chắc chắn muốn đặt hàng với phương thức thanh toán khi
                nhận hàng?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
