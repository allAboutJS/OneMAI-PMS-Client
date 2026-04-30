import { CheckCircle, Edit, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useError from "../../hooks/useError";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { BUCKET_ICONS, TASK_STATUSES } from "../../utils/constants";
import {
	formatDate,
	formatDateTime,
	getPriorityColor,
} from "../../utils/formatters";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { TaskForm } from "./TaskForm";

export function TaskModal({ isOpen, onClose, task, onTasksChange }) {
	const { user, isAdmin } = useAuthStore();
	const { updateTask, updateTaskStatus, deleteTask, clearError, error } =
		useTaskStore();

	const [isEditing, setIsEditing] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [_, setSelectedStatus] = useState(task?.status);

	// Display errors in a toast
	useError(error, clearError);

	if (!task) return null;

	const isAssignedToMe =
		task.assignedToAll || task.assignedTo?.some((u) => u._id === user?._id);

	const canEdit = isAdmin();
	const canChangeStatus = isAdmin() || isAssignedToMe;

	// Handle status change
	const handleStatusChange = async (newStatus) => {
		if (newStatus === task.status) return;

		setIsLoadingUpdate(true);

		const loadingToast = toast.loading("Updating task status...");

		try {
			const result = await updateTaskStatus(task._id, newStatus);

			toast.dismiss(loadingToast);

			if (result.success) {
				setSelectedStatus(newStatus);
				showSuccessToast("Status Updated", `Task moved to ${newStatus}`);
				onTasksChange?.();
			} else {
				showErrorToast(
					"Status Update Failed",
					result.error || "Failed to update task status",
				);
			}
		} catch (err) {
			toast.dismiss(loadingToast);
			showErrorToast(
				"Unexpected Error",
				err.message || "Something went wrong while updating status",
			);
		} finally {
			setIsLoadingUpdate(false);
		}
	};

	// Handle task update
	const handleUpdate = async (formData) => {
		setIsLoadingUpdate(true);

		const loadingToast = toast.loading("Saving task changes...");

		try {
			const result = await updateTask(task._id, formData);

			toast.dismiss(loadingToast);

			if (result.success) {
				showSuccessToast(
					"Update Successful",
					result.message || "Task was updated successfully",
				);

				setIsEditing(false);
				onTasksChange?.();
			} else {
				showErrorToast(
					"Update Failed",
					result.error || "Failed to update task",
				);
			}
		} catch (err) {
			toast.dismiss(loadingToast);

			showErrorToast(
				"Unexpected Error",
				err.message || "Something went wrong while updating task",
			);
		} finally {
			setIsLoadingUpdate(false);
		}
	};

	// Handle task deletion
	const handleDelete = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this task? This cannot be undone.",
		);

		if (!confirmed) {
			showInfoToast("Cancelled", "Task deletion was cancelled");
			return;
		}

		setIsLoadingDelete(true);

		const loadingToast = toast.loading("Deleting task...");

		try {
			const result = await deleteTask(task._id);

			toast.dismiss(loadingToast);

			if (result.success) {
				showSuccessToast("Task Deleted", "Task deleted successfully");

				onClose();
				onTasksChange?.();
			} else {
				showErrorToast(
					"Delete Failed",
					result.error || "Failed to delete task",
				);
			}
		} catch (err) {
			toast.dismiss(loadingToast);

			showErrorToast(
				"Unexpected Error",
				err.message || "Something went wrong while deleting task",
			);
		} finally {
			setIsLoadingDelete(false);
		}
	};

	// View Mode
	if (!isEditing) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} title="Task Viewer" size="lg">
				{/* Header with badges */}
				<div className="mb-6 space-y-4">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h1 className="text-2xl font-bold text-zinc-900">{task.title}</h1>
							<p className="text-sm text-zinc-600 mt-1">
								Created {formatDateTime(task.createdAt)}
							</p>
						</div>
					</div>

					{/* Status and Bucket Badges */}
					<div className="flex gap-2 flex-wrap">
						<Badge
							label={task.bucket}
							variant="purple"
							icon={BUCKET_ICONS[task.bucket]}
						/>
						<Badge
							label={task.status}
							variant={task.status === "Completed" ? "green" : "blue"}
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
							/>
						)}
					</div>
				</div>

				{/* Description */}
				{task.description && (
					<div className="mb-6">
						<h3 className="text-sm font-semibold text-zinc-700 mb-2">
							Description
						</h3>
						<p className="text-zinc-600 whitespace-pre-wrap">
							{task.description}
						</p>
					</div>
				)}

				{/* Task Details Grid */}
				<div className="grid grid-cols-2 gap-6 mb-6">
					{/* Due Date */}
					<div>
						<h3 className="text-xs font-semibold text-zinc-700 uppercase mb-1">
							Due Date
						</h3>
						<p className="text-zinc-900">
							{task.dueDate ? formatDate(task.dueDate) : "No due date"}
						</p>
						{task.completedAt && (
							<p className="text-xs text-zinc-600 mt-1">
								Completed {formatDateTime(task.completedAt)}
							</p>
						)}
					</div>

					{/* Priority */}
					<div>
						<h3 className="text-xs font-semibold text-zinc-700 uppercase mb-1">
							Priority
						</h3>
						<p className={getPriorityColor(task.priority)}>
							{task.priority || "Medium"}
						</p>
					</div>
				</div>

				{/* Assignees */}
				<div className="mb-6">
					<h3 className="text-sm font-semibold text-zinc-700 mb-3">
						Assigned To
					</h3>
					{task.assignedToAll ? (
						<Badge label="Everyone" variant="blue" icon="👥" />
					) : task.assignedTo && task.assignedTo.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{task.assignedTo.map((user) => (
								<div
									key={user._id}
									className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg"
								>
									<div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold">
										{user.name?.charAt(0).toUpperCase()}
									</div>
									<span className="text-sm text-zinc-900">{user.name}</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-zinc-600 text-sm">Not assigned to anyone</p>
					)}
				</div>

				{/* Status Change (if allowed) */}
				{canChangeStatus && task.status !== "Completed" && (
					<div className="mb-6">
						<h3 className="text-sm font-semibold text-zinc-700 mb-3">
							Change Status
						</h3>
						<div className="flex gap-2">
							{TASK_STATUSES.filter((s) => s !== task.status).map((status) => (
								<Button
									key={status}
									variant={status === "Completed" ? "primary" : "secondary"}
									size="sm"
									onClick={() => handleStatusChange(status)}
									loading={isLoadingUpdate}
									disabled={isLoadingUpdate}
									className="whitespace-nowrap px-4 flex items-center  gap-1 py-2"
								>
									{status === "Completed" ? (
										<>
											<CheckCircle size={16} className="mr-1" />
											Mark Complete
										</>
									) : (
										status
									)}
								</Button>
							))}
						</div>
					</div>
				)}

				{/* Tags */}
				{task.tags && task.tags.length > 0 && (
					<div className="mb-6">
						<h3 className="text-sm font-semibold text-zinc-700 mb-2">Tags</h3>
						<div className="flex flex-wrap gap-2">
							{task.tags.map((tag) => (
								<Badge key={tag} label={tag} variant="gray" size="sm" />
							))}
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className="border-t border-gray-200 pt-6 flex gap-3">
					{canEdit && (
						<Button
							variant="primary"
							size="sm"
							onClick={() => setIsEditing(true)}
							icon={<Edit2 size={16} />}
							className="whitespace-nowrap px-4 flex items-center  gap-1 py-2"
						>
							<Edit size={16} />
							Edit Task
						</Button>
					)}

					{canEdit && (
						<Button
							variant="danger"
							size="sm"
							onClick={handleDelete}
							loading={isLoadingDelete}
							disabled={isLoadingDelete}
							className="whitespace-nowrap px-4 flex items-center  gap-1 py-2"
						>
							<Trash2 size={16} />
							Delete
						</Button>
					)}
				</div>
			</Modal>
		);
	}

	// Edit Mode
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setIsEditing(false)}
			title="Edit Task"
			size="lg"
		>
			<TaskForm
				task={task}
				onSubmit={handleUpdate}
				onCancel={() => setIsEditing(false)}
				isLoading={isLoadingUpdate}
			/>
		</Modal>
	);
}
