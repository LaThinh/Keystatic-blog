import dynamic from "next/dynamic";
import React from "react";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import Banner from "@/app/components/Homepage/Banner";
import PostGrid from "@/app/components/Post/PostGrid";
import Discovery from "@/app/components/Homepage/Discovery";
import FeaturedPost from "@/app/components/Homepage/FeaturedPost";
import Technology from "@/app/components/Homepage/Technology";

// import ScriptClient from "../components/ScriptClient";
// import LatestPost from "../components/Homepage/LatestPost";

// const FeaturedPost = dynamic(() => import("@/app/components/Homepage/FeaturedPost"), {
// 	ssr: false,
// });

export default async function HomePage() {
	const homePage = await Reader.singletons.homepage.read();
	const lastNumber = homePage?.latestPost || 6;

	let posts = await Reader.collections.posts.all();
	posts = posts.filter((post) => !post.entry.draft);
	posts = sortPostsByPublishDate(posts);
	const latestPost = posts.slice(0, lastNumber);
	const categories = await Reader.collections.categories.all();

	return (
		<div className="homepage pb-12">
			{homePage?.banner && homePage.banner.length > 0 && (
				<section className="p-0">
					<Banner props={homePage.banner} />
				</section>
			)}
			<FeaturedPost />
			{/* <Technology /> */}
			<Discovery />
			<div className="latest-post container">
				<h2 className="text-xl lg:text-3xl my-10">Latest {lastNumber} Posts</h2>
				<PostGrid posts={latestPost} categories={categories} />
			</div>
		</div>
	);
}
