import React from "react";
import SocialLinks from "@/app/components/SocialLinks";
import Categories from "./Sidebar/Categories";
import { Reader } from "../keystatic/utils";
import Link from "next/link";

export default async function Footer() {
	const menuLinks = await Reader.singletons.menuLinks.read();

	return (
		<footer className="footer border-t px-5 py-5  bg-slate-100">
			<div className="container m-auto">
				<div className="footer-content flex flex-col md:flex-row md:gap-10 @container">
					<div className="footer-logo w-full m-auto py-5 max-w-[400px] order-3 md:order-1 md:w-1/4  ">
						<div className="flex flex-col h-full gap-4 justify-center content-center text-center md:text-left">
							<h3 className="text-3xl text-gradient font-script">La Keystatic Blog</h3>
							<p className="copyright text-gray-500">
								© Copyright ©2024 by La Thinh. <br /> All rights reserved.
							</p>
						</div>
					</div>

					<div className="footer-columns order-2 flex flex-1 flex-wrap justify-between md:justify-end">
						<div className="footer-col w-full md:w-1/3 min-w-32 max-w-72">
							<h3>Pages</h3>
							{menuLinks && menuLinks.items.length > 0 && (
								<ul className="footer-menu">
									{menuLinks.items.map((item, index) => (
										<li key={index}>
											<Link className="menu-item text-gray-700 hover:text-sky-600 " href={item?.url || "/"}>
												{item.menu}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="footer-col w-full md:w-1/3 min-w-32 max-w-72">
							<Categories />
						</div>
						<div className="footer-col w-full md:w-1/3 min-w-32 max-w-72">
							<h3>Social Links</h3>
							<SocialLinks />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
