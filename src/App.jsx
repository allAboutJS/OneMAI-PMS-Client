import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import BoardPage from "./pages/BoardPage";
import DashboardPage from "./pages/DashboardPage";
// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import TeamPage from "./pages/TeamPage";
import { useAuthStore } from "./store/authStore";

export function App() {
	const { verifyAuth } = useAuthStore();

	useEffect(() => {
		verifyAuth();
	}, [verifyAuth]);

	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* Protected Routes */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<DashboardPage />} />
					<Route path="/board" element={<BoardPage />} />
					<Route path="/reports" element={<ReportsPage />} />
					<Route path="/team" element={<TeamPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Route>

				{/* Catch all - redirect to dashboard */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
