// src/utils/constants.js
/**
 * Application Constants
 * Enums and configuration values
 */

import { Bug, Check, Rocket, Settings, Sparkle } from "lucide-react";

// Task Buckets
export const TASK_BUCKETS = [
	"Feature Development",
	"Bug Fixes",
	"Improvements / Enhancements",
	"Technical Infrastructure",
	"QA / Testing & Release",
	"OneMAI Business",
];

export const BUCKET_COLORS = {
	"Feature Development": "bucket-feature",
	"Bug Fixes": "bucket-bug",
	"Improvements / Enhancements": "bucket-improvement",
	"Technical Infrastructure": "bucket-infrastructure",
	"QA / Testing & Release": "bucket-qa",
};

export const BUCKET_ICONS = {
	"Feature Development": <Sparkle size={12} />,
	"Bug Fixes": <Bug size={12} />,
	"Improvements / Enhancements": <Rocket size={12} />,
	"Technical Infrastructure": <Settings size={12} />,
	"QA / Testing & Release": <Check size={12} />,
};

// Task Statuses
export const TASK_STATUSES = ["Not Started", "In Progress", "Completed"];

export const STATUS_COLORS = {
	"Not Started": "status-notStarted",
	"In Progress": "status-inProgress",
	Completed: "status-completed",
};

export const STATUS_ICONS = {
	"Not Started": "⭕",
	"In Progress": "🔄",
	Completed: "✓",
};

// Task Priorities
export const TASK_PRIORITIES = ["Low", "Medium", "High", "Critical"];

export const PRIORITY_COLORS = {
	Low: "bg-zinc-200 text-zinc-800",
	Medium: "bg-blue-200 text-blue-800",
	High: "bg-orange-200 text-orange-800",
	Critical: "bg-red-200 text-red-800",
};

// User Roles
export const USER_ROLES = ["Admin", "Member"];

// Report Types
export const REPORT_TYPES = {
	OVERDUE: "overdue",
	DUE_TODAY: "due-today",
	FUTURE: "future",
};

// API Base URL
export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// App Config
export const APP_CONFIG = {
	name: import.meta.env.VITE_APP_NAME || "Project Management",
	version: import.meta.env.VITE_APP_VERSION || "1.0.0",
	tasksPerPage: 50,
	notificationTimeout: 5000,
};

// Routes
export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/register",
	BOARD: "/board",
	REPORTS: "/reports",
	TEAM: "/team",
	SETTINGS: "/settings",
};
