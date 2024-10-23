// "use client";

import { ICategory, IPost } from "@/app/keystatic/interface";
import { getCategoryBySlug } from "@/app/keystatic/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryTags from "@/app/components/Post/CategoryTags";

export default function PostCard({
	post,
	categories,
	size,
}: {
	post: IPost;
	categories?: ICategory[];
	size?: "sm" | "md" | "lg";
}) {
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
					className="post-image aspect-[3.6/2] block max-h-[480px] bg-gray-200 overflow-hidden hover:bg-gray-300"
				>
					{post.entry?.heroImage ? (
						<Image
							width={800}
							height={400}
							src={post.entry?.heroImage}
							alt={post.entry?.title}
							className="post-img !my-0 w-full object-cover aspect-[3.6/2] hover:scale-105"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<span className="text-shadow-lg text-3xl text-gray-400">
								{post.entry.title}
							</span>
						</div>
					)}
				</Link>
				<div className="post-info p-4 @lg:px-6 flex flex-wrap justify-between items-baseline gap-2">
					{categories && post.entry.categories && post.entry.categories.length > 0 && (
						<CategoryTags categories={post.entry.categories} allCategory={categories} />
					)}

					{post.entry.publishDate && (
						<div className="hidden @sm:block post-entry-date text-gray-700 text-md">
							{post.entry.publishDate}
						</div>
					)}

					<Link
						href={`/post/${post.slug}`}
						className={`post-title w-full capitalize min-h-12 line-clamp-2 text-gray-700 hover:text-sky-500
						@xs:line-clamp-2 @xs:h-16  @xs:leading-8 @xs:text-xl 
						@md:text-2xl @3xl:h-12
						@4xl:h-auto @4xl:min-h-8`}
					>
						<h4>{post.entry.title}</h4>
					</Link>
				</div>
			</div>
		</div>
	);
}
