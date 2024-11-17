import React from "react";

const CartModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-96 text-left shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-2">Your basket</h2>
        <p className="text-gray-600 mb-4">
          <span>2 items</span>
          <span className="float-right font-semibold text-gray-900">
            total: LKR 2,380
          </span>
        </p>

        <div className="border-t border-gray-200 pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="your-image-url.jpg"
                alt="Chicken Lasagna"
                className="w-16 h-16 rounded-md object-cover"
              />

              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 p-2 w-8 h-8 flex items-center justify-center font-medium text-gray-800 rounded">
                    2
                  </span>
                  <span className="text-gray-700">
                    Chicken Lasagna (Medium)
                  </span>
                </div>
              </div>
            </div>
            <span className="font-semibold text-gray-900">LKR 2,380</span>
          </div>
        </div>

        <button className="w-full bg-[#FF6F61] text-white py-2 rounded-md font-semibold mt-4 hover:bg-[#ff4f45] transition-colors duration-200">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;
