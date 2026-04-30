export function EmptyState({
	icon = "📭",
	title = "No items",
	description = "There are no items to display",
	action = null,
}) {
	return (
		<div className="flex flex-col items-center justify-center p-12 gap-4 text-center">
			<div className="text-5xl">{icon}</div>
			<div>
				<h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
				<p className="text-sm text-zinc-600 mt-2">{description}</p>
			</div>
			{action && <div className="mt-4">{action}</div>}
		</div>
	);
}
