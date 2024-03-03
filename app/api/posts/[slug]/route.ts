import { IAuthor, IPostArticle } from "@/app/keystatic/interface";
import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
	const { params } = context;

	const slug = params.slug;

	console.log("Get API Post " + slug);

	try {
		const post = await Reader.collections.posts.read(slug);
		const content = await post?.content();
		//console.log(content);

		if (!post) {
			return NextResponse.json({ error: true }, { status: 404, statusText: "Not found" });
		}

		//post.authors.map

		const postData = {
			...post,
			content: await post.content(),
		};

		return NextResponse.json(postData);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
