export function Badge({
	label,
	variant = "gray",
	size = "md",
	className = "",
	icon = null,
}) {
	// Variant styles
	const variantStyles = {
		gray: "bg-zinc-100 text-zinc-800",
		blue: "bg-blue-100 text-blue-800",
		green: "bg-green-100 text-green-800",
		red: "bg-red-100 text-red-800",
		orange: "bg-orange-100 text-orange-800",
		purple: "bg-purple-100 text-purple-800",
		cyan: "bg-cyan-100 text-cyan-800",
		violet: "bg-violet-100 text-violet-800",
	};

	// Size styles
	const sizeStyles = {
		sm: "px-2 py-0.5 text-xs",
		md: "px-3 py-1 text-sm",
		lg: "px-4 py-2 text-base",
	};

	const badgeClass = `
    inline-flex items-center gap-1
    rounded-full font-medium
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

	return (
		<span className={badgeClass}>
			{icon && <span>{icon}</span>}
			<span>{label}</span>
		</span>
	);
}
