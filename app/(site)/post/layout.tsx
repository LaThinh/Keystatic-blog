import Categories from "@/app/components/Sidebar/Categories";
import RecentPost from "@/app/components/Sidebar/RecentPost";
import Search from "@/app/components/Sidebar/Search";
import SocialLinks from "@/app/components/Sidebar/SocialLinks";

import Link from "next/link";

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container m-auto !px-0 md:!px-3 lg:!px-5 min-h-[80vh] flex flex-1 flex-col lg:flex-row gap-8 justify-start items-start">
			<div className="main-container p-0  w-full max-w-[1200px] flex flex-col items-start flex-1">
				{children}
			</div>
			<div className="sidebar mb-5 py-5 px-3 lg:px-0 w-full lg:max-w-[320px] lg:w-1/4 flex flex-col gap-8 lg:flex-1 lg:sticky top-20 z-30">
				<Search />
				<Categories />
				<RecentPost postNumber={5} />
				<SocialLinks />
			</div>
		</div>
	);
}
