import React from "react";
import Link from "next/link";
// import { ICategory } from "@/app/keystatic/interface";
import { Reader } from "@/app/keystatic/utils";

export default async function Categories() {
	const categories = await Reader.collections.categories.all();
	const allPosts = await Reader.collections.posts.all();

	const getPosts = (slug: string) => {
		const posts = allPosts.filter((post) => post.entry.categories.includes(slug));
		return posts.length;
	};

	return (
		<div className="block">
			<h3 className="block-title">Categories</h3>
			<div className="block-content pb-2">
				{categories.map((category, index) => (
					<div key={index} className={`category py-2 ${index > 0 ? "border-t" : ""}`}>
						<Link className="alink" href={`/post/category/${category.slug}`}>
							{category.entry.category}
						</Link>
						<span className="count ml-2" style={{ color: category.entry.customColor }}>
							({getPosts(category.slug)})
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
