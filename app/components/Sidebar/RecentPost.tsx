import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RecentPost({ postNumber }: { postNumber: number }) {
	const allPosts = await Reader.collections.posts.all();
	const recentPost = sortPostsByPublishDate(allPosts).slice(0, postNumber);

	return (
		<div className="block">
			<h3 className="block-title">Recent Posts</h3>
			<div className="block-content !p-2">
				<div className="post-list flex flex-col gap-3">
					{recentPost.map((post) => (
						<div
							key={post.slug}
							className="post-item flex gap-2 bg-slate-50 border border-gray-100 hover:bg-slate-100 rounded-sm"
						>
							<Link href={`/post/${post.slug}`} className="post-image">
								<Image
									alt={post.entry.title}
									src={post.entry?.heroImage || "no-image.jpg"}
									width="110"
									height="80"
									className="rounded-sm h-full object-cover overflow-hidden"
								/>
							</Link>
							<div className="post-info flex flex-col flex-1 justify-start gap-1 p-2">
								<Link href={`/post/${post.slug}`} title={post.entry.title}>
									<h4 className="post-title line-clamp-2">{post.entry.title}</h4>
								</Link>
								<div className="post-date text-sm text-gray-400">
									{post.entry.publishDate}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
