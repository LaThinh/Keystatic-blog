import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const posts = await Reader.collections.posts.all();

		const pathName = request.nextUrl.pathname;
		const slug = pathName.substring(pathName.lastIndexOf("/") + 1) || "slug";
		console.log(pathName);
		console.log("Get API Posts Category slug = " + slug);

		const postCategory = posts.filter((post) => post.entry.categories.includes(slug));
		console.log(postCategory);

		// if (!postCategory || postCategory.length === 0) {
		// 	return NextResponse.json({ error: `Not found any Post with Category Slug: ${slug}` }, { status: 200 });
		// }

		const dataPosts = posts.map((post) => {
			return {
				...post,
				categorySlug: slug,
			};
		});

		return NextResponse.json(dataPosts);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
