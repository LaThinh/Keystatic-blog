import PostGrid from "@/app/components/Post/PostGrid";
import { Reader } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	if (!slug) notFound();

	const category = await Reader.collections.categories.read(slug);
	const allPosts = await Reader.collections.posts.all();
	const categoryPosts = allPosts.filter((post) => post.entry.categories.includes(slug));

	return (
		<div className="category-page w-full py-10">
			<h1 className="page-title text-gradient mb-10">Category {category?.category}</h1>

			<PostGrid posts={categoryPosts} size="lg" />
		</div>
	);
}
