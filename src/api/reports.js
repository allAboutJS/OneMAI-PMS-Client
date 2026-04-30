import client from "./client";

export const getOverdueTasks = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value) {
			params.append(key, value);
		}
	});

	const response = await client.get(
		`/tasks/reports/overdue?${params.toString()}`,
	);
	return response;
};

export const getDueToday = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value) {
			params.append(key, value);
		}
	});

	const response = await client.get(
		`/tasks/reports/due-today?${params.toString()}`,
	);
	return response;
};

export const getFutureTasks = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			params.append(key, value);
		}
	});

	const response = await client.get(
		`/tasks/reports/future?${params.toString()}`,
	);
	return response;
};

export const getTaskSummary = async () => {
	const response = await client.get("/tasks/reports/summary");
	return response;
};

export const getTasksByStatus = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value) {
			params.append(key, value);
		}
	});

	const response = await client.get(
		`/tasks/reports/by-status?${params.toString()}`,
	);
	return response;
};

export const getMyTasks = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value) {
			params.append(key, value);
		}
	});

	const response = await client.get(
		`/tasks/reports/my-tasks?${params.toString()}`,
	);
	return response;
};
