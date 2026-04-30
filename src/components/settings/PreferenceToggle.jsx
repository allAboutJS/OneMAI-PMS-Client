export default function PreferenceToggle({
	label,
	description,
	checked,
	onChange,
}) {
	return (
		<label className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-zinc-50 transition">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="w-4 h-4 text-blue-600 rounded cursor-pointer"
			/>
			<div className="flex-1">
				<p className="text-sm font-medium text-zinc-900">{label}</p>
				<p className="text-xs text-zinc-600 mt-1">{description}</p>
			</div>
		</label>
	);
}
