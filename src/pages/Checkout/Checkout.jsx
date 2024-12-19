import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/TopBar";
import useAxios from "../../util/useAxios";
import { selectUserInfo } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/features/authSlice";

const CartSummary = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const { sendRequest } = useAxios();
  const navigate = useNavigate();
  const [cartContent, setCartContent] = useState({
    dishes: [],
    itemCount: 0,
    totalValue: 0,
  });

  const loadCartDetails = async () => {
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

  const loadCustomerAddress = async () => {
    console.log("userInfo", userInfo);
    const customerId = userInfo.id;
    if (!customerId) {
      toast.warn("failed to load required details. Try logging in again");
      return;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await sendRequest({
        url: `/v1/order`,
        method: httpMethodTypes.POST,
        data: [
          {
            cartId: userInfo.cartId,
          },
        ],
      });
      toast.success("Order placed successfully");
      reloadCustomerDetails();
      navigate("/v1/customer/dishes");
      // Refetch the user details and set it in the user info slice
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  const reloadCustomerDetails = async () => {
    const response = await sendRequest({
      url: `/v1/customer?id=${userInfo.id}`,
      method: httpMethodTypes.GET,
    });
    dispatch(setUserInfo(response.data[0]));
  };

  useEffect(() => {
    loadCartDetails();
    loadCustomerAddress();
  }, []);

  return (
    <div>
      <TopBar />
      <div className="font-[Poppins] max-w-lg mx-auto mt-10 space-y-6">
        {/* Ordered Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Ordered items</h2>
          <div className="text-gray-600 text-sm mb-4">
            <span>{cartContent.itemCount} items</span>
            <span className="float-right font-semibold text-gray-900">
              total: LKR {cartContent.totalValue}
            </span>
          </div>

          {/* Cart Items */}
          {cartContent.dishes.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-t pt-4 mt-4"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 w-8 h-8 flex items-center justify-center font-medium text-gray-800 rounded">
                  {item.quantity}
                </div>
                <span className="text-gray-700">
                  {item.name} ({item.portionName})
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                LKR {(item.quantity * item.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery Location */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Delivery location</h2>
          <div className="bg-gray-100 p-3 rounded text-gray-600">
            {/* {deliveryAddress} */}
            {`${userInfo.address.buildingNumber}, ${userInfo.address.streetName}, ${userInfo.address.province} ${userInfo.address.city}`}
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-[#FF725E] text-white text-[16px] font-bold rounded-lg hover:bg-[#ff4f45] transition-colors duration-200"
        >
          Place order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
