import Joi from "joi";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import useAxiosHook from "../hooks/useAxiosHook";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function RegisterComp() {
	const validationSchema = Joi.object({
		name: Joi.string().min(1).max(20).required().messages({
			"string.empty": "Ism kiritilishi shart!",
			"string.max": "Ismingiz 20 ta belgidan kam bo'lishi kerak!",
		}),
		email: Joi.string()
			.email({tlds: {allow: false}})
			.required()
			.messages({
				"string.empty": "Email kiritilishi shart!",
				"string.email": "Email formati to'g'ri kiritilishi kerak!",
			}),
		password: Joi.string().min(6).max(20).required().messages({
			"string.empty": "Parol kiritilishi shart!",
			"string.min": "Parol 6 ta belgidan kam bo'lmasligi kerak!",
			"string.max": "Parol 20 ta belgidan ko'p bo'lmasligi kerak!",
		}),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({
		resolver: joiResolver(validationSchema),
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

	const postFetch = (userData) => {
		const config = {
			url: "https://6754135536bcd1eec8500f38.mockapi.io/users",
			method: "POST",
			data: userData,
		};
		return fetchData(config);
	};

	const onSubmit = (userData) => {
		reset();

		data.some((value) => value.email === userData.email)
			? console.log("Bu email orqali ro'yxatdan o'tilgan")
			: postFetch(userData),
			navigate(`/base`);
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4 md:space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Name"
									{...register("name")}
								/>
								{errors.name && (
									<p className="mt-2 text-sm text-red-500">
										{errors.name.message}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									{...register("email")}
								/>
								{errors.email && (
									<p className="mt-2 text-sm text-red-500">
										{errors.email.message}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									{...register("password")}
								/>
								{errors.password && (
									<p className="mt-2 text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</div>
							<button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Create an account
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?
								<Link
									to="Login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RegisterComp;
