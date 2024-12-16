import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Landing from "./pages/Landing/Landing";
import Sales from "./pages/Sales/Sales";
import Register from "./pages/Register/Register";
import Dishes from "./pages/Dishes/Dishes";
import Unauthorized from "./pages/Unauthriozed/Unauthriozed";
import PrivateRoute from "./routes/PrivateRoute";
import DishDetail from "./pages/Dishes/DishDetail";
import Rules from "./pages/Rules/Rules";
import RuleDetails from "./pages/Rules/RuleDetails";
import MetricsPage from "./pages/Dishes/MetricsPage";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/features/authSlice";
import "./app.css";

function App() {
  return (
    <div className="App select-none">
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose="3000"
      />
      {/* <Router>
        <Routes>
          <Route path="/customer/login" element={<Login />} />
          <Route path="/customer/home" element={<Landing />} />
          <Route path="/page/sales" element={<Sales />} />
          <Route path="/page/register" element={<Register />} />
          <Route path="/page/dishes" element={<Dishes />} />
          <Route path="/page/dishes/:id" element={<DishDetail />} />
          <Route path="/page/metrics/:id" element={<MetricsPage />} />
          <Route path="/page/rules" element={<Rules />} />
          <Route path="/page/rules/:id" element={<RuleDetails />} />
          <Route
            path="/"
            element={
              localStorage.getItem("token") !== null ? (
                <Navigate to="/page/vehicles" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/customer/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router> */}
      <Router>
        <Routes>
          <Route path="/customer/login" element={<Login />} />
          <Route path="/page/register" element={<Register />} />
          <Route
            path="/"
            element={
              useSelector(selectCurrentToken) === null ? (
                <Navigate to="/customer/login" replace />
              ) : (
                <Navigate to="/customer/home" replace />
              )
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/customer/home" element={<Landing />} />
            {/* <Route path="/page/sales" element={<Sales />} />
            <Route path="/page/dishes" element={<Dishes />} />
            <Route path="/page/dishes/:id" element={<DishDetail />} />
            <Route path="/page/metrics/:id" element={<MetricsPage />} />
            <Route path="/page/rules" element={<Rules />} />
            <Route path="/page/rules/:id" element={<RuleDetails />} /> */}
            <Route path="/customer/unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
