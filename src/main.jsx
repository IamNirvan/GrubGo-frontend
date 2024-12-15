import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./redux/store";
import { AuthProvider } from "./context/authContext";
import "react-toastify/dist/ReactToastify.css";
// import 'react-datepicker/dist/react-datepicker.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <AuthProvider> */}
      <App />
      {/* </AuthProvider> */}
    </PersistGate>
  </Provider>
);
