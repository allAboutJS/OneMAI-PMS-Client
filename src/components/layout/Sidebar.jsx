import {
	BarChart3,
	LayoutDashboard,
	LogOut,
	Settings,
	Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";

export function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();
	const { sidebarOpen, closeSidebar } = useUIStore();
	const { isAdmin, logout } = useAuthStore();

	// Navigation items
	const navItems = [
		{
			label: "Board",
			path: "/board",
			icon: LayoutDashboard,
			admin: false,
		},
		{
			label: "Reports",
			path: "/reports",
			icon: BarChart3,
			admin: false,
		},
		{
			label: "Team",
			path: "/team",
			icon: Users,
			admin: true,
		},
		{
			label: "Settings",
			path: "/settings",
			icon: Settings,
			admin: false,
		},
	];

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<>
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 md:hidden"
					onClick={closeSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
          fixed md:relative
          left-0 top-16 md:top-0
          bottom-0
          w-64 bg-white border-r border-gray-200
          transition-transform duration-200 ease-in-out
          z-40 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
			>
				{/* Navigation Items */}
				<nav className="p-4 space-y-2 flex-1">
					{navItems.map((item) => {
						// Skip admin-only items if not admin
						if (item.admin && !isAdmin()) {
							return null;
						}

						const Icon = item.icon;
						const isActive = location.pathname === item.path;

						return (
							<Link
								onClick={closeSidebar}
								to={item.path}
								key={item.path}
								className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${
										isActive
											? "bg-blue-50 text-blue-600 font-medium"
											: "text-zinc-700 hover:bg-zinc-100"
									}
                `}
							>
								<Icon size={20} />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				{/* Divider */}
				<div className="border-t border-gray-200" />

				{/* Logout */}
				<div className="p-4">
					<button
						type="button"
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
					>
						<LogOut size={20} />
						<span>Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
}
