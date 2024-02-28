import keystaticConfig from "@/keystatic.config";
import { Entry, createReader } from "@keystatic/core/reader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//type PostType = Entry<(typeof keystaticConfig)['collections']>
const reader = createReader(process.cwd(), keystaticConfig);

export default async function PostGrid({ posts, size }: { posts?: any; size?: "sm" | "md" | "lg" }) {
	let gridClass = "@xl:grid-cols-2 @xl:gap-5 @4xl:grid-cols-3 @4xl:gap-8";
	let textSize = "text-md";
	if (!posts) {
		posts = await reader.collections.posts.all();
	}

	switch (size) {
		case "sm":
			gridClass = "@lg:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4";
			textSize = "text-sm";
			break;
		case "lg":
			gridClass = "@xl:grid-cols-2 @xl:gap-5 @3xl:gap-8 @5xl:grid-cols-3 @5xl:gap-8 @7xl:grid-cols-4";
			textSize = "xl:text-xl";
			break;
	}

	return (
		<div className="post-grid @container">
			<div className={`post-list grid gap-3 ${gridClass}`}>
				{posts.map((post: any) => (
					<div key={post.slug} className="post-item @container border rounded-xl overflow-hidden shadow-lg bg-white">
						<Link
							href={`/post/${post.slug}`}
							className="post-image aspect-[3.6/2] block bg-gray-200 overflow-hidden hover:bg-gray-300"
						>
							{post.entry.post_image ? (
								<Image
									width={540}
									height={30}
									src={post.entry.post_image}
									alt={post.entry.title}
									className="post-img !my-0 object-cover aspect-[3.6/2] hover:scale-110 "
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<span className="text-shadow-lg text-3xl text-gray-400">{post.entry.title}</span>
								</div>
							)}
						</Link>
						<div className="post-info p-3 @lg:p-5 flex flex-col gap-3">
							<Link href={`/post/${post.slug}`} className={`post-title capitalize ${textSize}`}>
								{post.entry.title}
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
