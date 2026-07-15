import 'package:flutter/material.dart';
import '../components/order_card.dart';
import '../components/order_message_box.dart';
import '../viewmodels/order_view_model.dart';

class OrderScreen extends StatefulWidget {
  final OrderViewModel viewModel;

  const OrderScreen({super.key, required this.viewModel});

  @override
  State<OrderScreen> createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  OrderViewModel get viewModel => widget.viewModel;

  @override
  void initState() {
    super.initState();
    viewModel.addListener(_onViewModelChanged);
    viewModel.fetchOrders();
  }

  void _onViewModelChanged() {
    setState(() {});
  }

  @override
  void dispose() {
    viewModel.removeListener(_onViewModelChanged);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F4F5),
      appBar: AppBar(
        backgroundColor: const Color(0xFF16A34A),
        foregroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Order Tracker',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () => viewModel.fetchOrders(showLoading: false),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [_buildContent()],
        ),
      ),
    );
  }

  Widget _buildContent() {
    switch (viewModel.state) {
      case OrderState.initial:
      case OrderState.loading:
        return const Padding(
          padding: EdgeInsets.symmetric(vertical: 40),
          child: Center(child: CircularProgressIndicator()),
        );

      case OrderState.error:
        return OrderMessageBox(
          message: viewModel.errorMessage,
          isError: true,
          onRetry: viewModel.fetchOrders,
        );

      case OrderState.success:
        if (viewModel.orders.isEmpty) {
          return const OrderMessageBox(message: 'No orders found.');
        }

        return ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: viewModel.orders.length,
          separatorBuilder: (_, __) => const SizedBox(height: 10),
          itemBuilder: (context, index) {
            final order = viewModel.orders[index];

            return OrderCard(
              isAdvancing: viewModel.advancingOrderId == order.id,
              order: order,
              onAdvance: viewModel.advanceStatus,
            );
          },
        );
    }
  }
}
