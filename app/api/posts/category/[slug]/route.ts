import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const pathName = request.nextUrl.pathname;
	const slug = pathName.substring(pathName.lastIndexOf("/") + 1) || "slug";

	console.log(pathName);
	console.log("Gat API Posts Category slug = " + slug);

	try {
		const posts = await Reader.collections.posts.all();
		const postCategory = await posts.filter((post) => post.entry.categories.includes(slug));

		if (!postCategory || postCategory.length === 0) {
			return NextResponse.json({ error: `Not found any Post with Category Slug: ${slug}` }, { status: 200 });
		}

		const dataPosts = postCategory.map((post) => {
			return {
				...post,
				slug: slug,
			};
		});

		return NextResponse.json(dataPosts);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
