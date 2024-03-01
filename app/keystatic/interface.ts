import { DocumentElement } from "@keystatic/core";

export interface IPost {
	slug: string;
	entry: {
		title: string;
		content: () => Promise<DocumentElement[]>;
		draft: boolean;
		publishDate: string;
		heroImage: string | null;
		categories: readonly string[];
		authors: readonly string[];
	};
}

export interface ICategory {
	slug: string;
	entry: {
		category: string;
		description: string;
		customColor: string;
	};
}
