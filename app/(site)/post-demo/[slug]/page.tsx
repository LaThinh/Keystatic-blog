import dynamic from "next/dynamic";

import CategoryTags from "@/app/components/Post/CategoryTags";
import ShowcaseYoutube from "@/app/components/Post/ShowcaseYoutube";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Image from "next/image";
import React, { Suspense } from "react";
import { Reader } from "@/app/keystatic/utils";
import { IPostArticle } from "@/app/keystatic/interface";
import Loading from "@/app/components/Loading";

export default async function PostPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	// const post = await Reader.collections.posts.read(slug);

	// if (!post) {
	// 	//notFound();
	// 	return null;
	// }

	// const authors = await Promise.all(
	// 	post.authors.map(async (authorSlug) => ({
	// 		...(await Reader.collections.authors.read(authorSlug)),
	// 		slug: authorSlug,
	// 	}))
	// );

	//const postContent = await post?.content();

	//let post;

	const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
		next: {
			revalidate: 7200,
		},
	});

	const post: IPostArticle = await response.json();

	console.log(post);

	return (
		<div className="post-detail w-full my-10 m-auto flex flex-col gap-10 max-w-5xl @container">
			<Suspense fallback={<Loading text="Loading 22..." />}>
				{post && (
					<article className="post-article bg-white @2xl:border @2xl:rounded-2xl @2xl:shadow-sm  ">
						<h1 className="page-title  @lg:leading-normal text-gradient !my-2 ">{post?.title}</h1>
						{post?.heroImage && (
							<div className="post-image">
								<Image src={`${post.heroImage}`} width="1200" height="500" alt={post?.title || "Post Title"} />
							</div>
						)}

						<div className="prose w-full @4xl:prose-lg @4xl:max-w-5xl p-3 @xl:p-5 @4xl:p-6">
							{post.categories && post.categories.length > 0 && (
								<div className="post-categories w-full flex items-center justify-center">
									<CategoryTags categories={post.categories} />
								</div>
							)}
							{/* <pre>{JSON.stringify(authors, null, 2)}</pre> */}
							{post?.content && (
								<div className="post-content ">
									<DocumentRenderer
										document={post.content}
										componentBlocks={{
											"youtube-video": (props) => <ShowcaseYoutube videoId={props.youtubeVideoId} />,
										}}
									/>
								</div>
							)}
							{/* {authors && authors.length > 0 && (
							<div className="authors">
								<h3>Written by</h3>
								<ul className="author-list list-none flex gap-4">
									{authors.map((author) => (
										<li className="author-item" key={author.slug}>
											<Link href={`/author/${author.slug}`} className="flex items-center gap-2">
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
						)} */}
						</div>
					</article>
				)}
			</Suspense>
		</div>
	);
}
