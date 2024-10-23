import React, { Suspense } from "react";
import CategoryTags from "@/app/components/Post/CategoryTags";
import Image from "next/image";
import Loading from "@/app/components/Loading";

import { Metadata, ResolvingMetadata } from "next";
import { Reader } from "@/app/keystatic/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import PostContent from "@/app/components/Post/PostContent";

// const { NEXT_PUBLIC_API_URL } = process.env;

// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })

type Props = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slug = params.slug;
	// const post: IPostArticle = await response.json();
	const post = await Reader.collections.posts.read(slug);
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: post?.title,
		description: post?.title,
		openGraph: {
			images: [`../${post?.heroImage}`, ...previousImages],
		},
	};
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	//console.log(searchParams);

	// const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
	// 	next: {
	// 		revalidate: 7200,
	// 	},
	// });

	//const post: IPostArticle = await response.json();

	const post = await Reader.collections.posts.read(slug);
	const categories = await Reader.collections.categories.all();

	if (!post) notFound();

	const authors = await Promise.all(
		post.authors.map(async (authorSlug) => ({
			...(await Reader.collections.authors.read(authorSlug)),
			slug: authorSlug,
		}))
	);

	const postContent = await post?.content();

	return (
		<div className="post-detail w-full my-10 m-auto flex flex-col gap-10  @container">
			<Suspense fallback={<Loading text="Loading Post" />}>
				<article
					className={`post-article bg-white @xl:border @xl:rounded-2xl @xl:shadow-sm overflow-hidden type-${post?.postType} `}
				>
					{post?.heroImage && (
						<div className="post-image">
							<Image
								src={`${post.heroImage}`}
								width="900"
								height="500"
								alt={post?.title || "Post Title"}
								className="w-full aspect-video object-cover"
								priority
							/>
						</div>
					)}

					<div className="article-header bg-slate-50 flex flex-col gap-3 p-3 lg:p-5">
						<h1
							className="page-title text-3xl text-gradient !my-0 !p-0
					@lg:text-4xl @lg:leading-normal @2xl:text-5xl @2xl:leading-relaxed"
						>
							{post?.title}
						</h1>

						{post?.categories && post.categories.length > 0 && (
							<div className="post-categories w-full flex items-center justify-center">
								<CategoryTags
									categories={post.categories}
									allCategory={categories}
								/>
							</div>
						)}
					</div>

					<div className="prose w-full m-auto @4xl:prose-lg @3xl:max-w-4xl p-3 max-w-3xl @xl:p-5 @4xl:p-6">
						{postContent && <PostContent postContent={postContent} />}

						{authors && authors.length > 0 && (
							<div className="authors border-t mt-10 pt-5">
								<h3 className="!m-5 font-script text-2xl">Written by</h3>
								<ul className="author-list list-none flex gap-4">
									{authors.map((author) => (
										<li className="author-item" key={author.slug}>
											<Link
												href={`/author/${author.slug}`}
												className="flex items-center gap-2"
											>
												<Image
													src={author.avatar || "/images/avatar.jpg"}
													alt={`Avatar for ${author.name}`}
													width={64}
													height={64}
													className="!m-0 rounded-full aspect-square object-cover"
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
		</div>
	);
}

export async function generateStaticParams() {
	const postSlugs = await Reader.collections.posts.list();

	return postSlugs.map((postSlug) => ({ slug: postSlug }));
}
