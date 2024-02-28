import React from "react";
import SocialLinks from "@/app/components/SocialLinks";

export default async function Footer() {
	return (
		<footer className="footer border-t px-5 py-2 bg-slate-200">
			<div className="container m-auto">
				<div className="footer-content grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
					<div className="footer-col">
						<h3>Social Links</h3>
						<SocialLinks />
					</div>
				</div>
				<p className="copyright text-center">Copyright La Thinh @ 2024</p>
			</div>
		</footer>
	);
}
