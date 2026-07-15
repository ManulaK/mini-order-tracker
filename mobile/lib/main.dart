import 'package:flutter/material.dart';
import 'modules/orders/services/order_service.dart';
import 'modules/orders/viewmodels/order_view_model.dart';
import 'modules/orders/views/order_screen.dart';

void main() {
  final orderService = OrderService();

  final orderViewModel = OrderViewModel(orderService: orderService);

  runApp(MyApp(orderViewModel: orderViewModel));
}

class MyApp extends StatelessWidget {
  final OrderViewModel orderViewModel;

  const MyApp({super.key, required this.orderViewModel});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Order Tracker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
      ),
      home: OrderScreen(viewModel: orderViewModel),
    );
  }
}
