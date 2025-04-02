import { Route, Routes } from "react-router-dom";
import "./App.css";
import BaseLayout from "./layouts/baseLayout";
import Home from "./pages/home";
import About from "./pages/about";
import AuthLayout from "./layouts/AuthorizedLayout";
import Profile from "./pages/profile";
import Login from "./pages/login";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<BaseLayout />}>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
				</Route>
				<Route path="/me" element={<AuthLayout />}>
					<Route index element={<Profile />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<div>Registration</div>} />
			</Routes>
		</>
	);
}

export default App;
