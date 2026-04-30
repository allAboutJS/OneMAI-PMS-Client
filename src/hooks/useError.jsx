import { useEffect } from "react";
import { toast } from "sonner";

export default function useError(error, clearError) {
	useEffect(() => {
		if (error) {
			toast.error(
				<div>
					<div className="font-semibold">Error</div>
					<div>{error}</div>
				</div>,
			);

			clearError();
		}
	}, [error, clearError]);
}
