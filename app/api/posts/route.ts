import { Reader, sortPostsByPublishDate } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	//const { searchParams } = new URL(request.url);

	const searchParams = request.nextUrl.searchParams;
	const categorySlug = searchParams.get("categorySlug");
	const query = searchParams.get("query");
	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit");

	console.log("Get Api Posts ");
	console.log(searchParams);

	try {
		let posts = await Reader.collections.posts.all();
		posts = sortPostsByPublishDate(posts);

		if (query) {
			const q = query.toLowerCase();
			posts = posts.filter((post) => post.slug.includes(q) || post.entry.title.toLowerCase().includes(q));
		}
		if (categorySlug) {
			posts = posts.filter((post) => post.entry.categories.includes(categorySlug));
		}

		if (limit) {
			const size = Number.parseInt(limit);
			const from = Math.max(Number.parseInt(page) - 1, 0) * size;
			const to = Number.parseInt(page) * size;
			posts = posts.slice(from, to);
		}

		const data = posts.map((post, index) => {
			return {
				...post,
				index: index + 1,
			};
		});

		return NextResponse.json(data);
	} catch (error: any) {
		console.log(error.message);
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
