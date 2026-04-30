import { useCallback, useEffect, useState } from "react";
import * as authAPI from "../../api/auth";
import useError from "../../hooks/useError";
import { Loading } from "../common/Loading";

export function AssigneeSelect({ value = [], onChange, disabled = false }) {
	const [users, setUsers] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState(null);

	useError(error, setError);

	const fetchUsers = useCallback(async () => {
		setIsLoadingUsers(true);
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
			setIsLoadingUsers(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	// Fetch all users on mount
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	// Filter users by search term
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Get selected user objects
	const selectedUsers = users.filter((u) => value.includes(u._id));

	// Handle user selection
	const handleSelectUser = (userId) => {
		if (value.includes(userId)) {
			onChange(value.filter((id) => id !== userId));
		} else {
			onChange([...value, userId]);
		}
	};

	// Handle user removal
	const handleRemoveUser = (userId) => {
		onChange(value.filter((id) => id !== userId));
	};

	return (
		<div className="flex flex-col gap-3">
			<label htmlFor="" className="block text-sm font-medium text-zinc-700">
				Assign To
			</label>

			{/* Selected Users */}
			{selectedUsers.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selectedUsers.map((user) => (
						<div
							key={user._id}
							className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg"
						>
							<span className="text-sm text-zinc-900">{user.name}</span>
							<button
								onClick={() => handleRemoveUser(user._id)}
								className="text-blue-600 hover:text-blue-800 font-bold"
								type="button"
								disabled={disabled}
							>
								×
							</button>
						</div>
					))}
				</div>
			)}

			{/* Dropdown */}
			<div className="relative">
				<div
					onClick={() => !disabled && setIsOpen(!isOpen)}
					className={`
            w-full px-4 py-2 border border-gray-300 rounded-md
            flex items-center justify-between cursor-pointer
            ${isOpen ? "ring-2 ring-blue-500 border-transparent" : ""}
            ${disabled ? "bg-zinc-100 cursor-not-allowed" : "bg-white"}
          `.trim()}
				>
					<input
						type="text"
						placeholder="Search and select users..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onFocus={() => setIsOpen(true)}
						disabled={disabled}
						className="flex-1 outline-none bg-transparent"
					/>
					<span className="text-zinc-400">▼</span>
				</div>

				{/* Dropdown Menu */}
				{isOpen && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
						{isLoadingUsers ? (
							<div className="p-4">
								<Loading text="Loading users..." />
							</div>
						) : filteredUsers.length > 0 ? (
							<div className="divide-y divide-zinc-300 max-h-48">
								{filteredUsers.map((user) => (
									<button
										key={user._id}
										onClick={() => handleSelectUser(user._id)}
										type="button"
										className={`
                      w-full px-4 py-3 text-left flex items-center gap-3
                      hover:bg-zinc-100 transition
                      ${value.includes(user._id) ? "bg-blue-50" : ""}
                    `.trim()}
									>
										<input
											type="checkbox"
											checked={value.includes(user._id)}
											onChange={() => {}}
											className="w-4 h-4 text-blue-600 rounded"
										/>
										<div className="flex-1">
											<p className="text-sm font-medium text-zinc-900">
												{user.name}
											</p>
											<p className="text-xs text-zinc-600">{user.email}</p>
										</div>
									</button>
								))}
							</div>
						) : (
							<div className="p-4 text-center text-zinc-600 text-sm">
								No users found
							</div>
						)}
					</div>
				)}
			</div>

			{/* Close dropdown when clicking outside */}
			{isOpen && (
				<div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40" />
			)}
		</div>
	);
}
