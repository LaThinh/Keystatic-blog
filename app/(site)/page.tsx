import React from "react";
import Banner from "@/app/components/Homepage/Banner";
import PostGrid from "@/app/components/Post/PostGrid";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";

export default async function HomePage() {
	const homePage = await Reader.singletons.homepage.read();

	let posts = await Reader.collections.posts.all();
	posts = posts.filter((post) => !post.entry.draft);
	posts = sortPostsByPublishDate(posts);
	const lastPosts = posts.slice(0, 6);

	return (
		<div className="homepage">
			{homePage?.banner && homePage.banner.length > 0 && <Banner props={homePage.banner} />}
			<div className="container py-10">
				<h2 className="text-xl lg:text-3xl font-semibold my-10">Latest Posts</h2>
				<PostGrid posts={lastPosts} />
			</div>
		</div>
	);
}
