import { useCallback, useEffect, useState } from "react";
import * as reportsAPI from "../api/reports";
import { Button } from "../components/common/Button";
import { LoadingSkeleton } from "../components/common/Loading";
import ReportCard from "../components/reports/ReportCard";
import ReportSection from "../components/reports/ReportSection";
import { AssigneeSelect } from "../components/tasks/AssigneeSelect";
import useError from "../hooks/useError";
import { useAuthStore } from "../store/authStore";
import { TASK_BUCKETS } from "../utils/constants";

export default function ReportsPage() {
	const { isAdmin, user } = useAuthStore();
	const [reportData, setReportData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedBucket, setSelectedBucket] = useState(null);
	const [selectedAssignees, setSelectedAssignees] = useState(
		isAdmin() ? [user._id] : [],
	);

	const loadReports = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await reportsAPI.getTaskSummary();
			setReportData(response);
		} catch (err) {
			setError(err.message || "Failed to load reports");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadReports();
	}, [loadReports]);

	// Handles displaying of error toasts
	useError(error, () => setError(""));

	if (isLoading && !reportData) {
		return (
			<div className="p-4">
				<h1 className="text-3xl font-bold text-zinc-900 mb-6">Reports</h1>
				<LoadingSkeleton count={4} />
			</div>
		);
	}

	return (
		<div className="p-4">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-zinc-900">
					Reports & Analytics
				</h1>
				<p className="text-zinc-600 mt-2">
					Track your task progress and deadlines
				</p>
			</div>

			{/* Bucket Filter */}
			<div className="mb-6">
				<h3 className="text-sm font-semibold text-zinc-700 mb-3">
					Filter by Bucket
				</h3>
				<div className="flex gap-2 flex-wrap">
					<button
						type="button"
						onClick={() => setSelectedBucket(null)}
						className={`
              px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
              ${
								selectedBucket === null
									? "bg-blue-600 text-white"
									: "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
							}
            `}
					>
						All Buckets
					</button>
					{TASK_BUCKETS.map((bucket) => (
						<button
							type="button"
							key={bucket}
							onClick={() => setSelectedBucket(bucket)}
							className={`
                px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                ${
									selectedBucket === bucket
										? "bg-blue-600 text-white"
										: "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
								}
              `}
						>
							{bucket}
						</button>
					))}
				</div>
			</div>

			{isAdmin() && (
				<div className="mb-6">
					<AssigneeSelect
						onChange={(value) => {
							setSelectedAssignees(value);
						}}
						value={selectedAssignees}
						label="Filter By Users"
					/>
				</div>
			)}

			{/* Summary Cards */}
			{reportData ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
					{/* Overdue Card */}
					<ReportCard
						title="Overdue Tasks"
						count={
							reportData.overdue.tasks.filter((task) =>
								task.assignedTo.some((user) =>
									selectedAssignees.length
										? selectedAssignees.includes(user._id)
										: true,
								),
							).count
						}
						color="red"
						tasks={reportData.overdue.tasks.filter((task) =>
							task.assignedTo.some((user) =>
								selectedAssignees.length
									? selectedAssignees.includes(user._id)
									: true,
							),
						)}
						selectedBucket={selectedBucket}
						target="#overdue"
					/>

					{/* Due Today Card */}
					<ReportCard
						title="Due Today"
						count={
							reportData.dueToday.tasks.filter((task) =>
								task.assignedTo.some((user) =>
									selectedAssignees.length
										? selectedAssignees.includes(user._id)
										: true,
								),
							).count
						}
						color="orange"
						tasks={reportData.dueToday.tasks.filter((task) =>
							task.assignedTo.some((user) =>
								selectedAssignees.length
									? selectedAssignees.includes(user._id)
									: true,
							),
						)}
						selectedBucket={selectedBucket}
						target="#today"
					/>

					{/* Future Card */}
					<ReportCard
						title="Future Tasks"
						count={
							reportData.future.tasks.filter((task) =>
								task.assignedTo.some((user) =>
									selectedAssignees.length
										? selectedAssignees.includes(user._id)
										: true,
								),
							).count
						}
						color="blue"
						tasks={reportData.future.tasks.filter((task) =>
							task.assignedTo.some((user) =>
								selectedAssignees.length
									? selectedAssignees.includes(user._id)
									: true,
							),
						)}
						selectedBucket={selectedBucket}
						target="#future"
					/>

					{/* Completed Tasks Card */}
					<ReportCard
						title="Completed Tasks"
						count={
							reportData.completed.tasks.filter((task) =>
								task.assignedTo.some((user) =>
									selectedAssignees.length
										? selectedAssignees.includes(user._id)
										: true,
								),
							).count
						}
						color="green"
						tasks={reportData.completed.tasks.filter((task) =>
							task.assignedTo.some((user) =>
								selectedAssignees.length
									? selectedAssignees.includes(user._id)
									: true,
							),
						)}
						selectedBucket={selectedBucket}
						target="#completed"
					/>
				</div>
			) : null}

			{/* Detailed Task Lists */}
			<div className="space-y-8">
				{/* Overdue Section */}
				<ReportSection
					title="Overdue Tasks"
					tasks={reportData?.overdue.tasks.filter((task) =>
						task.assignedTo.some((user) =>
							selectedAssignees.length
								? selectedAssignees.includes(user._id)
								: true,
						),
					)}
					selectedBucket={selectedBucket}
					isEmpty={reportData?.overdue.count === 0}
					id="overdue"
				/>

				{/* Due Today Section */}
				<ReportSection
					title="Due Today"
					tasks={reportData?.dueToday.tasks.filter((task) =>
						task.assignedTo.some((user) =>
							selectedAssignees.length
								? selectedAssignees.includes(user._id)
								: true,
						),
					)}
					selectedBucket={selectedBucket}
					isEmpty={reportData?.dueToday.count === 0}
					id="today"
				/>

				{/* Future Section */}
				<ReportSection
					title="Future Tasks"
					tasks={reportData?.future.tasks.filter((task) =>
						task.assignedTo.some((user) =>
							selectedAssignees.length
								? selectedAssignees.includes(user._id)
								: true,
						),
					)}
					selectedBucket={selectedBucket}
					isEmpty={reportData?.future.count === 0}
					id="future"
				/>

				{/* Completed Section */}
				<ReportSection
					title="Completed Tasks"
					tasks={reportData?.completed?.tasks.filter((task) =>
						task.assignedTo.some((user) =>
							selectedAssignees.length
								? selectedAssignees.includes(user._id)
								: true,
						),
					)}
					selectedBucket={selectedBucket}
					isEmpty={!reportData?.completed || reportData.completed.count === 0}
					id="completed"
				/>
			</div>

			{/* Refresh Button */}
			<div className="mt-8 text-center">
				<Button variant="secondary" onClick={loadReports}>
					Refresh Reports
				</Button>
			</div>
		</div>
	);
}
