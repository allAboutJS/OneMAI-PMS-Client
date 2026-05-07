import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { TASK_BUCKETS, TASK_PRIORITIES } from "../../utils/constants";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { AssigneeSelect } from "./AssigneeSelect";

export function TaskForm({
	task = null,
	onSubmit,
	onCancel,
	isLoading = false,
}) {
	const [errors, setErrors] = useState({});
	const { isAdmin, user } = useAuthStore();

	const [formData, setFormData] = useState({
		title: task?.title || "",
		description: task?.description || "",
		bucket: task?.bucket || TASK_BUCKETS[0],
		priority: task?.priority || "Medium",
		dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
		tags: task?.tags?.join(", ") || "",
		assignedTo: isAdmin()
			? task?.assignedTo?.map((u) => u._id) || []
			: [user._id],
	});

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error for this field
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		}

		if (formData.title.length > 255) {
			newErrors.title = "Title cannot exceed 255 characters";
		}

		if (formData.description.length > 2000) {
			newErrors.description = "Description cannot exceed 2000 characters";
		}

		if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
			newErrors.dueDate = "Due date cannot be in the past";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const submitData = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			bucket: formData.bucket,
			priority: formData.priority,
			dueDate: formData.dueDate
				? new Date(formData.dueDate).toISOString()
				: null,
			tags: formData.tags
				.split(",")
				.map((t) => t.trim())
				.filter((t) => t), // Removes empty strings
			assignedTo: formData.assignedTo,
		};

		// If creating task (not editing), add status
		if (!task) {
			submitData.status = "Not Started";
		}

		onSubmit(submitData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Title */}
			<Input
				label="Task Title"
				name="title"
				type="text"
				placeholder="Enter task title"
				value={formData.title}
				onChange={handleChange}
				error={errors.title}
				required
				disabled={isLoading}
				maxLength={255}
			/>

			{/* Description */}
			<div className="flex flex-col gap-1">
				<label
					htmlFor="description"
					className="block text-sm font-medium text-zinc-700"
				>
					Description
				</label>
				<textarea
					name="description"
					placeholder="Enter task description (optional)"
					value={formData.description}
					onChange={handleChange}
					disabled={isLoading}
					maxLength={2000}
					rows={4}
					className={`
            w-full px-4 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-zinc-100 disabled:cursor-not-allowed
            placeholder-gray-400
            ${errors.description ? "border-red-500" : ""}
          `.trim()}
				/>
				{errors.description && (
					<p className="text-xs text-red-500">{errors.description}</p>
				)}
				<p className="text-xs text-zinc-500">
					{formData.description.length}/2000
				</p>
			</div>

			{/* Bucket & Priority Row */}
			<div className="grid grid-cols-2 gap-4">
				{/* Bucket */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="bucket"
						className="block text-sm font-medium text-zinc-700"
					>
						Bucket
					</label>
					<select
						name="bucket"
						value={formData.bucket}
						onChange={handleChange}
						disabled={isLoading}
						className={`
              w-full px-4 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-zinc-100 disabled:cursor-not-allowed
              ${errors.bucket ? "border-red-500" : ""}
            `.trim()}
					>
						{TASK_BUCKETS.map((bucket) => (
							<option key={bucket} value={bucket}>
								{bucket}
							</option>
						))}
					</select>
					{errors.bucket && (
						<p className="text-xs text-red-500">{errors.bucket}</p>
					)}
				</div>

				{/* Priority */}
				<div className="flex flex-col gap-1">
					<label
						htmlFor="priority"
						className="block text-sm font-medium text-zinc-700"
					>
						Priority
					</label>
					<select
						name="priority"
						value={formData.priority}
						onChange={handleChange}
						disabled={isLoading}
						className={`
              w-full px-4 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-zinc-100 disabled:cursor-not-allowed
              ${errors.priority ? "border-red-500" : ""}
            `.trim()}
					>
						{TASK_PRIORITIES.map((priority) => (
							<option key={priority} value={priority}>
								{priority}
							</option>
						))}
					</select>
					{errors.priority && (
						<p className="text-xs text-red-500">{errors.priority}</p>
					)}
				</div>
			</div>

			{/* Assignees select */}
			{isAdmin() && (
				<AssigneeSelect
					value={formData.assignedTo}
					onChange={(assignees) =>
						setFormData((prev) => ({
							...prev,
							assignedTo: assignees,
						}))
					}
					disabled={isLoading}
				/>
			)}

			{/* Due Date */}
			<Input
				label="Due Date"
				name="dueDate"
				type="date"
				value={formData.dueDate}
				onChange={handleChange}
				error={errors.dueDate}
				disabled={isLoading}
			/>

			{/* Tags */}
			<Input
				label="Tags (comma-separated)"
				name="tags"
				type="text"
				placeholder="e.g., urgent, frontend, bug"
				value={formData.tags}
				onChange={handleChange}
				disabled={isLoading}
			/>

			{/* Action Buttons */}
			<div className="border-t border-gray-200 pt-6 flex gap-3">
				<Button
					variant="primary"
					type="submit"
					loading={isLoading}
					disabled={isLoading}
					className="whitespace-nowrap px-4 flex items-center  gap-1 py-2"
				>
					{task ? "Update Task" : "Create Task"}
				</Button>

				<Button
					variant="ghost"
					type="button"
					onClick={onCancel}
					disabled={isLoading}
					className="whitespace-nowrap px-4 flex items-center  gap-1 py-2"
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}
