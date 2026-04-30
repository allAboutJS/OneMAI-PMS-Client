import client from "./client";

export const createTask = async (taskData) => {
	const response = await client.post("/tasks", taskData);
	return response;
};

export const getTasks = async (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			params.append(key, value);
		}
	});

	const response = await client.get(`/tasks?${params.toString()}`);
	return response;
};

export const getTaskById = async (taskId) => {
	const response = await client.get(`/tasks/${taskId}`);
	return response;
};

export const updateTask = async (taskId, updates) => {
	const response = await client.patch(`/tasks/${taskId}`, updates);
	return response;
};

export const updateTaskStatus = async (taskId, status) => {
	const response = await client.patch(`/tasks/${taskId}/status`, {
		status,
	});
	return response;
};

export const updateTaskPosition = async (taskId, position, bucket = null) => {
	const payload = { position };
	if (bucket) {
		payload.bucket = bucket;
	}

	const response = await client.patch(`/tasks/${taskId}/position`, payload);
	return response;
};

export const deleteTask = async (taskId) => {
	const response = await client.delete(`/tasks/${taskId}`);
	return response;
};

export const getTasksByBucket = async (bucketName) => {
	const response = await client.get(
		`/tasks/bucket/${encodeURIComponent(bucketName)}`,
	);
	return response;
};
