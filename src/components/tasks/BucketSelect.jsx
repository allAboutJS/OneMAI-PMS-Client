import { BUCKET_ICONS, TASK_BUCKETS } from "../../utils/constants";

export function BucketSelect({ value, onChange, disabled = false }) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="" className="block text-sm font-medium text-zinc-700">
				Bucket
			</label>

			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
				className={`
          w-full px-4 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-zinc-100 disabled:cursor-not-allowed
          appearance-none bg-white
        `.trim()}
			>
				{TASK_BUCKETS.map((bucket) => (
					<option key={bucket} value={bucket}>
						{BUCKET_ICONS[bucket]} {bucket}
					</option>
				))}
			</select>
		</div>
	);
}
