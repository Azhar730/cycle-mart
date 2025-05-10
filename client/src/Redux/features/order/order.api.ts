import { baseApi } from "@/Redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders/create-order",
        method: "POST",
        body: payload,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getMyOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `/orders/total-sales`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getTopSellingBicycle: builder.query({
      query: () => ({
        url: `/orders/top-selling-bicycle`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getRecentSellingBicycle: builder.query({
      query: () => ({
        url: `/orders/recent-selling-bicycle`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getRevenue: builder.query({
      query: () => ({
        url: `/orders/revenue`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getStockStats: builder.query({
      query: () => ({
        url: `/orders/stock-stats`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/update-status",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrderQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
  useGetTotalSalesQuery,
  useGetRevenueQuery,
  useGetTopSellingBicycleQuery,
  useGetStockStatsQuery,
  useGetRecentSellingBicycleQuery,
} = orderApi;
