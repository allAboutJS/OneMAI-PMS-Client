import { create } from "zustand";
import * as tasksAPI from "../api/tasks";

export const useTaskStore = create((set, get) => ({
	// State
	tasks: [],
	filteredTasks: [],
	selectedTask: null,
	selectedBucket: "Feature Development",
	isLoading: false,
	error: null,
	filters: {
		bucket: null,
		status: null,
		assigned: null,
	},

	fetchTasks: async (filters = {}) => {
		set({ isLoading: true, error: null });

		try {
			const response = await tasksAPI.getTasks(filters);
			const { tasks } = response;

			set({
				tasks,
				isLoading: false,
				error: null,
			});

			return { success: true, tasks };
		} catch (error) {
			set({
				isLoading: false,
				error: error.message,
			});

			return { success: false, error: error.message };
		}
	},

	fetchTasksByBucket: async (bucketName) => {
		set({ isLoading: true, error: null });

		try {
			const response = await tasksAPI.getTasksByBucket(bucketName);
			const { statuses } = response;

			set({
				selectedBucket: bucketName,
				isLoading: false,
				error: null,
			});

			return { success: true, statuses };
		} catch (error) {
			set({
				isLoading: false,
				error: error.message,
			});

			return { success: false, error: error.message };
		}
	},

	getTask: async (taskId) => {
		try {
			const response = await tasksAPI.getTaskById(taskId);
			const { task } = response;

			set({ selectedTask: task });

			return { success: true, task };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	createTask: async (taskData) => {
		try {
			const response = await tasksAPI.createTask(taskData);
			const { task } = response;

			const { tasks } = get();
			set({
				tasks: [...tasks, task],
				error: null,
			});

			return { success: true, task };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	updateTask: async (taskId, updates) => {
		try {
			const response = await tasksAPI.updateTask(taskId, updates);
			const { task } = response;

			const { tasks } = get();
			set({
				tasks: tasks.map((t) => (t._id === taskId ? task : t)),
				selectedTask: task,
				error: null,
			});

			return { success: true, task };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	updateTaskStatus: async (taskId, status) => {
		try {
			const response = await tasksAPI.updateTaskStatus(taskId, status);
			const { task } = response;

			const { tasks } = get();
			set({
				tasks: tasks.map((t) => (t._id === taskId ? task : t)),
				selectedTask: task,
				error: null,
			});

			return { success: true, task };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	updateTaskPosition: async (taskId, position, bucket = null) => {
		try {
			const response = await tasksAPI.updateTaskPosition(
				taskId,
				position,
				bucket,
			);
			const { task } = response;

			const { tasks } = get();
			set({
				tasks: tasks.map((t) => (t._id === taskId ? task : t)),
				error: null,
			});

			return { success: true, task };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	deleteTask: async (taskId) => {
		try {
			await tasksAPI.deleteTask(taskId);

			const { tasks } = get();
			set({
				tasks: tasks.filter((t) => t._id !== taskId),
				selectedTask: null,
				error: null,
			});

			return { success: true };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	selectTask: (task) => {
		set({ selectedTask: task });
	},

	clearSelectedTask: () => {
		set({ selectedTask: null });
	},

	setFilters: (filters) => {
		set({ filters });
	},

	clearError: () => {
		set({ error: null });
	},

	setError: (error) => {
		set({ error });
	},
}));
