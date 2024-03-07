import { Reader } from "@/app/keystatic/utils";
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
		const categories = await Reader.collections.categories.all();
		const allPosts = await Reader.collections.posts.all();

		const getPosts = (slug: string) => {
			const posts = allPosts.filter((post) => post.entry.categories.includes(slug));
			return posts.length;
		};

		const data = categories.map((category) => {
			return {
				...category,
				total: getPosts(category.slug),
			};
		});

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
