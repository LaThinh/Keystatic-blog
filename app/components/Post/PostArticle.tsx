"use client";

import { IPostArticle } from "@/app/keystatic/interface";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import CategoryTags from "./CategoryTags";
import { DocumentRenderer } from "@keystatic/core/renderer";
import ShowcaseYoutube from "./ShowcaseYoutube";
import Link from "next/link";
import Loading from "@/app/components/Loading";

function PostArticle({ slug }: { slug: string }) {
	const [post, setPost] = useState<IPostArticle>();

	const fetchData = async () => {
		const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
			next: {
				revalidate: 7200,
			},
		});

		const data = await response.json();
		if (data) setPost(data);
		// console.log(post);
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Suspense fallback={<Loading text="Loading Post" />}>
			<article className="post-article bg-white @xl:border @xl:rounded-2xl @xl:shadow-sm  ">
				<h1 className="page-title text-3xl @lg:text-5xl @lg:leading-normal text-gradient !my-2 ">
					{post?.title}
				</h1>
				{post?.heroImage && (
					<div className="post-image">
						<Image
							src={`${post.heroImage}`}
							width="1200"
							height="500"
							alt={post?.title || "Post Title"}
						/>
					</div>
				)}
				<div className="prose w-full @4xl:prose-lg @3xl:max-w-5xl p-3 @xl:p-5 @4xl:p-6">
					{post?.categories && post.categories.length > 0 && (
						<div className="post-categories w-full flex items-center justify-center">
							{/* <CategoryTags categories={post.categories} /> */}
						</div>
					)}
					{post?.content && (
						<div className="post-content ">
							<DocumentRenderer
								document={post.content}
								componentBlocks={{
									"youtube-video": (props) => (
										<ShowcaseYoutube videoId={props.youtubeVideoId} />
									),
								}}
							/>
						</div>
					)}
					{post?.postAuthors && post.postAuthors.length > 0 && (
						<div className="authors">
							<h3>Written by</h3>
							<ul className="author-list list-none flex gap-4">
								{post.postAuthors.map((author) => (
									<li className="author-item" key={author.slug}>
										<Link
											href={`/author/${author.slug}`}
											className="flex items-center gap-2"
										>
											<Image
												src={author.avatar || "/images/avatar.jpg"}
												alt={`Avatar for ${author.name}`}
												width={80}
												height={80}
												className="rounded-full w-20 h-20 overflow-hidden object-cover	"
											/>
											<strong className="!my-2">{author?.name}</strong>
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</article>
		</Suspense>
	);
}

export default PostArticle;
