import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AddApiKeyForm } from "@/features/apiKeyWork/ui/AddApiKeyForm";

const createApiKeyMock = vi.fn();

vi.mock("@/widgets/landing/lib/use-mobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("@/features/apiKeyWork/api/apiKeyApi", () => ({
  useCreateApiKeyMutation: () => [
    createApiKeyMock,
    { isError: false, error: undefined, isLoading: false },
  ],
}));

vi.mock("react-aria-components", () => ({
  DatePicker: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Group: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DateInput: ({
    children,
  }: {
    children: (segment: unknown) => React.ReactNode;
  }) => <div>{children({})}</div>,
  DateSegment: () => <span>segment</span>,
  Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

vi.mock("@/shared/ui/Calendar", () => ({
  Calendar: () => <div>calendar</div>,
}));

describe("AddApiKeyForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createApiKeyMock.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({
        id: "key-1",
        apiKey: "secret-key",
        createdAt: "2026-05-17T11:30:06.798Z",
      }),
    });
  });

  it("creates api key without expiration date", async () => {
    render(<AddApiKeyForm projectId="project-1" />);

    fireEvent.change(screen.getByLabelText("Название ключа"), {
      target: { value: "Production Key" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Создать" }));

    expect(createApiKeyMock).toHaveBeenCalledWith({
      projectId: "project-1",
      name: "Production Key",
    });
    expect(await screen.findByText("API ключ создан")).toBeInTheDocument();
  });
});
