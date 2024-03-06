import PostGrid from "@/app/components/Post/PostGrid";
import { ICategory } from "@/app/keystatic/interface";
import Link from "next/link";
import React from "react";

export default async function CategoryPage() {
	//const slug = params.slug;
	//if (!slug) notFound();

	//const category = await getCategoryBySlug(slug);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
		next: {
			revalidate: 120,
		},
	});
	const categoryPosts = await response.json();

	const resCategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/category`, {
		next: {
			revalidate: 120,
		},
	});

	const categories: ICategory[] = await resCategory.json();

	return (
		<div className="category-page w-full p-3 lg:p-5 @container">
			<h1 className="page-title">
				<span>All Category Page</span>
			</h1>

			<div className="category-list w-full m-auto max-w-5xl py-5 grid grid-cols-1 @4xl:grid-cols-2 gap-10">
				{categories.map((category) => (
					<div
						className="category-item w-full max-w-lg m-auto rounded-xl overflow-hidden border shadow-sm flex flex-col"
						key={category.slug}
					>
						<Link href={`/post/category/${category.slug}`} title={`View Category ${category.entry.category}`}>
							<div
								className="category-image bg-slate-200 aspect-[7/3] 
                            flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-300"
							>
								<div className="category-name text-xl @lg:text-4xl text-gray-500 text-shadow-lg">
									{category.entry.category}
								</div>
							</div>
						</Link>
						<div
							className="category-info p-3 @xl:p-5 text-white flex justify-between items-center gap-3"
							style={{ backgroundColor: category.entry?.customColor || "#212631" }}
						>
							<div>
								<h3 className="cate-name text-2xl">{category.entry.category}</h3>
								{/* <p className="cate-desc">{category.entry.description}</p> */}
							</div>

							<div className="cate-total ">
								{category?.total && (
									<>
										<span className="text-3xl">{category.total}</span>
										<span className="text-xl"> {category.total > 1 ? " posts" : "post"}</span>
									</>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* <PostGrid posts={categoryPosts} size="lg" /> */}
		</div>
	);
}
