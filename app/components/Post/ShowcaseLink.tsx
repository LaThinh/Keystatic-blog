import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import Link from "next/link";
import React from "react";

type Showcase = Entry<(typeof keystaticConfig)["collections"]["authors"]>["showcase"];

type ShowcaseLinkProps = Extract<Showcase[number], { discriminant: "link" }>["value"];

export default function ShowcaseLink({ url, label }: ShowcaseLinkProps) {
	return (
		<div className="showCase">
			<Link href={`${url}`} target="_blank" rel="noopener noreferrer">
				{label}
			</Link>
		</div>
	);
}
