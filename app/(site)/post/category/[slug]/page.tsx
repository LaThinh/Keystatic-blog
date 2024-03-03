import PostGrid from "@/app/components/Post/PostGrid";
import { ICategory } from "@/app/keystatic/interface";
import { Reader, getCategoryBySlug } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	if (!slug) notFound();

	const category = await getCategoryBySlug(slug);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/?categorySlug=${slug}`, {
		next: {
			revalidate: 120,
		},
	});
	const categoryPosts = await response.json();

	return (
		<div className="category-page w-full py-10">
			<h1 className="page-title text-gradient mb-10">
				<span>Category {category?.entry.category}</span>
			</h1>
			<PostGrid posts={categoryPosts} size="lg" />
		</div>
	);
}

// export async function generateStaticParams() {
// 	const slugs = await Reader.collections.categories.list();

// 	return slugs.map((slug) => ({ slug: slug }));
// }
