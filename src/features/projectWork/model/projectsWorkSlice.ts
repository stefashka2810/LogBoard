import { createSlice } from "@reduxjs/toolkit";
import { ProjectsWorkSliceState } from "@/features/projectWork/model/types";
import { Project } from "@/entities/project/model/types";

const initialProjectsWorkState: ProjectsWorkSliceState = {
  projects: [],
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
  },
});

export const { setProjects, setClearProjects } = projectsWorkSlice.actions;
