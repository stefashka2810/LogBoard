import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";
import { AppSidebar } from "@/features/dashboard/ui/AppSidebar";
import { setSelectedProject } from "@/features/projectWork/model/projectsWorkSlice";
import { vi } from "vitest";

vi.mock("@/shared/ui/sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Sidebar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarSeparator: () => <div />,
  SidebarHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@radix-ui/react-dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/entities/user/ui/UserInfo", () => ({
  default: () => <div>user-info</div>,
}));

vi.mock("@/features/userAuth/ui/LogoutMenu", () => ({
  default: () => <div>logout-menu</div>,
}));

vi.mock("@/features/projectWork/ui/AddProject", () => ({
  default: () => <div>add-project</div>,
}));

vi.mock("@/features/projectWork/ui/ProjectList", () => ({
  default: () => <div>project-list</div>,
}));

function createTestStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

describe("AppSidebar integration", () => {
  it("renders sidebar base content", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <AppSidebar />
      </Provider>,
    );

    expect(await screen.findByText("Проекты")).toBeInTheDocument();
    expect(await screen.findByText("project-list")).toBeInTheDocument();
    expect(await screen.findByText("user-info")).toBeInTheDocument();
  });

  it("clears selected project by eraser button", async () => {
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

    const { container } = render(
      <Provider store={store}>
        <AppSidebar />
      </Provider>,
    );

    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[0]);

    expect(store.getState().projectsWork.selectedProject).toBeNull();
  });
});
