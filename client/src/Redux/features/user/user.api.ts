import { baseApi } from "@/Redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserCount: builder.query({
      query: () => ({
        url: `/users/user-count`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    addAdmin: builder.mutation({
      query: (formData) => ({
        url: "/users/create-admin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useAddAdminMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserCountQuery
} = userApi;
