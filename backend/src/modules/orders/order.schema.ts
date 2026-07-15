import { z } from "zod";

const CreateOrderItemSchema = z.object({
	id: z.number().int().positive("Item ID must be a positive integer"),
});

const CreateOrderBodySchema = z.object({
	customerName: z.string().trim().min(1, "Customer name is required").max(100, "Customer name must be less than 100 characters"),
	items: z.array(CreateOrderItemSchema).nonempty("At least one item is required"),
	total: z.number().nonnegative("Total cannot be negative"),
});

export const CreateOrderSchema = z.object({
	body: CreateOrderBodySchema,
});

export const UpdateOrderSchema = z.object({
	params: z.object({
		id: z.coerce.number().int().positive("Order ID must be a positive integer"),
	}),
});

export type CreateOrderInput = z.infer<typeof CreateOrderBodySchema>;
