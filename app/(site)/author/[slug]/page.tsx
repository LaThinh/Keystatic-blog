import { notFound } from "next/navigation";
import React from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Image from "next/image";
import Link from "next/link";
import PostGrid from "@/app/components/Post/PostGrid";
import ShowcaseLink from "@/app/components/Post/ShowcaseLink";
import ShowcaseYoutube from "@/app/components/Post/ShowcaseYoutube";
import { Reader } from "@/app/keystatic/utils";

export default async function AuthorPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	if (!slug) {
		notFound();
	}

	const author = await Reader.collections.authors.read(slug);

	if (!author) notFound();
	const allPosts = await Reader.collections.posts.all();
	const categories = await Reader.collections.categories.all();
	const authorPosts = allPosts.filter((post) => post.entry.authors.includes(slug));

	return (
		<div className="my-10 flex gap-5 flex-col">
			<div className="@container m-auto bg-white p-5 w-full rounded-lg shadow-lg max-w-7xl">
				<div className="flex gap-5 flex-col @3xl:flex-row @3xl:gap-10">
					<div className="author-image w-full max-w-[420px]">
						<Image
							src={author?.avatar || "/images/avatar.jpg"}
							alt={`Avatar for ${author?.name}`}
							width={420}
							height={420}
							className="rounded-lg overflow-hidden aspect-square object-cover m-0"
						/>
					</div>
					<div className="showcase w-full  flex-col flex flex-1">
						<h1 className="page-title font-script">Author {author?.name}</h1>

						{author?.introduce && (
							<div className="author-introduce">
								<pre className="text-lg max-w-2xl text-wrap font-inter">{author.introduce}</pre>
							</div>
						)}
						{author?.showcase && author?.showcase.length > 0 && (
							<>
								<h3>ShowCase</h3>

								<ul className="list-none m-0 !p-0 max-w-full">
									{author.showcase.map((item, index) => (
										<li key={index}>
											{item.discriminant === "link" && <ShowcaseLink url={item.value.url} label={item.value.label} />}
											{item.discriminant === "youtubeVideoId" && <ShowcaseYoutube videoId={item.value} />}
											{/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>

				{authorPosts.length > 0 && (
					<div className="post-written my-5 pt-5 border-t">
						<h3 className="text-xl my-5">Posts written</h3>
						<PostGrid posts={authorPosts} categories={categories} />
					</div>
				)}
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const authorSlugs = await Reader.collections.authors.list();

	return authorSlugs.map((authorSlug) => ({ slug: authorSlug }));
}
