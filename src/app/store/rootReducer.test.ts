import { rootReducer } from "@/app/store/rootReducer";
import { setAuth, setLogout } from "@/features/userAuth/model/authSlice";
import {
  setProjects,
  setSelectedProject,
} from "@/features/projectWork/model/projectsWorkSlice";
import {
  setLogsMessageFilter,
  setLogsSearchResult,
} from "@/features/logWork/model/logsWorkSlice";
import { Project } from "@/entities/project/model/types";

const project: Project = {
  id: "project-1",
  name: "LogBoard",
  description: "Logs dashboard",
  created_at: "2026-04-27T10:00:00.000Z",
  updated_at: "2026-04-28T10:00:00.000Z",
  owner: "owner01",
  role: "OWNER",
};

describe("rootReducer", () => {
  it("resets user-related state on logout", () => {
    let state = rootReducer(undefined, { type: "@@INIT" });

    state = rootReducer(state, setAuth({ username: "tester01" }));
    state = rootReducer(state, setProjects([project]));
    state = rootReducer(state, setSelectedProject(project));
    state = rootReducer(state, setLogsMessageFilter("timeout"));
    state = rootReducer(
      state,
      setLogsSearchResult({
        logs: [
          {
            level: "ERROR",
            message: "Something failed",
            timestamp: "2026-04-28T12:00:00.000Z",
          },
        ],
        totalCount: 1,
      }),
    );

    const resetState = rootReducer(state, setLogout());

    expect(resetState.auth.isAuth).toBe(false);
    expect(resetState.auth.username).toBe("");
    expect(resetState.projectsWork.projects).toEqual([]);
    expect(resetState.projectsWork.selectedProject).toBeNull();
    expect(resetState.logsWork.logs).toEqual([]);
    expect(resetState.logsWork.totalCount).toBe(0);
    expect(resetState.logsWork.filters.message).toBe("");
  });
});
