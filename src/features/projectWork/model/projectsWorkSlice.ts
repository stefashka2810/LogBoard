import { createSlice } from "@reduxjs/toolkit";
import { ProjectsWorkSliceState } from "@/features/projectWork/model/types";
import { Project } from "@/entities/project/model/types";

const initialProjectsWorkState: ProjectsWorkSliceState = {
  projects: [],
  selectedProject: null,
};

export const projectsWorkSlice = createSlice({
  name: "projectsWork",
  initialState: initialProjectsWorkState,
  reducers: {
    setProjects: (state, action: { payload: Project[] }) => {
      state.projects = action.payload;
    },
    setClearProjects: (state) => {
      state.projects = [];
    },
    setSelectedProject: (state, action: { payload: Project }) => {
      state.selectedProject = action.payload;
    },
    setClearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
});

export const {
  setProjects,
  setClearProjects,
  setSelectedProject,
  setClearSelectedProject,
} = projectsWorkSlice.actions;
