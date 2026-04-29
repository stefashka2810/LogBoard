import { render, screen } from "@testing-library/react";
import { ApiKeyList } from "@/features/apiKeyWork/ui/ApiKeyList";
import { vi } from "vitest";

const useGetApiKeysQueryMock = vi.fn();

vi.mock("@/features/apiKeyWork/api/apiKeyApi", () => ({
  useGetApiKeysQuery: (...args: unknown[]) => useGetApiKeysQueryMock(...args),
}));

vi.mock("@/entities/apiKey/ui/ApiKeyInfo", () => ({
  ApiKeyInfo: ({ name }: { name: string }) => <div>{name}</div>,
}));

describe("ApiKeyList", () => {
  it("renders loading skeleton", () => {
    useGetApiKeysQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    });

    const { container } = render(<ApiKeyList projectId="project-1" />);

    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(3);
  });

  it("renders error state", () => {
    useGetApiKeysQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: "Ошибка загрузки",
    });

    render(<ApiKeyList projectId="project-1" />);

    expect(screen.getByText("Не удалось загрузить API-ключи")).toBeInTheDocument();
    expect(screen.getByText("Ошибка загрузки")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    useGetApiKeysQueryMock.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: undefined,
    });

    render(<ApiKeyList projectId="project-1" />);

    expect(screen.getByText("Нет активных ключей")).toBeInTheDocument();
  });

  it("renders api keys list", () => {
    useGetApiKeysQueryMock.mockReturnValue({
      data: [
        {
          id: "key-1",
          name: "Primary Key",
          createdBy: "tester",
          createdAt: "2026-04-28T10:00:00.000Z",
        },
      ],
      isLoading: false,
      isError: false,
      error: undefined,
    });

    render(<ApiKeyList projectId="project-1" />);

    expect(screen.getByText("Primary Key")).toBeInTheDocument();
  });
});
