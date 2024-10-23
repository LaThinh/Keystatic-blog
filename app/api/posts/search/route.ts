import { Reader } from "@/app/keystatic/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	//const { params } = context;
	//console.log(params);

	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("id");

	// console.log(searchParams);

	try {
		const posts = await Reader.collections.posts.all();
		return NextResponse.json(posts);
	} catch (error: any) {
		return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
	}
}
