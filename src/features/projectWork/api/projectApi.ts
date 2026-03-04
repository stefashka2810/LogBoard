import { baseApi } from "@/shared/api/baseApi";
import { Project } from "@/entities/project/model/types";
import { CreateProjectResponse } from "@/features/projectWork/api/types";

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
    }),

    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectMutation,
} = projectApi;
