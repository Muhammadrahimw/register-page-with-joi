import {object, string, refine} from "superstruct";
import {useForm} from "react-hook-form";
import {superstructResolver} from "@hookform/resolvers/superstruct";
import useAxiosHook from "../hooks/useAxiosHook";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function LoginComp() {
	const validationSchema = object({
		email: refine(string(), "email", (value) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
		),
		password: refine(
			string(),
			"password",
			(value) => value.length >= 6 && value.length <= 20
		),
	});

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: superstructResolver(validationSchema),
	});

	const [{data, loading, error}, fetchData] = useAxiosHook();
	const navigate = useNavigate();

	useEffect(() => {
		const config = {
			url: "https://6754135536bcd1eec8500f38.mockapi.io/users",
			method: "GET",
		};
		fetchData(config);
	}, []);

	const onSubmit = (userData) => {
		const userChecker = data.some((value) => {
			if (userData.email === value.email) {
				if (userData.password !== value.password) {
					console.log("Sizning parolingiz noto'g'ri!");
					return true;
				} else {
					console.log("Siz ro'yxatdan o'tgansiz");
					navigate(`/Base`);
					return true;
				}
			}
			return false;
		});

		if (!userChecker) {
			console.log("Siz ro'yxatdan o'tmagansiz!");
		}
	};

	return (
		<section className="bg-[#111827] w-screen h-screen flex justify-center items-center">
			<form onSubmit={handleSubmit(onSubmit)} className="w-[40%]">
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your email
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@email.com"
						{...register("email")}
					/>
					{errors.email && (
						<p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your password
					</label>
					<input
						type="password"
						id="password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						{...register("password")}
					/>
					{errors.password && (
						<p className="mt-2 text-sm text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="flex items-end gap-4">
					<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Login
					</button>
					<p className="mt-2 text-base font-light text-gray-500 dark:text-gray-400">
						<Link
							to="/"
							className="font-medium text-primary-600 hover:underline dark:text-primary-500">
							Not registered?
						</Link>
					</p>
				</div>
			</form>
		</section>
	);
}

export default LoginComp;
