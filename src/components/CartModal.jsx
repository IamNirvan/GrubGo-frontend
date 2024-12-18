import React, { useEffect, useState } from "react";
import useAxios from "../util/useAxios";
import { selectUserInfo } from "../redux/features/authSlice";
import { useSelector } from "react-redux";
import httpMethodTypes from "../constants/httpMethodTypes";
import "@fontsource/poppins";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartModal = ({ onClose }) => {
  const { sendRequest } = useAxios();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  const [cartContent, setCartContent] = useState({
    totalValue: 0,
    itemCount: 0,
    dishes: [],
  });

  // Load Cart Content
  const loadCartContent = async () => {
    const cartId = userInfo.cartId;
    if (!cartId) {
      console.error("Cart ID not found in user info");
      return;
    }

    const response = await sendRequest({
      url: `/v1/cart/${cartId}`,
      method: httpMethodTypes.GET,
    });

    setCartContent({
      totalValue: response.data.totalValue,
      itemCount: response.data.dishes.reduce(
        (acc, dish) => acc + dish.quantity,
        0
      ),
      dishes: response.data.dishes,
    });
  };

  useEffect(() => {
    loadCartContent();
  }, []);

  // Handle Quantity Change
  const handleQuantityChange = async (dishId, newQuantity) => {
    if (newQuantity < 0) return;

    // Optionally send update to server
    const payload = [{ dishPortionId: dishId, quantity: newQuantity }];
    console.log("payload = ", payload);

    try {
      await sendRequest({
        url: `/v1/cart/${userInfo.cartId}?overrideQuantity=true`,
        method: httpMethodTypes.PATCH,
        data: payload,
      });

      loadCartContent();
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleCheckoutOnClick = () => {
    navigate();
  };

  return (
    <div className="bg-white p-6 rounded-[4px] w-[490px] text-left shadow-xl font-[Poppins]">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-[25px] font-bold mb-[10px]">Your Cart</h2>
      <p className="text-gray-600 mb-4">
        <span>{cartContent.itemCount} items</span>
        <span className="float-right font-semibold text-gray-900">
          Total: {cartContent.totalValue} LKR
        </span>
      </p>

      {/* Cart Items */}
      <div className="border-t border-gray-200 pt-4 pb-4 text-[15px]">
        {cartContent.dishes.map((dish) => (
          <div key={dish.id} className="flex items-center justify-between mb-4">
            {/* Dish Name and Quantity Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-row items-center space-x-2">
                  <p
                    value={dish.quantity}
                    className="bg-gray-200 px-[12px] py-[5px] text-center border rounded-[4px]"
                  >
                    {dish.quantity}
                  </p>
                  <div>
                    {dish.dishName} ({dish.portionName})
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center  space-x-8">
              <div className="flex items-center pl-[15px] space-x-2">
                {/* Decrease Quantity */}
                <button
                  onClick={() =>
                    handleQuantityChange(dish.id, dish.quantity - 1)
                  }
                  className="bg-gray-200 px-2 rounded-[4px] hover:bg-gray-300"
                >
                  -
                </button>

                {/* Increase Quantity */}
                <button
                  onClick={() =>
                    handleQuantityChange(dish.id, dish.quantity + 1)
                  }
                  className="bg-gray-200 px-2 rounded-[4px] hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              {/* Price */}
              <span className="font-semibold text-gray-900">
                LKR {dish.price * dish.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckoutOnClick}
        className="w-full mt-8 py-3 bg-[#FF725E] text-[16px] text-white font-bold rounded-lg hover:bg-[#FF725E] focus:outline-none focus:ring-2 focus:ring-[#FF725E]"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartModal;
