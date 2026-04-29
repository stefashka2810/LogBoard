import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DashboardPage from "@/app/(protected)/dashboard/page";
import { rootReducer } from "@/app/store/rootReducer";
import { setSelectedProject } from "@/features/projectWork/model/projectsWorkSlice";
import { vi } from "vitest";

const searchLogsMock = vi.fn();
const refetchTimelineMock = vi.fn();
const useSearchLogsMutationMock = vi.fn();
const useGetLogsTimelineQueryMock = vi.fn();

vi.mock("@/features/logWork/api/logApi", () => ({
  useSearchLogsMutation: () => useSearchLogsMutationMock(),
  useGetLogsTimelineQuery: (...args: unknown[]) =>
    useGetLogsTimelineQueryMock(...args),
}));

function createTestStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

describe("DashboardPage integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSearchLogsMutationMock.mockReturnValue([
      searchLogsMock,
      { isLoading: false, isError: false, error: undefined },
    ]);
    useGetLogsTimelineQueryMock.mockReturnValue({
      data: [
        {
          timestamp: "2026-04-28T12:00:00.000Z",
          totalCount: 3,
          errorCount: 1,
          warnCount: 1,
        },
      ],
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
      refetch: refetchTimelineMock,
    });
  });

  it("renders empty state when no project selected", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>,
    );

    expect(screen.getByText("Выберите проект")).toBeInTheDocument();
  });

  it("loads logs for selected project and renders header", async () => {
    const store = createTestStore();
    store.dispatch(
      setSelectedProject({
        id: "project-1",
        name: "LogBoard",
        description: "Logs dashboard",
        created_at: "2026-04-27T10:00:00.000Z",
        updated_at: "2026-04-28T10:00:00.000Z",
        owner: "owner01",
        role: "OWNER",
      }),
    );

    searchLogsMock.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({
        logs: [
          {
            level: "ERROR",
            message: "Something failed",
            timestamp: "2026-04-28T12:00:00.000Z",
          },
        ],
        nextCursor: "2026-04-28T12:00:00.000Z",
        totalCount: 2,
      }),
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>,
    );

    await waitFor(() => {
      expect(searchLogsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          projectId: "project-1",
        }),
      );
    });

    expect(screen.getByText("LogBoard")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Something failed")).toBeInTheDocument();
    });
  });

  it("refreshes and loads next page", async () => {
    const store = createTestStore();
    store.dispatch(
      setSelectedProject({
        id: "project-1",
        name: "LogBoard",
        description: "Logs dashboard",
        created_at: "2026-04-27T10:00:00.000Z",
        updated_at: "2026-04-28T10:00:00.000Z",
        owner: "owner01",
        role: "OWNER",
      }),
    );

    searchLogsMock
      .mockReturnValueOnce({
        unwrap: vi.fn().mockResolvedValue({
          logs: [
            {
              level: "ERROR",
              message: "First page log",
              timestamp: "2026-04-28T12:00:00.000Z",
            },
          ],
          nextCursor: "2026-04-28T12:00:00.000Z",
          totalCount: 2,
        }),
      })
      .mockReturnValueOnce({
        unwrap: vi.fn().mockResolvedValue({
          logs: [
            {
              level: "WARN",
              message: "Refreshed log",
              timestamp: "2026-04-28T12:05:00.000Z",
            },
          ],
          nextCursor: "2026-04-28T12:05:00.000Z",
          totalCount: 2,
        }),
      })
      .mockReturnValueOnce({
        unwrap: vi.fn().mockResolvedValue({
          logs: [
            {
              level: "INFO",
              message: "Second page log",
              timestamp: "2026-04-28T12:10:00.000Z",
            },
          ],
          totalCount: 2,
        }),
      });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("First page log")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Обновить"));

    await waitFor(() => {
      expect(refetchTimelineMock).toHaveBeenCalled();
      expect(screen.getByText("Refreshed log")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Показать еще"));

    await waitFor(() => {
      expect(screen.getByText("Second page log")).toBeInTheDocument();
    });
  });
});
