import { create } from "zustand";
import * as authAPI from "../api/auth";

// Initialize state from localStorage
const initializeAuth = () => {
	const token = localStorage.getItem("authToken");
	const user = localStorage.getItem("authUser");

	return {
		token: token || null,
		user: user ? JSON.parse(user) : null,
		isLoading: false,
		error: null,
	};
};

export const useAuthStore = create((set) => ({
	// State
	...initializeAuth(),

	// Actions
	login: async (email, password) => {
		set({ isLoading: true, error: null });

		try {
			const response = await authAPI.loginUser(email, password);
			const { user, token } = response;

			// Store in localStorage
			localStorage.setItem("authToken", token);
			localStorage.setItem("authUser", JSON.stringify(user));

			set({
				user,
				token,
				isLoading: false,
				error: null,
			});

			return { success: true, user, token };
		} catch (error) {
			const errorMessage = error.message || "Login failed";

			set({
				isLoading: false,
				error: errorMessage,
			});

			return { success: false, error: errorMessage };
		}
	},

	register: async (email, password, name) => {
		set({ isLoading: true, error: null });

		try {
			const response = await authAPI.registerUser(email, password, name);
			const { user, token } = response;

			// Store in localStorage
			localStorage.setItem("authToken", token);
			localStorage.setItem("authUser", JSON.stringify(user));

			set({
				user,
				token,
				isLoading: false,
				error: null,
			});

			return { success: true, user, token };
		} catch (error) {
			const errorMessage = error.message || "Registration failed";

			set({
				isLoading: false,
				error: errorMessage,
			});

			return { success: false, error: errorMessage };
		}
	},

	verifyAuth: async () => {
		const token = localStorage.getItem("authToken");

		if (!token) {
			set({ user: null, token: null });
			return false;
		}

		try {
			const response = await authAPI.verifyToken();
			const { user } = response;

			localStorage.setItem("authUser", JSON.stringify(user));

			set({
				user,
				token,
				error: null,
			});

			return true;
		} catch (error) {
			// Token invalid or expired
			localStorage.removeItem("authToken");
			localStorage.removeItem("authUser");

			set({
				user: null,
				token: null,
				error: error.message,
			});

			return false;
		}
	},

	logout: () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("authUser");

		set({
			user: null,
			token: null,
			error: null,
		});
	},

	updateProfile: async (updates) => {
		const { user } = useAuthStore.getState();

		if (!user) {
			return { success: false, error: "Not logged in" };
		}

		try {
			const response = await authAPI.updateUserProfile(user._id, updates);
			const { user: updatedUser } = response;

			localStorage.setItem("authUser", JSON.stringify(updatedUser));

			set({
				user: updatedUser,
				error: null,
			});

			return { success: true, user: updatedUser };
		} catch (error) {
			set({ error: error.message });
			return { success: false, error: error.message };
		}
	},

	isAdmin: () => {
		const { user } = useAuthStore.getState();
		return user?.role === "Admin";
	},

	isAuthenticated: () => {
		const { user, token } = useAuthStore.getState();
		return !!user && !!token;
	},

	clearError: () => {
		set({ error: null });
	},
}));
