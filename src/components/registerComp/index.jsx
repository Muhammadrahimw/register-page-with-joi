import React, {useEffect} from "react";

function RegisterComp() {
	const postData = async () => {
		const url = "https://git.heroku.com/authorizationw.git";
		const data = {
			name: "John Doe",
			email: "johndoe@example.com",
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Success:", result);
			} else {
				console.error("Error:", response.status);
			}
		} catch (error) {
			console.error("Request failed", error);
		}
	};

	useEffect(() => {
		postData();
	}, []);

	return <div>RegisterComp</div>;
}

export default RegisterComp;
