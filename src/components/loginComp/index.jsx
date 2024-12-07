import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useAxiosHook from "../hooks/useAxiosHook";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function LoginComp() {
	let validationSchema = Yup.object({
		email: Yup.string()
			.required("Email kiriting!")
			.email("Email to'g'ri kiriting!"),
		password: Yup.string()
			.min(6, "Parol 6 ta belgidan kam bo'lmasligi kerak!")
			.max(20, "Parol 20 ta belgidan kam bo'lishi kerak!")
			.required("Parolni kiriting!"),
	});

	let {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	let [{data, loading, error}, fetchData] = useAxiosHook();
	let navigate = useNavigate();

	useEffect(() => {
		let config = {
			url: "https://6754135536bcd1eec8500f38.mockapi.io/users",
			method: "GET",
		};
		fetchData(config);
	}, []);

	let onSubmit = (userData) => {
		let userChecker = data.some((value) => {
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
						<p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
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
						<p className="text-red-500 mt-2 text-sm">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="flex items-end gap-4">
					<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Login
					</button>
					<p className="text-base mt-2 font-light text-gray-500 dark:text-gray-400">
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
