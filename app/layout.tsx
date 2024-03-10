import type { Metadata } from "next";
import { Inter, Anton, Lobster, Great_Vibes, Style_Script, Calistoga, Rowdies, Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

// const roboto = Roboto({
// 	weight: ["300", "400", "500", "700"],
// 	subsets: ["latin"],
// 	variable: "--roboto",
// });

export const metadata: Metadata = {
	title: "La Blog | Create Next App and Keystatic",
	description: "Generated by La Thịnh create Nextjs 14 and Keystatic",
};

const lobster = Lobster({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--lobster",
});

const great_vibes = Great_Vibes({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--great_vibes",
});

const style_script = Style_Script({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--style_script",
});

const heading_font = Calistoga({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--heading_font",
});

const fontVariables = `${heading_font.variable} ${lobster.variable} ${great_vibes.variable} ${style_script.variable}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} ${fontVariables} `}>
				<Suspense fallback={<Loading text="Loading..." />}>{children}</Suspense>
			</body>
		</html>
	);
}
