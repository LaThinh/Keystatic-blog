import { Metadata } from "next";
import PostGrid from "@/app/components/Post/PostGrid";
import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";

export const metadata: Metadata = {
	title: "KeyStatic Post List",
	description: "NextJs Post List",
};

export default async function Page() {
	const allPosts = await Reader.collections.posts.all();
	const posts = sortPostsByPublishDate(allPosts);

	const categories = await Reader.collections.categories.all();

	return (
		<div className="posts w-full pb-10">
			<h1 className="page-title text-gradient my-5">List Posts</h1>
			{posts && categories && <PostGrid posts={posts} categories={categories} size="lg" />}
		</div>
	);
}
