import React from "react";
import { Link, Outlet } from "react-router-dom";

interface baseLayoutProps {}

const AuthLayout: React.FC<baseLayoutProps> = () => {
	return (
		<div>
			<header>
				<h1>base layout</h1>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
				</nav>
			</header>
			<aside>
				<h2>sidebar</h2>
			</aside>
			<main>
				<Outlet />
			</main>
			<footer>base layout</footer>
		</div>
	);
};

export default AuthLayout;
