import { Sparkle } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import { Badge } from "../common/Badge";
import { EmptyState } from "../common/EmptyState";

export default function ReportSection({ title, tasks, selectedBucket, id }) {
	const filteredTasks = selectedBucket
		? tasks.filter((t) => t.bucket === selectedBucket)
		: tasks;

	return (
		<div
			id={id}
			className="bg-white rounded-lg border border-gray-200 overflow-hidden"
		>
			{/* Section Header */}
			<div className="px-6 py-4 border-b border-gray-200 bg-zinc-50">
				<h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
				<p className="text-sm text-zinc-600 mt-1">
					{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
				</p>
			</div>

			{/* Task List */}
			<div className="divide-y divide-gray-200">
				{filteredTasks.length > 0 ? (
					filteredTasks.map((task) => (
						<div
							key={task._id}
							className="px-6 py-4 hover:bg-zinc-50 transition"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<h4 className="font-semibold text-zinc-900">{task.title}</h4>
									<p className="text-sm text-zinc-600 mt-1">
										{task.description}
									</p>

									{/* Metadata */}
									<div className="flex gap-2 mt-3 flex-wrap">
										<Badge label={task.bucket} variant="purple" size="sm" />
										<Badge
											label={task.status}
											variant={
												task.status === "Completed"
													? "green"
													: task.status === "In Progress"
														? "blue"
														: "gray"
											}
											size="sm"
										/>
										{task.priority && (
											<Badge
												label={task.priority}
												variant={
													task.priority === "Critical"
														? "red"
														: task.priority === "High"
															? "orange"
															: "gray"
												}
												size="sm"
											/>
										)}
									</div>
								</div>

								{/* Due Date & Assignees */}
								<div className="text-right ml-4">
									<p className="text-sm font-medium text-zinc-900">
										{formatDate(task.dueDate)}
									</p>
									{task.assignedTo && task.assignedTo.length > 0 && (
										<div className="flex justify-end gap-1 mt-2">
											{task.assignedTo.slice(0, 2).map((user) => (
												<div
													key={user._id}
													className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold"
													title={user.name}
												>
													{user.name?.charAt(0).toUpperCase()}
												</div>
											))}
											{task.assignedTo.length > 2 && (
												<div className="w-6 h-6 rounded-full bg-zinc-400 text-white text-xs flex items-center justify-center text-center">
													+{task.assignedTo.length - 2}
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<div className="px-6 py-12">
						<EmptyState
							icon={<Sparkle size={48} className="text-zinc-400" />}
							title={`No ${title.toLowerCase()}`}
							description="All clear!"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
