import React from "react";
import Link from "next/link";
import { ICategory } from "@/app/keystatic/interface";

export default async function Categories() {
	const { NEXT_PUBLIC_API_URL } = process.env;
	const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/category`, {
		next: {
			revalidate: 120,
		},
	});

	const categories: ICategory[] = await res.json();

	return (
		<div className="block">
			<h3 className="block-title">Categories</h3>
			<div className="block-content pb-5">
				{categories.map((category, index) => (
					<div key={index} className={`category py-2 ${index > 0 ? "border-t" : ""}`}>
						<Link href={`/post/category/${category.slug}`}>{category.entry.category}</Link>
						<span className="count ml-2" style={{ color: category.entry.customColor }}>
							{`(${category?.total})`}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
