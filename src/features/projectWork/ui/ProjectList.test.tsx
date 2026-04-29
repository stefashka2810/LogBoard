import { fireEvent, render, screen } from "@testing-library/react";
import ProjectList from "@/features/projectWork/ui/ProjectList";
import { vi } from "vitest";

const dispatchMock = vi.fn();
const pushMock = vi.fn();
const useGetProjectsQueryMock = vi.fn();
const deleteProjectMutationMock = vi.fn();
const useSelectorMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
  useSelector: (selector: (state: unknown) => unknown) =>
    useSelectorMock(selector),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/features/projectWork/api/projectApi", () => ({
  useGetProjectsQuery: () => useGetProjectsQueryMock(),
  useDeleteProjectMutation: () => deleteProjectMutationMock(),
}));

vi.mock("@/widgets/landing/lib/use-mobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("@/shared/ui/sidebar", () => ({
  SidebarMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarMenuButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock("@/shared/ui/Modal", () => ({
  default: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div>{children}</div> : null,
}));

vi.mock("@/features/projectWork/ui/ConfirmProjectDelete", () => ({
  default: function ConfirmProjectDeleteMock() {
    return <div>confirm-delete</div>;
  },
}));

describe("ProjectList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSelectorMock.mockImplementation((selector: (state: unknown) => unknown) =>
      selector({
        projectsWork: {
          selectedProject: null,
        },
      }),
    );
    deleteProjectMutationMock.mockReturnValue([
      vi.fn(),
      { error: undefined, isSuccess: false, reset: vi.fn() },
    ]);
  });

  it("renders loading state", () => {
    useGetProjectsQueryMock.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });

    const { container } = render(<ProjectList />);

    expect(container.querySelector("span[style]")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    useGetProjectsQueryMock.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    });

    render(<ProjectList />);

    expect(screen.getByText("Нет проектов")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useGetProjectsQueryMock.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    });

    render(<ProjectList />);

    expect(screen.getByText("Ошибка загрузки проектов")).toBeInTheDocument();
  });

  it("renders projects and selects one on click", () => {
    useGetProjectsQueryMock.mockReturnValue({
      data: [
        {
          id: "project-1",
          name: "LogBoard",
          description: "Logs dashboard",
          created_at: "2026-04-27T10:00:00.000Z",
          updated_at: "2026-04-28T10:00:00.000Z",
          owner: "owner01",
          role: "OWNER",
        },
      ],
      isError: false,
      isLoading: false,
    });

    render(<ProjectList />);

    fireEvent.click(screen.getByText("LogBoard"));

    expect(screen.getByText("LO")).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
