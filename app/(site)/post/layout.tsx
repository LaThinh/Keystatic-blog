import Categories from "@/app/components/Sidebar/Categories";
import Search from "@/app/components/Sidebar/Search";
import SocialLinks from "@/app/components/Sidebar/SocialLinks";

import Link from "next/link";

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container m-auto min-h-[80vh] flex flex-1 flex-col lg:flex-row gap-10 justify-start items-start">
			<div className="main-container w-full max-w-[1000px] flex flex-col items-start flex-1">{children}</div>
			<div className="sidebar py-5 w-full lg:max-w-[320px] lg:w-1/4 lg:flex flex-col gap-8 lg:flex-1 lg:sticky top-20 z-30">
				<Search />
				<Categories />
				<SocialLinks />
			</div>
		</div>
	);
}
