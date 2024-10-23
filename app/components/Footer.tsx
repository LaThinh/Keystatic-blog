import React from "react";
import SocialLinks from "@/app/components/SocialLinks";
import Categories from "./Sidebar/Categories";
import { Reader } from "../keystatic/utils";
import Link from "next/link";

export default async function Footer() {
	const menuLinks = await Reader.singletons.menuLinks.read();

	return (
		<footer className="footer border-t border-gray-300 bg-slate-200/80 p-3 lg:p-5">
			<div className="container m-auto">
				<div className="footer-content flex flex-col md:flex-row justify-between md:gap-10 @container">
					<div className="footer-logo w-full lg:w-1/5 m-auto py-5 border-t order-3 md:order-1 md:border-t-0">
						<div className="flex flex-col w-full h-full gap-4 justify-start items-start text-center md:text-left">
							<h3 className="w-full text-3xl text-gradient font-script">
								La Keystatic Blog
							</h3>
						</div>
					</div>

					<div className="footer-menus flex-1 flex order-2 justify-end lg:py-5">
						<div
							className="footer-columns w-full flex flex-col md:flex-row gap-5 max-w-[800px] justify-between 
						[&>div]:min-w-48
						"
						>
							<div className="footer-col">
								<h3>Pages</h3>
								{menuLinks && menuLinks.items.length > 0 && (
									<ul className="footer-menu">
										{menuLinks.items.map((item, index) => (
											<li key={index}>
												<Link
													className="menu-item alink text-gray-700 hover:text-sky-600 "
													href={item?.url || "/"}
												>
													{item.menu}
												</Link>
											</li>
										))}
									</ul>
								)}
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
			</div>
			<div className="footer-bottom border-t py-3 border-gray-200">
				<p className="copyright text-gray-500 text-center">
					© Copyright ©2024 by La Thinh. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
