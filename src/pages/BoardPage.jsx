import { useState } from "react";
import { KanbanBoard } from "../components/board/KanbanBoard";
import { Modal } from "../components/common/Modal";
import { TaskForm } from "../components/tasks/TaskForm";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import { useUIStore } from "../store/uiStore";

export default function BoardPage() {
	const { isAdmin } = useAuthStore();
	const { createTaskModalOpen, closeCreateTaskModal, addNotification } =
		useUIStore();
	const { createTask } = useTaskStore();
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateTask = async (taskData) => {
		setIsCreating(true);

		const result = await createTask(taskData);

		if (result.success) {
			addNotification({
				type: "success",
				message: "Task created successfully",
			});
			closeCreateTaskModal();
		} else {
			addNotification({
				type: "error",
				message: result.error || "Failed to create task",
			});
		}

		setIsCreating(false);
	};

	return (
		<>
			<KanbanBoard />

			{/* Create Task Modal */}
			{isAdmin() && (
				<Modal
					isOpen={createTaskModalOpen}
					onClose={closeCreateTaskModal}
					title="Create New Task"
					size="lg"
				>
					<TaskForm
						onSubmit={handleCreateTask}
						onCancel={closeCreateTaskModal}
						isLoading={isCreating}
					/>
				</Modal>
			)}
		</>
	);
}
