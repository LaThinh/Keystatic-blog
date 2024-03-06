"use client";

// import { ICategory, IPost } from "@/app/keystatic/interface";
import React, { useState } from "react";
// import Loading from "../Loading";
import { useSearchParams } from "next/navigation";
//import PostGrid from "@/app/components/Post/PostGrid";

// import dynamic from "next/dynamic";
// import { useSearchParams } from "next/navigation";
// const PostGrid = dynamic(() => import("@/app/components/Post/PostGrid"), { ssr: false });

export default function SearchGrid() {
	const searchParams = useSearchParams();

	const [query, setQuery] = useState(searchParams.get("query") || "");

	// const [results, setResults] = useState<IPost[]>([]);

	// useEffect(() => {
	// 	console.log("use Effect query=" + query);
	// 	if (posts) searchPost(query);
	// }, [query]);

	// const searchPost = async (query: string) => {
	// 	if (!posts || query.length === 0) {
	// 		console.log("No posts found");
	// 		return;
	// 	}

	// 	console.log("Search postssssss with " + query);
	// 	const q = query.toLowerCase();
	// 	//let results: IPost[] = [];
	// 	const postSearch = posts.filter((post) => post.slug.includes(q) || post.entry.title.toLowerCase().includes(q));
	// 	setResults(postSearch);
	// };

	return (
		<div>
			{/* {posts && posts.map((post) => <div key={post.slug}>{post.entry.title}</div>)} */}

			<div className="search-results">
				<h2 className="search-title page-title">Client Search Grid </h2>
			</div>
		</div>
	);
}
