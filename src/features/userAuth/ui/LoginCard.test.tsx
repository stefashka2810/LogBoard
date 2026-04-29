import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginCard } from "@/features/userAuth/ui/LoginCard";
import { vi } from "vitest";

const pushMock = vi.fn();
const dispatchMock = vi.fn();
const loginMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));

vi.mock("@/features/userAuth/api/authApi", () => ({
  useLoginUserMutation: () => [
    loginMock,
    { isError: false, error: undefined, isLoading: false },
  ],
}));

describe("LoginCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps submit button disabled for invalid form", () => {
    render(<LoginCard />);

    expect(screen.getByRole("button", { name: "Войти" })).toBeDisabled();
  });

  it("shows validation messages", async () => {
    render(<LoginCard />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "abc" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText("Username"));
    fireEvent.blur(screen.getByLabelText("Пароль"));

    expect(
      screen.getByText("введите username больше 6 символов"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("введите пароль больше 6 символов"),
    ).toBeInTheDocument();
  });

  it("submits valid credentials and redirects to dashboard", async () => {
    loginMock.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(undefined),
    });

    render(<LoginCard />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "valid_user" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Войти" }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        username: "valid_user",
        password: "abc123",
      });
      expect(dispatchMock).toHaveBeenCalledTimes(2);
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
