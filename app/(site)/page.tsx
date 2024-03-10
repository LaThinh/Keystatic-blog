import dynamic from "next/dynamic";

import React from "react";
import Banner from "@/app/components/Homepage/Banner";
import PostGrid from "@/app/components/Post/PostGrid";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
// import FeaturedPost from "../components/Homepage/FeaturedPost";
// import ScriptClient from "../components/ScriptClient";
// import LatestPost from "../components/Homepage/LatestPost";

const FeaturedPost = dynamic(() => import("@/app/components/Homepage/FeaturedPost"), {
	ssr: false,
});

export default async function HomePage() {
	const homePage = await Reader.singletons.homepage.read();
	const lastNumber = homePage?.latestPost || 6;

	let posts = await Reader.collections.posts.all();
	posts = posts.filter((post) => !post.entry.draft);
	posts = sortPostsByPublishDate(posts);
	const latestPost = posts.slice(0, lastNumber);
	const categories = await Reader.collections.categories.all();

	// const lastUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/?limit=6`;
	// console.log(lastUrl);

	// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/?limit=8`, {
	// 	next: {
	// 		revalidate: 120,
	// 	},
	// });

	// // console.log(response);

	// const latestPost = await response.json();

	// console.log("latestPost");
	// console.log(latestPost);

	return (
		<div className="homepage">
			{homePage?.banner && homePage.banner.length > 0 && <Banner props={homePage.banner} />}
			<div className="container w-full !max-w-[1800px] ">
				<FeaturedPost />
			</div>
			<div className="container py-10">
				<h2 className="text-xl lg:text-3xl my-10">Latest {lastNumber} Posts</h2>
				<PostGrid posts={latestPost} categories={categories} />
				{/* <LatestPost /> */}
			</div>
		</div>
	);
}
