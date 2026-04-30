import { toast } from "sonner";

export const showSuccessToast = (title, message) =>
	toast.success(
		<div>
			<div className="font-semibold">{title}</div>
			<div>{message}</div>
		</div>,
	);

export const showErrorToast = (title, message) =>
	toast.error(
		<div>
			<div className="font-semibold">{title}</div>
			<div>{message}</div>
		</div>,
	);

export const showInfoToast = (title, message) =>
	toast(
		<div>
			<div className="font-semibold">{title}</div>
			<div>{message}</div>
		</div>,
	);
