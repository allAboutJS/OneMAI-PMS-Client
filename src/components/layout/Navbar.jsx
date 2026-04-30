import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { Button } from "../common/Button";

export function Navbar() {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();
	const { toggleSidebar } = useUIStore();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
			<div className="flex items-center justify-between h-16 px-6">
				{/* Left: Menu Toggle & Logo */}
				<div className="flex items-center gap-4">
					<button
						type="button"
						onClick={toggleSidebar}
						className="p-2 hover:bg-zinc-100 rounded-lg transition md:hidden inline"
						aria-label="Toggle sidebar"
					>
						<Menu size={20} />
					</button>

					<div className="flex items-center gap-2">
						<img
							className="h-10"
							src={logo}
							alt="logo"
							height={40}
							width="aut0"
						/>
						<h1 className="text-xl font-bold text-zinc-900">
							Project Management
						</h1>
					</div>
				</div>

				{/* Right: User Menu */}
				<div className="flex items-center gap-4">
					{/* User Info */}
					<div className="text-right hidden sm:block">
						<p className="text-sm font-medium text-zinc-900">{user?.name}</p>
						<p className="text-xs text-zinc-600">{user?.role}</p>
					</div>

					{/* User Avatar */}
					<div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
						{user?.name?.charAt(0).toUpperCase() || "?"}
					</div>

					{/* Logout Button */}
					<Button variant="ghost" size="sm" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</div>
		</nav>
	);
}
