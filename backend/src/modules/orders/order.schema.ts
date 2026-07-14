import { z } from "zod";

export const CreateOrderItemSchema = z.object({
	id: z.number().int().positive("Item ID must be a positive integer"),
});

export const CreateOrderSchema = z.object({
	customerName: z.string().trim().min(1, "Customer name is required").max(100, "Customer name must be less than 100 characters"),
	items: z.array(CreateOrderItemSchema).nonempty("At least one item is required"),
	total: z.number().nonnegative("Total cannot be negative"),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
