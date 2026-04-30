import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const client = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

client.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

client.interceptors.response.use(
	(response) => {
		return response.data;
	},

	(error) => {
		// Handle different error types
		if (error.response) {
			// Server responded with error status
			const { status, data } = error.response;

			if (status === 401) {
				// Unauthorized - token expired or invalid
				// Clear auth state and redirect to login
				localStorage.removeItem("authToken");
				localStorage.removeItem("authUser");

				// Force redirect to login page if user is in dashboard
				if (
					window.location.pathname !== "/login" &&
					window.location.pathname !== "/register"
				) {
					window.location.href = "/login";
				}

				return Promise.reject({
					message:
						data.error?.message || "Session expired. Please login again.",
					status: 401,
				});
			}

			if (status === 403) {
				// Forbidden - insufficient permissions
				return Promise.reject({
					message:
						data.error?.message ||
						"You do not have permission to perform this action.",
					status: 403,
				});
			}

			if (status === 404) {
				// Not found
				return Promise.reject({
					message: data.error?.message || "Resource not found.",
					status: 404,
				});
			}

			if (status === 409) {
				// Conflict - duplicate or state error
				return Promise.reject({
					message: data.error?.message || "Conflict. Please try again.",
					status: 409,
				});
			}

			if (status === 422) {
				// Validation error
				return Promise.reject({
					message: data.error?.message || "Validation failed.",
					details: data.error?.details || [],
					status: 422,
				});
			}

			// Generic server error
			return Promise.reject({
				message: data.error?.message || "An error occurred. Please try again.",
				status,
			});
		} else if (error.request) {
			// Request made but no response (network error)
			return Promise.reject({
				message: "Network error. Please check your connection.",
				status: 0,
			});
		} else {
			// Error in request setup
			return Promise.reject({
				message: error.message || "An unexpected error occurred.",
				status: 0,
			});
		}
	},
);

export default client;
