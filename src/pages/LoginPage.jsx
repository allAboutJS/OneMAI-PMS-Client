import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import useError from "../hooks/useError";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
	const navigate = useNavigate();
	const { login, user, isLoading, error, clearError } = useAuthStore();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState({});

	// Displays error in a toast
	useError(error, clearError);

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate("/board", { replace: true });
		}
	}, [user, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (formErrors[name]) {
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		clearError();

		const newErrors = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setFormErrors(newErrors);
			return;
		}

		const result = await login(formData.email, formData.password);

		if (result.success) {
			navigate("/board", { replace: true });
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="bg-white rounded-lg shadow-xl px-4 py-12">
					{/* Header */}
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold text-zinc-900 mb-2 flex flex-col items-center gap-12">
							<img src={logo} height={40} width={40} alt="Logo" /> Project
							Management
						</h1>
						<p className="text-zinc-600">Sign in to your account</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							label="Email"
							name="email"
							type="email"
							placeholder="you@example.com"
							value={formData.email}
							onChange={handleChange}
							error={formErrors.email}
							disabled={isLoading}
						/>

						<Input
							label="Password"
							name="password"
							type="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							error={formErrors.password}
							disabled={isLoading}
						/>

						<Button
							variant="primary"
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="w-full flex items-center gap-2 justify-center"
						>
							Sign In
						</Button>
					</form>

					{/* Footer */}
					<div className="text-center mt-6">
						<p className="text-zinc-600">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-blue-600 hover:text-blue-700 font-semibold"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
