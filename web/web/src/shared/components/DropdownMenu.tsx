import { useEffect, useId, useRef, useState } from "react";

/**
 * Represents one selectable item inside the dropdown menu.
 *
 * @property label - Text shown to the user in the button and option list.
 * @property value - Stable value sent back to the parent when selected.
 */
export interface DropdownOption {
	label: string;
	value: string;
}

/**
 * Props accepted by the reusable dropdown menu.
 *
 * @property label - Accessible name for the dropdown control.
 * @property onChange - Callback fired when the user selects an option.
 * @property options - List of available dropdown options.
 * @property value - Currently selected option value.
 */
interface DropdownMenuProps {
	label: string;
	onChange: (value: string) => void;
	options: DropdownOption[];
	value: string;
}

/**
 * Renders a reusable dropdown menu styled for the Zincat toolbar UI.
 *
 * @param props - Dropdown menu configuration.
 * @param props.label - Accessible label used by screen readers.
 * @param props.onChange - Receives the selected option value.
 * @param props.options - Options rendered in the dropdown list.
 * @param props.value - Current selected option value.
 * @returns A styled dropdown button with an option menu.
 */
export function DropdownMenu({ label, onChange, options, value }: DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const selectedOption = options.find((option) => option.value === value);

	useEffect(() => {
		/**
		 * Closes the dropdown when the user clicks outside this component.
		 *
		 * @param event - Browser mouse event fired from the document.
		 */
		const handlePointerDown = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handlePointerDown);
		return () => document.removeEventListener("mousedown", handlePointerDown);
	}, []);

	/**
	 * Selects a dropdown option and closes the menu.
	 *
	 * @param nextValue - Value of the option selected by the user.
	 */
	const selectOption = (nextValue: string) => {
		onChange(nextValue);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={rootRef}>
			<button
				aria-controls={isOpen ? menuId : undefined}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={label}
				className="flex h-10 w-full items-center justify-between gap-3 rounded-md border border-zinc-300 bg-white px-3 text-left text-sm font-medium text-zinc-900 outline-none transition hover:border-zinc-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
				onClick={() => setIsOpen((current) => !current)}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						setIsOpen(false);
					}
				}}
				type="button"
			>
				<span className="truncate">{selectedOption?.label ?? "Select option"}</span>
				<span className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-zinc-500" aria-hidden="true" />
			</button>

			{isOpen ? (
				<div
					aria-label={label}
					className="absolute left-0 top-full z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-zinc-200 bg-white p-1 shadow-soft"
					id={menuId}
					role="listbox"
				>
					{options.map((option) => {
						const isSelected = option.value === value;

						return (
							<button
								aria-selected={isSelected}
								className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 focus:bg-emerald-50 focus:outline-none"
								key={option.value}
								onClick={() => selectOption(option.value)}
								onKeyDown={(event) => {
									if (event.key === "Escape") {
										setIsOpen(false);
									}
								}}
								role="option"
								type="button"
							>
								<span>{option.label}</span>
								{isSelected ? <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" /> : null}
							</button>
						);
					})}
				</div>
			) : null}
		</div>
	);
}
