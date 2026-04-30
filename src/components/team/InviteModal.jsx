import { useState } from "react";
import * as authAPI from "../../api/auth";
import useError from "../../hooks/useError";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Modal } from "../common/Modal";

export default function InviteModal({ isOpen, onClose, onSuccess }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "Member",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useError(errors.submit, () => {
		setErrors((prev) => ({ ...prev, submit: null }));
	});

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

		try {
			await authAPI.inviteUser(formData.email, formData.name, formData.role);
			onSuccess();
			setFormData({ name: "", email: "", role: "Member" });
		} catch (error) {
			setErrors({
				submit: error.message || "Failed to send invitation",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Invite Team Member"
			size="md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Name */}
				<Input
					label="Full Name"
					name="name"
					type="text"
					placeholder="John Doe"
					value={formData.name}
					onChange={handleChange}
					error={errors.name}
					disabled={isLoading}
					required
				/>

				{/* Email */}
				<Input
					label="Email Address"
					name="email"
					type="email"
					placeholder="john@example.com"
					value={formData.email}
					onChange={handleChange}
					error={errors.email}
					disabled={isLoading}
					required
				/>

				{/* Role */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="role"
						className="block text-sm font-medium text-zinc-700"
					>
						Role
					</label>
					<select
						name="role"
						value={formData.role}
						onChange={handleChange}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-zinc-100 disabled:cursor-not-allowed"
					>
						<option value="Member">Member (Limited Access)</option>
						<option value="Admin">Admin (Full Access)</option>
					</select>
				</div>

				{/* Info */}
				<p className="text-xs text-zinc-600 bg-blue-50 p-4">
					An invitation email will be sent to the user with a link to accept the
					invitation.
				</p>

				{/* Actions */}
				<div className="flex gap-3 pt-4 border-t border-gray-200">
					<Button
						variant="primary"
						type="submit"
						loading={isLoading}
						disabled={isLoading}
					>
						Send Invitation
					</Button>

					<Button
						variant="ghost"
						type="button"
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
}
