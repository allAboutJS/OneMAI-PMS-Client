import client from "./client";

export const assignTask = async (taskId, assignmentData) => {
	const response = await client.post(`/tasks/${taskId}/assign`, assignmentData);
	return response;
};

export const addAssignee = async (taskId, userId) => {
	const response = await client.post(
		`/tasks/${taskId}/assign/add/${userId}`,
		{},
	);
	return response;
};

export const removeAssignee = async (taskId, userId) => {
	const response = await client.delete(`/tasks/${taskId}/assign/${userId}`);
	return response;
};

export const bulkAssignUsers = async (taskId, userIds) => {
	const response = await client.post(`/tasks/${taskId}/assign/bulk`, {
		userIds,
	});
	return response;
};

export const clearAssignments = async (taskId) => {
	const response = await client.delete(`/tasks/${taskId}/assign`);
	return response;
};

export const getTaskAssignees = async (taskId) => {
	const response = await client.get(`/tasks/${taskId}/assignees`);
	return response;
};
