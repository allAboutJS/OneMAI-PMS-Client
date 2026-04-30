// src/utils/formatters.js
/**
 * Formatter Utility Functions
 * Formats dates, status names, bucket names, etc.
 */

import { BUCKET_ICONS, STATUS_ICONS } from "./constants";

/**
 * Format date to readable string
 * @param {string|Date} date
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
	if (!date) return "No due date";

	const dateObj = new Date(date);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	dateObj.setHours(0, 0, 0, 0);

	if (dateObj.getTime() === today.getTime()) {
		return "Today";
	}

	if (dateObj.getTime() === tomorrow.getTime()) {
		return "Tomorrow";
	}

	return dateObj.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: dateObj.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
	});
};

/**
 * Format date to time
 * @param {string|Date} date
 * @returns {string} Time string
 */
export const formatTime = (date) => {
	if (!date) return "";

	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

/**
 * Format date to full datetime
 * @param {string|Date} date
 * @returns {string} Full datetime string
 */
export const formatDateTime = (date) => {
	if (!date) return "";

	return new Date(date).toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

/**
 * Check if task is overdue
 * @param {string|Date} dueDate
 * @param {string} status
 * @returns {boolean}
 */
export const isTaskOverdue = (dueDate, status) => {
	if (!dueDate || status === "Completed") return false;

	const due = new Date(dueDate);
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	due.setHours(0, 0, 0, 0);

	return due < now;
};

/**
 * Check if task is due today
 * @param {string|Date} dueDate
 * @param {string} status
 * @returns {boolean}
 */
export const isTaskDueToday = (dueDate, status) => {
	if (!dueDate || status === "Completed") return false;

	const due = new Date(dueDate);
	const today = new Date();

	due.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);

	return due.getTime() === today.getTime();
};

/**
 * Get status with icon
 * @param {string} status
 * @returns {string}
 */
export const getStatusWithIcon = (status) => {
	return `${STATUS_ICONS[status] || "○"} ${status}`;
};

/**
 * Get bucket with icon
 * @param {string} bucket
 * @returns {string}
 */
export const getBucketWithIcon = (bucket) => {
	return `${BUCKET_ICONS[bucket] || "📦"} ${bucket}`;
};

/**
 * Truncate text to specified length
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const truncate = (text, length = 50) => {
	if (!text) return "";
	return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Format user name
 * @param {Object} user - {name, email}
 * @returns {string}
 */
export const formatUserName = (user) => {
	if (!user) return "Unknown";
	return user.name || user.email;
};

/**
 * Get initials from name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
	if (!name) return "?";

	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
};

/**
 * Format number as readable count
 * @param {number} count
 * @returns {string}
 */
export const formatCount = (count) => {
	if (count > 999) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return String(count);
};

/**
 * Get color for priority
 * @param {string} priority
 * @returns {string}
 */
export const getPriorityColor = (priority) => {
	const colors = {
		Low: "text-zinc-500",
		Medium: "text-blue-500",
		High: "text-orange-500",
		Critical: "text-red-500",
	};
	return colors[priority] || "text-zinc-500";
};

/**
 * Get background color for status badge
 * @param {string} status
 * @returns {string}
 */
export const getStatusBgColor = (status) => {
	const colors = {
		"Not Started": "bg-zinc-100 text-zinc-800",
		"In Progress": "bg-blue-100 text-blue-800",
		Completed: "bg-green-100 text-green-800",
	};
	return colors[status] || "bg-zinc-100 text-zinc-800";
};

/**
 * Get background color for bucket badge
 * @param {string} bucket
 * @returns {string}
 */
export const getBucketBgColor = (bucket) => {
	const colors = {
		"Feature Development": "bg-purple-100 text-purple-800",
		"Bug Fixes": "bg-red-100 text-red-800",
		"Improvements / Enhancements": "bg-orange-100 text-orange-800",
		"Technical Infrastructure": "bg-cyan-100 text-cyan-800",
		"QA / Testing & Release": "bg-violet-100 text-violet-800",
	};
	return colors[bucket] || "bg-zinc-100 text-zinc-800";
};
