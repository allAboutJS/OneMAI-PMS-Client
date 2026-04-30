import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/Button";
import PreferenceToggle from "./PreferenceToggle";

export default function PreferencesSettings() {
	const [preferences, setPreferences] = useState({
		emailNotifications: true,
		taskReminders: true,
		weeklyDigest: false,
		theme: "light",
	});

	const handleToggle = (key) => {
		setPreferences((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleThemeChange = (theme) => {
		setPreferences((prev) => ({
			...prev,
			theme,
		}));
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-8">
			<h2 className="text-2xl font-bold text-zinc-900 mb-6">Preferences</h2>

			<div className="space-y-6">
				{/* Notifications Section */}
				<div className="border-b border-gray-200 pb-6">
					<h3 className="font-semibold text-zinc-900 mb-4">Notifications</h3>

					<div className="space-y-3">
						<PreferenceToggle
							label="Email Notifications"
							description="Receive email updates for task assignments"
							checked={preferences.emailNotifications}
							onChange={() => handleToggle("emailNotifications")}
						/>

						<PreferenceToggle
							label="Task Reminders"
							description="Get reminded about upcoming task deadlines"
							checked={preferences.taskReminders}
							onChange={() => handleToggle("taskReminders")}
						/>

						<PreferenceToggle
							label="Weekly Digest"
							description="Receive a weekly summary of your tasks"
							checked={preferences.weeklyDigest}
							onChange={() => handleToggle("weeklyDigest")}
						/>
					</div>
				</div>

				{/* Theme Section */}
				<div>
					<h3 className="font-semibold text-zinc-900 mb-4">Appearance</h3>

					<div className="space-y-2">
						<label className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-zinc-50">
							<input
								type="radio"
								name="theme"
								value="light"
								checked={preferences.theme === "light"}
								onChange={(e) => handleThemeChange(e.target.value)}
							/>
							<span className="text-sm text-zinc-900">Light Theme</span>
						</label>

						<label className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-zinc-50">
							<input
								type="radio"
								name="theme"
								value="dark"
								checked={preferences.theme === "dark"}
								onChange={(e) => handleThemeChange(e.target.value)}
								disabled
							/>
							<span className="text-sm text-zinc-900">
								Dark Theme (Coming Soon)
							</span>
						</label>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="border-t border-gray-200 pt-6">
					<h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>

					<Button className="w-32 flex" variant="danger" size="md">
						<LogOut size={16} className="mr-2" />
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
}
