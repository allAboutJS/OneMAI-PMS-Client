export function ErrorAlert({ message, onDismiss, title = "Error" }) {
	if (!message) return null;

	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-4 relative starting:scale-y-0 starting:opacity-0 duration-300 transition origin-top">
			<div className="flex-1">
				<h3 className="font-semibold text-red-900">{title}</h3>
				<p className="text-sm text-red-700 mt-px">{message}</p>
			</div>

			{onDismiss && (
				<button
					type="button"
					onClick={onDismiss}
					className="text-red-600 hover:text-red-800 transition absolute top-2 right-2 h-8 w-8 rounded-full bg-red-100"
					aria-label="Dismiss alert"
				>
					<span className="text-xl">&times;</span>
				</button>
			)}
		</div>
	);
}
