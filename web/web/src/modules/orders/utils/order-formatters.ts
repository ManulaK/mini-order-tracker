export const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-LK", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
