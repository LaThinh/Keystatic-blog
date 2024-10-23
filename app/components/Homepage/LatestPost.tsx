// "use client";
import React, { useEffect, useState } from "react";
import PostGrid from "../Post/PostGrid";
import { IPost } from "@/app/keystatic/interface";

export default async function LatestPost() {
	const { NEXT_PUBLIC_API_URL } = process.env;

	//const homePage = await Reader.singletons.homepage.read();
	// let posts = await Reader.collections.posts.all();
	// posts = posts.filter((post) => !post.entry.draft);
	// posts = sortPostsByPublishDate(posts);
	//const lastPosts = posts.slice(0, 6);

	// const [posts, setPosts] = useState<IPost[]>([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		console.log("Fetch Data lasttt");
	// 		const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/?limit=6`, {
	// 			next: {
	// 				revalidate: 120,
	// 			},
	// 		});

	// 		//console.log(response);

	// 		const latestPost: IPost[] = await response.json();
	// 		if (latestPost) setPosts(latestPost);
	// 	};

	// 	fetchData();
	// }, []);

	// console.log(posts);

	const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/?limit=6`, {
		next: {
			revalidate: 120,
		},
	});

	const data = await response.json();
	// console.log(data);

	const latestPost: IPost[] = data;

	return (
		<div>
			<h2 className="text-xl lg:text-3xl font-semibold my-10">Latest Posts</h2>
			{<PostGrid posts={latestPost} />}
		</div>
	);
}
