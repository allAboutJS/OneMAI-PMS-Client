import { X } from "lucide-react";

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	className = "",
}) {
	if (!isOpen) return null;

	// Size styles
	const sizeStyles = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-2xl",
		full: "max-w-4xl",
	};

	return (
		<div
			className="fixed h-full w-full inset-0 bg-black/50 z-50 p-4 overflow-auto"
			onClick={(e) => {
				// Close on backdrop click
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				className={`bg-white rounded-lg m-auto h-fit shadow-lg w-full ${sizeStyles[size]} ${className}`}
			>
				{/* Header */}
				{title && (
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition"
							aria-label="Close modal"
						>
							<X />
						</button>
					</div>
				)}

				{/* Content */}
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
