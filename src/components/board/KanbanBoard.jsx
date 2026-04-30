// KanbanBoard.jsx
import { DragDropProvider } from "@dnd-kit/react";
import { useCallback, useEffect, useState } from "react";
import useError from "../../hooks/useError";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { useUIStore } from "../../store/uiStore";
import { TASK_BUCKETS, TASK_STATUSES } from "../../utils/constants";
import { Button } from "../common/Button";
import { Loading, LoadingSkeleton } from "../common/Loading";
import { BoardColumn } from "./BoardColumn";

export function KanbanBoard() {
	const {
		fetchTasksByBucket,
		updateTaskStatus,
		isLoading,
		error,
		clearError,
		selectedBucket,
		setSelectedBucket,
	} = useTaskStore();

	const { openCreateTaskModal } = useUIStore();
	const { isAdmin } = useAuthStore();

	const [boardData, setBoardData] = useState(null);

	const loadBucket = useCallback(
		async (bucket) => {
			const result = await fetchTasksByBucket(bucket);
			if (result.success) {
				setBoardData(result.statuses);
			}
		},
		[fetchTasksByBucket],
	);

	useEffect(() => {
		if (selectedBucket) {
			loadBucket(selectedBucket);
		}
	}, [selectedBucket, loadBucket]);

	useError(error, clearError);

	const handleDragEnd = async (event) => {
		const { operation } = event;
		const draggedTaskId = operation?.source?.id;
		const targetStatus = operation?.target?.id;

		if (!draggedTaskId || !targetStatus) {
			return;
		}

		let movedTask = null;

		setBoardData((prev) => {
			if (!prev) return prev;

			const updated = { ...prev };

			for (const status of TASK_STATUSES) {
				updated[status] = (updated[status] || []).filter((task) => {
					if (task._id === draggedTaskId) {
						movedTask = { ...task, status: targetStatus };
						return false;
					}
					return true;
				});
			}

			if (movedTask) {
				updated[targetStatus] = [...(updated[targetStatus] || []), movedTask];
			}

			return updated;
		});

		const result = await updateTaskStatus(draggedTaskId, targetStatus);

		if (!result.success) {
			loadBucket(selectedBucket);
		}
	};

	if (isLoading && !boardData) {
		return <Loading text="Loading board..." />;
	}

	return (
		<div className="min-h-full flex flex-col gap-6 p-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-zinc-900">Kanban Board</h1>
					<p className="text-zinc-600 mt-1">Organize and track your tasks</p>
				</div>

				{isAdmin() && (
					<Button variant="primary" onClick={openCreateTaskModal}>
						+ New Task
					</Button>
				)}
			</div>

			<div className="flex gap-2 overflow-x-auto pb-2">
				<button
					type="button"
					onClick={() => setSelectedBucket("All")}
					className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
						selectedBucket === "All"
							? "bg-blue-600 text-white shadow-md"
							: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
					}`}
				>
					All
				</button>

				{TASK_BUCKETS.map((bucket) => (
					<button
						type="button"
						key={bucket}
						onClick={() => setSelectedBucket(bucket)}
						className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
							selectedBucket === bucket
								? "bg-blue-600 text-white shadow-md"
								: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
						}`}
					>
						{bucket}
					</button>
				))}
			</div>

			{boardData ? (
				<DragDropProvider onDragEnd={handleDragEnd}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
						{TASK_STATUSES.map((status) => (
							<BoardColumn
								key={status}
								status={status}
								bucket={selectedBucket}
								tasks={boardData[status] || []}
								onTasksChange={() => loadBucket(selectedBucket)}
							/>
						))}
					</div>
				</DragDropProvider>
			) : (
				<LoadingSkeleton count={3} />
			)}
		</div>
	);
}
