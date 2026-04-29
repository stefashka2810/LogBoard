import { render, waitFor } from "@testing-library/react";
import Layout from "@/app/(protected)/layout";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";
import { setAuth } from "@/features/userAuth/model/authSlice";
import { vi } from "vitest";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

function createTestStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

describe("Protected Layout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects guest user to login", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Layout>
          <div>protected-content</div>
        </Layout>
      </Provider>,
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/login");
    });
  });

  it("renders children for authenticated user", async () => {
    const store = createTestStore();
    store.dispatch(setAuth({ username: "tester01" }));

    const { getByText } = render(
      <Provider store={store}>
        <Layout>
          <div>protected-content</div>
        </Layout>
      </Provider>,
    );

    expect(getByText("protected-content")).toBeInTheDocument();
    await waitFor(() => {
      expect(replaceMock).not.toHaveBeenCalled();
    });
  });
});
