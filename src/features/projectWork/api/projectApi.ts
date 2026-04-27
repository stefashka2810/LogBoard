import { baseApi } from "@/shared/api/baseApi";
import { Project } from "@/entities/project/model/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  AddProjectMemberRequest,
  CreateProjectResponse,
  DeleteProjectMemberRequest,
  ProjectMember,
  UpdateProjectMemberRoleRequest,
} from "@/features/projectWork/api/types";

const transformProjectMembersError = (error: FetchBaseQueryError) => {
  if (error.status === 400) {
    return "Ошибка валидации данных";
  }
  if (error.status === 401) {
    return "Пользователь не авторизован";
  }
  if (error.status === 403) {
    return "Недостаточно прав для выполнения операции";
  }
  if (error.status === 404) {
    return "Проект или пользователь не найден";
  }
  if (error.status === 409) {
    return "Пользователь уже является участником проекта";
  }
  return "Внутренняя ошибка сервера, повторите попытку позже";
};

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<
      CreateProjectResponse,
      Pick<Project, "name" | "description">
    >({
      query: (productData) => ({
        url: "/projects",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Projects"],
    }),

    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    getProjectMembers: builder.query<ProjectMember[], string>({
      query: (projectId) => ({
        url: `/projects/${projectId}/members`,
        method: "GET",
      }),
      transformErrorResponse: transformProjectMembersError,
      providesTags: ["Projects"],
    }),

    addProjectMember: builder.mutation<ProjectMember, AddProjectMemberRequest>({
      query: ({ projectId, ...body }) => ({
        url: `/projects/${projectId}/members`,
        method: "POST",
        body,
      }),
      transformErrorResponse: transformProjectMembersError,
      invalidatesTags: ["Projects"],
    }),

    deleteProjectMember: builder.mutation<void, DeleteProjectMemberRequest>({
      query: ({ projectId, userId }) => ({
        url: `/projects/${projectId}/members/${userId}`,
        method: "DELETE",
      }),
      transformErrorResponse: transformProjectMembersError,
      invalidatesTags: ["Projects"],
    }),

    updateProjectMemberRole: builder.mutation<
      ProjectMember,
      UpdateProjectMemberRoleRequest
    >({
      query: ({ projectId, userId, role }) => ({
        url: `/projects/${projectId}/members/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      transformErrorResponse: transformProjectMembersError,
      invalidatesTags: ["Projects"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useGetProjectMembersQuery,
  useAddProjectMemberMutation,
  useDeleteProjectMemberMutation,
  useUpdateProjectMemberRoleMutation,
} = projectApi;
