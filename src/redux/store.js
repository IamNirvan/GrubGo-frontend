import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey:
        "Xn2r5u8x/A?D(G+KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdR",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
let persistor = persistStore(store);

export { persistor };
export default store;
