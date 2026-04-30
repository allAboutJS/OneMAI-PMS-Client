import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import * as authAPI from "../api/auth";
import { Button } from "../components/common/Button";
import { LoadingSkeleton } from "../components/common/Loading";
import InviteModal from "../components/team/InviteModal";
import UserRow from "../components/team/UserRow";
import useError from "../hooks/useError";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";

export default function TeamPage() {
	const { isAdmin } = useAuthStore();
	const { addNotification } = useUIStore();
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

	useError(error, setError);

	const loadUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await authAPI.fetchUsers();

			if (!response.success) {
				setError(response.error.message);
				return;
			}

			setUsers(response.users);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	if (!isAdmin()) {
		return (
			<div className="p-8">
				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
					<h2 className="text-lg font-semibold text-yellow-900">Admin Only</h2>
					<p className="text-yellow-700 mt-2">
						This page is only accessible to administrators.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			{/* Header */}
			<div className="flex items-start justify-between mb-6">
				<div>
					<h1 className="text-3xl font-bold text-zinc-900">Team Members</h1>
					<p className="text-zinc-600 mt-2">Manage and invite team members</p>
				</div>
				<Button
					variant="primary"
					onClick={() => setIsInviteModalOpen(true)}
					icon={<Plus size={20} />}
				>
					Invite User
				</Button>
			</div>

			{/* Team Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<p className="text-zinc-600 text-sm">Total Members</p>
					<p className="text-3xl! font-bold text-zinc-900 mt-2">
						{users.length}
					</p>
				</div>

				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div>
						<p className="text-zinc-600 text-sm">Admins</p>
						<p className="text-3xl font-bold text-zinc-900 mt-2">
							{users.filter((u) => u.role === "Admin").length}
						</p>
					</div>
				</div>

				<div className="bg-white border border-gray-200 rounded-lg p-4">
					<div>
						<p className="text-zinc-600 text-sm">Members</p>
						<p className="text-3xl font-bold text-zinc-900 mt-2">
							{users.filter((u) => u.role === "Member").length}
						</p>
					</div>
				</div>
			</div>

			{/* Users List */}
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				{/* Table Header */}
				<div className="px-6 py-4 border-b border-gray-200 bg-zinc-50">
					<h2 className="font-semibold text-zinc-900">All Team Members</h2>
				</div>

				{/* Users */}
				{isLoading ? (
					<div className="p-6">
						<LoadingSkeleton count={3} />
					</div>
				) : users.length > 0 ? (
					<div className="divide-y divide-gray-200">
						{users.map((user) => (
							<UserRow key={user._id} user={user} />
						))}
					</div>
				) : (
					<div className="p-12 text-center">
						<p className="text-zinc-600">No team members yet</p>
						<Button
							variant="primary"
							className="mt-4"
							onClick={() => setIsInviteModalOpen(true)}
						>
							Invite First Member
						</Button>
					</div>
				)}
			</div>

			{/* Invite Modal */}
			<InviteModal
				isOpen={isInviteModalOpen}
				onClose={() => setIsInviteModalOpen(false)}
				onSuccess={() => {
					setIsInviteModalOpen(false);
					addNotification({
						type: "success",
						message: "User invitation sent successfully",
					});
					loadUsers();
				}}
			/>
		</div>
	);
}
