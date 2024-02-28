import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import React from "react";

type ShowcaseYoutubeProps = {
	videoId: Extract<
		Entry<(typeof keystaticConfig)["collections"]["authors"]>["showcase"][number],
		{ discriminant: "youtubeVideoId" }
	>["value"];
};

export default function ShowcaseYoutube({ videoId }: ShowcaseYoutubeProps) {
	return (
		<div className="showCare showCase_video">
			<iframe
				title="YouTube video player"
				src={`https://www.youtube.com/embed/${videoId}`}
				// frameborder={0}
				className="w-full aspect-video"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
		</div>
	);
}
