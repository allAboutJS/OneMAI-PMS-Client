import { useState } from "react";
import { KanbanBoard } from "../components/board/KanbanBoard";
import { Modal } from "../components/common/Modal";
import { TaskForm } from "../components/tasks/TaskForm";
import { useTaskStore } from "../store/taskStore";
import { useUIStore } from "../store/uiStore";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export default function BoardPage() {
	const { createTaskModalOpen, closeCreateTaskModal } = useUIStore();
	const { createTask } = useTaskStore();
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateTask = async (taskData) => {
		setIsCreating(true);

		const result = await createTask(taskData);

		if (result.success) {
			showSuccessToast("Task Creation Success", "Task created successfully");
			closeCreateTaskModal();
		} else {
			showErrorToast(
				"Task Creation Error",
				result.error || "Failed to create task",
			);
		}

		setIsCreating(false);
	};

	return (
		<>
			<KanbanBoard />

			{/* Create Task Modal */}
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
		</>
	);
}
