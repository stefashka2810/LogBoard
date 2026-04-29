import { authSlice, setAuth, setLogout } from "@/features/userAuth/model/authSlice";

describe("authSlice", () => {
  it("sets auth data on login", () => {
    const state = authSlice.reducer(undefined, setAuth({ username: "tester01" }));

    expect(state.isAuth).toBe(true);
    expect(state.username).toBe("tester01");
  });

  it("clears auth data on logout", () => {
    const authenticated = authSlice.reducer(
      undefined,
      setAuth({ username: "tester01" }),
    );

    const state = authSlice.reducer(authenticated, setLogout());

    expect(state.isAuth).toBe(false);
    expect(state.username).toBe("");
  });
});
