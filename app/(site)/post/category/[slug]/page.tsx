import PostGrid from "@/app/components/Post/PostGrid";
import { ICategory } from "@/app/keystatic/interface";
import { Reader, getCategoryBySlug, sortPostsByPublishDate } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	if (!slug) notFound();

	const categories = await Reader.collections.categories.all();
	const category = await Reader.collections.categories.read(slug);
	const allPosts = await Reader.collections.posts.all();
	const posts = sortPostsByPublishDate(allPosts);
	const categoryPosts = posts.filter((post) => post.entry.categories.includes(slug));

	return (
		<div className="category-page w-full py-10">
			<h1 className="page-title text-gradient">
				<span>Category {category?.category}</span>
			</h1>
			<div className="post-category">
				<pre className="font-script text-2xl text-center whitespace-pre-wrap">
					{category?.description || "Những bài viết hay vê " + category?.category}
				</pre>
			</div>
			<div className="post-container mt-8">
				<PostGrid posts={categoryPosts} categories={categories} size="lg" />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const slugs = await Reader.collections.categories.list();

	return slugs.map((slug) => ({ slug: slug }));
}
