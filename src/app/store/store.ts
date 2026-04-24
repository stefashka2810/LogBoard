import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import { baseApi } from "@/shared/api/baseApi";
import { storage } from "@/app/store/storage";

export const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "projectsWork"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
