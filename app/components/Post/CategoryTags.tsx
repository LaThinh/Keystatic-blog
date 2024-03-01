import { ICategory } from "@/app/keystatic/interface";
import { getCategoryBySlug } from "@/app/keystatic/utils";
import Link from "next/link";
import React from "react";

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
			className={`category-link p-3 py-1 rounded-sm !text-white ${bgColor} ${
				category.entry.customColor ? "hover:opacity-80" : ""
			}`}
			style={{ background: category.entry.customColor }}
		>
			<span>{category.entry.category}</span>
		</Link>
	);
};

export default function CategoryTags({ categories }: { categories: readonly string[] }) {
	return (
		<div>
			<div className="post-categories flex gap-2">
				{categories.map((category, index) => (
					<div className="post-category" key={index}>
						{getCategoryBySlug(category).then((cate) => (
							<CategoryTag key={index} category={cate} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}
