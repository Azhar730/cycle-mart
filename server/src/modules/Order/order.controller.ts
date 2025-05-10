import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrderServices.createOrderIntoDB(req.body, user, req.ip!);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});
const getRevenue = catchAsync(async (req, res) => {
  const result = await OrderServices.getRevenueFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Revenue calculated successfully',
    data: result,
  });
});
const getTotalSales = catchAsync(async (req, res) => {
  const result = await OrderServices.getTotalSalesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Total sales retrieved successfully',
    data: result,
  });
});
const getTopSellingBicycle = catchAsync(async (req, res) => {
  const result = await OrderServices.getTopSellingBicyclesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Top selling bicycles are retrieved successfully',
    data: result,
  });
});
const getMyOrders = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.getMyOrdersFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My orders get successful',
    data: result
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders are retrieved successfully',
    data: result,
  });
});

const updateShippingStatus = catchAsync(async (req, res) => {
  const result = await OrderServices.updateShippingStatusIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});
const getBicycleStockStats = catchAsync(async (req, res) => {
  const result = await OrderServices.getBicycleStockStatsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order stats retrieved successfully',
    data: result,
  });
});
const getRecentSellingBicycles = catchAsync(async (req, res) => {
  const result = await OrderServices.getRecentSellingBicyclesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Recent Selling Bicycle retrieved successfully',
    data: result,
  });
});
export const OrderControllers = {
  createOrder,
  verifyPayment,
  getRevenue,
  getMyOrders,
  getAllOrders,
  updateShippingStatus,
  getTotalSales,
  getTopSellingBicycle,
  getBicycleStockStats,
  getRecentSellingBicycles
};
