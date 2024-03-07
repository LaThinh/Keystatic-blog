import { DocumentElement } from "@keystatic/core";

export interface IPost {
	slug: string;
	entry: {
		title: string;
		content: () => Promise<DocumentElement[]>;
		isFeatured: boolean;
		publishDate: string;
		draft: boolean;
		heroImage: string | null;
		postType: "normal" | "gallery" | "poetry" | "video";
		categories: readonly string[];
		authors: readonly string[];
		customClasses: string;
	};
}

export interface ICategory {
	slug: string;
	entry: {
		category: string;
		description: string;
		customColor: string;
	};
	total?: number;
}

export interface IPostArticle {
	title: string;
	draft: boolean;
	publishDate: string;
	heroImage: string | null;
	categories: readonly string[];
	content: DocumentElement[] | undefined;
	postAuthors?: IAuthor[];
}

export interface IAuthor {
	slug: string;
	name?: string | undefined;
	avatar?: string | null | undefined;
	showcase?:
		| readonly {
				readonly discriminant: "youtubeVideoId";
				readonly value: string;
		  }[]
		| undefined;
}
