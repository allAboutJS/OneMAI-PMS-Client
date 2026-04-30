// BoardColumn.jsx
import { useDroppable } from "@dnd-kit/react";
import { Mailbox } from "lucide-react";
import { getStatusBgColor } from "../../utils/formatters";
import { EmptyState } from "../common/EmptyState";
import { TaskCard } from "./TaskCard";

export function BoardColumn({ status, bucket, tasks = [], onTasksChange }) {
	const { ref, isDropTarget } = useDroppable({
		id: status,
	});

	return (
		<div className="bg-zinc-50 rounded-lg h-full flex flex-col">
			<div
				className={`p-4 border-b border-gray-200 ${getStatusBgColor(status)}`}
			>
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-zinc-900">{status}</h2>
					<span className="text-sm font-medium px-2.5 py-0.5 bg-zinc-200 text-zinc-800 rounded-full">
						{tasks.length}
					</span>
				</div>
			</div>

			<div
				ref={ref}
				className={`flex-1 overflow-y-auto p-4 space-y-3 border-l border-r border-b border-dashed ${
					isDropTarget ? "border-blue-500 bg-blue-50" : "border-zinc-300"
				}`}
			>
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<TaskCard
							key={task._id}
							task={task}
							status={status}
							bucket={bucket}
							onTasksChange={onTasksChange}
						/>
					))
				) : (
					<EmptyState
						icon={<Mailbox size={48} className="text-zinc-400" />}
						title={`No ${status.toLowerCase()} tasks`}
						description="Drag tasks here or create a new one"
					/>
				)}
			</div>
		</div>
	);
}
