import { Project } from "@/entities/project/model/types";

export interface ProjectsWorkSliceState {
  projects: Project[];
  selectedProject?: Project | null;
}
