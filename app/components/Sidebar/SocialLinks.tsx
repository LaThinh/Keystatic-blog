import React from "react";
import Link from "next/link";
import { Reader } from "@/app/keystatic/utils";

export default async function SocialLinks() {
	const socialLinks = await Reader.singletons.socialLinks.read();

	return (
		<div className="block">
			<h3 className="block-title">Social Links</h3>
			<div className="block-content">
				{socialLinks && (
					<ul className="flex flex-col">
						{socialLinks.twitter && (
							<li className="py-2">
								<Link
									className="alink"
									href={`https://twitter.com/${socialLinks.twitter}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Twitter
								</Link>
							</li>
						)}
						{socialLinks.github && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`https://github.com/${socialLinks.github}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Github
								</Link>
							</li>
						)}
						{socialLinks.linkedin && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`https://linkedin.com/in/${socialLinks.linkedin}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									LinkedIn
								</Link>
							</li>
						)}
						{socialLinks.facebook && (
							<li className="py-2 border-t">
								<Link
									className="alink"
									href={`https://facebook.com/${socialLinks.facebook}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									Faccebook
								</Link>
							</li>
						)}
					</ul>
				)}
			</div>
		</div>
	);
}
