import Link from "next/link";

export default function NotFound() {
	return (
		<div className="not-found h-full bg-slate-100 w-full flex flex-1 flex-col justify-center items-center gap-5">
			<h2 className="page-title">Post Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
