import PostGrid from "@/app/components/Post/PostGrid";
// import { Reader } from "@/app/keystatic/utils";

import React from "react";

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		//page?: string;
	};
}) {
	const query = searchParams?.query?.toLowerCase() || "";
	//const currentPage = Number(searchParams?.page) || 1;

	//const allPosts = await Reader.collections.posts.all();
	//const searchPosts = allPosts.filter((post) => post.entry.title.toLowerCase().indexOf(query) > -1);

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/?query=${query}`, {
		// cache: "no-cache"
	});

	const searchPosts = await response.json();

	const handleSearch = () => {
		//getPosts(searchText);
		//router.push(`./post/search?query=${query}`);
	};

	return (
		<div className="search-page w-full">
			<h1 className="page-title py-10 text-gradient">Search Page</h1>

			{searchPosts.length > 0 ? (
				<div className="search-results w-full">
					<h3 className="pb-8 text-2xl text-gray-500 font-semibold">
						{`Found ${searchPosts.length} posts with Keyword "${query}"`}
					</h3>
					<PostGrid posts={searchPosts} size="lg" />
				</div>
			) : (
				<h3 className="w-full text-center pb-8 text-2xl text-gray-500 font-semibold">{`Not Found any post with Keyword "${query}"`}</h3>
			)}
		</div>
	);
}
