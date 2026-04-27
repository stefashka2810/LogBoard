import { ProjectMemberRole } from "@/features/projectWork/api/types";

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner: string;
  role: ProjectMemberRole;
}
