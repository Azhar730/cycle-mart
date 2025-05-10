import { useGetTotalStockQuery } from "@/Redux/features/bicycle/bicycle.api";
import {
  useGetRecentSellingBicycleQuery,
  useGetRevenueQuery,
  useGetStockStatsQuery,
  useGetTopSellingBicycleQuery,
  useGetTotalSalesQuery,
} from "@/Redux/features/order/order.api";
import { useGetUserCountQuery } from "@/Redux/features/user/user.api";
import { Users, DollarSign, Package, TrendingUp } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { data: totalSales } = useGetTotalSalesQuery({});
  const { data: revenue } = useGetRevenueQuery({});
  const { data: totalStock } = useGetTotalStockQuery({});
  const { data: userCount } = useGetUserCountQuery({});
  const { data: topSellingBicycle } = useGetTopSellingBicycleQuery({});
  const { data: stockStats } = useGetStockStatsQuery({});
  const { data: recentSellingBicycle } = useGetRecentSellingBicycleQuery({});

  const analyticsData = {
    totalSales: totalSales?.data || 0,
    monthlyRevenue: revenue?.data || 0,
    totalInventory: totalStock?.data || 0,
    totalUser: userCount?.data || 0,
  };

  interface Sale {
    _id: string;
    customer: string;
    bicycle: string;
    price: number;
    date: string;
    status: string;
  }

  const recentSales =
    recentSellingBicycle?.data?.map((sale: Sale) => ({
      id: sale?._id,
      customer: sale?.customer,
      bicycle: sale?.bicycle,
      price: sale?.price,
      date: sale?.date,
      status: sale?.status === "Paid" ? "Completed" : "Pending",
    })) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const barChartData =
    topSellingBicycle?.data?.map(
      (bicycle: { name: string; sales: string }) => ({
        name: bicycle.name,
        sales: Number(bicycle.sales),
      })
    ) || [];

  const pieChartData = [
    {
      name: "Sold",
      value: stockStats?.data?.soldPercentage || 0,
    },
    {
      name: "Available",
      value: stockStats?.data?.availablePercentage || 0,
    },
  ];

  return (
    <main>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to Cycle Mart
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your dealership today.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.totalSales)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(analyticsData.monthlyRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Inventory
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {analyticsData.totalInventory} Bicycles
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total User</p>
                <p className="text-xl font-semibold text-gray-900">
                  {analyticsData.totalUser}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Vehicle Sales
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Inventory Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {pieChartData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#0088FE" : "#FF8042"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Sales
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bicycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSales.map((sale: { id: Key | null | undefined; customer: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; bicycle: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.bicycle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(sale.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sale.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
