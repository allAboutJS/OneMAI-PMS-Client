export function Button({
	children,
	variant = "primary",
	size = "md",
	disabled = false,
	loading = false,
	className = "",
	...props
}) {
	// Base styles
	const baseStyles =
		"font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

	// Variant styles
	const variantStyles = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
		secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 active:bg-zinc-400",
		danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
		ghost: "text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200",
	};

	// Size styles
	const sizeStyles = {
		sm: "px-2 py-1 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	return (
		<button disabled={disabled || loading} className={buttonClass} {...props}>
			{loading ? (
				<span className="flex items-center gap-2">
					<span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
					Loading...
				</span>
			) : (
				children
			)}
		</button>
	);
}
