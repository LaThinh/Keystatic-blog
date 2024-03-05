import { Metadata } from "next";
import PostGrid from "@/app/components/Post/PostGrid";

export const metadata: Metadata = {
	title: "KeyStatic Post List",
	description: "NextJs Post List",
};

export default async function Page() {
	return (
		<div className="posts w-full pb-10">
			<h1 className="page-title text-gradient my-5">List Posts</h1>
			<PostGrid size="lg" />
		</div>
	);
}
