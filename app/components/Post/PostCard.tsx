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
		<div
			key={post.slug}
			className="post-item @container flex flex-col border rounded-xl overflow-hidden shadow-lg bg-white"
		>
			<Link
				href={`/post/${post.slug}`}
				className="post-image aspect-[3.6/2] block bg-gray-200 overflow-hidden hover:bg-gray-300"
			>
				{post.entry?.heroImage ? (
					<Image
						width={540}
						height={30}
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
			<div className="post-info p-4 @lg:px-8 flex flex-wrap justify-between gap-3">
				{post.entry.categories && post.entry.categories.length > 0 && (
					<CategoryTags categories={post.entry.categories} />
				)}

				{post.entry.publishDate && <div className="post-entry-date text-gray-500 italic">{post.entry.publishDate}</div>}

				<Link
					className={`post-title w-full capitalize text-gray-700 hover:text-sky-500 font-semibold text-xl`}
					href={`/post/${post.slug}`}
				>
					{post.entry.title}
				</Link>
			</div>
		</div>
	);
}
