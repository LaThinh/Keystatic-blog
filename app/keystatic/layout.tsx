// src/app/keystatic/layout.tsx
import KeystaticApp from "./keystatic";

export default function Layout() {
	return (
		<html>
			<head />
			<body>
				<div className="keystatic w-full max-w-[1600px] m-auto">
					<KeystaticApp />
				</div>
			</body>
		</html>
	);
}
