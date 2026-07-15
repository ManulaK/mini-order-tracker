import 'dart:convert';

import '../../../core/api/api_client.dart';
import '../../../core/constants/api_constants.dart';
import '../../../core/api/api_exception.dart';
import '../models/order.dart';

class OrderService {
  final ApiClient apiClient;

  OrderService({ApiClient? apiClient}) : apiClient = apiClient ?? ApiClient();

  Future<List<Order>> getOrders() async {
    final response = await apiClient.get(ApiConstants.orders);
    final body = _decodeBody(response.body);

    if (body['success'] != true) {
      throw ApiException(body['message'] as String? ?? 'Failed to load orders');
    }

    return _parseOrders(body['data']);
  }

  Future<void> advanceOrderStatus(int orderId) async {
    final response = await apiClient.patch(
      '${ApiConstants.orders}/$orderId/status',
    );
    final body = _decodeBody(response.body);

    if (body['success'] != true) {
      throw ApiException(
        body['message'] as String? ?? 'Failed to update order status',
      );
    }
  }

  Map<String, dynamic> _decodeBody(String body) {
    try {
      final decoded = jsonDecode(body);

      if (decoded is Map<String, dynamic>) {
        return decoded;
      }
    } on FormatException {
      throw const ApiException('Invalid response from server.');
    }

    throw const ApiException('Invalid response from server.');
  }

  List<Order> _parseOrders(Object? data) {
    if (data is! List) {
      throw const ApiException('Orders response is invalid.');
    }

    return data.map((item) => _parseOrder(item)).toList();
  }

  Order _parseOrder(Object? data) {
    if (data is! Map<String, dynamic>) {
      throw const ApiException('Order response is invalid.');
    }

    return Order.fromJson(data);
  }
}
