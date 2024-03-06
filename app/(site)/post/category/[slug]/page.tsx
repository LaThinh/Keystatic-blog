import PostGrid from "@/app/components/Post/PostGrid";
import { ICategory } from "@/app/keystatic/interface";
import { Reader, getCategoryBySlug } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	if (!slug) notFound();

	// const category = await getCategoryBySlug(slug);
	// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/?categorySlug=${slug}`, {
	// 	next: {
	// 		revalidate: 120,
	// 	},
	// });
	// const categoryPosts = await response.json();

	const category = await Reader.collections.categories.read(slug);
	const allPosts = await Reader.collections.posts.all();
	const categoryPosts = allPosts.filter((post) => post.entry.categories.includes(slug));

	console.log(category);

	return (
		<div className="category-page w-full py-10">
			<h1 className="page-title text-gradient">
				<span>Category {category?.category}</span>
			</h1>
			<div className="post-category">
				<pre className="font-script text-2xl text-center">{category?.description}</pre>
			</div>
			<div className="post-container mt-8">
				<PostGrid posts={categoryPosts} size="lg" />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const slugs = await Reader.collections.categories.list();

	return slugs.map((slug) => ({ slug: slug }));
}
