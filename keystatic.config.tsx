import { config, fields, collection, component, singleton } from "@keystatic/core";
import ShowcaseYoutube from "./app/components/Post/ShowcaseYoutube";

export default config({
	storage: {
		kind: "local",
	},

	ui: {
		brand: { name: "La Keystatic" },
		navigation: {
			writing: ["posts", "authors", "categories"],
			Header: ["menuLinks"],
			HomePage: ["homepage"],
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

			schema: {
				title: fields.slug({
					name: { label: "Title" },
				}),
				content: fields.document({
					label: "Content",
					formatting: true,
					dividers: true,
					links: true,
					images: true,
					tables: true,
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
				post_image: fields.image({
					label: "Post Image",
					directory: "public/images/posts",
					publicPath: "/images/posts",
				}),
				// author: fields.relationship({ label: "Author", collection: "authors" }),
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
			},
		}),

		categories: collection({
			label: "Categories",
			slugField: "category",
			path: "app/content/categories/*",
			format: { data: "json" },
			schema: {
				category: fields.slug({
					name: { label: "Category" },
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
			schema: {
				name: fields.slug({ name: { label: "Author Name" } }),
				avatar: fields.image({
					label: "Avatar Image",
					directory: "public/images/avatars",
					publicPath: "/images/avatars",
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

				about: fields.object({
					title: fields.text({ label: "About Title" }),
					intro: fields.text({ label: "About Intro" }),
				}),
			},
		}),
	},
});
