import { Image, MessageSquare, Send, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { formatDateTime } from "../../utils/formatters";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { Button } from "../common/Button";

export function TaskComments({ task, onCommentChange }) {
	const { user, isAdmin } = useAuthStore();
	const { addComment, deleteComment } = useTaskStore();

	const [commentText, setCommentText] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageFileName, setImageFileName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const fileInputRef = useRef(null);

	const isAssignedToMe =
		task.assignedToAll || task.assignedTo?.some((u) => u._id === user?._id);
	const canComment = isAdmin() || isAssignedToMe;

	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Strictly reject video files
		if (
			file.type.startsWith("video/") ||
			/\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file.name)
		) {
			showErrorToast(
				"File Type Error",
				"Videos are not accepted. Only image attachments (PNG, JPEG, WebP, GIF) are allowed.",
			);
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		// Ensure file is an image
		if (!file.type.startsWith("image/")) {
			showErrorToast(
				"File Type Error",
				"Only image files (PNG, JPEG, WebP, GIF) can be attached.",
			);
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		// Check size limit: 5MB
		if (file.size > 5 * 1024 * 1024) {
			showErrorToast("File Too Large", "Image size must not exceed 5MB.");
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setSelectedImage(reader.result);
			setImageFileName(file.name);
		};
		reader.onerror = () => {
			showErrorToast("Read Error", "Failed to read image file.");
		};
		reader.readAsDataURL(file);
	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		setImageFileName("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!commentText.trim() && !selectedImage) {
			return;
		}

		setIsSubmitting(true);

		const result = await addComment(task._id, {
			text: commentText.trim(),
			image: selectedImage,
		});

		if (result.success) {
			setCommentText("");
			handleRemoveImage();
			onCommentChange?.();
		} else {
			showErrorToast(
				"Failed to Add Comment",
				result.error || "Could not post comment",
			);
		}

		setIsSubmitting(false);
	};

	const handleDelete = async (commentId) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this comment?",
		);
		if (!confirmed) return;

		const result = await deleteComment(task._id, commentId);
		if (result.success) {
			showSuccessToast("Deleted", "Comment removed");
			onCommentChange?.();
		} else {
			showErrorToast(
				"Delete Error",
				result.error || "Could not delete comment",
			);
		}
	};

	const comments = task.comments || [];

	return (
		<div className="border-t border-gray-200 pt-6 mt-6">
			{/* Section Header */}
			<div className="flex items-center gap-2 mb-4">
				<MessageSquare size={18} className="text-zinc-600" />
				<h3 className="text-sm font-semibold text-zinc-800">
					Discussion & Activity
				</h3>
				<span className="text-xs font-medium px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-full">
					{comments.length}
				</span>
			</div>

			{/* Comments List */}
			<div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
				{comments.length === 0 ? (
					<p className="text-xs text-zinc-500 italic py-2">
						No comments yet. Start the conversation below.
					</p>
				) : (
					comments.map((comment) => {
						const authorId = comment.author?._id || comment.author;
						const authorName = comment.author?.name || "Team Member";
						const canDelete =
							isAdmin() || authorId?.toString() === user?._id?.toString();

						return (
							<div
								key={comment._id}
								className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-sm space-y-2"
							>
								{/* Author & Header */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
											{authorName.charAt(0).toUpperCase()}
										</div>
										<span className="font-medium text-zinc-900 text-xs">
											{authorName}
										</span>
										<span className="text-xs text-zinc-500">
											{formatDateTime(comment.createdAt)}
										</span>
									</div>

									{canDelete && (
										<button
											type="button"
											onClick={() => handleDelete(comment._id)}
											className="text-zinc-400 hover:text-red-600 transition p-1"
											title="Delete comment"
										>
											<Trash2 size={14} />
										</button>
									)}
								</div>

								{/* Comment Text */}
								{comment.text && (
									<p className="text-zinc-700 whitespace-pre-wrap pl-8 text-xs sm:text-sm">
										{comment.text}
									</p>
								)}

								{/* Attached Image */}
								{comment.image && (
									<div className="pl-8 pt-1">
										<button
											type="button"
											onClick={() => setPreviewImage(comment.image)}
											className="group relative inline-block rounded-lg overflow-hidden border border-zinc-200 hover:border-blue-500 transition"
										>
											<img
												src={comment.image}
												alt="Attachment"
												className="max-h-48 max-w-xs object-cover rounded-lg group-hover:opacity-90 transition"
											/>
											<span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
												Click to expand
											</span>
										</button>
									</div>
								)}
							</div>
						);
					})
				)}
			</div>

			{/* Add Comment Input Form */}
			{canComment ? (
				<form onSubmit={handleSubmit} className="space-y-3">
					{/* Image preview thumbnail before sending */}
					{selectedImage && (
						<div className="relative inline-block border border-blue-300 rounded-lg p-1 bg-blue-50">
							<img
								src={selectedImage}
								alt="Selected upload"
								className="h-20 w-20 object-cover rounded-md"
							/>
							<button
								type="button"
								onClick={handleRemoveImage}
								className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 shadow hover:bg-red-700 transition"
								title="Remove image"
							>
								<X size={14} />
							</button>
							<span className="text-[10px] text-zinc-600 block truncate max-w-[80px] mt-0.5">
								{imageFileName}
							</span>
						</div>
					)}

					<div className="flex gap-2 items-end">
						<textarea
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							placeholder="Write a comment... (Enter to send, Shift+Enter for newline)"
							rows={2}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSubmit(e);
								}
							}}
							className="flex-1 px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
						/>

						{/* Hidden File Input */}
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleFileSelect}
							accept="image/png,image/jpeg,image/webp,image/gif"
							className="hidden"
						/>

						{/* Image Picker Button */}
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className={`p-2.5 rounded-lg border transition ${
								selectedImage
									? "border-blue-500 bg-blue-50 text-blue-600"
									: "border-zinc-300 hover:bg-zinc-100 text-zinc-600"
							}`}
							title="Attach an image (PNG, JPEG, WebP, GIF)"
						>
							<Image size={18} />
						</button>

						{/* Send Button */}
						<Button
							type="submit"
							variant="primary"
							size="sm"
							loading={isSubmitting}
							disabled={isSubmitting || (!commentText.trim() && !selectedImage)}
							className="h-10 px-4"
							icon={<Send size={16} />}
						>
							Send
						</Button>
					</div>
					<p className="text-[11px] text-zinc-500">
						You can attach images (PNG, JPEG, WebP, GIF) up to 5MB. Videos are
						not accepted.
					</p>
				</form>
			) : (
				<div className="bg-zinc-100 rounded-lg p-3 text-xs text-zinc-600 italic">
					Only assigned members and administrators can comment on this task.
				</div>
			)}

			{/* Fullscreen Image Lightbox Preview */}
			{previewImage && (
				<div
					className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
					onClick={() => setPreviewImage(null)}
				>
					<div
						className="relative max-w-4xl max-h-[90vh] bg-zinc-900 rounded-lg p-2 shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setPreviewImage(null)}
							className="absolute top-3 right-3 bg-zinc-800 text-white p-1.5 rounded-full hover:bg-zinc-700 transition"
						>
							<X size={20} />
						</button>
						<img
							src={previewImage}
							alt="Enlarged attachment"
							className="max-h-[85vh] max-w-full rounded object-contain mx-auto"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
