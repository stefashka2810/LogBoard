import { fireEvent, render, screen } from "@testing-library/react";
import { LogsTableSection } from "@/features/dashboard/ui/LogsTableSection";
import { vi } from "vitest";

describe("LogsTableSection", () => {
  it("renders loading state", () => {
    const { container } = render(
      <LogsTableSection
        logs={[]}
        totalCount={0}
        isLoading={true}
        isError={false}
        error={undefined}
        isFetchingMore={false}
        nextCursor={null}
        onLoadMore={vi.fn()}
      />,
    );

    expect(container.querySelectorAll(".h-16")).toHaveLength(8);
  });

  it("renders error state", () => {
    render(
      <LogsTableSection
        logs={[]}
        totalCount={0}
        isLoading={false}
        isError={true}
        error={"Ошибка"}
        isFetchingMore={false}
        nextCursor={null}
        onLoadMore={vi.fn()}
      />,
    );

    expect(screen.getByText("Не удалось загрузить логи")).toBeInTheDocument();
    expect(screen.getByText("Ошибка")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <LogsTableSection
        logs={[]}
        totalCount={0}
        isLoading={false}
        isError={false}
        error={undefined}
        isFetchingMore={false}
        nextCursor={null}
        onLoadMore={vi.fn()}
      />,
    );

    expect(screen.getByText("Логи не найдены.")).toBeInTheDocument();
  });

  it("renders logs and load more action", () => {
    const onLoadMore = vi.fn();

    render(
      <LogsTableSection
        logs={[
          {
            level: "ERROR",
            message: "Something failed",
            timestamp: "2026-04-28T12:00:00.000Z",
          },
        ]}
        totalCount={4}
        isLoading={false}
        isError={false}
        error={undefined}
        isFetchingMore={false}
        nextCursor={"2026-04-28T12:00:00.000Z"}
        onLoadMore={onLoadMore}
      />,
    );

    expect(screen.getByText("Something failed")).toBeInTheDocument();
    expect(screen.getByText("ERROR")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Показать еще"));

    expect(onLoadMore).toHaveBeenCalled();
  });
});
