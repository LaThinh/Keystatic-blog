import { Metadata } from "next";
import Image from "next/image";
import PostGrid from "@/app/components/Post/PostGrid";

export const metadata: Metadata = {
	title: "KeyStatic Post List",
	description: "NextJs Post List",
};

// 1. Create a reader
//const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
	// 2. Read the "Posts" collection
	//const posts = await reader.collections.posts.all();

	return (
		<div className="posts w-full pb-10">
			<h1 className="page-title text-gradient my-5">List Posts</h1>
			<PostGrid size="lg" />
		</div>
	);
}
