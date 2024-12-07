import axios from "axios";
import React, {useState} from "react";

function useAxiosHook(config) {
	let [data, setData] = useState(null);
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState(null);

	let fetchData = async (newConfig = config) => {
		setLoading(true);
		setError(null);
		try {
			let response = await axios(newConfig);
			setData(response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return [{data, loading, error}, fetchData];
}

export default useAxiosHook;
