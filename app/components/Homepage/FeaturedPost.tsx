"use client";
import { ICategory, IPost } from "@/app/keystatic/interface";
import React, { useEffect, useState } from "react";
import PostCard from "../Post/PostCard";
import Loading from "../Loading";

export default function FeaturedPost() {
	// const apiUrl = "/"; //process.env.NEXT_PUBLIC_API_URL;
	// const response = await fetch(`${apiUrl}api/posts/featured`, { next: { revalidate: 120 } });
	// const resCate = await fetch(`${apiUrl}api/posts/category`, { next: { revalidate: 300 } });
	// const data = await response.json();
	// const categories = await resCate.json();

	const [featuredPost, setFeaturedPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);

			const apiUrl = "../";
			const resPost = await fetch(`${apiUrl}api/posts/featured`, {
				next: { revalidate: 300 },
			});
			const resCate = await fetch(`${apiUrl}api/posts/category`, {
				next: { revalidate: 300 },
			});
			const dataPost = await resPost.json();
			const dataCate = await resCate.json();
			setFeaturedPosts(dataPost);
			setCategories(dataCate);

			setLoading(false);
		};
		fetchPosts();
	}, []);

	return (
		<>
			{loading ? (
				<div className="min-h-32 flex items-center">
					<Loading text="Loading Featured Post" />
				</div>
			) : (
				featuredPost.length > 0 && (
					<section className="featured-post pb-5 lg:pb-10">
						<div className="container @container  w-full !max-w-[1600px] flex flex-col gap-5 py-5">
							<h3 className="">Featured Post</h3>
							<div
								className={`post-list grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-6 xl:grid-cols-5 xl:gap-6`}
							>
								{featuredPost.slice(0, 5).map((post, index) => {
									let itemClass = "";
									switch (index) {
										case 0:
											itemClass =
												"md:col-span-3 md:row-span-2 lg:col-span-1 lg:col-span-2 xl:col-span-3";
											break;
										case 1:
										case 2:
											itemClass = "lg:col-span-2 xl:col-span-1";
											break;
										case 3:
											itemClass =
												"lg:hidden lg:col-span-2 xl:block xl:col-span-1";
											break;
										case 4:
											itemClass =
												"md:hidden lg:col-span-2 xl:block xl:col-span-1";
											break;
										case 5:
											itemClass = "col-span-2";
											break;
									}

									return (
										<div key={index} className={`featured-post ${itemClass}`}>
											<PostCard
												post={post}
												categories={categories}
												key={post.slug}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</section>
				)
			)}
		</>
	);
}
