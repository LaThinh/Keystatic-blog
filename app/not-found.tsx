import { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
	title: "Page not Found",
	description: "Page 404 not found",
};

export default function NotFound() {
	return (
		<div className="post-layout flex flex-col min-h-[100vh] justify-between">
			<Header />
			<div
				className="not-found h-full w-full bg-gradient-to-tr from-gray-50 to-gray-200
        flex flex-1 flex-col justify-center items-center gap-5"
			>
				<h1 className="text-2xl lg:text-4xl text-gradient">Page Not Found</h1>
				<p>Could not find requested resource</p>
				<Link href="/">Return to Homepage</Link>
			</div>
			<Footer />
		</div>
	);
}
