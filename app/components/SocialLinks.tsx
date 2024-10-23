import React from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Link from "next/link";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function SocialLinks() {
	const socialLinks = await reader.singletons.socialLinks.read();
	return (
		<>
			{socialLinks && (
				<ul>
					{socialLinks.twitter && (
						<li>
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
						<li>
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
						<li>
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
						<li>
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
		</>
	);
}
