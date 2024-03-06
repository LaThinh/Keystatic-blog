"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reader } from "@/app/keystatic/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
	//const allPosts = await Reader.collections.posts.all();
	//const searchPosts = allPosts.filter((post) => post.entry.content.toString().includes(query));

	const searchParams = useSearchParams();
	const query = searchParams.get("query") || "";

	// const getPosts = (slug: string) => {
	// 	//const posts = allPosts.filter((post) => post.entry.categories.includes(slug));
	// 	const posts = allPosts.filter((post) => post.entry.content.toString().includes(query));
	// 	return posts.length;
	// };

	//const [resultsPosts, setResultsPosts] = useState<any[]>([]);
	const router = useRouter();

	const [searchText, setSearchText] = useState("");

	// const getPosts = async (query: string) => {
	// 	const allPosts = await Reader.collections.posts.all();
	// 	const searchPosts = allPosts.filter((post) => post.entry.content.toString().includes(query));
	// 	setResultsPosts(searchPosts);
	// };

	const refSearch = useRef(null);

	useEffect(() => {
		if (query) setSearchText(query);
	}, [query]);

	const handleSearch = () => {
		console.log(searchText);
		const link = refSearch.current;

		//router.push(`/post/search?query=${searchText}`);
	};

	const handleEnterPress = (event: any) => {
		if (event.key === "Enter") {
			router.push(`/post/search?query=${searchText}`);
		}
	};

	return (
		<div className="block">
			<h3 className="block-title">Search</h3>
			<div className="block-content py-5">
				<div className="form-horizontal w-full justify-between flex gap-2 items-center">
					<input
						type="text"
						placeholder="Nhập từ khóa tìm kiếm..."
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						onKeyDown={handleEnterPress}
						className="px-3 py-2 border rounded-md w-full flex flex-1"
					/>

					<Link
						id="Search"
						ref={refSearch}
						className="p-5 py-2 flex !text-white rounded-xl !no-underline bg-sky-500 hover:bg-sky-600"
						href={`/post/search?query=${searchText}`}
					>
						Search
					</Link>
				</div>
			</div>
		</div>
	);
}
