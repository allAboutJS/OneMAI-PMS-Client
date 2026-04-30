export default function SettingsTab({ label, icon, active, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`
        w-full flex items-center gap-3 px-4 py-3 font-medium transition-all
        ${
					active
						? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
						: "text-zinc-700 hover:bg-zinc-100"
				}
      `}
		>
			{icon}
			<span>{label}</span>
		</button>
	);
}
