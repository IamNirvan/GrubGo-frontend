import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Register from "./pages/Register/Register";
import Dishes from "./pages/Dishes/Dishes";
import Unauthorized from "./pages/Unauthriozed/Unauthriozed";
import PrivateRoute from "./routes/PrivateRoute";
import DishDetail from "./pages/Dishes/DishDetail";
import CreateDish from "./pages/Dishes/CreateDish";
import Rules from "./pages/Rules/Rules";
import RuleDetails from "./pages/Rules/RuleDetails";
import CreateRule from "./pages/Rules/CreateRule";
import DishMetrics from "./pages/Dishes/DishMetrics";
import Orders from "./pages/Orders/Orders";
import BrowseDishes from "./pages/Dishes/BrowseDishes";
import Checkout from "./pages/Checkout/Checkout";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/features/authSlice";
import userTypes from "./constants/userTypes";
import "./app.css";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App select-none">
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose="3000"
      />
      <Router>
        <Routes>
          {/* <Route
            path="/v1/employee/login"
            element={<Login userType={userTypes.EMPLOYEE} />}
          /> */}
          <Route
            path="/v1/login"
            element={<Login userType={userTypes.CUSTOMER} />}
          />
          <Route path="/v1/customer/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/v1/login" replace />} />
          <Route element={<PrivateRoute userType={userTypes.CUSTOMER} />}>
            <Route path="/v1/customer/dishes" element={<BrowseDishes />} />
            <Route path="/v1/customer/checkout" element={<Checkout />} />
            <Route path="/v1/customer/profile" element={<Profile />} />
            <Route
              path="/v1/customer/unauthorized"
              elRuntimeExceptionement={<Unauthorized />}
            />
          </Route>

          <Route element={<PrivateRoute userType={userTypes.EMPLOYEE} />}>
            <Route path="/v1/dishes" element={<Dishes />} />
            <Route path="/v1/dish/create" element={<CreateDish />} />
            <Route path="/v1/dish/:id" element={<DishDetail />} />
            <Route path="/v1/dish/metrics/:id" element={<DishMetrics />} />
            <Route path="/v1/rules" element={<Rules />} />
            <Route path="/v1/rule/:id" element={<RuleDetails />} />
            <Route path="/v1/rule/create" element={<CreateRule />} />
            <Route path="/v1/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
