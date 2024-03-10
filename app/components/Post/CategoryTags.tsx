"use client";

import { ICategory } from "@/app/keystatic/interface";
import Link from "next/link";
import React from "react";

export const getCategoryBySlug = (slug: string, categories: ICategory[]) => {
	const category: ICategory[] = categories.filter((c: any) => c.slug === slug);
	if (category.length > 0) {
		return category[0];
	}

	return null;
};

export const CategoryTag = ({ category }: { category: ICategory | null }) => {
	if (!category) return null;

	let bgColor = "bg-gray-400";

	switch (category.slug) {
		case "news":
			bgColor = "bg-lime-700 hover:bg-lime-600";
			break;

		case "web-developer":
			bgColor = "bg-amber-700 hover:bg-amber-600";
			break;

		case "photography":
			bgColor = "bg-pink-700 hover:bg-pink-600";
			break;
	}

	return (
		<Link
			href={`/post/category/${category.slug}`}
			className={`category-link line-clamp-1 p-2 py-1 whitespace-nowrap uppercase 
			text-xs w-auto @sm:text-sm !text-white ${bgColor} ${category.entry.customColor ? "hover:opacity-80" : ""}`}
			style={{ background: category.entry.customColor }}
		>
			<span>{category.entry.category}</span>
		</Link>
	);
};

export default function CategoryTags({
	categories,
	allCategory,
}: {
	categories: readonly string[];
	allCategory: ICategory[];
}) {
	return (
		<div className="@sm:max-w-[calc(100%-120px)]">
			<div className="post-categories flex gap-3 flex-wrap h-7 @sm:h-8 overflow-hidden">
				{categories.map((category, index) => {
					const cate = getCategoryBySlug(category, allCategory);

					return (
						<div className="post-category" key={index}>
							<CategoryTag category={cate} />
							{/* {getCategoryBySlug(category).then((cate) => (
							<CategoryTag key={index} category={cate} allCategory={allCategory} />
						))} */}
							{/* {category} */}
						</div>
					);
				})}
			</div>
		</div>
	);
}
