"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/app/store/store";
import dynamic from "next/dynamic";

const PersistGate = dynamic(
  () =>
    import("redux-persist/integration/react").then((mod) => mod.PersistGate),
  { ssr: false },
);

const LoadingFallback = () => <div style={{ padding: "20px" }}>Loading...</div>;

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
