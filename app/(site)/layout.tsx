import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
	title: "Keystatic Blog | Paul La",
	description: "Keystatic Blog Content Management",
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="post-layout flex flex-col min-h-[100vh] justify-between">
			<Header />
			<div className="main-container">{children}</div>
			<Footer />
		</div>
	);
}
