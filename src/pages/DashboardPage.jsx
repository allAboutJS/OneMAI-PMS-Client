import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/common/Loading";
import { useAuthStore } from "../store/authStore";

export default function DashboardPage() {
	const navigate = useNavigate();
	const { user } = useAuthStore();

	// Redirect to board immediately
	useEffect(() => {
		navigate("/board", { replace: true });
	}, [navigate]);

	return (
		<div className="flex flex-col items-center justify-center h-full gap-4">
			<Loading text={`Welcome, ${user?.name}! Loading your board...`} />
		</div>
	);
}
