import React from "react";
import Banner from "@/app/components/Homepage/Banner";
import PostGrid from "@/app/components/Post/PostGrid";
import { Reader } from "@/app/keystatic/utils";

export default async function HomePage() {
	const homePage = await Reader.singletons.homepage.read();

	return (
		<div className="homepage">
			{homePage?.banner && homePage.banner.length > 0 && <Banner props={homePage.banner} />}
			<div className="container py-10">
				<PostGrid />
			</div>
		</div>
	);
}
