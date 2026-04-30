import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export default function ProfileSettings({ user }) {
	const { updateProfile } = useAuthStore();
	const { addNotification } = useUIStore();
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email) newErrors.email = "Email is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsLoading(true);

		const result = await updateProfile(formData);

		if (result.success) {
			addNotification({
				type: "success",
				message: "Profile updated successfully",
			});
		} else {
			addNotification({
				type: "error",
				message: result.error || "Failed to update profile",
			});
		}

		setIsLoading(false);
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-8">
			<h2 className="text-2xl font-bold text-zinc-900 mb-6">
				Profile Information
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Avatar */}
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
						{user?.name?.charAt(0).toUpperCase()}
					</div>
					<div>
						<p className="font-semibold text-zinc-900">{user?.name}</p>
						<p className="text-sm text-zinc-600">
							{user?.role === "Admin" ? "Administrator" : "Member"}
						</p>
					</div>
				</div>

				{/* Name Input */}
				<Input
					label="Full Name"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleChange}
					error={errors.name}
					disabled={isLoading}
					required
				/>

				{/* Email Input */}
				<Input
					label="Email Address"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					error={errors.email}
					disabled={isLoading}
					required
				/>

				{/* Account Info */}
				<div className="bg-zinc-50 rounded-lg p-4 space-y-3">
					<div>
						<p className="text-xs font-semibold text-zinc-600 uppercase">
							Member Since
						</p>
						<p className="text-sm text-zinc-900 mt-1">
							{new Date(user?.createdAt).toLocaleDateString()}
						</p>
					</div>
					<div>
						<p className="text-xs font-semibold text-zinc-600 uppercase">
							Last Login
						</p>
						<p className="text-sm text-zinc-900 mt-1">
							{user?.lastLogin
								? new Date(user.lastLogin).toLocaleString()
								: "Never"}
						</p>
					</div>
				</div>

				{/* Save Button */}
				<Button
					variant="primary"
					type="submit"
					loading={isLoading}
					disabled={isLoading}
				>
					Save Changes
				</Button>
			</form>
		</div>
	);
}
