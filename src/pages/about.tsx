import React from "react";
import { Helmet } from "react-helmet";

interface homeProps {}

const About: React.FC<homeProps> = () => {
	return (
		<div>
			<Helmet>
				<title>Danya CRM - About</title>
			</Helmet>
			<h1>About</h1>
		</div>
	);
};

export default About;
