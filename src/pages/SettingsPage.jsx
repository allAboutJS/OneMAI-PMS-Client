import { Lock, Settings, User as UserIcon } from "lucide-react";
import { useState } from "react";
import PasswordSettings from "../components/settings/PasswordSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import SettingsTab from "../components/settings/SettingsTab";
import { useAuthStore } from "../store/authStore";

export default function SettingsPage() {
	const { user } = useAuthStore();
	const [activeTab, setActiveTab] = useState("profile");

	return (
		<div className="p-4">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-zinc-900">Settings</h1>
				<p className="text-zinc-600 mt-2">
					Manage your account and preferences
				</p>
			</div>

			{/* Settings Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
				{/* Sidebar Navigation */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
						<nav className="space-y-1 p-4">
							<SettingsTab
								name="profile"
								label="Profile"
								icon={<UserIcon size={20} />}
								active={activeTab === "profile"}
								onClick={() => setActiveTab("profile")}
							/>
							<SettingsTab
								name="password"
								label="Password"
								icon={<Lock size={20} />}
								active={activeTab === "password"}
								onClick={() => setActiveTab("password")}
							/>
							<SettingsTab
								name="preferences"
								label="Preferences"
								icon={<Settings size={20} />}
								active={activeTab === "preferences"}
								onClick={() => setActiveTab("preferences")}
							/>
						</nav>
					</div>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-3">
					{activeTab === "profile" && <ProfileSettings user={user} />}
					{activeTab === "password" && <PasswordSettings />}
					{activeTab === "preferences" && <PreferencesSettings />}
				</div>
			</div>
		</div>
	);
}
