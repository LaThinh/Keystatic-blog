// src/app/keystatic/layout.tsx
import KeystaticApp from "./keystatic";

export default function Layout() {
	return (
		<html lang="en">
			<head />
			<body className="keystatic-layout">
				<div className="keystatic w-full max-w-[1920px] m-auto">
					<KeystaticApp />
				</div>
			</body>
		</html>
	);
}
