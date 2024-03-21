import { config, fields, collection, component, singleton, LocalConfig, CloudConfig } from "@keystatic/core";
import ShowcaseYoutube from "./app/components/Post/ShowcaseYoutube";

const isPro = process.env.NODE_ENV === "production";

const localMode: LocalConfig["storage"] = {
	kind: "local",
};

const remoteMode: CloudConfig["storage"] = {
	kind: "cloud",
	// pathPrefix: "prod",
};

export default config({
	// storage: {
	// 	// kind: "local",
	// 	// kind: "cloud",
	// 	kind: "github",
	// 	pathPrefix: "prod",
	// 	repo: {
	// 		owner: "LaThinh",
	// 		name: "Keystatic-blog",
	// 	},
	// },

	storage: isPro ? remoteMode : localMode,

	cloud: {
		project: "key-static-blog/keystatic-blog",
	},

	ui: {
		brand: { name: "La Keystatic" },
		navigation: {
			writing: ["posts", "authors", "categories"],
			Header: ["menuLinks"],
			Pages: ["homepage", "technology"],
			Footer: ["socialLinks"],
		},
	},

	collections: {
		posts: collection({
			label: "Posts",
			slugField: "title",
			path: "app/content/posts/*",
			format: { contentField: "content" },
			entryLayout: "content",
			columns: ["title", "publishDate", "draft", "heroImage"],
			schema: {
				title: fields.slug({
					name: { label: "Title" },
				}),
				content: fields.document({
					label: "Content",

					//formatting: true,
					formatting: {
						alignment: {
							center: true,
							end: true,
						},
						inlineMarks: true,
						listTypes: {
							ordered: true,
							unordered: true,
						},
						headingLevels: [1, 2, 3, 4, 5, 6],
						blockTypes: {
							blockquote: true,
							code: true,
						},
						softBreaks: true,
					},
					links: true,
					images: {
						directory: "public/images/posts",
						publicPath: "/images/posts",
					},
					tables: true,
					// dividers: true,
					componentBlocks: {
						"youtube-video": component({
							label: "YouTube Video",
							schema: {
								youtubeVideoId: fields.text({
									label: "YouTube Video ID",
									description: "The ID of the Youtube video",
									validation: {
										length: {
											min: 1,
										},
									},
								}),
							},
							preview: (props) =>
								props.fields.youtubeVideoId.value ? (
									<ShowcaseYoutube videoId={props.fields.youtubeVideoId.value} />
								) : (
									<p>Please enter a video ID</p>
								),
						}),
					},
				}),
				isFeatured: fields.checkbox({ label: "Is Featured" }),
				publishDate: fields.date({
					label: "Publish Date",
					validation: {
						isRequired: true,
					},
					defaultValue: { kind: "today" },
				}),
				draft: fields.checkbox({
					label: "Draft",
					description: "Set this post as draft to prevent it from being published",
				}),
				heroImage: fields.image({
					label: "Hero Image",
					description: "Feature Image for this post",
					directory: "public/images/posts",
					publicPath: "/images/posts",
				}),
				// author: fields.relationship({ label: "Author", collection: "authors" }),
				postType: fields.select({
					label: "Post Type",
					description: "Type of this post",
					options: [
						{ label: "Normal", value: "normal" },
						{ label: "Gallery", value: "gallery" },
						{ label: "Poetry", value: "poetry" },
						{ label: "Video", value: "video" },
					],
					defaultValue: "normal",
				}),
				categories: fields.array(
					fields.relationship({
						label: "Categories",
						collection: "categories",
						validation: {
							isRequired: true,
						},
					}),
					{
						label: "Categories",
						description: "Categories for this post",
						itemLabel: (item) => item.value || "Please select Categories",
					}
				),
				authors: fields.array(
					fields.relationship({
						label: "Authors",
						collection: "authors",
						validation: {
							isRequired: true,
						},
					}),
					{
						label: "Authors",
						description: "Authors write this post",
						itemLabel: (item) => item.value || "Please select an author",
					}
				),
				customClasses: fields.text({ label: "Custom Classes", description: "Add class custom for this post" }),
			},
		}),

		categories: collection({
			label: "Categories",
			slugField: "category",
			path: "app/content/categories/*",
			format: { data: "json" },
			columns: ["category", "description", "customColor"],

			schema: {
				category: fields.slug({
					name: { label: "Category Name" },
				}),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				customColor: fields.text({
					label: "Color Code",
					validation: {
						length: {
							min: 0,
							max: 7,
						},
					},
				}),
			},
		}),

		// blog: collection({
		// 	label: "Blog posts",
		// 	slugField: "title",
		// 	path: "app/content/blog/**",
		// 	entryLayout: "content",
		// 	format: {
		// 		contentField: "body",
		// 	},
		// 	schema: {
		// 		title: fields.slug({
		// 			name: { label: "Title" },
		// 		}),
		// 	},
		// }),

		authors: collection({
			label: "Authors",
			slugField: "name",
			path: "app/content/authors/*",
			format: { data: "json" },
			columns: ["name", "avatar"],
			previewUrl: "https://github.com/",
			schema: {
				name: fields.slug({ name: { label: "Author Name" } }),
				avatar: fields.image({
					label: "Avatar Image",
					directory: "public/images/avatars",
					publicPath: "/images/avatars",
				}),
				introduce: fields.text({
					label: "Introduce yourself",
					multiline: true,
				}),
				showcase: fields.blocks(
					{
						link: {
							label: "Link",
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: {
										length: {
											min: 1,
											max: 100,
										},
									},
								}),
								url: fields.url({ label: "Url" }),
							}),
							itemLabel: (item) => item.fields.label.value + ": " + item.fields.url.value || "Link",
						},
						youtubeVideoId: {
							label: "YouTube Video ID",
							schema: fields.text({ label: "YouTube Video ID" }),
							itemLabel: (item) => "Youtube ID: " + item.value || "YouTube Video ID",
						},
					},
					{ label: "Showcase", description: "Link Showcases" }
				),
			},
		}),
	},

	singletons: {
		socialLinks: singleton({
			label: "Social Links",
			path: "app/content/social-links",
			schema: {
				twitter: fields.url({ label: "Twitter", description: "The twitter handles" }),
				github: fields.url({ label: "Github", description: "The github username" }),
				linkedin: fields.url({ label: "LinkedIn", description: "The LinkedIn ID" }),
				facebook: fields.url({ label: "Facebook", description: "The Facebook Link" }),
			},
		}),
		menuLinks: singleton({
			label: "Menu Links",
			path: "app/content/menu-links",
			format: "json",
			schema: {
				items: fields.array(
					fields.object({
						menu: fields.text({ label: "Menu Name" }),
						url: fields.url({ label: "Links" }),
					}),
					{
						label: "Links",
						itemLabel: (props) => props.fields.menu.value + "" + props.fields.url.value,
					}
				),
			},
		}),
		homepage: singleton({
			label: "Homepage",
			path: "app/content/page/homepage",
			format: "json",
			schema: {
				banner: fields.array(
					fields.object({
						image: fields.image({
							label: "Banner Image",
							//directory: "app/content/banner/",
							directory: "public/images/homepage/",
							publicPath: "/images/homepage/",
						}),
						title: fields.text({ label: "Banner Title" }),
						description: fields.text({ label: "Banner Description", multiline: true }),
						link: fields.url({ label: "Banner Link" }),
					}),
					{
						label: "Banner Item",
						itemLabel: (props) => props.fields.title.value,
					}
				),

				latestPost: fields.number({
					label: "Number of latest posts",
					description: "Number of latest articles on the home page",
					step: 1,
					defaultValue: 6,
					validation: {
						min: 3,
						max: 24,
						step: true,
					},
				}),

				about: fields.object({
					title: fields.text({ label: "About Title" }),
					intro: fields.text({ label: "About Intro", multiline: true }),
				}),
			},
		}),
		technology: singleton({
			label: "Technology",
			path: "app/content/page/technology",
			format: "json",
			schema: {
				technology: fields.array(
					fields.object({
						name: fields.text({ label: "Name" }),
						description: fields.text({ label: "Description" }),
						icon: fields.image({
							label: "Icon SVG",
							description: "Icon Technology File",
							directory: "public/images/technology/",
							publicPath: "/images/technology/",
						}),
						position: fields.integer({
							label: "Position",
							description: "Position of items",
						}),
					}),
					{
						label: "Technology Featured",
						itemLabel: (props) => props.fields.name.value,
					}
				),
			},
		}),
	},
});
