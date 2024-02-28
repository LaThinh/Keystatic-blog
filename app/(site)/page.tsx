import React from "react";
import Banner from "@/app/components/Homepage/Banner";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import PostGrid from "../components/Post/PostGrid";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function HomePage() {
	const homePage = await reader.singletons.homepage.read();

	//console.log(homePage);

	return (
		<div className="homepage">
			{/* {homePage?.banner && homePage.banner.length > 0 && <Banner props={homePage.banner} />} */}
			<div className="container py-10">
				<PostGrid />
			</div>
		</div>
	);
}
