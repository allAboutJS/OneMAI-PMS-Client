import client from "./client";

export const registerUser = async (email, password, name) => {
	const response = await client.post("/auth/register", {
		email,
		password,
		name,
	});
	return response;
};

export const loginUser = async (email, password) => {
	const response = await client.post("/auth/login", {
		email,
		password,
	});
	return response;
};

export const getCurrentUser = async () => {
	const response = await client.get("/auth/me");
	return response;
};

export const verifyToken = async () => {
	const response = await client.get("/auth/verify");
	return response;
};

export const updateUserProfile = async (userId, updates) => {
	const response = await client.patch(`/auth/${userId}`, updates);
	return response;
};

export const inviteUser = async (email, name, role = "Member") => {
	const response = await client.post("/auth/invite", {
		email,
		name,
		role,
	});
	return response;
};

export const acceptInvite = async (inviteToken, password) => {
	const response = await client.post("/auth/accept-invite", {
		inviteToken,
		password,
	});
	return response;
};

export const logout = () => {
	localStorage.removeItem("authToken");
	localStorage.removeItem("authUser");
};

export const fetchUsers = async () => {
	return await client.get("/auth/all");
};
