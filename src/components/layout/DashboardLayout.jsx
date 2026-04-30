import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
	return (
		<div className="flex flex-col h-screen bg-zinc-50">
			{/* Navigation Bar */}
			<Navbar />

			{/* Main Content Area */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<Sidebar />

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
