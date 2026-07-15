import 'package:flutter/foundation.dart';
import '../../../core/api/api_exception.dart';
import '../models/order.dart';
import '../services/order_service.dart';

enum OrderState { initial, loading, success, error }

class OrderViewModel extends ChangeNotifier {
  final OrderService orderService;

  OrderViewModel({required this.orderService});

  OrderState state = OrderState.initial;

  List<Order> orders = [];

  String errorMessage = '';

  int? advancingOrderId;

  Future<void> fetchOrders({bool showLoading = true}) async {
    if (showLoading) {
      state = OrderState.loading;
    }
    errorMessage = '';

    notifyListeners();

    try {
      orders = await orderService.getOrders();

      state = OrderState.success;
    } on ApiException catch (error) {
      state = OrderState.error;
      errorMessage = error.message;
    } catch (_) {
      state = OrderState.error;
      errorMessage = 'Failed to load orders';
    }

    notifyListeners();
  }

  Future<void> advanceStatus(int orderId) async {
    if (advancingOrderId != null) return;

    advancingOrderId = orderId;
    errorMessage = '';
    notifyListeners();

    try {
      await orderService.advanceOrderStatus(orderId);

      await fetchOrders(showLoading: false);
    } on ApiException catch (error) {
      state = OrderState.error;
      errorMessage = error.message;
    } catch (_) {
      state = OrderState.error;
      errorMessage = 'Failed to update order status';
    } finally {
      advancingOrderId = null;
      notifyListeners();
    }
  }
}
