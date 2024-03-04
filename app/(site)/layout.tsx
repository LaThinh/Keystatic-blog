import { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Loading from "@/app/components/Loading";

export const metadata: Metadata = {
	metadataBase: new URL("https://la-keystatic.vercel.app/"),
	title: "Keystatic Blog | Paul La",
	description: "Keystatic Blog Content Management",
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="post-layout flex flex-col min-h-[100vh] justify-between">
			<Header />
			<div className="main-container h-full flex flex-col flex-1">
				<Suspense fallback={<Loading text="Loading..." />}>{children}</Suspense>
			</div>
			<Footer />
		</div>
	);
}
