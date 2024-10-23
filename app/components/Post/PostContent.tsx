"use client";

import { DocumentRenderer } from "@keystatic/core/renderer";
import React, { useEffect } from "react";
import ShowcaseYoutube from "./ShowcaseYoutube";
import Image from "next/image";

import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function PostContent({ postContent }: { postContent: any }) {
	useEffect(() => {
		hljs.highlightAll();
	}, [postContent]);

	return (
		<div className="post-content max-w-4xl m-auto">
			<DocumentRenderer
				document={postContent}
				renderers={{
					block: {
						image: (props: any) => {
							return (
								<figure className="m-auto max-h-[800px] w-auto rounded-md">
									<Image
										src={props.src}
										width={props.width || 900}
										height={props.height || 640}
										alt={props.alt || "Title"}
										unoptimized={true}
										className={props.classes}
									/>

									{props.alt && (
										<figcaption
											className="!mt-0 text-center p-2"
											dangerouslySetInnerHTML={{
												__html: props.alt,
											}}
										/>
									)}
								</figure>
							);
						},
					},
				}}
				componentBlocks={{
					"youtube-video": (props) => <ShowcaseYoutube videoId={props.youtubeVideoId} />,
				}}
			/>
		</div>
	);
}
