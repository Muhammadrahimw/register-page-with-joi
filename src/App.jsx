import {useState} from "react";
import Authorization from "./pages/authorization";
import Login from "./pages/login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BaseComp from "./components/baseComp";

let router = createBrowserRouter([
	{
		path: `/`,
		element: <Authorization />,
	},
	{
		path: `Login`,
		element: <Login />,
	},
	{
		path: `Base`,
		element: <BaseComp />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
