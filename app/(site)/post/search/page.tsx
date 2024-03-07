"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ICategory, IPost } from "@/app/keystatic/interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import dynamic from "next/dynamic";
const PostGrid = dynamic(() => import("@/app/components/Post/PostGrid"), { ssr: false });

export default function SearchPage() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");

	const [posts, setPosts] = useState<IPost[] | null>(null);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [results, setResults] = useState<IPost[]>([]);
	const [loading, setLoading] = useState(true);

	// const posts = await fetchPosts();

	useEffect(() => {
		console.log("use Effect");
		const fetchPosts = async () => {
			console.log("Fetch All Data Posts");
			if (posts) return;

			//const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const apiUrl = "../";

			setLoading(true);
			const resPost = await fetch(`${apiUrl}api/posts/all`, { next: { revalidate: 300 } });
			const resCate = await fetch(`${apiUrl}api/posts/category`, { next: { revalidate: 300 } });
			const dataPost = await resPost.json();
			const dataCate = await resCate.json();
			setPosts(dataPost);

			setCategories(dataCate);
			setLoading(false);
		};
		fetchPosts();
	}, [posts]);

	useEffect(() => {
		if (posts) searchPost(query);
	}, [loading, query]);

	const searchPost = async (query: string) => {
		if (!posts || query.length === 0) {
			console.log("No posts found");
			setResults([]);
			return;
		}

		setLoading(true);

		const q = query.toLowerCase();
		//let results: IPost[] = [];
		const results = posts.filter(
			(post) =>
				post.slug.includes(q) ||
				post.entry.title.toLowerCase().includes(q) ||
				post.entry.categories.some((category) => category.toLowerCase().includes(q))
		);
		setResults(results);

		setLoading(false);
	};

	const handleSearch = () => {
		router.replace(!query ? pathname : `${pathname}?query=${query}`);
	};

	const handleEnterPress = (event: any) => {
		if (event.key === "Enter") {
			router.replace(!query ? pathname : `${pathname}?query=${query}`);
		}
	};

	return (
		<div className="search-page w-full">
			<h1 className="page-title py-10 my-5 text-gradient">Search Page</h1>

			{/* {posts && posts.map((post) => <div key={post.slug}>{post.entry.title}</div>)} */}

			{loading && <Loading text={`Search ${query}`} />}

			{posts && posts.length > 0 && (
				<div className="search-toolbar mb-10">
					<div className="form-horizontal w-full m-auto max-w-xl justify-between flex gap-3 items-center">
						<input
							type="text"
							placeholder="Nhập từ khóa tìm kiếm..."
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							onKeyDown={handleEnterPress}
							className="px-5 py-3 text-2xl font-heading focus:outline-sky-500 text-sky-500 border rounded-md w-full flex flex-1"
						/>

						<button
							className="p-5 py-3 flex !text-white text-xl font-heading rounded-md !no-underline bg-sky-500 hover:bg-sky-700"
							onClick={handleSearch}
						>
							Search
						</button>
					</div>
				</div>
			)}
			{!loading && query.length > 0 && (
				<div className="search-results w-full flex flex-col gap-5 mb-10">
					{results && results.length > 0 ? (
						<>
							<h3 className="w-full text-center text-xl lg:text-3xl text-sky-600 font-inter mb-5">
								{`Found ${results.length} posts with Keyword "${query}"`}
							</h3>

							<PostGrid posts={results} categories={categories} size="lg" />
						</>
					) : (
						<h3
							className="w-full m-auto max-w-xl h-56 text-center flex items-center justify-center 
								border bg-red-100/30 rounded-2xl text-2xl text-red-500 font-inter"
						>
							{`Not Found any post with Keyword "${query}"`}
						</h3>
					)}
				</div>
			)}
		</div>
	);
}
