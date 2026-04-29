import {
  projectsWorkSlice,
  setClearProjects,
  setClearSelectedProject,
  setProjects,
  setSelectedProject,
} from "@/features/projectWork/model/projectsWorkSlice";
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

describe("projectsWorkSlice", () => {
  it("stores projects list", () => {
    const state = projectsWorkSlice.reducer(undefined, setProjects([project]));

    expect(state.projects).toEqual([project]);
  });

  it("stores selected project", () => {
    const state = projectsWorkSlice.reducer(undefined, setSelectedProject(project));

    expect(state.selectedProject).toEqual(project);
  });

  it("clears selected project", () => {
    const selected = projectsWorkSlice.reducer(
      undefined,
      setSelectedProject(project),
    );

    const state = projectsWorkSlice.reducer(selected, setClearSelectedProject());

    expect(state.selectedProject).toBeNull();
  });

  it("clears projects list", () => {
    const withProjects = projectsWorkSlice.reducer(undefined, setProjects([project]));

    const state = projectsWorkSlice.reducer(withProjects, setClearProjects());

    expect(state.projects).toEqual([]);
  });
});
