import { DocumentRenderer } from "@keystatic/core/renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import ShowcaseYoutube from "@/app/components/Post/ShowcaseYoutube";
import { Reader } from "@/app/keystatic/utils";
import CategoryTags from "@/app/components/Post/CategoryTags";
import { Suspense } from "react";

//const reader = createReader(process.cwd(), keystaticConfig);

// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// }

// type Props = {
// 	params: { slug: string };
// 	searchParams: { [key: string]: string | string[] | undefined };
// };

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const post = await Reader.collections.posts.read(slug);

	// optionally access and extend (rather than replace) parent metadata
	//const previousImages = (await parent).openGraph?.images || [];

	return {
		title: post?.title,
		description: post?.title,
		openGraph: {
			images: [`../images${post?.heroImage}`],
		},
	};
}

export default async function Post({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const post = await Reader.collections.posts.read(slug);

	if (!post) notFound();

	const authors = await Promise.all(
		post.authors.map(async (authorSlug) => ({
			...(await Reader.collections.authors.read(authorSlug)),
			slug: authorSlug,
		}))
	);

	const postContent = await post?.content();

	// const post = await fetch(`http://localhost:3000/api/posts/${slug}`, {
	// 	// next: {
	// 	// 	revalidate: 7200,
	// 	// },
	// }).then(async (response) => {
	// 	console.log("Res Then");
	// 	const data = await response.json();
	// 	console.log(data);

	// 	console.log(data);
	// });

	return (
		<div className="post-detail w-full my-10 m-auto flex flex-col gap-10 max-w-5xl">
			<div className="post-detail border rounded-2xl shadow-sm bg-white @container">
				<Suspense>
					<h1 className="page-title @lg:text-5xl @lg:leading-normal text-gradient !my-2 ">
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

					<article className="prose @4xl:prose-lg lg:max-w-5xl p-3 @xl:p-5 @4xl:p-6">
						{post.categories && post.categories.length > 0 && (
							<div className="post-categories w-full flex items-center justify-center">
								{/* <CategoryTags categories={post.categories} /> */}
							</div>
						)}
						{/* <pre>{JSON.stringify(authors, null, 2)}</pre> */}
						{postContent && (
							<div className="post-content ">
								<DocumentRenderer
									document={postContent}
									componentBlocks={{
										"youtube-video": (props) => (
											<ShowcaseYoutube videoId={props.youtubeVideoId} />
										),
									}}
								/>
							</div>
						)}
						{authors && authors.length > 0 && (
							<div className="authors">
								<h3>Written by</h3>
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
					</article>
				</Suspense>
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const postSlugs = await Reader.collections.posts.list();

	return postSlugs.map((postSlug) => ({ slug: postSlug }));
}
