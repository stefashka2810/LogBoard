import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RegisterCard } from "@/features/userAuth/ui/RegisterCard";
import { vi } from "vitest";

const pushMock = vi.fn();
const registerMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/features/userAuth/api/authApi", () => ({
  useRegisterUserMutation: () => [
    registerMock,
    { isError: false, error: undefined, isLoading: false },
  ],
}));

describe("RegisterCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps submit button disabled for invalid form", () => {
    render(<RegisterCard />);

    expect(screen.getByRole("button", { name: "Зарегистрироваться" })).toBeDisabled();
  });

  it("shows confirm password validation", async () => {
    const { container } = render(<RegisterCard />);
    const inputs = container.querySelectorAll("input");

    fireEvent.change(inputs[0], {
      target: { value: "valid_user" },
    });
    fireEvent.change(inputs[1], {
      target: { value: "abc123" },
    });
    fireEvent.change(inputs[2], {
      target: { value: "abc124" },
    });
    fireEvent.blur(inputs[2]);

    expect(screen.getByText("пароли не совпадают")).toBeInTheDocument();
  });

  it("submits valid registration and redirects to login", async () => {
    registerMock.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(undefined),
    });

    const { container } = render(<RegisterCard />);
    const inputs = container.querySelectorAll("input");

    fireEvent.change(inputs[0], {
      target: { value: "valid_user" },
    });
    fireEvent.change(inputs[1], {
      target: { value: "abc123" },
    });
    fireEvent.change(inputs[2], {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Зарегистрироваться" }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        username: "valid_user",
        password: "abc123",
      });
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});
