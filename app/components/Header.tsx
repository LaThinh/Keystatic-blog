import React from "react";
import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Header() {
	const menuLink = await reader.singletons.menuLinks.read();

	return (
		<header className="header w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
			<div className="container m-auto min-h-16 flex justify-between items-center">
				<div className="logo">
					<Link className="text-3xl md:text-4xl lg:text-4xl font-script text-gradient" href="/">
						Paul La
					</Link>
				</div>
				{menuLink?.items && menuLink.items.length > 0 && (
					<ul className="nav menu hidden md:flex list-none gap-6 text-xl font-heading">
						{menuLink.items.map((item, index) => (
							<li key={index}>
								<Link className="menu-item text-gray-700 hover:text-sky-600 " href={item?.url || "/"}>
									{item.menu}
								</Link>
							</li>
						))}
					</ul>
				)}
				<div className="account">
					<Link className="text-gray-700 font-semibold text-lg" href={`/keystatic`}>
						Login
					</Link>
				</div>
			</div>
		</header>
	);
}
