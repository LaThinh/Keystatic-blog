import { IPost } from "@/app/keystatic/interface";
import React from "react";
import PostCard from "../Post/PostCard";

export default async function FeaturedPost() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${apiUrl}/api/posts/featured`, { next: { revalidate: 120 } });
	const resCate = await fetch(`${apiUrl}/api/posts/category`, { next: { revalidate: 300 } });

	const data = await response.json();

	const categories = await resCate.json();

	let featuredPost: IPost[] = data;
	if (!featuredPost) return null;
	else if (featuredPost.length > 0) featuredPost = featuredPost.slice(0, 4);

	return (
		<div className="@container">
			<h2 className="text-xl lg:text-3xl my-10">Featured Post</h2>

			<div className={`post-list grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-6 xl:grid-cols-5`}>
				{featuredPost &&
					featuredPost.map((post, index) => {
						let itemClass = "";
						switch (index) {
							case 0:
								itemClass = "md:col-span-3 md:row-span-2 lg:col-span-1 lg:col-span-2 xl:col-span-3 xl:col-span-2";
								break;
							case 1:
							case 2:
								itemClass = "lg:col-span-2 xl:col-span-1";
								break;
							case 3:
								itemClass = "lg:hidden lg:col-span-2 xl:block xl:col-span-1";
								break;
							case 4:
								itemClass = "md:hidden lg:col-span-2 xl:block xl:col-span-1";
								break;
							case 5:
								itemClass = "col-span-2";
								break;
						}

						return (
							<div key={index} className={`featured-post ${itemClass}`}>
								<PostCard post={post} categories={categories} key={post.slug} />
							</div>
						);
					})}
			</div>

			{/* {<PostGrid posts={featuredPost.slice(0, 3)} categories={categories} />} */}
		</div>
	);
}
