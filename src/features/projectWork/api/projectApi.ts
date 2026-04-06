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
      invalidatesTags: ["Projects"]
    }),

    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Projects"]
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"]
    }),
  }),
  overrideExisting: true,
});

projectApi.enhanceEndpoints({ addTagTypes: ["Projects"] });

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectMutation,
} = projectApi;
