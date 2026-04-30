export default function ReportCard({
	title,
	color,
	tasks,
	selectedBucket,
	target,
}) {
	const filteredTasks = selectedBucket
		? tasks.filter((t) => t.bucket === selectedBucket)
		: tasks;

	const bgColorMap = {
		red: "bg-red-50",
		orange: "bg-orange-50",
		green: "bg-green-50",
	};

	const borderColorMap = {
		red: "border-red-200",
		orange: "border-orange-200",
		green: "border-green-200",
	};

	return (
		<a
			href={target}
			className={`${bgColorMap[color]} border ${borderColorMap[color]} rounded-lg p-4`}
		>
			<div className="flex items-start justify-between mb-2 font-semibold text-black">
				{title}
			</div>
			<div className="font-black text-zinc-900 mb-2 text-3xl">
				{filteredTasks.length}
			</div>
		</a>
	);
}
