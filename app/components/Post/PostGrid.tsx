import React from "react";
// import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import { ICategory, IPost } from "@/app/keystatic/interface";
import PostCard from "./PostCard";

import dynamic from "next/dynamic";
const ScriptClient = dynamic(() => import("@/app/components/ScriptClient"), { ssr: false });

const getCategories = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/category`, {
		next: {
			revalidate: 300,
		},
	});
	const categories = await res.json();
	return categories;
};

export default async function PostGrid({
	posts,
	categories,
	size,
}: {
	posts?: IPost[];
	categories?: ICategory[];
	size?: "sm" | "md" | "lg";
}) {
	let gridClass = "@2xl:grid-cols-2 @xl:gap-6 @5xl:grid-cols-3 @6xl:gap-8";
	let textSize = "text-md";
	// if (!posts) {
	// 	posts = await Reader.collections.posts.all();
	// }

	// posts = sortPostsByPublishDate(posts);

	// if (!categories) categories = await getCategories();

	switch (size) {
		case "sm":
			gridClass = "@lg:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4";
			textSize = "text-sm";
			break;
		case "lg":
			gridClass = "@3xl:grid-cols-2 @xl:gap-5 @3xl:gap-6 @6xl:grid-cols-3 @5xl:gap-8 @7xl:grid-cols-4";
			textSize = "xl:text-xl";
			break;
	}

	return (
		<>
			{posts && categories && (
				<div className="post-grid @container">
					<div className={`post-list grid gap-5 ${gridClass}`}>
						{posts && posts.map((post) => <PostCard post={post} categories={categories} key={post.slug} />)}
					</div>
					<ScriptClient />
				</div>
			)}
		</>
	);
}
