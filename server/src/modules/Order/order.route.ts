import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = Router();
router.post(
  '/create-order',
  auth('customer', 'admin'),
  OrderControllers.createOrder,
);
router.get(
  '/verify',
  auth('customer', 'admin'),
  OrderControllers.verifyPayment,
);
router.get('/revenue', OrderControllers.getRevenue);
router.get(
  '/total-sales',
  // auth('admin', 'customer'),
  OrderControllers.getTotalSales,
);
router.get(
  '/stock-stats',
  // auth('admin', 'customer'),
  OrderControllers.getBicycleStockStats,
);
router.get(
  '/top-selling-bicycle',
  // auth('admin', 'customer'),
  OrderControllers.getTopSellingBicycle,
);
router.get(
  '/recent-selling-bicycle',
  // auth('admin', 'customer'),
  OrderControllers.getRecentSellingBicycles,
);
router.get('/:id', auth('customer', 'admin'), OrderControllers.getMyOrders);
router.get('/', auth('admin'), OrderControllers.getAllOrders);
router.patch(
  '/update-status',
  auth('admin'),
  OrderControllers.updateShippingStatus,
);
export const OrderRoutes = router;
