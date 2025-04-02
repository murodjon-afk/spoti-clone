import React from "react";
import { Helmet } from "react-helmet";

interface homeProps {}

const Profile: React.FC<homeProps> = () => {
	return (
		<div>
			<Helmet>
				<title>Daler - Profile</title>
			</Helmet>
			<h1>Profile</h1>
		</div>
	);
};

export default Profile;
