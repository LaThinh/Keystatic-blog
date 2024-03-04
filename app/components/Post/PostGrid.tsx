import React from "react";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import { IPost } from "@/app/keystatic/interface";
import PostCard from "./PostCard";

export default async function PostGrid({ posts, size }: { posts?: IPost[]; size?: "sm" | "md" | "lg" }) {
	let gridClass = "@xl:grid-cols-2 @xl:gap-5 @4xl:grid-cols-3 @4xl:gap-8";
	let textSize = "text-md";
	if (!posts) {
		posts = await Reader.collections.posts.all();
	}

	posts = sortPostsByPublishDate(posts);

	switch (size) {
		case "sm":
			gridClass = "@lg:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4";
			textSize = "text-sm";
			break;
		case "lg":
			gridClass = "@3xl:grid-cols-2 @xl:gap-5 @3xl:gap-8 @5xl:grid-cols-3 @5xl:gap-8 @7xl:grid-cols-4";
			textSize = "xl:text-xl";
			break;
	}

	return (
		<div className="post-grid @container">
			<div className={`post-list grid gap-3 ${gridClass}`}>
				{posts.map((post) => (
					<PostCard post={post} key={post.slug} />
				))}
			</div>
		</div>
	);
}
