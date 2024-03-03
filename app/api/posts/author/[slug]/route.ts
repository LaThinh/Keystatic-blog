import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any): Promise<NextResponse> {
	const { params } = context;
	const slug = params.slug;

	try {
		const posts = await Reader.collections.posts.all();
		const postCategory = posts.filter((post) => post.entry.authors.includes(slug));
		return NextResponse.json(postCategory);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
