import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import { authApi } from "@/features/auth/api/authApi";
import { getStorage } from "@/app/store/storage";

export const persistConfig = {
  key: "root",
  storage: await getStorage(),
  whitelist: ["auth"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
