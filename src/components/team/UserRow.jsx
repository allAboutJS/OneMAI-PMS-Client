import { Badge } from "../common/Badge";

export default function UserRow({ user }) {
	return (
		<div className="px-6 py-4 hover:bg-zinc-50 transition flex items-center justify-between">
			<div className="flex items-center gap-4">
				{/* Avatar */}
				<div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
					{user.name?.charAt(0).toUpperCase()}
				</div>

				{/* User Info */}
				<div>
					<h4 className="font-semibold text-zinc-900">{user.name}</h4>
					<p className="text-sm text-zinc-600">{user.email}</p>
				</div>
			</div>

			{/* Role & Actions */}
			<div className="flex items-center gap-4">
				<Badge
					label={user.role}
					variant={user.role === "Admin" ? "orange" : "blue"}
				/>
			</div>
		</div>
	);
}
