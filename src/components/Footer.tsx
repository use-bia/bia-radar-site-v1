import type { FunctionComponent } from "react";

type FooterProps = {};

const Footer: FunctionComponent<FooterProps> = () => {
	return (
		<footer>
			<div className="container">
				<div className="copyright">
					&copy; {new Date().getFullYear()} BIA Radar. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
