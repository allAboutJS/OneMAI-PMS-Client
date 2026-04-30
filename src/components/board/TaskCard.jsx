// TaskCard.jsx
import { useDraggable } from "@dnd-kit/react";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { BUCKET_ICONS } from "../../utils/constants";
import { formatDate, truncate } from "../../utils/formatters";
import { Badge } from "../common/Badge";
import { TaskModal } from "../tasks/TaskModal";

export function TaskCard({ task, status, onTasksChange }) {
	const { user } = useAuthStore();
	const { selectTask } = useTaskStore();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showDragHint, setShowDragHint] = useState(false);

	const { ref, listeners, attributes, transform, isDragging } = useDraggable({
		id: task._id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	const isAssignedToMe =
		task.assignedToAll || task.assignedTo?.some((u) => u._id === user?._id);

	const isOverdue =
		task.dueDate &&
		new Date(task.dueDate) < new Date() &&
		status !== "Completed";

	const handleCardClick = () => {
		selectTask(task);
		setIsModalOpen(true);
	};

	return (
		<>
			<div
				ref={ref}
				style={style}
				{...listeners}
				{...attributes}
				onMouseEnter={() => setShowDragHint(true)}
				onMouseLeave={() => setShowDragHint(false)}
				className={`bg-white rounded-lg border border-gray-200 p-4 cursor-grab active:cursor-grabbing transition-all duration-150 hover:shadow-md ${
					isDragging ? "shadow-lg ring-2 ring-blue-500" : ""
				} ${isOverdue ? "border-red-300 bg-red-50" : ""}`}
			>
				{showDragHint && (
					<div className="text-xs text-zinc-400 mb-2">⋮⋮ Drag to move</div>
				)}

				<button
					type="button"
					onClick={handleCardClick}
					className="text-left w-full group"
				>
					<h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition line-clamp-2">
						{task.title}
					</h3>
				</button>

				{task.description && (
					<p className="text-xs text-zinc-600 mt-2 line-clamp-2">
						{truncate(task.description, 80)}
					</p>
				)}

				<div className="mt-3 space-y-2">
					<div className="flex gap-2 flex-wrap">
						<Badge
							label={task.bucket}
							variant="purple"
							size="sm"
							icon={BUCKET_ICONS[task.bucket]}
						/>

						{task.priority && task.priority !== "Medium" && (
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

					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-1 text-xs text-zinc-600">
							{isOverdue && <AlertCircle size={14} className="text-red-500" />}
							<span className={isOverdue ? "text-red-600 font-medium" : ""}>
								{formatDate(task.dueDate)}
							</span>
						</div>

						{task.assignedTo && task.assignedTo.length > 0 && (
							<div className="flex -space-x-2">
								{task.assignedTo.slice(0, 2).map((u) => (
									<div
										key={u._id}
										className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border border-white"
										title={u.name}
									>
										{u.name?.charAt(0).toUpperCase() || "?"}
									</div>
								))}

								{task.assignedTo.length > 2 && (
									<div className="w-6 h-6 rounded-full bg-zinc-400 text-white text-xs flex items-center justify-center border border-white">
										+{task.assignedTo.length - 2}
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				{!isAssignedToMe && !task.assignedToAll && (
					<div className="mt-2 text-xs text-zinc-500 italic">
						Not assigned to you
					</div>
				)}
			</div>

			<TaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				task={task}
				onTasksChange={onTasksChange}
			/>
		</>
	);
}
