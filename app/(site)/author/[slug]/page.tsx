import { notFound } from "next/navigation";
import React from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Image from "next/image";
import Link from "next/link";
import PostGrid from "@/app/components/Post/PostGrid";
import ShowcaseLink from "@/app/components/Post/ShowcaseLink";
import ShowcaseYoutube from "@/app/components/Post/ShowcaseYoutube";

export default async function AuthorPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	if (!slug) {
		notFound();
	}

	const reader = createReader(process.cwd(), keystaticConfig);
	const author = await reader.collections.authors.read(slug);

	if (!author) notFound();
	const allPosts = await reader.collections.posts.all();
	const authorPosts = allPosts.filter((post) => post.entry.authors.includes(slug));

	return (
		<div className="my-10 flex gap-5 flex-col">
			<div
				className=" md:max-w-4xl m-auto w-full 
				@container border rounded-lg shadow-lg bg-white p-5"
			>
				<div className="flex gap-5 flex-col @3xl:flex-row">
					<div className="author-image w-[320px]">
						<Image
							src={author?.avatar || "/images/avatar.jpg"}
							alt={`Avatar for ${author?.name}`}
							width={320}
							height={320}
							className="rounded-lg overflow-hidden object-cover m-0"
						/>
					</div>
					<div className="showcase prose lg:prose-lg flex-flex-1">
						<h1 className="page-title">Author {author?.name}</h1>
						<h3>ShowCase</h3>
						{author?.showcase && author?.showcase.length > 0 && (
							<ul className="list-none m-0 !p-0 max-w-full">
								{author.showcase.map((item, index) => (
									<li key={index}>
										{item.discriminant === "link" && <ShowcaseLink url={item.value.url} label={item.value.label} />}
										{item.discriminant === "youtubeVideoId" && <ShowcaseYoutube videoId={item.value} />}
										{/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				{authorPosts.length > 0 && (
					<div className="post-written my-5 pt-5 border-t">
						<h3 className="text-xl font-bold">Posts written</h3>
						<PostGrid posts={authorPosts} size="sm" />
					</div>
				)}
			</div>
		</div>
	);
}
