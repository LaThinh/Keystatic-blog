export const dynamic = "force-dynamic"; // defaults to auto

import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const posts = await Reader.collections.posts.all();

		//const pathName = request.nextUrl.pathname;
		//const slug = pathName.substring(pathName.lastIndexOf("/") + 1) || "slug";
		//console.log(pathName);
		// const url = request.url;
		// const slug = url.substring(url.lastIndexOf("/") + 1) || "slug";
		// // const { searchParams } = new URL(request.url);
		// // const slug = request.url || "slug";

		// console.log("Get API Posts Category slug = " + slug);

		// const postCategory = posts.filter((post) => post.entry.categories.includes(slug));
		// console.log(postCategory.length);

		// if (!postCategory || postCategory.length === 0) {
		// 	return NextResponse.json({ error: `Not found any Post with Category Slug: ${slug}` }, { status: 200 });
		// }

		const dataPosts = posts.map((post, index) => {
			return {
				...post,
				index: index + 1,
			};
		});

		return new Response(JSON.stringify(dataPosts), {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
