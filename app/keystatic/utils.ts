import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { IPost, ICategory } from "@/app/keystatic/interface";

export const Reader = createReader(process.cwd(), keystaticConfig);

export const sortPostsByPublishDate = (posts: IPost[]): IPost[] => {
	return posts.slice().sort((postA: IPost, postB: IPost) => {
		// Handle cases where publishDate is missing
		if (!postA.entry.publishDate) {
			return 1; // Move posts without publishDate to the end
		}
		if (!postB.entry.publishDate) {
			return -1;
		}

		// Convert dates to comparable values
		const dateA = new Date(postA.entry.publishDate);
		const dateB = new Date(postB.entry.publishDate);

		// Compare dates and return sort order
		return dateB.getTime() - dateA.getTime();
	});
};

export const getCategoryBySlug = async (slug: string) => {
	const categories = await Reader.collections.categories.all();

	const category: ICategory[] = categories.filter((c) => c.slug === slug);
	if (category.length > 0) {
		return category[0];
	}

	return null;
};
