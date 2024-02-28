import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import PostGrid from "@/app/components/Post/PostGrid";

export const metadata: Metadata = {
	title: "KeyStatic Post List",
	description: "NextJs Post List",
};

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
	// 2. Read the "Posts" collection
	const posts = await reader.collections.posts.all();

	return (
		<div className="posts w-full pb-10">
			<h1 className="page-title text-gradient my-5">List Posts</h1>
			<PostGrid posts={posts} size="lg" />

			{/* <ul className="post-list flex flex-col gap-3">
				{posts.map((post) => (
					<li key={post.slug} className="post-item border rounded-xl shadow-lg bg-white p-3 lg:p-5">
						<div className="post-image">
							{post.entry.post_image && (
								<Image width={320} height={240} src={`images/${post.entry.post_image}`} alt={post.entry.title} />
							)}
						</div>
						<Link href={`/post/${post.slug}`} className="post-link text-lg capitalize">
							{post.entry.title}
						</Link>
					</li>
				))}
			</ul> */}
		</div>
	);
}
