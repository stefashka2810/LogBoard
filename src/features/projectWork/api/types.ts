export interface CreateProjectResponse {
  id: string;
}

export type ProjectMemberRole = "OWNER" | "ADMIN" | "READER";

export interface ProjectMember {
  userId: number;
  username: string;
  role: ProjectMemberRole;
}

export interface AddProjectMemberRequest {
  projectId: string;
  username: string;
  role: ProjectMemberRole;
}

export interface UpdateProjectMemberRoleRequest {
  projectId: string;
  userId: number;
  role: ProjectMemberRole;
}

export interface DeleteProjectMemberRequest {
  projectId: string;
  userId: number;
}
