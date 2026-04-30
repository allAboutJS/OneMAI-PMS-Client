import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Loading } from "../common/Loading";

export function ProtectedRoute({ children, adminOnly = false }) {
	const { user, token, isAdmin } = useAuthStore();
	const [isVerifying] = useState(!user && !!token);

	if (isVerifying) {
		return <Loading text="Verifying authentication..." />;
	}

	// Not authenticated
	if (!user || !token) {
		return <Navigate to="/login" replace />;
	}

	// Admin only route
	if (adminOnly && !isAdmin()) {
		return <Navigate to="/" replace />;
	}

	return children;
}
