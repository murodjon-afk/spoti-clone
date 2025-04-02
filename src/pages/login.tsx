import React, { useEffect } from "react";
import { LOGIN_URL } from "../exports";
import { useNavigate } from "react-router-dom";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.hash);
		const token = params.get("#access_token");

		if (token) {
			localStorage.setItem("token", token);
			navigate("/");
		}
	}, []);

	return (
		<section className="w-[100%] h-[100%] text-black">
			<center className="flex justify-center items-center w-[100%] h-[100%]">
				<a
					href={`${LOGIN_URL}?client_id=${
						import.meta.env.VITE_CLIENT_ID
					}&redirect_uri=${
						import.meta.env.VITE_REDIRECT_URI
					}&response_type=token&scope=user-read-private user-read-email user-library-read user-library-modify 
playlist-read-private playlist-read-collaborative playlist-modify-public 
playlist-modify-private user-follow-read user-follow-modify 
user-read-playback-state user-modify-playback-state user-read-currently-playing 
user-read-recently-played user-top-read streaming`}
				>
					<button className="w-[150px] h-[50px] bg-green-500 text-white">login</button>
				</a>
			</center>
		</section>
	);
};

export default Login;
