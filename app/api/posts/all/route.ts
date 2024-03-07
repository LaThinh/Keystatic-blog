import { Reader, getCategoryBySlug } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: Request) {
	const allowedOrigin = request.headers.get("origin");
	const response = new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": allowedOrigin || "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers":
				"Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
			"Access-Control-Max-Age": "86400",
		},
	});

	return response;
}

export async function GET(request: NextRequest) {
	try {
		const allPosts = await Reader.collections.posts.all();
		const categories = await Reader.collections.categories.all();

		// const getCategory = (cate: readonly string[]) => {
		// 	const category = cate.map(async (item: string) => {
		// 		item: await getCategoryBySlug(item);
		// 	});
		// 	return category;
		// };

		const data = allPosts.map((post, index) => {
			return {
				...post,
				index: index + 1,
			};
		});

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
