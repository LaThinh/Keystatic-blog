import dynamic from "next/dynamic";

import React, { Suspense } from "react";
import CategoryTags from "@/app/components/Post/CategoryTags";
import ShowcaseYoutube from "@/app/components/Post/ShowcaseYoutube";
import Image from "next/image";
import Loading from "@/app/components/Loading";
import { IPostArticle } from "@/app/keystatic/interface";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { Metadata, ResolvingMetadata } from "next";

const { NEXT_PUBLIC_API_URL } = process.env;

// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })

type Props = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const slug = params.slug;

	// fetch data
	const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
		next: {
			revalidate: 7200,
		},
	});

	const post: IPostArticle = await response.json();
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: post?.title,
		description: post?.title,
		openGraph: {
			images: [`../images${post?.heroImage}`, ...previousImages],
		},
	};
}

export default async function PostPage({ params, searchParams }: Props) {
	const slug = params.slug;
	//console.log(searchParams);

	const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
		next: {
			revalidate: 7200,
		},
	});

	const post: IPostArticle = await response.json();

	return (
		<div className="post-detail w-full my-10 m-auto flex flex-col gap-10 max-w-5xl @container">
			<Suspense fallback={<Loading text="Loading Post" />}>
				{post && (
					<article className="post-article bg-white @xl:border @xl:rounded-2xl @xl:shadow-sm  ">
						<h1 className="page-title text-3xl @lg:text-5xl @lg:leading-normal text-gradient !my-2 ">{post?.title}</h1>
						{post?.heroImage && (
							<div className="post-image">
								<Image src={`${post.heroImage}`} width="1200" height="500" alt={post?.title || "Post Title"} />
							</div>
						)}
						<div className="prose w-full @4xl:prose-lg @3xl:max-w-5xl p-3 @xl:p-5 @4xl:p-6">
							{post.categories && post.categories.length > 0 && (
								<div className="post-categories w-full flex items-center justify-center">
									<CategoryTags categories={post.categories} />
								</div>
							)}
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
