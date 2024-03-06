// "use client";

import { ICategory, IPost } from "@/app/keystatic/interface";
import { getCategoryBySlug } from "@/app/keystatic/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryTags from "@/app/components/Post/CategoryTags";

export default function PostCard({ post, size }: { post: IPost; size?: "sm" | "md" | "lg" }) {
	let textSize = "text-md";

	switch (size) {
		case "sm":
			textSize = "text-sm";
			break;
		case "lg":
			textSize = "xl:text-xl";
			break;
	}

	return (
		<div key={post.slug} className="post-card" id={post.slug}>
			<div className="post-content @container flex flex-col border rounded-xl overflow-hidden hover:shadow-lg bg-white">
				<Link
					href={`/post/${post.slug}`}
					className="post-image aspect-[3.6/2] block bg-gray-200 overflow-hidden hover:bg-gray-300"
				>
					{post.entry?.heroImage ? (
						<Image
							width={800}
							height={400}
							src={post.entry?.heroImage}
							alt={post.entry?.title}
							className="post-img !my-0 object-cover aspect-[3.6/2] hover:scale-110 "
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<span className="text-shadow-lg text-3xl text-gray-400">{post.entry.title}</span>
						</div>
					)}
				</Link>
				<div className="post-info p-4 @lg:px-6 flex flex-wrap justify-between items-baseline gap-3">
					{post.entry.categories && post.entry.categories.length > 0 && (
						<CategoryTags categories={post.entry.categories} />
					)}

					{post.entry.publishDate && (
						<div className="post-entry-date text-gray-700 text-md">{post.entry.publishDate}</div>
					)}

					<Link
						href={`/post/${post.slug}`}
						className={`post-title w-full capitalize line-clamp-2 h-16
						text-gray-700 hover:text-sky-500 text-xl @lg:text-2xl`}
					>
						<h3>{post.entry.title}</h3>
					</Link>
				</div>
			</div>
		</div>
	);
}
