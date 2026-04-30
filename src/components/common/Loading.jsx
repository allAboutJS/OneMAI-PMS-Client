export function Loading({ text = "Loading..." }) {
	return (
		<div className="flex flex-col items-center justify-center p-8 gap-4">
			<div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
			<p className="text-sm text-zinc-600">{text}</p>
		</div>
	);
}

export function LoadingSkeleton({ count = 5 }) {
	return (
		<div className="space-y-3">
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i.toString()}
					className="h-20 bg-zinc-200 rounded-lg animate-pulse"
				/>
			))}
		</div>
	);
}
