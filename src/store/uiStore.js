import { create } from "zustand";

export const useUIStore = create((set) => ({
	// State
	sidebarOpen: true,
	taskModalOpen: false,
	createTaskModalOpen: false,
	inviteModalOpen: false,
	notifications: [],
	notificationId: 0,

	// Actions
	toggleSidebar: () => {
		set((state) => ({
			sidebarOpen: !state.sidebarOpen,
		}));
	},

	openSidebar: () => {
		set({ sidebarOpen: true });
	},

	closeSidebar: () => {
		set({ sidebarOpen: false });
	},

	openTaskModal: () => {
		set({ taskModalOpen: true });
	},

	closeTaskModal: () => {
		set({ taskModalOpen: false });
	},

	openCreateTaskModal: () => {
		set({ createTaskModalOpen: true });
	},

	closeCreateTaskModal: () => {
		set({ createTaskModalOpen: false });
	},

	openInviteModal: () => {
		set({ inviteModalOpen: true });
	},

	closeInviteModal: () => {
		set({ inviteModalOpen: false });
	},
}));
