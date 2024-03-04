import React from "react";
import SocialLinks from "@/app/components/SocialLinks";
import Categories from "./Sidebar/Categories";

export default async function Footer() {
	return (
		<footer className="footer border-t px-5 py-5  bg-slate-100">
			<div className="container m-auto">
				<div className="footer-content flex justify-between flex-wrap">
					<div className="footer-logo w-full m-auto py-5 max-w-[400px]">
						<div className="flex flex-col h-full gap-4 justify-center content-center text-center md:text-left">
							<h3 className="text-3xl text-gradient font-script">La Keystatic Blog</h3>
							<p className="copyright text-gray-500">
								© Copyright ©2024 by La Thinh. <br /> All rights reserved.
							</p>
						</div>
					</div>
					<div
						className="footer-columns min-w-[320px] max-w-[900px] flex-1 grid grid-cols-1 
					md:grid-cols-2 lg:grid-cols-3"
					>
						<div className="footer-col">
							<h3>About Us</h3>
							<SocialLinks />
						</div>
						<div className="footer-col">
							<Categories />
						</div>
						<div className="footer-col">
							<h3>Social Links</h3>
							<SocialLinks />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
