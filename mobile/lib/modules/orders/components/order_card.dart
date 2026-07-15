import 'package:flutter/material.dart';
import '../models/order.dart';

class OrderCard extends StatelessWidget {
  final Order order;
  final bool isAdvancing;
  final ValueChanged<int> onAdvance;

  const OrderCard({
    super.key,
    required this.isAdvancing,
    required this.order,
    required this.onAdvance,
  });

  @override
  Widget build(BuildContext context) {
    final status = _statusStyle(order.status.name);
    final isComplete = order.status.name == 'delivered';

    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE4E4E7)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '#${order.id}',
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF09090B),
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      order.customerName,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF18181B),
                      ),
                    ),
                  ],
                ),
              ),
              _StatusChip(status: status),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: Text(
                  '${order.items.length} ${order.items.length == 1 ? 'item' : 'items'}',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF52525B),
                  ),
                ),
              ),
              Text(
                'LKR ${order.total.toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF09090B),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            height: 34,
            child: OutlinedButton.icon(
              onPressed:
                  isComplete || isAdvancing ? null : () => onAdvance(order.id),
              icon: isAdvancing
                  ? const SizedBox(
                      height: 14,
                      width: 14,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                      ),
                    )
                  : const Icon(Icons.check_circle_outline, size: 16),
              label: Text(
                isAdvancing ? 'Updating...' : _actionLabel(order.status.name),
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
              style: OutlinedButton.styleFrom(
                foregroundColor: const Color(0xFF18181B),
                disabledForegroundColor: const Color(0xFFA1A1AA),
                side: const BorderSide(color: Color(0xFFD4D4D8)),
                padding: const EdgeInsets.symmetric(horizontal: 10),
                visualDensity: VisualDensity.compact,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final _StatusStyle status;

  const _StatusChip({required this.status});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: status.backgroundColor,
        border: Border.all(color: status.borderColor),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        status.label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: status.textColor,
        ),
      ),
    );
  }
}

class _StatusStyle {
  final String label;
  final Color backgroundColor;
  final Color borderColor;
  final Color textColor;

  const _StatusStyle({
    required this.label,
    required this.backgroundColor,
    required this.borderColor,
    required this.textColor,
  });
}

_StatusStyle _statusStyle(String status) {
  switch (status) {
    case 'pending':
      return const _StatusStyle(
        label: 'Pending',
        backgroundColor: Color(0xFFFFFBEB),
        borderColor: Color(0xFFFDE68A),
        textColor: Color(0xFFB45309),
      );
    case 'preparing':
      return const _StatusStyle(
        label: 'Preparing',
        backgroundColor: Color(0xFFF5F3FF),
        borderColor: Color(0xFFDDD6FE),
        textColor: Color(0xFF6D28D9),
      );
    case 'on_the_way':
      return const _StatusStyle(
        label: 'On The Way',
        backgroundColor: Color(0xFFECFEFF),
        borderColor: Color(0xFFA5F3FC),
        textColor: Color(0xFF0E7490),
      );
    case 'delivered':
      return const _StatusStyle(
        label: 'Delivered',
        backgroundColor: Color(0xFFECFDF5),
        borderColor: Color(0xFFA7F3D0),
        textColor: Color(0xFF047857),
      );
    default:
      return const _StatusStyle(
        label: 'Unknown',
        backgroundColor: Color(0xFFF4F4F5),
        borderColor: Color(0xFFE4E4E7),
        textColor: Color(0xFF3F3F46),
      );
  }
}

String _actionLabel(String status) {
  switch (status) {
    case 'pending':
      return 'Start preparing';
    case 'preparing':
      return 'Dispatch order';
    case 'on_the_way':
      return 'Mark delivered';
    case 'delivered':
      return 'Completed';
    default:
      return 'Advance status';
  }
}
