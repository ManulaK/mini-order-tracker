class Order {
  final int id;
  final String customerName;
  final List<OrderItem> items;
  final double total;
  final OrderStatus status;

  const Order({
    required this.id,
    required this.customerName,
    required this.items,
    required this.total,
    required this.status,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      customerName: json['customerName'],
      items: (json['items'] as List)
          .map((item) => OrderItem.fromJson(item))
          .toList(),
      total: (json['total'] as num).toDouble(),
      status: OrderStatus.fromJson(json['status']),
    );
  }
}

class OrderItem {
  final int id;
  final String name;

  const OrderItem({required this.id, required this.name});

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(id: json['id'], name: json['name']);
  }
}

class OrderStatus {
  final String name;

  const OrderStatus({required this.name});

  factory OrderStatus.fromJson(Map<String, dynamic> json) {
    return OrderStatus(name: json['name']);
  }
}
