import React, { useState } from "react";
import TopBar from "../../layouts/TopBar";

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const pizzaData = [
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
    { name: "BBQ Chicken Pizza", price: "LKR 2,200" },
  ];

  const openModal = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  const commonInputStyle = {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db", // border-gray-300
    borderRadius: "0.375rem", // rounded
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  // Optional focus style (handled by setting it directly on the element if needed)

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar />
      {/* <header className="bg-red-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl">GrubGo</h1>
          <nav className="flex space-x-4">
            <a href="/" className="text-white">
              Home
            </a>
            <a href="/profile" className="text-white">
              Profile
            </a>
          </nav>
        </div>
      </header> */}

      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
      >
        {/* Background image */}
      </div>

      <div className="container mx-auto py-8">
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Select a Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Pizza</option>
            {/* Add more categories if needed */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {pizzaData.map((pizza, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg"
              onClick={() => openModal(pizza)}
            >
              <img
                className="w-full h-48 object-cover"
                src="/path-to-your-pizza-image.jpg"
                alt={pizza.name}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{pizza.name}</h2>
                <p className="text-gray-600">{pizza.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <button className="text-gray-600 float-right" onClick={closeModal}>
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-2">
              {selectedPizza?.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{selectedPizza?.price}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Portion</label>
                <select style={commonInputStyle}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  style={commonInputStyle}
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-gray-700">Notes (optional)</label>
                <textarea style={commonInputStyle} rows="3" />
              </div>
            </div>
            <button className="bg-red-500 text-white w-full mt-4 p-2 rounded">
              Add to cart
            </button>
          </div>
        </div>
      )}

      <footer className="bg-white py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Use cases</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-600">
                  UI design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  UX design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Prototyping
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  UI components
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Explore</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-600">
                  Figma
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Why us?
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-600">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-600">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sales;
