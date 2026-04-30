export function Input({
	label,
	error,
	required = false,
	className = "",
	...props
}) {
	const inputClass = `
    w-full px-4 py-2 border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-zinc-100 disabled:cursor-not-allowed
    placeholder-gray-400
    ${error ? "border-red-500" : ""}
    ${className}
  `.trim();

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label
					htmlFor={props.name}
					className="block text-sm font-medium text-zinc-700"
				>
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}

			<input className={inputClass} {...props} />

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
